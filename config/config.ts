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

export const ENDPOINT_CONFIG: Record<string, Record<string, Record<string, Record<string, string>>>> = {
  paotang: {
    paotangid: {
      development: {
        sandbox: 'https://paotang-id-sandbox-external-sit.th-service.co.in',
        public: 'https://paotang-id-external-sit.th-service.co.in',
      },
      uat: {
        sandbox: 'https://paotang-id-sandbox-external-uat.th-service.co.in',
        public: 'https://paotang-id-external-uat.th-service.co.in',
      },
      production: {
        sandbox: 'https://paotang-id-sandbox.devops.krungthai.com',
        public: 'https://paotang-id.devops.krungthai.com',
      },
    },
    paotangpass: {
      development: {
        sandbox: 'https://paotang-pass-sandbox-external-sit.th-service.co.in',
        public: 'https://paotang-pass-external-sit.th-service.co.in',
      },
      uat: {
        sandbox: 'https://paotang-pass-sandbox-external-uat.th-service.co.in',
        public: 'https://paotang-pass-external-uat.th-service.co.in',
      },
      production: {
        sandbox: 'https://paotang-pass-sandbox.devops.krungthai.com',
        public: 'https://paotang-pass.devops.krungthai.com',
      },
    },
  },
  nextpass: {
    default: {
      development: {
        sandbox: '',
        public: 'https://oapi-3-legged-external-gw-sit.arisetech.dev',
      },
      uat: {
        sandbox: '',
        public: 'https://oapi-3-legged-external-gw-uat.arisetech.dev',
      },
      production: {
        sandbox: '',
        public: 'https://oapi-3-legged-external-gw.arisetech.dev',
      },
    },
  },
}

export const QR_CONFIG: Record<string, Record<string, Record<string, Record<string, string>>>> = {
  paotang: {
    paotangid: {
      development: {
        sandbox: 'https://paotang-id-sandbox-external-sit.th-service.co.in',
        public: 'https://paotang-id-external-sit.th-service.co.in',
      },
      uat: {
        sandbox: 'https://paotang-pass-web-uat.th-service.co.in',
        public: 'https://paotang-pass-web-uat.th-service.co.in',
      },
      production: {
        sandbox: 'https://paotang-id-sandbox.devops.krungthai.com',
        public: 'https://paotang-id.devops.krungthai.com',
      },
    },
    paotangpass: {
      development: {
        sandbox: 'https://paotang-pass-sandbox-external-sit.th-service.co.in',
        public: 'https://paotang-pass-external-sit.th-service.co.in',
      },
      uat: {
        sandbox: 'https://paotang-pass-web-uat.th-service.co.in',
        public: 'https://paotang-pass-web-uat.th-service.co.in',
      },
      production: {
        sandbox: 'https://paotang-pass-sandbox.devops.krungthai.com',
        public: 'https://paotang-pass.devops.krungthai.com',
      },
    },
  },
}
