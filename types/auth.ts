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

// export interface UserProfile {
//   sub: string
//   name?: string
//   given_name?: string
//   family_name?: string
//   middle_name?: string
//   nickname?: string
//   preferred_username?: string
//   profile?: string
//   picture?: string
//   website?: string
//   email?: string
//   email_verified?: boolean
//   gender?: string
//   birthdate?: string
//   zoneinfo?: string
//   locale?: string
//   phone_number?: string
//   phone_number_verified?: boolean
//   address?: {
//     formatted?: string
//     street_address?: string
//     locality?: string
//     region?: string
//     postal_code?: string
//     country?: string
//   }
//   updated_at?: number
//   [key: string]: any
// }
