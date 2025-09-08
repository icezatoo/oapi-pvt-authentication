'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QrCode, Smartphone } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useState } from 'react'

interface ActionButtonsProps {
  isFormValid: boolean
  onReset: () => void
  onQrCodeAuth: () => void
  onAppToAppAuth: () => void
}

export function ActionButtons({ isFormValid, onReset, onQrCodeAuth, onAppToAppAuth }: ActionButtonsProps) {
  const [showResetDialog, setShowResetDialog] = useState(false)

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button variant="outline" type="button" disabled={!isFormValid} onClick={onQrCodeAuth} className="flex-1 lg:flex-none">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code Auth
              </Button>
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
      </CardContent>
    </Card>
  )
}
