import { ApplicationType, AuthType, OAuthConfig } from '@/types/oauth'
import useOAuthConfig from './use-oauth-config'
import { AuthResponse } from '@/types/auth'

const useAuth = () => {
  const { config } = useOAuthConfig()

  const requestBody = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scopes,
    acr: config.acr,
    prompt: config.prompt,
    state: config.state,
  }

  const fetchApp2AppAuth = (): Promise<AuthResponse> => {
    // const authUrl = config.authType === 'nextpass' ? config.url : config.endpoint
    const baseUrl = `${config.url}oauth2/app2app/auth`
    return fetch(`${baseUrl}oauth2/app2app/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response: Response) => response.json())
  }

  const qrAuth = (): void => {
    const baseUrl = `${config.url}oauth2/web/auth`
    const scopeString = config.scopes.join(' ')
    const redirectUrl = `${baseUrl}oauth2/web/auth?client_id=${encodeURIComponent(config.clientId)}&redirect_uri=${encodeURIComponent(
      config.redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${encodeURIComponent(config.state)}&acr=${encodeURIComponent(config.acr)}&prompt=${encodeURIComponent(config.prompt)}`
    window.location.href = redirectUrl
  }

  return {
    fetchApp2AppAuth,
    qrAuth,
  }
}

export default useAuth
