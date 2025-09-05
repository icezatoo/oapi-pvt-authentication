import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthType, OAuthConfig } from '@/types/oauth'
import { Shield } from 'lucide-react'
import { FC } from 'react'

type AuthenticationProviderProps = {
  authType: AuthType
  changeAuthType: (type: AuthType) => void
}

const KEY_AUTH_TYPE = 'authType' as const

const providers = ['paotang', 'nextpass']

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ authType, changeAuthType }) => {
  return (
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
            {authType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((type) => (
            <div
              key={type}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${authType === type ? 'border-primary bg-primary/5 shadow-md' : 'border-muted hover:border-border hover:bg-muted/50'}`}
              onClick={() => changeAuthType(type as AuthType)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium capitalize">{type} Authentication</h3>
                  <p className="text-sm text-muted-foreground">{type === 'paotang' ? '3-LEGGED Paotang Authentication' : '3-LEGGED Nextpass Authentication'}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${authType === type ? 'border-primary bg-primary' : 'border-muted'}`}>
                  {authType === type && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default AuthenticationProvider
