export interface PaotangProfileResponse {
  code: string
  message: string
  data: Data
}

export interface Data {
  cid: string
  title: string
  fullNameTh: FullNameTh
  fullNameEn: FullNameEn
  gender: string
  birthDate: string
  mobileNo: string
  email: string
  workProfile: WorkProfile
  legalAddress: LegalAddress
  mailingAddress: MailingAddress
  officeAddress: OfficeAddress
}

export interface FullNameTh {
  thaiFirstName: string
  thaiMiddleName: string
  thaiLastName: string
}

export interface FullNameEn {
  engFirstName: string
  engMiddleName: string
  engLastName: string
}

export interface WorkProfile {
  occupationCode: string
  occupationValue: string
  occupationGroup: string
  occupationGroupValue: string
  subOccupationGroup: string
  subOccupationGroupValue: string
  salary: string
  salaryValue: string
}

export interface LegalAddress {
  address: string
  subDistrict: string
  subDistrictCode: string
  district: string
  districtCode: string
  stateProv: string
  stateProvCode: string
  postalCode: string
  country: string
  phoneNo: string
}

export interface MailingAddress {
  address: string
  subDistrict: string
  subDistrictCode: string
  district: string
  districtCode: string
  stateProv: string
  stateProvCode: string
  postalCode: string
  country: string
  phoneNo: string
}

export interface OfficeAddress {
  officeName: string
  address: string
  subDistrict: string
  subDistrictCode: string
  district: string
  districtCode: string
  stateProv: string
  stateProvCode: string
  postalCode: string
  country: string
  phoneNo: string
  phoneExt: string
}
