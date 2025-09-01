'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Settings, Shield, Key, Users, ExternalLink, CheckCircle, AlertCircle, Copy, Lock } from 'lucide-react'

type AuthType = 'paotang' | 'nextpass'

interface OAuthConfig {
  authType: AuthType
  environment: 'development' | 'staging' | 'production'
  clientId: string
  clientSecret: string
  redirectUri: string
  scope: string[]
  authUrl: string
  tokenUrl: string
  // Authentication Settings
  requireMFA: boolean
  sessionTimeout: number
  tokenExpiry: number
  allowRefreshToken: boolean
  requirePKCE: boolean
}

const defaultScopes = [
  { id: 'read', name: 'Read', description: 'Read access to user data', required: true },
  { id: 'write', name: 'Write', description: 'Write access to user data', required: false },
  { id: 'profile', name: 'Profile', description: 'Access to user profile information', required: true },
  { id: 'email', name: 'Email', description: 'Access to user email address', required: false },
]

const environmentDetails = {
  development: { color: 'bg-blue-500', label: 'Development', description: 'For development and testing' },
  staging: { color: 'bg-orange-500', label: 'Staging', description: 'Pre-production environment' },
  production: { color: 'bg-green-500', label: 'Production', description: 'Live production environment' },
}
export function OAuthConfiguration() {
  const [config, setConfig] = useState<OAuthConfig>({
    authType: 'paotang',
    environment: 'development',
    clientId: '',
    clientSecret: '',
    redirectUri: '',
    scope: ['read', 'profile'],
    authUrl: '',
    tokenUrl: '',
    // Authentication Settings
    requireMFA: false,
    sessionTimeout: 3600, // 1 hour in seconds
    tokenExpiry: 86400, // 24 hours in seconds
    allowRefreshToken: true,
    requirePKCE: true,
  })

  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleScopeToggle = (scopeId: string) => {
    const scope = defaultScopes.find((s) => s.id === scopeId)
    if (scope?.required) return // Don't allow toggling required scopes

    setConfig((prev) => ({
      ...prev,
      scope: prev.scope.includes(scopeId) ? prev.scope.filter((s) => s !== scopeId) : [...prev.scope, scopeId],
    }))
  }

  const updateConfig = (field: keyof OAuthConfig, value: string | string[]) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
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

  const isFormValid = config.clientId && config.clientSecret && config.redirectUri

  // Calculate completion progress
  const getCompletionProgress = () => {
    const fields = [config.clientId, config.clientSecret, config.redirectUri, config.authUrl, config.tokenUrl]
    const completedFields = fields.filter(Boolean).length
    return Math.round((completedFields / fields.length) * 100)
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
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Authentication Provider</CardTitle>
                  <CardDescription>Choose your authentication system</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="capitalize">
                {config.authType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['paotang', 'nextpass'] as const).map((type) => (
                <div
                  key={type}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.authType === type ? 'border-primary bg-primary/5 shadow-md' : 'border-muted hover:border-border hover:bg-muted/50'
                  }`}
                  onClick={() => updateConfig('authType', type)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium capitalize">{type} Authentication</h3>
                      <p className="text-sm text-muted-foreground">{type === 'paotang' ? 'Enterprise OAuth 2.0 provider' : 'Next-generation auth system'}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${config.authType === type ? 'border-primary bg-primary' : 'border-muted'}`}>
                      {config.authType === type && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Enhanced Environment Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>Select your deployment environment</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.entries(environmentDetails) as [keyof typeof environmentDetails, (typeof environmentDetails)[keyof typeof environmentDetails]][]).map(([env, details]) => (
                <div
                  key={env}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.environment === env ? 'border-primary bg-primary/5 shadow-md' : 'border-muted hover:border-border hover:bg-muted/50'
                  }`}
                  onClick={() => updateConfig('environment', env)}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-4 h-4 rounded-full mx-auto ${details.color}`} />
                    <div>
                      <p className="font-medium">{details.label}</p>
                      <p className="text-xs text-muted-foreground">{details.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Enhanced Client Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Client Configuration</CardTitle>
                <CardDescription>Configure your OAuth client credentials and endpoints</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-id" className="flex items-center justify-between">
                  Client ID
                  {config.clientId && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(config.clientId)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </Label>
                <Input id="client-id" placeholder="Enter your OAuth client ID" value={config.clientId} onChange={(e) => updateConfig('clientId', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-secret">Client Secret</Label>
                <Input id="client-secret" type="password" placeholder="Enter your OAuth client secret" value={config.clientSecret} onChange={(e) => updateConfig('clientSecret', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="redirect-uri" className="flex items-center justify-between">
                Redirect URI
                {config.redirectUri && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(config.redirectUri)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                )}
              </Label>
              <Input id="redirect-uri" placeholder="https://your-app.com/auth/callback" value={config.redirectUri} onChange={(e) => updateConfig('redirectUri', e.target.value)} />
              <p className="text-xs text-muted-foreground">This URL must be registered in your OAuth provider settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auth-url">Authorization URL</Label>
                <Input id="auth-url" placeholder={`https://${config.authType}.auth.com/oauth/authorize`} value={config.authUrl} onChange={(e) => updateConfig('authUrl', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-url">Token URL</Label>
                <Input id="token-url" placeholder={`https://${config.authType}.auth.com/oauth/token`} value={config.tokenUrl} onChange={(e) => updateConfig('tokenUrl', e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Enhanced Permissions & Scopes */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Permissions & Scopes</CardTitle>
                <CardDescription>Configure what data your application can access</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Enabled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultScopes.map((scope) => (
                  <TableRow key={scope.id}>
                    <TableCell className="font-medium">{scope.name}</TableCell>
                    <TableCell className="text-muted-foreground">{scope.description}</TableCell>
                    <TableCell>
                      {scope.required ? (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Switch checked={config.scope.includes(scope.id)} onCheckedChange={() => handleScopeToggle(scope.id)} disabled={scope.required} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
                  <span className={`w-2 h-2 rounded-full ${environmentDetails[config.environment].color}`} />
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
                <div className="text-sm font-medium">{config.scope.length} selected</div>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">Enabled Permissions</Label>
              <div className="flex flex-wrap gap-2">
                {config.scope.map((scopeId) => {
                  const scope = defaultScopes.find((s) => s.id === scopeId)
                  return scope ? (
                    <Badge key={scopeId} variant="secondary" className="text-xs">
                      {scope.name}
                      {scope.required && <span className="ml-1 text-xs">*</span>}
                    </Badge>
                  ) : null
                })}
                {config.scope.length === 0 && <span className="text-sm text-muted-foreground">No permissions selected</span>}
              </div>
              <p className="text-xs text-muted-foreground">* Required permissions</p>
            </div>
          </CardContent>
        </Card>
        {/* Enhanced Action Buttons */}
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button variant="outline" type="button" onClick={testConnection} disabled={!isFormValid || isTestingConnection} className="flex-1 lg:flex-none">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {isTestingConnection ? 'Testing...' : 'Test Connection'}
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setConnectionStatus('idle')
                  }}
                  className="flex-1 lg:flex-none"
                >
                  Reset Configuration
                </Button>
              </div>{' '}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button variant="outline" type="button" className="flex-1 lg:flex-none">
                  Save as Draft
                </Button>
                <Button type="submit" disabled={!isFormValid} className="flex-1 lg:flex-none min-w-[160px]">
                  {isFormValid ? 'Deploy Configuration' : 'Complete Required Fields'}
                </Button>
              </div>
            </div>

            {!isFormValid && (
              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Configuration Incomplete</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Please fill in all required fields: Client ID, Client Secret, and Redirect URI.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
