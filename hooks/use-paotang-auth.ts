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

      const scopeString = config.scopes.join(' ')
      // const baseUrl = buildAuthBaseUrl()
      const redirectUrl = `${config.url}/oauth2/web/auth?client_id=${encodeURIComponent(config.clientId)}&redirect_uri=${encodeURIComponent(
        config.redirectUri
      )}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${encodeURIComponent(config.state)}&acr=${encodeURIComponent(config.acr)}&prompt=${encodeURIComponent(config.prompt)}`

      window.location.href = redirectUrl

      // https://paotang-pass-external-sit.th-service.co.in/oauth2/web/auth?client_id=970f0266-32e0-4b97-8960-f85d21e263a7&redirect_uri=https%3A%2F%2Fptpass-pvt.vercel.app%2F&response_type=code&scope=offline%20openid&state=7e234857-7755-47d4-834a-62129618b30c&acr=PIN&prompt=login

      // const scopeString = config.scopes.join(' ')
      // const baseURL = config.environment === 'production' ? `${config.urlQR}/oauth2/web/auth` : config.urlQR
      // const redirectUrl = `${baseURL}?client_id=${encodeURIComponent(config.clientId)}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=${encodeURIComponent(
      //   scopeString
      // )}&state=${encodeURIComponent(config.state)}&acr=${encodeURIComponent(config.acr)}&prompt=${encodeURIComponent(config.prompt)}`

      // window.location.href = redirectUrl
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
      scope: config?.scopes.join(' ') || [],
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
      profileUrl: buildProfileUrl(config),
      access_token: accessToken,
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

  const buildProfileUrl = (config: OAuthConfig) => {
    const sandboxPrefix = config.type === 'sandbox' ? 'sandbox-' : ''
    const endpointPath = config.endpoint === 'paotangid' ? 'paotangid' : 'paotangpass'
    const profileEndpoint = config.type === 'sandbox' ? `get-customer-profile-sandbox` : `get-customer-profile`

    const mapenv: Record<string, string> = {
      development: 'sit',
      uat: 'uat',
      production: 'prd',
    }

    if (config.environment === 'production') {
      const baseUrl =
        config.type === 'sandbox'
          ? `https://paotang-openapi-sandbox.devops.krungthai.com/v1/${endpointPath}/${profileEndpoint}`
          : `https://paotang-openapi.devops.krungthai.com/v1/${endpointPath}/${profileEndpoint}`
      return baseUrl
    } else {
      const baseUrl =
        config.type === 'sandbox'
          ? `https://paotang-openapi-${sandboxPrefix}${mapenv[config.environment]}.th-service.co.in/v1/${endpointPath}/${profileEndpoint}`
          : `https://paotang-openapi-${mapenv[config.environment]}.th-service.co.in/v1/${endpointPath}/${profileEndpoint}`
      return baseUrl
    }
  }

  return {
    postPaotangAuth,
    qrAuth,
    postExchangeToken,
    postProfile,
  }
}

export default usePaotangAuth
