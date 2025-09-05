'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ENVIRONMENT_CONFIG } from '@/config/config'
import useAuth from '@/hooks/use-auth'
import useOAuthConfig from '@/hooks/use-oauth-config'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ActionButtons } from './oauth/action-buttons'
import AuthenticationProvider from './oauth/authentication-provider'
import AuthenticationSettings from './oauth/authentication-settings'
import ClientConfig from './oauth/client-config'
import EnvironmentConfig from './oauth/environment-config'
import Scopes from './oauth/scopes'
export function OAuthConfiguration() {
  const { config, updateField, updateScopes, resetConfig: resetConfigHook, saveToStorage, clearStorage, changeAuthType } = useOAuthConfig()
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { qrAuth, fetchApp2AppAuth } = useAuth()

  const mutation = useMutation({
    mutationFn: () => {
      return fetchApp2AppAuth(config)
    },
    onSuccess: () => {
      toast.success('App to app authentication successful!')
    },
    onError: () => {
      toast.error('App to app authentication failed!')
    },
  })

  const testConnection = async () => {
    setIsTestingConnection(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setConnectionStatus('success')
    } catch {
      setConnectionStatus('error')
    } finally {
      setIsTestingConnection(false)
      setTimeout(() => setConnectionStatus('idle'), 3000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('OAuth Configuration:', config)
  }

  const isFormValid = config.clientId !== '' && config.clientSecret !== '' && config.redirectUri !== '' && config.endpoint !== ''

  // Calculate completion progress
  const getCompletionProgress = () => {
    const fields = [config.clientId, config.clientSecret, config.redirectUri, config.endpoint]
    const completedFields = fields.filter(Boolean).length
    return Math.round((completedFields / fields.length) * 100)
  }

  const handleQrAuth = () => {
    handleSave()
    qrAuth(config)
  }

  const handleAppToAppAuth = () => {
    mutation.mutate()
  }

  const handleSave = () => {
    const success = saveToStorage()
    if (success) {
      toast.success('Configuration saved as draft successfully!')
    } else {
      toast.error('Failed to save configuration. Please try again.')
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      {/* Enhanced Header with Status */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-bold tracking-tight">OAuth Configuration</h1>
          {connectionStatus === 'success' && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
          {connectionStatus === 'error' && (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              Error
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">Configure your OAuth environment settings and client credentials for seamless authentication integration</p>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Configuration Progress</span>
            <span className="font-medium">{getCompletionProgress()}%</span>
          </div>
          <Progress value={getCompletionProgress()} className="h-2" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {' '}
        {/* Enhanced Authentication Type Selection */}
        <AuthenticationProvider authType={config.authType} changeAuthType={changeAuthType} />
        {/* Enhanced Environment Configuration */}
        <EnvironmentConfig environment={config.environment} authType={config.authType} endpoint={config.endpoint} type={config.type} updateField={updateField} />
        {/* Enhanced Client Configuration */}
        <ClientConfig clientId={config.clientId} redirectUri={config.redirectUri} clientSecret={config.clientSecret} updateField={updateField} />
        {/* Enhanced Authentication Settings */}
        <AuthenticationSettings selectedACR={config.acr} selectedPrompt={config.prompt} updateField={updateField} />
        {/* Enhanced Permissions & Scopes */}
        <Scopes authType={config.authType} selectedScopes={config.scopes} updateScopes={updateScopes} />
        {/* Enhanced Configuration Summary */}
        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Configuration Summary
              <Badge variant={isFormValid ? 'default' : 'secondary'}>{isFormValid ? 'Ready' : 'Incomplete'}</Badge>
            </CardTitle>
            <CardDescription>Review your OAuth configuration before saving</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Auth Provider</Label>
                <div className="text-sm font-medium capitalize flex items-center gap-2">
                  {config.authType}
                  <Badge variant="outline" className="text-xs">
                    {config.authType === 'paotang' ? 'Enterprise' : 'Modern'}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Environment</Label>
                <div className="text-sm font-medium capitalize flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${ENVIRONMENT_CONFIG[config.environment].color}`} />
                  {config.environment}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Client Status</Label>
                <div className="text-sm font-medium flex items-center gap-2">
                  {config.clientId && config.clientSecret ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Configured
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      Pending
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Active Scopes</Label>
                <div className="text-sm font-medium">{config.scopes.length} selected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Action Buttons */}
        {!isFormValid && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Configuration Incomplete</p>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Please fill in all required fields: Client ID, Client Secret, and Redirect URI.</p>
              </div>
            </div>
          </div>
        )}
        <ActionButtons
          isFormValid={isFormValid}
          onReset={() => {
            clearStorage()
            resetConfigHook()
            setConnectionStatus('idle')
          }}
          onSave={() => handleSave()}
          onQrCodeAuth={() => handleQrAuth()}
          onAppToAppAuth={() => handleAppToAppAuth()}
        />
      </form>
    </div>
  )
}
