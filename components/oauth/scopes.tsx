import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useScopes from '@/hooks/use-scopes'
import { AuthType } from '@/types/oauth'
import { Users } from 'lucide-react'

type ScopesProps = {
  authType: AuthType
  selectedScopes: string[]
  updateScopes: (scopes: string[]) => void
}

const Scopes = ({ authType, selectedScopes, updateScopes }: ScopesProps) => {
  const { scopes } = useScopes(authType)

  const handleScopeToggle = (scopeId: string) => {
    const scope = scopes?.find((s) => s.id === scopeId)
    if (scope?.required) return // Don't allow toggling required scopes
    const updatedScopes = selectedScopes.includes(scopeId) ? selectedScopes.filter((s) => s !== scopeId) : [...selectedScopes, scopeId]
    updateScopes(updatedScopes)
  }

  return (
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
            {scopes?.map((scope) => (
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
                  <Switch checked={selectedScopes.includes(scope.id)} onCheckedChange={() => handleScopeToggle(scope.id)} disabled={scope.required} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Scopes
