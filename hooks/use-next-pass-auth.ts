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
      state: config.state || 'random',
    }
  }

  const postNextPassAuth = (config: OAuthConfig): Promise<AuthResponse> => {
    if (!config.url) {
      return Promise.reject(new Error('Base URL is not configured'))
    }
    const requestBody = getRequestBody(config)
    return fetch(`${config.url}/next-pass/v1/open-api/app2app/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response: Response) => {
      return response.json()
    })
  }

  const postNextPassExchangeToken = async (config: OAuthConfig, code: string, state?: string): Promise<TokenResponse> => {
    const requestBody = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      state,
    }
    return fetch(`${config.url}/next-pass/v1/open-api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response: Response) => {
      if (!response.ok) {
        throw new Error('Token exchange failed')
      }
      return response.json()
    })
  }

  const postNextPassProfile = (config: OAuthConfig, accessToken: string): Promise<UserProfileResponse> => {
    return fetch(`${config.url}/next-pass/v1/open-api/get-customer-profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((response: Response) => {
      return response.json()
    })
  }

  return {
    postNextPassExchangeToken,
    postNextPassProfile,
    postNextPassAuth,
  }
}

export default useNextPassAuth
