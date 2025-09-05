import { OAuthConfig } from '@/types/oauth'
import { useReducer, useMemo, useEffect } from 'react'

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
})

// Action types
type OAuthConfigAction =
  | { type: 'UPDATE_CONFIG'; payload: Partial<OAuthConfig> }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof OAuthConfig; value: OAuthConfig[keyof OAuthConfig] } }
  | { type: 'UPDATE_SCOPES'; payload: string[] }
  | { type: 'RESET_CONFIG' }
  | { type: 'SET_CONFIG'; payload: OAuthConfig }
  | { type: 'CHANGE_AUTH_TYPE'; payload: OAuthConfig['authType'] }

// Reducer function
const oauthConfigReducer = (state: OAuthConfig, action: OAuthConfigAction): OAuthConfig => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return {
        ...state,
        ...action.payload,
      }

    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }

    case 'UPDATE_SCOPES':
      return {
        ...state,
        scopes: action.payload,
      }

    case 'SET_CONFIG':
      return action.payload

    case 'RESET_CONFIG':
      return createDefaultConfig()

    case 'CHANGE_AUTH_TYPE':
      return {
        ...createDefaultConfig(),
        authType: action.payload,
      }

    default:
      return state
  }
}

// Hook interface
interface UseOAuthConfigReturn {
  config: OAuthConfig
  updateConfig: (updates: Partial<OAuthConfig>) => void
  updateField: <K extends keyof OAuthConfig>(field: K, value: OAuthConfig[K]) => void
  updateScopes: (scopes: string[]) => void
  setConfig: (config: OAuthConfig) => void
  resetConfig: () => void
  changeAuthType: (authType: OAuthConfig['authType']) => void
  saveToStorage: () => boolean
  clearStorage: () => boolean
  loadFromStorage: () => boolean
  isValid: boolean
  errors: Partial<Record<keyof OAuthConfig, string>>
}

const STORAGE_KEY = 'oauth_config_draft'

const useOAuthConfig = (initialConfig?: Partial<OAuthConfig>): UseOAuthConfigReturn => {
  // Load saved config from localStorage on client-side only
  const loadSavedConfig = (): OAuthConfig | null => {
    // This ensures we only run on the client side
    if (typeof window === 'undefined') return null

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return null
    }
  }

  // Initialize state with useReducer
  const [config, dispatch] = useReducer(oauthConfigReducer, createDefaultConfig())

  // Load saved config on client-side mount
  useEffect(() => {
    if (initialConfig) {
      dispatch({ type: 'SET_CONFIG', payload: { ...createDefaultConfig(), ...initialConfig } })
    } else {
      const savedConfig = loadSavedConfig()
      if (savedConfig) {
        dispatch({ type: 'SET_CONFIG', payload: savedConfig })
      }
    }
  }, [initialConfig])

  // Action creators - these are automatically memoized by useReducer
  const updateConfig = (updates: Partial<OAuthConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: updates })
  }

  const updateField = <K extends keyof OAuthConfig>(field: K, value: OAuthConfig[K]) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { field, value },
    })
  }

  const updateScopes = (scopes: string[]) => {
    dispatch({ type: 'UPDATE_SCOPES', payload: scopes })
  }

  const setConfig = (newConfig: OAuthConfig) => {
    dispatch({ type: 'SET_CONFIG', payload: newConfig })
  }

  const changeAuthType = (authType: OAuthConfig['authType']) => {
    if (config.authType !== authType) {
      dispatch({ type: 'CHANGE_AUTH_TYPE', payload: authType })
    }
  }

  const saveToStorage = (config: OAuthConfig) => {
    if (typeof window === 'undefined') return false

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
      return true
    } catch (error) {
      console.error('Failed to save config to localStorage:', error)
      return false
    }
  }

  const loadFromStorage = (): boolean => {
    const saved = loadSavedConfig()
    if (saved) {
      dispatch({ type: 'SET_CONFIG', payload: saved })
      return true
    }
    return false
  }

  const clearStorage = (): boolean => {
    if (typeof window === 'undefined') return false

    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear config from localStorage:', error)
      return false
    }
  }

  const resetConfig = () => {
    clearStorage()
    dispatch({ type: 'RESET_CONFIG' })
  }

  // Validation logic (memoized to prevent unnecessary recalculation)
  const validation = useMemo(() => {
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
  }, [config])

  return {
    config,
    updateConfig,
    updateField,
    updateScopes,
    setConfig,
    resetConfig,
    changeAuthType,
    saveToStorage: () => saveToStorage(config),
    clearStorage,
    loadFromStorage,
    isValid: validation.isValid,
    errors: validation.errors,
  }
}

// Helper function for URL validation
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Custom hook for form handling (bonus utility)
export const useOAuthConfigForm = (initialConfig?: Partial<OAuthConfig>) => {
  const oauthConfig = useOAuthConfig(initialConfig)

  // Helper for form field changes
  const handleFieldChange = (field: keyof OAuthConfig) => (value: string | string[]) => oauthConfig.updateField(field, value)

  // Helper for scope management
  const addScope = (scope: string) => {
    if (!oauthConfig.config.scopes.includes(scope)) {
      oauthConfig.updateScopes([...oauthConfig.config.scopes, scope])
    }
  }

  const removeScope = (scope: string) => {
    oauthConfig.updateScopes(oauthConfig.config.scopes.filter((s) => s !== scope))
  }

  return {
    ...oauthConfig,
    handleFieldChange,
    addScope,
    removeScope,
  }
}

export default useOAuthConfig
