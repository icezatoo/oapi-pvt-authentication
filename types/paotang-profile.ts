// Full Name interfaces
export interface FullNameTh {
  thaiFirstName?: string
  thaiLastName?: string
  thaiMiddleName?: string
}

export interface FullNameEn {
  engFirstName?: string
  engLastName?: string
  engMiddleName?: string
}

// ID Card Details interface
export interface IdCardDetails {
  dateOfIssue?: string
  dateOfExpiry?: string
  placeOfIssue?: string
}

// Address interfaces
export interface Address {
  address?: string
  district?: string
  subDistrict?: string
  stateProv?: string
  postalCode?: string
  phoneNo?: string
}

export interface OfficeAddress extends Address {
  officeName?: string
}

// Work Profile interface
export interface WorkProfile {
  occupationValue?: string
  occupationGroupValue?: string
  subOccupationGroupValue?: string
  occupationCode?: string
  occupationGroup?: string
  salaryValue?: string
}

// Legacy Citizen Card Info interface (deprecated)
export interface CitizenCardInfo {
  cid?: string
  birthDate?: string
  gender?: string
  thaiTitle?: string
  thaiFirstName?: string
  thaiLastName?: string
  thaiMiddleName?: string
  engFirstName?: string
  engLastName?: string
  engMiddleName?: string
}

// Main Profile Data interface
export interface ProfileData {
  cid?: string
  birthDate?: string
  gender?: string
  title?: string
  mobileNo?: string
  email?: string
  fullNameTh?: FullNameTh
  fullNameEn?: FullNameEn
  idCardDetails?: IdCardDetails
  legalAddress?: Address
  mailingAddress?: Address
  officeAddress?: OfficeAddress
  workProfile?: WorkProfile
  citizenCardInfo?: CitizenCardInfo // Legacy field
}

// Main ProfileResponse interface
export interface PaotangProfileResponse {
  code?: string
  message?: string
  sub?: string
  data?: ProfileData
}
