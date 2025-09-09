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

  const postPaotangAuth = (config: OAuthConfig): Promise<AuthResponse> => {
    if (!config.url) {
      return Promise.reject(new Error('Base URL is not configured'))
    }
    const requestBody = getRequestBody(config)
    return fetch(`${config.url}/oauth2/app2app/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response: Response) => {
      return response.json()
    })
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
    }
    return fetch(`${config.url}/oauth2/token`, {
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

  const postProfile = (config: OAuthConfig, accessToken: string): Promise<PaotangProfileResponse> => {
    return fetch(`${config.url}/api/profile`, {
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
    postPaotangAuth,
    qrAuth,
    postExchangeToken,
    postProfile,
  }
}

export default usePaotangAuth
