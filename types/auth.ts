/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AuthResponse {
  deeplinkUrl: string
  error?: any
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  id_token?: string
  scope?: string
}
