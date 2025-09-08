'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Check, Copy, ExternalLink, QrCode, RefreshCw, Smartphone, XCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface ActionButtonsProps {
  isFormValid: boolean
  isNextPass: boolean
  isLoading?: boolean
  error?: string | null
  onReset: () => void
  onQrCodeAuth: () => void
  onAppToAppAuth: () => void
  deepLink?: string
}

export function ActionButtons({ isFormValid, isNextPass, isLoading = false, error = null, onReset, onQrCodeAuth, onAppToAppAuth, deepLink }: ActionButtonsProps) {
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const deepLinkRef = useRef<HTMLTextAreaElement>(null)

  const copyToClipboard = () => {
    if (!deepLink) return

    navigator.clipboard
      .writeText(deepLink)
      .then(() => {
        setCopied(true)
        toast.success('Deep link copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard')
      })
  }

  const openInApp = () => {
    if (!deepLink) return

    // Try to open the deep link
    window.location.href = deepLink

    // Fallback in case the app is not installed
    setTimeout(() => {
      window.open(deepLink, '_blank')
    }, 500)
  }

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {!isNextPass && (
                <Button variant="outline" type="button" disabled={!isFormValid} onClick={onQrCodeAuth} className="flex-1 lg:flex-none">
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code Auth
                </Button>
              )}
              <Button variant="outline" type="button" disabled={!isFormValid} onClick={onAppToAppAuth} className="flex-1 lg:flex-none">
                <Smartphone className="h-4 w-4 mr-2" />
                App-to-App Auth
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button variant="ghost" type="button" onClick={() => setShowResetDialog(true)} className="flex-1 lg:flex-none">
              Reset Configuration
            </Button>
          </div>
        </div>

        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Configuration</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to reset the configuration? This will clear all fields and cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  onReset()
                  setShowResetDialog(false)
                }}
              >
                Reset Configuration
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Deep Link Result Section */}
        {(deepLink || isLoading || error) && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{error ? 'Error' : 'Deep Link'}</h3>
              <div className="flex gap-2">
                {isLoading ? (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    <span>Generating deep link...</span>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!deepLink} className="h-8 px-3">
                      {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="default" size="sm" onClick={openInApp} disabled={!deepLink} className="h-8 px-3">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Open in App
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              {error ? (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Failed to generate deep link</h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex h-[60px] w-full items-center justify-center rounded-md border border-input bg-muted/50">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <textarea
                  ref={deepLinkRef}
                  value={deepLink || ''}
                  readOnly
                  className={cn(
                    'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
                    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                    'disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden',
                    'font-mono text-xs'
                  )}
                  rows={3}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
