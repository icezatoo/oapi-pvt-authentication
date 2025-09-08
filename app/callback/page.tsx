'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Copy } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import useOAuthConfigStore from '@/hooks/use-oauth-config'
import { TokenResponse, UserProfile } from '@/types/auth'

export default function CallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { config } = useOAuthConfigStore()
  // const { exchangeToken: exchangePaotangToken, getProfile: getPaotangProfile } = usePaotangAuth()
  // const { exchangeToken: exchangeNextPassToken, getProfile: getNextPassProfile } = useNextPassAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tokenData, setTokenData] = useState<TokenResponse | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        if (!code) {
          throw new Error('Authorization code not found in callback URL')
        }

        setIsLoading(true)

        // Exchange code for token
        let tokenResponse
        // if (config.authType === 'paotang') {
        //   tokenResponse = await exchangePaotangToken(code, state || undefined)
        //   if (tokenResponse?.access_token) {
        //     const profileData = await getPaotangProfile(tokenResponse.access_token)
        //     setProfile(profileData)
        //   }
        // } else {
        //   tokenResponse = await exchangeNextPassToken(code, state || undefined)
        //   if (tokenResponse?.access_token) {
        //     const profileData = await getNextPassProfile(tokenResponse.access_token)
        //     setProfile(profileData)
        //   }
        // }

        // setTokenData(tokenResponse)
        setError(null)
      } catch (err) {
        console.error('Error handling callback:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    handleCallback()
  }, [searchParams, config.authType])

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium">Processing authorization...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              {`${config.authType == 'paotang' ? 'Paotang' : 'NextPass'} Authorization Failed`}
            </CardTitle>
            <CardDescription>There was an error processing your authorization.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="break-all">{error}</AlertDescription>
            </Alert>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => router.push('/')}>Back to Home</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-6 w-6" />
                {`${config.authType == 'paotang' ? 'Paotang' : 'NextPass'} Authorization Successful`}
              </CardTitle>
              <CardDescription>You have successfully authorized the application.</CardDescription>
            </div>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Token Information */}
        <Card>
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
            <CardDescription>Your OAuth 2.0 token details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tokenData && (
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Access Token</h4>
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
                    <code className="text-xs truncate flex-1">{tokenData.access_token}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(tokenData.access_token)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {tokenData.refresh_token && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Refresh Token</h4>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs truncate flex-1">{tokenData.refresh_token}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(tokenData.refresh_token)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Token Type</h4>
                    <div className="p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs">{tokenData.token_type || 'Bearer'}</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Expires In</h4>
                    <div className="p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs">{tokenData.expires_in} seconds</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            {profile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(profile).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</h4>
                      <div className="p-2 bg-muted rounded-md mt-1 break-words">
                        <p className="text-sm">{String(value)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No profile information available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
