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

// {
//   "access_token": "_-xO_oggXQwIThjjo8iPm5J2lf8Tsz33zdCGgd-bzBg.h31h1COKfEq4xdJbnuu9en_UQwXTJkV7Gf9aghuL9uY",
//   "expires_in": 3599,
//   "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzpj...",
//   "refresh_token": "8EqQaJ3Xp8VX7tfG71m0L2SBEaXRwcXtFYwc34qB4qM.hnSvfnq0xypwIfXciAXgGHp7LcNOlbyddcs-cYVm2L4",
//   "scope": "offline openid",
//   "token_type": "Bearer"
// }
