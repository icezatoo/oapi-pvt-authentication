import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ENVIRONMENT_CONFIG, TYPE_CONFIG } from '@/config/config'
import { ApplicationType, Environment, EnvironmentDetails, OAuthConfig, TypeDetails } from '@/types/oauth'
import { Settings } from 'lucide-react'
import { FC } from 'react'
import { Label } from '../ui/label'

interface EnvironmentConfigProps {
  environment: Environment
  type: ApplicationType
  updateField: (field: keyof OAuthConfig, value: string | string[]) => void
}

const EnvironmentOption: FC<{
  env: Environment
  details: EnvironmentDetails
  isSelected: boolean
  onSelect: (env: Environment) => void
}> = ({ env, details, isSelected, onSelect }) => {
  const baseClasses = 'p-4 border-2 rounded-lg cursor-pointer transition-all text-center space-y-3'
  const selectedClasses = 'border-primary bg-primary/5 shadow-md'
  const unselectedClasses = 'border-muted hover:border-border hover:bg-muted/50'

  const classes = `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`

  return (
    <div
      className={classes}
      onClick={() => onSelect(env)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(env)
        }
      }}
      aria-pressed={isSelected}
    >
      <div className={`w-4 h-4 rounded-full mx-auto ${details.color}`} />
      <div>
        <p className="font-medium">{details.label}</p>
        <p className="text-xs text-muted-foreground">{details.description}</p>
      </div>
    </div>
  )
}

const TypeOption: FC<{
  type: string
  details: TypeDetails
  isSelected: boolean
  onSelect: (type: string) => void
}> = ({ type, details, isSelected, onSelect }) => {
  const baseClasses = 'p-4 border-2 rounded-lg cursor-pointer transition-all text-center space-y-3'
  const selectedClasses = 'border-primary bg-primary/5 shadow-md'
  const unselectedClasses = 'border-muted hover:border-border hover:bg-muted/50'

  const classes = `${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`

  return (
    <div
      className={classes}
      onClick={() => onSelect(type)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(type)
        }
      }}
      aria-pressed={isSelected}
    >
      <div className={`w-4 h-4 rounded-full mx-auto ${details.color}`} />
      <div>
        <p className="font-medium">{details.label}</p>
        <p className="text-xs text-muted-foreground">{details.description}</p>
      </div>
    </div>
  )
}

const EnvironmentConfig: FC<EnvironmentConfigProps> = ({ environment, type = 'public', updateField }) => {
  const handleEnvironmentSelect = (env: Environment) => {
    updateField('environment', env)
  }

  const handleTypeSelect = (selectedType: string) => {
    updateField('type' as keyof OAuthConfig, selectedType)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>Select your deployment environment and type</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environment Section */}
        <div className="space-y-3">
          <Label htmlFor="environment" className="flex items-center justify-between">
            Environment
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(ENVIRONMENT_CONFIG).map(([env, details]) => (
              <EnvironmentOption key={env} env={env as Environment} details={details} isSelected={environment === env} onSelect={handleEnvironmentSelect} />
            ))}
          </div>
        </div>

        {/* Type Section */}
        <div className="space-y-3">
          <Label htmlFor="type" className="flex items-center justify-between">
            Type
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(TYPE_CONFIG).map(([typeKey, details]) => (
              <TypeOption key={typeKey} type={typeKey} details={details} isSelected={type === typeKey} onSelect={handleTypeSelect} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EnvironmentConfig
