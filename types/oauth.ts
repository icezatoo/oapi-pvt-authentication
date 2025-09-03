export type AuthType = 'paotang' | 'nextpass'

export type Environment = 'development' | 'uat' | 'staging' | 'production'
export type ACRType = 'PIN' | 'ALL'
export type ApplicationType = 'public' | 'sandbox'

export interface OAuthConfig {
  authType: AuthType
  environment: Environment
  type: ApplicationType
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
  acr: ACRType
  prompt: string
}

export type Scopes = {
  id: string
  name: string
  description: string
  required: boolean
}

export interface EnvironmentDetails {
  color: string
  label: string
  description: string
}

export interface TypeDetails {
  color: string
  label: string
  description: string
}
