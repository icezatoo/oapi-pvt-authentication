'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useState } from 'react'
import { LoadingPage } from '@/components/ui/loading'

import AuthorizedSection from '@/components/callback/authorized-section'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useCopy from '@/hooks/use-copy'
import useNextPassAuth from '@/hooks/use-next-pass-auth'
import useOAuthConfigStore from '@/hooks/use-oauth-config'
import usePaotangAuth from '@/hooks/use-paotang-auth'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { json } from 'stream/consumers'

function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { config } = useOAuthConfigStore()
  const { copyToClipboard } = useCopy()
  const { postExchangeToken, postProfile } = usePaotangAuth()
  const { postNextPassExchangeToken, postNextPassProfile } = useNextPassAuth()

  const [error, setError] = useState<string | null>(null)

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const {
    mutate,
    data: tokenExchange,
    isPending: isTokenExchangePending,
  } = useMutation({
    mutationFn: async () => {
      const result = config.authType === 'nextpass' ? await postNextPassExchangeToken(config, code || '', state || undefined) : await postExchangeToken(config, code || '', state || undefined)
      return result
    },
    onError: (error) => {
      toast.error('Token exchange failed!')
      setError(error.message)
    },
  })

  const {
    mutate: profileMutation,
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useMutation({
    mutationFn: async () => {
      const result = config.authType === 'nextpass' ? await postNextPassProfile(config, tokenExchange) : await postProfile(config, tokenExchange?.access_token || '')
      return result
    },
    onError: () => {
      toast.error('Profile retrieval failed!')
    },
  })

  const handleExchangeToken = () => {
    if (!code) {
      setError('Authorization code not found in callback URL')
      return
    }
    mutate()
  }

  const handleFetchProfile = useCallback(() => {
    if (tokenExchange?.access_token) {
      profileMutation()
    } else {
      toast.error('Please exchange token first')
    }
  }, [tokenExchange, profileMutation])

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <AuthorizedSection isLoading={isTokenExchangePending} config={config} code={code} state={state} handleBack={() => router.push('/')} handleExchangeToken={handleExchangeToken} />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="break-all">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Token Information */}
        <Card>
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
            <CardDescription>Your OAuth 2.0 token details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tokenExchange && (
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Access Token</h4>
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
                    <code className="text-xs truncate flex-1">{tokenExchange.access_token}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(tokenExchange?.access_token)}>
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {tokenExchange?.refresh_token && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Refresh Token</h4>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs truncate flex-1">{tokenExchange.refresh_token}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(tokenExchange?.refresh_token || '')}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Token Type</h4>
                    <div className="p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs">{tokenExchange.token_type || 'Bearer'}</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Expires In</h4>
                    <div className="p-2 bg-muted rounded-md mt-1">
                      <code className="text-xs">{tokenExchange.expires_in} seconds</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
            <Button onClick={handleFetchProfile}>Get Profile</Button>
          </CardHeader>
          <CardContent>
            {profile ? (
              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted/50 border p-4 rounded-lg overflow-auto text-sm font-mono max-h-96 pr-12">{JSON.stringify(profile, null, 2)}</pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background border shadow-sm"
                    onClick={() => copyToClipboard(JSON.stringify(profile, null, 2))}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No profile information available</p>
              </div>
            )}
            {profileError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">{profileError.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CallbackContent />
    </Suspense>
  )
}
