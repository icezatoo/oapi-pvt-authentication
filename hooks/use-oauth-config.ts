import { OAuthConfig } from '@/types/oauth'
import { useState } from 'react'

const useOAuthConfig = () => {
  const [config, setConfig] = useState<OAuthConfig>({
    authType: 'paotang',
    environment: 'development',
    type: 'public',
    clientId: '',
    clientSecret: '',
    redirectUri: '',
    scopes: [],
    acr: 'PIN',
    prompt: '',
  })

  const updateConfig = (field: keyof OAuthConfig, value: string | string[]) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateScopes = (scopes: string[]) => {
    setConfig((prev) => ({
      ...prev,
      scopes,
    }))
  }

  return {
    config,
    setConfig,
    updateConfig,
    updateScopes,
  }
}

export default useOAuthConfig
