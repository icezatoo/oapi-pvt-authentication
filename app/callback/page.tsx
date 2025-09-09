'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import AuthorizedSection from '@/components/callback/authorized-section'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useOAuthConfigStore from '@/hooks/use-oauth-config'
import usePaotangAuth from '@/hooks/use-paotang-auth'
import { TokenResponse } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function CallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { config } = useOAuthConfigStore()
  const { postExchangeToken } = usePaotangAuth()
  // const { exchangeToken: exchangeNextPassToken, getProfile: getNextPassProfile } = useNextPassAuth()

  const [error, setError] = useState<string | null>(null)
  const [tokenData, setTokenData] = useState<TokenResponse | null>(null)
  // const [profile, setProfile] = useState<UserProfile | null>(null)
  // const [copied, setCopied] = useState(false)

  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const mutationExchangePaotang = useMutation({
    mutationFn: async () => {
      const result = await postExchangeToken(config, code || '', state || undefined)
      return result
    },
    // onSuccess: (data) => {
    //   if (data?.access_token) {
    //     setTokenData(data || '')
    //     toast.success('Access token generated successfully!')
    //   } else {
    //     toast.success('App to app authentication successful!')
    //   }
    // },
    onError: (error) => {
      toast.error('Token exchange failed!')
      setError(error.message)
    },
  })

  const handleExchangeToken = () => {
    if (!code) {
      setError('Authorization code not found in callback URL')
      return
    }
    mutationExchangePaotang.mutate()
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <AuthorizedSection isLoading={mutationExchangePaotang.isPending} config={config} code={code} state={state} handleBack={() => router.push('/')} handleExchangeToken={handleExchangeToken} />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="break-all">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Token Information */}
        {/* <Card>
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
        </Card> */}

        {/* User Profile */}
        {/* <Card>
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
        </Card> */}
      </div>
    </div>
  )
}
