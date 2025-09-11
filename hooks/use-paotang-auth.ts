import { AuthResponse, TokenResponse } from '@/types/auth'
import { OAuthConfig } from '@/types/oauth'
import { PaotangProfileResponse } from '@/types/paotang-profile'

interface TokenExchangeParams {
  code: string
  state?: string
}

const usePaotangAuth = () => {
  const getRequestBody = (config: OAuthConfig) => {
    if (!config.clientId || !config.redirectUri) {
      throw new Error('Missing required configuration: clientId and redirectUri are required')
    }

    return {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scopes || [],
      acr: config.acr || '',
      prompt: config.prompt || '',
      state: config.state || '',
    }
  }

  const postPaotangAuth = async (config: OAuthConfig): Promise<AuthResponse> => {
    if (!config.url) {
      return Promise.reject(new Error('Base URL is not configured'))
    }
    const requestBody = { tokenUrl: `${config.url}/oauth2/app2app/auth`, ...getRequestBody(config) }
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()
    if (!response.ok) {
      return Promise.reject(data)
    }
    return data
  }

  const qrAuth = (config: OAuthConfig): void => {
    try {
      if (!config.url) {
        throw new Error('Base URL is not configured')
      }

      const requestBody = getRequestBody(config)
      const baseUrl = config.url.endsWith('/') ? config.url : `${config.url}/`
      const scopeString = requestBody.scope.join(' ')

      const params = new URLSearchParams()
      params.append('client_id', requestBody.client_id)
      params.append('redirect_uri', encodeURIComponent(requestBody.redirect_uri))
      params.append('response_type', 'code')
      if (scopeString) params.append('scope', encodeURIComponent(scopeString))
      if (requestBody.state) params.append('state', encodeURIComponent(requestBody.state))
      if (requestBody.acr) params.append('acr', encodeURIComponent(requestBody.acr))
      if (requestBody.prompt) params.append('prompt', encodeURIComponent(requestBody.prompt))

      window.location.href = `${baseUrl}oauth2/web/auth?${params.toString()}`
    } catch (error) {
      throw error // Re-throw to be handled by the caller
    }
  }

  const postExchangeToken = async (config: OAuthConfig, code: string, state?: string): Promise<TokenResponse> => {
    const requestBody = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      state,
      scope: config?.scopes || [],
      tokenUrl: `${config.url}/oauth2/token`,
    }
    const response = await fetch('/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()
    if (!response.ok) {
      return Promise.reject(data)
    }
    return data
  }

  const postProfile = async (config: OAuthConfig, accessToken: string): Promise<PaotangProfileResponse> => {
    const requestBody = {
      profileUrl: `${config.url}/api/profile`,
      accessToken,
    }
    const response = await fetch('/api/profile-paotang', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()
    if (!response.ok) {
      return Promise.reject(data)
    }
    return data
  }

  return {
    postPaotangAuth,
    qrAuth,
    postExchangeToken,
    postProfile,
  }
}

export default usePaotangAuth
