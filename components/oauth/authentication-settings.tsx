import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import { OAuthConfig } from '@/types/oauth'
import { Label } from '../ui/label'

type AuthenticationSettingsProps = {
  selectedACR: string
  selectedPrompt: string
  updateConfig: (field: keyof OAuthConfig, value: string) => void
}

const acrOptions = [
  {
    id: 'PIN',
    label: 'PIN',
    description: 'Personal identification number',
    color: 'bg-blue-500',
  },
  {
    id: 'ALL',
    label: 'PIN + Face Comparison',
    description: 'Enhanced biometric security',
    color: 'bg-purple-500',
  },
]

const promptOptions = [
  {
    id: '',
    label: 'None',
    description: 'No authentication prompt',
    color: 'bg-gray-500',
  },
  {
    id: 'LOGIN',
    label: 'Login',
    description: 'Standard login prompt',
    color: 'bg-green-500',
  },
]

const AuthenticationSettings = ({ selectedACR, selectedPrompt, updateConfig }: AuthenticationSettingsProps) => {
  const handleACRChange = (acrId: string) => {
    updateConfig('acr', acrId)
  }

  const handlePromptChange = (promptId: string) => {
    updateConfig('prompt', promptId)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Authentication Settings</CardTitle>
            <CardDescription>Configure authentication requirements</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* ACR Section */}

        <div className="space-y-4">
          <Label htmlFor="acr" className="flex items-center justify-between">
            ACR (Authentication Context Reference)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {acrOptions.map((option) => (
              <label
                key={option.id}
                className={`relative flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedACR === option.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-muted hover:border-border hover:bg-muted/50'
                }`}
              >
                <input type="radio" name="acr" value={option.id} checked={selectedACR === option.id} onChange={() => handleACRChange(option.id)} className="sr-only" />

                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-4 h-4 rounded-full ${option.color}`} />
                  <div className="text-center">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs mt-1">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Prompt Section */}
        <div className="space-y-4">
          <Label htmlFor="prompt" className="flex items-center justify-between">
            Prompt
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promptOptions.map((option) => (
              <label
                key={option.id}
                className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPrompt === option.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-muted hover:border-border hover:bg-muted/50'
                }`}
              >
                <input type="radio" name="prompt" value={option.id} checked={selectedPrompt === option.id} onChange={() => handlePromptChange(option.id)} className="sr-only" />

                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                  <div className="text-center">
                    <div className="font-medium text-xs">{option.label}</div>
                    <div className="text-xs mt-0.5">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthenticationSettings
