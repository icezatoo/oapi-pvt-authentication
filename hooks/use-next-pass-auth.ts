import { AuthResponse } from '@/types/auth'
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

  const fetchNextPassAuth = (config: OAuthConfig): Promise<AuthResponse> => {
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

  return {
    fetchNextPassAuth,
  }
}

export default useNextPassAuth
