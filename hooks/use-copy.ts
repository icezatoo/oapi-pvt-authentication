import { toast } from 'sonner'

const useCopy = () => {
  const copyToClipboard = async (text: string) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }

  return { copyToClipboard }
}

export default useCopy
