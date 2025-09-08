import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { OAuthConfig } from '@/types/oauth'

// Default configuration factory
const createDefaultConfig = (): OAuthConfig => ({
  authType: 'paotang',
  environment: 'development',
  type: 'public',
  clientId: '',
  clientSecret: '',
  redirectUri: '',
  scopes: [],
  acr: 'PIN',
  prompt: '',
  endpoint: '',
  url: '',
  state: '',
})

// Helper function for URL validation
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validation function
const validateConfig = (config: OAuthConfig) => {
  const errors: Partial<Record<keyof OAuthConfig, string>> = {}

  // Required field validation
  if (!config.clientId.trim()) {
    errors.clientId = 'Client ID is required'
  }

  // Redirect URI validation
  if (!config.redirectUri.trim()) {
    errors.redirectUri = 'Redirect URI is required'
  } else if (!isValidUrl(config.redirectUri)) {
    errors.redirectUri = 'Redirect URI must be a valid URL'
  }

  // Scopes validation
  if (config.scopes.length === 0) {
    errors.scopes = 'At least one scope is required'
  }

  // Environment-specific validation
  if (config.environment === 'production' && config.redirectUri.includes('localhost')) {
    errors.redirectUri = 'Localhost URLs are not allowed in production'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

// Store interface
interface OAuthConfigStore {
  // State
  config: OAuthConfig
  errors: Partial<Record<keyof OAuthConfig, string>>
  isValid: boolean

  // Actions
  updateConfig: (updates: Partial<OAuthConfig>) => void
  updateField: <K extends keyof OAuthConfig>(field: K, value: OAuthConfig[K]) => void
  updateScopes: (scopes: string[]) => void
  setConfig: (config: OAuthConfig) => void
  resetConfig: () => void
  changeAuthType: (authType: OAuthConfig['authType']) => void
  clearLocalStorage: () => void

  // Internal validation update
  _updateValidation: () => void
}

// Create the Zustand store with persistence
export const useOAuthConfigStore = create<OAuthConfigStore>()(
  persist(
    (set, get) => {
      const updateValidation = () => {
        const { config } = get()
        const validation = validateConfig(config)
        set({
          errors: validation.errors,
          isValid: validation.isValid,
        })
      }

      return {
        // Initial state
        config: createDefaultConfig(),
        errors: {},
        isValid: false,
        // clear: clearStorage,

        // Actions
        updateConfig: (updates: Partial<OAuthConfig>) => {
          set((state) => ({
            config: { ...state.config, ...updates },
          }))
          updateValidation()
        },

        updateField: <K extends keyof OAuthConfig>(field: K, value: OAuthConfig[K]) => {
          set((state) => ({
            config: { ...state.config, [field]: value },
          }))
          updateValidation()
        },

        updateScopes: (scopes: string[]) => {
          set((state) => ({
            config: { ...state.config, scopes },
          }))
          updateValidation()
        },

        setConfig: (config: OAuthConfig) => {
          set({ config })
          updateValidation()
        },

        resetConfig: () => {
          set({ config: createDefaultConfig() })
          updateValidation()
        },
        clearLocalStorage: () => {
          localStorage.removeItem('oauth_config_draft')
        },

        changeAuthType: (authType: OAuthConfig['authType']) => {
          const currentAuthType = get().config.authType
          if (currentAuthType !== authType) {
            set({
              config: { ...createDefaultConfig(), authType },
            })
            updateValidation()
          }
        },

        _updateValidation: updateValidation,
      }
    },
    {
      name: 'oauth_config_draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useOAuthConfigStore
