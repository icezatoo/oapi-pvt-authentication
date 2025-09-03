import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OAuthConfig } from '@/types/oauth'
import { Key, Eye, EyeOff, X } from 'lucide-react'
import { FC, useState } from 'react'

interface ClientConfigProps {
  clientId: string
  clientSecret: string
  redirectUri: string
  updateConfig: (field: keyof OAuthConfig, value: string | string[]) => void
}

const ClientConfig: FC<ClientConfigProps> = ({ clientId, redirectUri, clientSecret, updateConfig }) => {
  const [showClientSecret, setShowClientSecret] = useState(false)

  const toggleClientSecretVisibility = () => {
    setShowClientSecret((prev) => !prev)
  }

  const handleInputChange = (field: keyof OAuthConfig, value: string) => {
    updateConfig(field, value)
  }

  const clearInput = (field: keyof OAuthConfig) => {
    updateConfig(field, '')
  }

  return (
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
            </Label>
            <Input id="client-id" placeholder="Enter your OAuth client ID" value={clientId} onChange={(e) => handleInputChange('clientId', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-secret">Client Secret</Label>
            <div className="relative">
              <Input
                id="client-secret"
                type={showClientSecret ? 'text' : 'password'}
                placeholder="Enter your OAuth client secret"
                value={clientSecret}
                onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={toggleClientSecretVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showClientSecret ? 'Hide client secret' : 'Show client secret'}
              >
                {showClientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="redirect-uri" className="flex items-center justify-between">
            Redirect URI
          </Label>
          <div className="relative">
            <Input id="redirect-uri" placeholder="https://your-app.com/auth/callback" value={redirectUri} onChange={(e) => handleInputChange('redirectUri', e.target.value)} className="pr-10" />
            {redirectUri && (
              <button
                type="button"
                onClick={() => clearInput('redirectUri')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear redirect URI"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">This URL must be registered in your OAuth provider settings</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientConfig
