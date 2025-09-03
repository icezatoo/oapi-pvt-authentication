import { AuthType, Scopes } from '@/types/oauth'
import { useEffect, useState } from 'react'

const nextPass: Scopes[] = [
  { id: 'anonymous', name: 'Next Anonymous', description: 'Access to user anonymous information', required: false },
  { id: 'paotangid.citizen', name: 'Citizen', description: 'Access to user citizen information', required: false },
  { id: 'paotangid.title', name: 'Title', description: 'Access to user title information', required: false },
  { id: 'paotangid.fullname_th', name: 'Fullname Th', description: 'Access to user fullname_th information', required: false },
  { id: 'paotangid.fullname_en', name: 'Fullname En', description: 'Access to user fullname_en information', required: false },
  { id: 'paotangid.gender', name: 'Gender', description: 'Access to user gender information', required: false },
  { id: 'paotangid.birthdate', name: 'Birthdate', description: 'Access to user birthdate information', required: false },
  { id: 'paotangid.citizen_card_details', name: 'Citizen Card Details', description: 'Access to user citizen_card_details information', required: false },
  { id: 'paotangid.mobile', name: 'Mobile', description: 'Access to user mobile information', required: false },
  { id: 'paotangid.email', name: 'Email', description: 'Access to user email information', required: false },
  { id: 'paotangid.legal_address', name: 'Legal Address', description: 'Access to user legal_address information', required: false },
  { id: 'paotangid.mailing_address', name: 'Mailing Address', description: 'Access to user mailing_address information', required: false },
  { id: 'paotangid.office_address', name: 'Office Address', description: 'Access to user office_address information', required: false },
  { id: 'paotangid.work_profile', name: 'Work Profile', description: 'Access to user work_profile information', required: false },
  { id: 'paotangid.selfie_image', name: 'Selfie Image', description: 'Access to user selfie_image information', required: false },
]
const paotang: Scopes[] = [
  { id: 'anonymous', name: 'Anonymous', description: 'Access to user anonymous information', required: false },
  { id: 'paotangid.citizen', name: 'Citizen', description: 'Access to user citizen information', required: false },
  { id: 'paotangid.title', name: 'Title', description: 'Access to user title information', required: false },
  { id: 'paotangid.fullname_th', name: 'Fullname Th', description: 'Access to user fullname_th information', required: false },
  { id: 'paotangid.fullname_en', name: 'Fullname En', description: 'Access to user fullname_en information', required: false },
  { id: 'paotangid.gender', name: 'Gender', description: 'Access to user gender information', required: false },
  { id: 'paotangid.birthdate', name: 'Birthdate', description: 'Access to user birthdate information', required: false },
  { id: 'paotangid.citizen_card_details', name: 'Citizen Card Details', description: 'Access to user citizen_card_details information', required: false },
  { id: 'paotangid.mobile', name: 'Mobile', description: 'Access to user mobile information', required: false },
  { id: 'paotangid.email', name: 'Email', description: 'Access to user email information', required: false },
  { id: 'paotangid.legal_address', name: 'Legal Address', description: 'Access to user legal_address information', required: false },
  { id: 'paotangid.mailing_address', name: 'Mailing Address', description: 'Access to user mailing_address information', required: false },
  { id: 'paotangid.office_address', name: 'Office Address', description: 'Access to user office_address information', required: false },
  { id: 'paotangid.work_profile', name: 'Work Profile', description: 'Access to user work_profile information', required: false },
  { id: 'paotangid.selfie_image', name: 'Selfie Image', description: 'Access to user selfie_image information', required: false },
]

const useScopes = (provider: AuthType) => {
  const [scopes, setScopes] = useState<Scopes[]>([])

  useEffect(() => {
    if (provider === 'nextpass') {
      setScopes(nextPass)
    } else if (provider === 'paotang') {
      setScopes(paotang)
    }
  }, [provider])

  return {
    scopes,
  }
}

export default useScopes
