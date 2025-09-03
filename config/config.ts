import { Environment, EnvironmentDetails, TypeDetails } from '@/types/oauth'

export const ENVIRONMENT_CONFIG: Record<Environment, EnvironmentDetails> = {
  development: {
    color: 'bg-blue-500',
    label: 'Development',
    description: 'For development and testing',
  },
  uat: {
    color: 'bg-yellow-500',
    label: 'UAT',
    description: 'User Acceptance Testing environment',
  },
  staging: {
    color: 'bg-orange-500',
    label: 'Staging',
    description: 'Pre-production environment',
  },
  production: {
    color: 'bg-green-500',
    label: 'Production',
    description: 'Live production environment',
  },
} as const

export const TYPE_CONFIG: Record<string, TypeDetails> = {
  public: {
    color: 'bg-purple-500',
    label: 'Public',
    description: 'Public client configuration',
  },
  sandbox: {
    color: 'bg-cyan-500',
    label: 'Sandbox',
    description: 'Sandbox testing environment',
  },
} as const
