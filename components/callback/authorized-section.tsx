import useCopy from '@/hooks/use-copy'
import { OAuthConfig } from '@/types/oauth'
import { CheckCircle2, Copy, Loader2Icon } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

type AuthorizedSectionProps = {
  isLoading: boolean
  config: OAuthConfig
  code: string | null
  state: string | null
  handleBack: () => void
  handleExchangeToken?: () => void
}

const AuthorizedSection: FC<AuthorizedSectionProps> = ({ isLoading, config, code, state, handleBack, handleExchangeToken }: AuthorizedSectionProps) => {
  const { copyToClipboard } = useCopy()

  const handleCopyURL = () => {
    const url = window.location.href
    copyToClipboard(url)
  }

  return (
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
          <Button variant="outline" onClick={handleBack}>
            Back to Home
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-muted-foreground">Authorized Code</h4>
          <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
            <code className="text-xs truncate flex-1">{code}</code>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(code || '')}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          <h4 className="text-sm font-medium text-muted-foreground">State Parameter</h4>
          <div className="flex items-center justify-between p-2 bg-muted rounded-md mt-1">
            <code className="text-xs truncate flex-1">{state}</code>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => copyToClipboard(state || '')}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <Button className="w-full" onClick={handleExchangeToken}>
          {isLoading && <Loader2Icon className="animate-spin" />}
          Exchange Token
        </Button>
        <Button variant="secondary" className="w-full" onClick={() => handleCopyURL()}>
          Copy URL for Desktop
        </Button>
      </CardContent>
    </Card>
  )
}

export default AuthorizedSection
