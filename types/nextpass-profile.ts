// User Profile Response Types

export interface UserProfileResponse {
  fullNameTh?: string
  thaiFirstName: string
  thaiMiddleName: string
  thaiLastName: string
  fullNameEn?: string
  engFirstName: string
  engMiddleName: string
  engLastName: string
  gender: Gender
  birthDate: string // ISO date string "25400122"
  mobileNo: string
  email: string
  workProfile?: WorkProfile
  legalAddress?: Address
  mailingAddress?: Address
  officeAddress?: OfficeAddress
  idCardDetails?: IDCardDetails
}

export type Gender = 'M' | 'F' | 'O' // Male, Female, Other

export interface WorkProfile {
  occupationCode: string
  occupationValue: string // Thai text
  occupationGroup: string
  occupationGroupValue: string // Thai text
  subOccupationGroup: string
  subOccupationGroupValue: string // Thai text
  salary: string
  salaryValue: string // e.g., "40,001-60,000 บาท"
}

export interface Address {
  address: string
  subDistrict: string // Thai text
  subDistrictCode: string
  district: string // Thai text
  districtCode: string
  stateProv: string // Thai text
  stateProvCode: string
  postalCode: string
  country: string // "TH"
  phoneNo?: string
}

export interface OfficeAddress {
  officeName: string // "ABC"
  address: string
  subDistrict: string // Thai text
  subDistrictCode: string
  district: string // Thai text
  districtCode: string
  stateProv: string // Thai text
  stateProvCode: string
  postalCode: string
  country: string // "TH"
  phoneNo?: string
}

export interface IDCardDetails {
  dateOfExpiry: string // "20300107"
  dateOfIssue: string // "20210327"
  placeOfIssue: string // Thai text
}
