import { AuthResponse, TokenResponse } from '@/types/auth'
import { UserProfileResponse } from '@/types/nextpass-profile'
import { OAuthConfig } from '@/types/oauth'

const useNextPassAuth = () => {
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
      state: config.state || '2b88e97bd11b4dababaf524eeb20be8a',
    }
  }

  const postNextPassAuth = async (config: OAuthConfig): Promise<AuthResponse> => {
    if (!config.url) {
      return Promise.reject(new Error('Base URL is not configured'))
    }
    const requestBody = { tokenUrl: `${config.url}/next-pass/v1/open-api/app2app/auth`, ...getRequestBody(config) }

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

  const postNextPassExchangeToken = async (config: OAuthConfig, code: string, state?: string): Promise<TokenResponse> => {
    const requestBody = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      state,
      scope: config?.scopes || [],
      tokenUrl: `${config.url}/next-pass/v1/open-api/token`,
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

  const postNextPassProfile = async (config: OAuthConfig, tokenResponse: TokenResponse | undefined): Promise<UserProfileResponse> => {
    const requestBody = {
      profileUrl: `${config.url}/next-pass/v1/open-api/get-customer-profile`,
      ...tokenResponse,
    }
    const response = await fetch('/api/profile', {
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
    postNextPassExchangeToken,
    postNextPassProfile,
    postNextPassAuth,
  }
}

export default useNextPassAuth
