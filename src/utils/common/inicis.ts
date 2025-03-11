import SHA256 from 'js-sha256'
import { v4 as uuid } from 'uuid'

export const makeMkeyPayRequest = () => {
  return SHA256.sha256(`${'SU5JTElURV9UUklQTEVERVNfS0VZU1RS'}`).toString()
}

export const makeSignaturePayRequest = (oid: string, price: string | number, timestamp: number) => {
  return SHA256.sha256(`oid=${oid}&price=${price}&timestamp=${timestamp}`).toString()
}

export const makeVerificationPayRequest = (oid: string, price: string | number, timestamp: number) => {
  return SHA256.sha256(
    `oid=${oid}&price=${price}&signKey=${'SU5JTElURV9UUklQTEVERVNfS0VZU1RS'}&timestamp=${timestamp}`
  ).toString()
}

export const makeSignature = (authToken: string, timestamp: number): string => {
  return SHA256.sha256(`authToken=${authToken}&timestamp=${timestamp}`).toString()
}

export const makeVerification = (authToken: string, timestamp: number): string => {
  return SHA256.sha256(
    `authToken=${authToken}&signKey=${'SU5JTElURV9UUklQTEVERVNfS0VZU1RS'}&timestamp=${timestamp}`
  ).toString()
}
