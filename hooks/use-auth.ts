import { AuthResponse } from '@/types/auth'
import { OAuthConfig } from '@/types/oauth'

const useAuth = () => {
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

  const fetchApp2AppAuth = (config: OAuthConfig): Promise<AuthResponse> => {
    if (!config.url) {
      return Promise.reject(new Error('Base URL is not configured'))
    }

    const baseUrl = config.url.endsWith('/') ? config.url : `${config.url}/`
    const requestBody = getRequestBody(config)

    return fetch(`${baseUrl}oauth2/app2app/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
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
      console.error('QR Auth error:', error)
      throw error // Re-throw to be handled by the caller
    }
  }

  return {
    fetchApp2AppAuth,
    qrAuth,
  }
}

export default useAuth
