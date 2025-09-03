import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useScopes from '@/hooks/use-scopes'
import { AuthType } from '@/types/oauth'
import { Check, Users, X } from 'lucide-react'

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

  // Get all optional scope IDs
  const optionalScopeIds = scopes?.filter(scope => !scope.required).map(scope => scope.id) || []
  const allOptionalSelected = optionalScopeIds.length > 0 && optionalScopeIds.every(id => selectedScopes.includes(id))
  const someOptionalSelected = optionalScopeIds.some(id => selectedScopes.includes(id)) && !allOptionalSelected

  const handleSelectAll = () => {
    const requiredScopeIds = scopes?.filter(scope => scope.required).map(scope => scope.id) || []
    updateScopes([...new Set([...requiredScopeIds, ...optionalScopeIds])])
  }

  const handleDeselectAll = () => {
    const requiredScopeIds = scopes?.filter(scope => scope.required).map(scope => scope.id) || []
    updateScopes([...requiredScopeIds])
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
      <CardContent className="space-y-4">
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDeselectAll}
            disabled={!someOptionalSelected && !allOptionalSelected}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1.5" />
            Deselect All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSelectAll}
            disabled={allOptionalSelected}
            className="h-8"
          >
            <Check className="h-4 w-4 mr-1.5" />
            Select All
          </Button>
        </div>
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
