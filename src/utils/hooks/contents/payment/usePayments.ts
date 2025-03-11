/**
 * @file usePayments.ts
 * @description 결제하기
 */

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Address } from 'react-daum-postcode'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { serviceNotice } from '~/components/contents/payment/defaultData'
import {
  ACCESS_TOKEN_NAME,
  BUSINESS_NUMBER_PATTERN,
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  TELEPHONE_NUMBER_PATTERN,
} from '~/constants/common'
import {
  addressPopupAction,
  agreeNoticeInfoAction,
  applicantInfoAction,
  applicantInfoProps,
  cashPaymentsAction,
  cashReceiptsInfoAction,
  cashReceiptsInfoProps,
  companyInfoProps,
  initRequestPopupTypesAction,
  invoiceTypeAction,
  invoiceTypeListAction,
  payActionProps,
  payMethodListAction,
  payMethodTypeAction,
  requestInfoAction,
  requestPopupTypesAction,
  requestPopupTypesProps,
  resetInAction,
  setCompanyInfoAction,
  setInfoAction,
  taxBillInfoAction,
  taxBillInfoProps,
} from '~/stores/modules/contents/payment/payment'
import { BaseResponseCommonObject, CompanyDto, PayRequestInfoForFirstPayDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import {
  usePostInquiry,
  UsePostInquiryParams,
  usePostNonUserInquiry,
  UsePostNonUserInquiryParams,
} from '~/utils/api/additionalServices/useGetLicenseInfo'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import {
  AdditionalServicePutProps,
  useGetCompanyInfo,
  usePayRequestAdditionalServiceDetail,
  usePayRequestAdditionalServiceDoneDeal,
  usePayRequestCancel,
  usePayRequestNonUserDoneDeal,
  usePayServiceNonUserDetail,
} from '~/utils/api/payment/usePayment'
import { openToast } from '~/utils/common/toast'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const messages = {
  ko: {
    code100: '파일 사이즈가 초과되었습니다.',
    code101: '파일 갯수가 초과되었습니다.',
    code200: '파일 업로드에 실패하였습니다.',
    code201: '파일 삭제에 실패하였습니다.',
  },
  en: {
    code100: 'File size exceeded.',
    code101: 'The number of files has been exceeded.',
    code200: 'Failed to upload file.',
    code201: 'Failed to delete file.',
  },
}
const fileSizeUnit = 'MB'
const fileSizeLimit = 5
const fileLengthLimit = 5

export const usePayments = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    paymentTypeKey,
    paymentsStep,
    linkPopup,
    addressPopup,
    productCode,
    paymentInfo,
    applicantInfo,
    requestInfo,
    taxBillInfo,
    cashReceiptsInfo,
    agreeNoticeInfo,
    totalAgreeNotice,
    paymentsId,
    getInfo,
    commonParentCode,
    payMethodList,
    invoiceTypeList,
    payMethodType,
    invoiceType,
    requestPopupTypes,
    isActionButton,
    companyInfo,
    isLoading,
    companyLoading,
  } = useAppSelector(state => state.paymentSlice)
  const { userInfo } = useAppSelector(state => state.authSlice)
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const [textareaHeight, setTextareaHeight] = useState({
    row: 2,
    lineBreak: {},
  })

  const apiInquiryAction = usePostInquiry()
  const apiNonUserInquiryAction = usePostNonUserInquiry()
  const apiPayRequestCancel = usePayRequestCancel()
  const apiPayRequestAdditionalServiceDoneDeal = usePayRequestAdditionalServiceDoneDeal()
  const apiPayRequestNonUserDoneDeal = usePayRequestNonUserDoneDeal()

  const { data: companyInfoData } = useGetCompanyInfo(
    router.pathname.startsWith('/payment') ? (paymentTypeKey === 'non_user' ? 0 : commonParentCode === '' ? 1 : 0) : 0
  )
  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname.startsWith('/payment') ? commonParentCode : '',
  })
  const { data: paymentDetailData } = usePayRequestAdditionalServiceDetail({
    key: router.pathname.startsWith('/payment')
      ? paymentTypeKey === 'non_user'
        ? 0
        : companyLoading
        ? 0
        : Number(paymentsId)
      : 0,
    isDone: router.pathname.startsWith('/payment') ? (paymentTypeKey === 'non_user' ? false : getInfo) : false,
  })
  const { data: paymentNonUserDetailData } = usePayServiceNonUserDetail({
    key: router.pathname.startsWith('/payment') ? (paymentTypeKey === 'non_user' ? Number(paymentsId) : 0) : 0,
    isDone: router.pathname.startsWith('/payment') ? (paymentTypeKey === 'non_user' ? getInfo : false) : false,
  })

  const actionValidate = (items: payActionProps) => {
    let isAction = false
    let tempApplicantInfo = { ...items.applicantInfo }
    let tempCashReceiptsInfo = { ...items.cashReceiptsInfo }
    let tempTaxBillInfo = { ...items.taxBillInfo }

    if (items.payMethodType.id === '') {
      isAction = true
    }
    if (items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id === '') {
      isAction = true
    }

    if (items.applicantInfo.phoneCallNm === '') {
      tempApplicantInfo.phoneCallNmErr = '휴대번호를 입력해주세요.'
      isAction = true
    }

    if (
      items.applicantInfo.phoneCallNm !== '' &&
      !TELEPHONE_NUMBER_PATTERN.test(items.applicantInfo.phoneCallNm.trim())
    ) {
      tempApplicantInfo.phoneCallNmErr = '유효한 번호가 아닙니다.'
      isAction = false
    }

    if (items.applicantInfo.department === '') {
      tempApplicantInfo.departmentErr = '부서를 입력해주세요.'
      isAction = true
    }

    if (items.applicantInfo.position === '') {
      tempApplicantInfo.positionErr = '직책을 입력해주세요.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id === 'CR' &&
      items.cashReceiptsInfo.name === ''
    ) {
      tempCashReceiptsInfo.nameErr = '이름을 입력해주세요.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id === 'CR' &&
      items.cashReceiptsInfo.phoneNm === ''
    ) {
      tempCashReceiptsInfo.phoneNmErr = '휴대번호를 입력해주세요.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id === 'CR' &&
      items.cashReceiptsInfo.phoneNm !== '' &&
      !TELEPHONE_NUMBER_PATTERN.test(items.cashReceiptsInfo.phoneNm.trim())
    ) {
      tempCashReceiptsInfo.phoneNmErr = '유효한 번호가 아닙니다.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id !== 'CR' &&
      items.taxBillInfo.companyNm === ''
    ) {
      tempTaxBillInfo.companyNmErr = '상호를 입력해주세요.'
      isAction = true
    }

    if (items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR' && items.taxBillInfo.name === '') {
      tempTaxBillInfo.nameErr = '대표자 이름을 입력해주세요.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id !== 'CR' &&
      (items.taxBillInfo.businessNm === '' || !BUSINESS_NUMBER_PATTERN.test(items.taxBillInfo.businessNm.trim()))
    ) {
      tempTaxBillInfo.businessNmErr = '사업자등록번호를 입력해주세요.'
      isAction = true
    }

    if (items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR' && items.taxBillInfo.email === '') {
      tempTaxBillInfo.emailErr = '계산서 수신 이메일을 입력해주세요.'
      isAction = true
    }

    if (
      items.payMethodType.id !== 'CREDIT_CARD' &&
      items.invoiceType.id !== 'CR' &&
      items.taxBillInfo.addressNm === ''
    ) {
      tempTaxBillInfo.addressNmErr = '주소를 입력해주세요.'
      isAction = true
    }

    dispatch(cashReceiptsInfoAction(tempCashReceiptsInfo))
    dispatch(applicantInfoAction(tempApplicantInfo))
    dispatch(taxBillInfoAction(tempTaxBillInfo))

    return !isAction
  }

  const payAction = async (items: payActionProps) => {}

  const userPayRequest = async (items: payActionProps, params: AdditionalServicePutProps) => {
    const { status, data, message } = await apiPayRequestAdditionalServiceDoneDeal.mutateAsync(params)
    if (status === 'S') {
      if (items.payMethodType.id === 'CREDIT_CARD') {
        await router.push('/payment/confirm')
      } else {
        dispatch(cashPaymentsAction(items))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const nonUserPayRequest = async (items: payActionProps, params: AdditionalServicePutProps) => {
    console.log('in')
    const { status, data, message } = await apiPayRequestNonUserDoneDeal.mutateAsync(params)
    if (status === 'S') {
      if (items.payMethodType.id === 'CREDIT_CARD') {
        await router.push('/payment/confirm')
      } else {
        dispatch(cashPaymentsAction(items))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const payButtonAction = async (items: payActionProps) => {
    const check = actionValidate(items)
    if (check) {
      const find = items.agreeNoticeInfo.find(e => e === 'update')
      const params = {
        request: {
          comName:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR'
              ? items.taxBillInfo.companyNm
              : '',
          ceoName:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR' ? items.taxBillInfo.name : '',
          comRegNo:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR'
              ? items.taxBillInfo.businessNm
              : '',
          invoiceEmail:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR' ? items.taxBillInfo.email : '',
          address:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR'
              ? items.taxBillInfo.addressNm
              : '',
          zipCode:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR' ? items.taxBillInfo.zipCode : '',
          detailedAddress:
            items.payMethodType.id !== 'CREDIT_CARD' && items.invoiceType.id !== 'CR'
              ? items.taxBillInfo.subAddressNm
              : '',
          invoiceContactName:
            items.payMethodType.id === 'CREDIT_CARD'
              ? ''
              : items.invoiceType.id === 'CR'
              ? items.cashReceiptsInfo.name
              : items.taxBillInfo.adminNm,
          invoiceContactPhone:
            items.payMethodType.id === 'CREDIT_CARD'
              ? ''
              : items.invoiceType.id === 'CR'
              ? items.cashReceiptsInfo.phoneNm.replace(/-/g, '')
              : items.taxBillInfo.adminPhone.replace(/-/g, ''),

          payMethod: items.payMethodType.id,
          invoiceType: items.invoiceType.id,
          customerPhone: items.applicantInfo.phone,
          customerMobile: items.applicantInfo.phoneCallNm.replace(/-/g, ''),
          customerDepartment: items.applicantInfo.department,
          customerPosition: items.applicantInfo.position,
          customerMemo: items.requestInfo,
          flagUpdateUserInfo: items.totalAgreeNotice ? true : !!find,
        },
        id: items.paymentsId,
      }
      if (paymentTypeKey === 'non_user') {
        await nonUserPayRequest(items, params)
      } else {
        await userPayRequest(items, params)
      }
    }
  }

  const paymentCancel = async () => {
    const { status, data, message } = await apiPayRequestCancel.mutateAsync(paymentsId)
    if (status === 'S') {
      openToast('취소되었습니다.', 'success')
      if (paymentTypeKey === 'additionalService') {
        await router.replace('/payment/additional-services')
      } else {
        await router.replace('/member/login')
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initDataAction = () => {
    if (paymentsId === 0) {
      openToast('잘못된 접근입니다', 'error')
      router.replace(paymentTypeKey === 'non_user' ? '/member/login' : '/dashboard')
    } else if (paymentsId === 0 && paymentsStep === '1') {
      openToast('잘못된 접근입니다', 'error')
      router.replace(paymentTypeKey === 'non_user' ? '/member/login' : '/dashboard')
    } else {
      getInfo && dispatch(resetInAction())
    }
  }

  const resizeTextarea = (e: FormEvent<HTMLTextAreaElement>) => {
    const { scrollHeight, clientHeight, value } = e.target as HTMLTextAreaElement

    if (scrollHeight > clientHeight) {
      setTextareaHeight(prev => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [value.length - 1]: true },
      }))
    }

    // @ts-ignore
    if (textareaHeight.lineBreak[value.length]) {
      setTextareaHeight(prev => ({
        row: prev.row - 1,
        lineBreak: { ...prev.lineBreak, [value.length]: false },
      }))
    }
  }

  const onKeyEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement
    if (e.code === 'Enter') {
      setTextareaHeight(prev => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [value.length]: true },
      }))
    }
  }

  const setRequestInfoActionAction = useCallback(async (e: string) => dispatch(requestInfoAction(e)), [dispatch])
  const setAddressPopupAction = useCallback((e: boolean) => dispatch(addressPopupAction(e)), [dispatch])
  const setInitRequestPopupTypesAction = useCallback(() => dispatch(initRequestPopupTypesAction()), [dispatch])
  const setReceiptsByAction = useCallback(async (e: SelectListOptionItem) => dispatch(invoiceTypeAction(e)), [dispatch])
  const setPayByAction = useCallback(async (e: SelectListOptionItem) => dispatch(payMethodTypeAction(e)), [dispatch])

  const setTaxBillInfoAdminPhoneAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        adminPhoneErr: '',
        adminPhone: e,
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfoAdminNmAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        adminNmErr: '',
        adminNm: e,
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfoSubAddressAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        subAddressNmErr: '',
        subAddressNm: e,
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfoAddressAction = useCallback(
    async (e: Address, hooks: taxBillInfoProps) => {
      const { userSelectedType, address, roadAddress, jibunAddress, zonecode } = e
      const params = {
        ...hooks,
        zipCode: zonecode,
        addressNm: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
        addressNmErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfoEmailAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        email: e,
        emailErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfobusinessNmAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        businessNm: e,
        businessNmErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const setTaxBillInfoNmAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        name: e,
        nameErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )
  const setTaxBillInfoCompanyNmAction = useCallback(
    async (e: string, hooks: taxBillInfoProps) => {
      const params = {
        ...hooks,
        companyNm: e,
        companyNmErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const getTaxBillAction = useCallback(
    async (e: boolean, companyProps: companyInfoProps) => {
      let params = {
        getApplicatnInfo: !e,
        companyNm: e ? '' : companyProps.companyNm,
        name: e ? '' : companyProps.ceoNm,
        businessNm: e ? '' : companyProps.businessNm,
        email: e ? '' : companyProps.email,
        addressNm: e ? '' : companyProps.addressNm,
        subAddressNm: e ? '' : companyProps.subAddressNm,
        zipCode: '',
        adminNm: '',
        adminPhone: '',
        companyNmErr: '',
        nameErr: '',
        businessNmErr: '',
        emailErr: '',
        addressNmErr: '',
        subAddressNmErr: '',
        adminNmErr: '',
        adminPhoneErr: '',
      }
      dispatch(taxBillInfoAction(params))
    },
    [dispatch]
  )

  const getCashReceiptsAction = useCallback(
    async (e: boolean, companyProps: companyInfoProps) => {
      let params = {
        getApplicatnInfo: !e,
        name: e ? '' : companyProps.name,
        nameErr: '',
        phoneNm: e ? '' : companyProps.phone,
        phoneNmErr: '',
      }
      dispatch(cashReceiptsInfoAction(params))
    },
    [dispatch]
  )

  const setCashReceiptsNmAction = useCallback(
    async (e: string, hooks: cashReceiptsInfoProps) => {
      const params = {
        ...hooks,
        name: e,
        nameErr: '',
      }
      dispatch(cashReceiptsInfoAction(params))
    },
    [dispatch]
  )

  const setCashReceiptsPhoneCallNmAction = useCallback(
    async (e: string, hooks: cashReceiptsInfoProps) => {
      const params = {
        ...hooks,
        phoneNm: e,
        phoneNmErr: '',
      }
      dispatch(cashReceiptsInfoAction(params))
    },
    [dispatch]
  )

  const setNormalPhoneNmAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        phone: e,
      }
      dispatch(applicantInfoAction(params))
    },
    [applicantInfo.phone]
  )
  const setPhoneCallNmAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        phoneCallNm: e,
        phoneCallNmErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [applicantInfo.phoneCallNm, applicantInfo.phoneCallNmErr]
  )

  const setDepartmentAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        department: e,
        departmentErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [applicantInfo.department, applicantInfo.departmentErr]
  )

  const setPositionAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        position: e,
        positionErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [applicantInfo.position, applicantInfo.positionErr]
  )

  const setNoticeChecked = useCallback(
    async (checked: boolean, keyId: string, list: string[]) => {
      let tempBoolean = false
      const temp = !checked ? [...list, keyId] : list.filter(e => e !== keyId)
      if (temp.length === 3) {
        const find = temp.find(e => e === 'update')
        tempBoolean = !find
      } else if (temp.length > 3) {
        tempBoolean = true
      }

      dispatch(agreeNoticeInfoAction({ list: temp, values: temp.length <= 3, isActive: tempBoolean }))
    },
    [dispatch]
  )

  const totalNoticeChecked = useCallback(
    async (e: boolean) => {
      const temp = !e ? serviceNotice.map(arg => arg.id) : []
      dispatch(agreeNoticeInfoAction({ list: temp, values: e, isActive: !e }))
    },
    [dispatch]
  )

  const setPopupSelectedValueAction = useCallback(
    (param: SelectListOptionItem, e: requestPopupTypesProps) => {
      const params = {
        ...e,
        selectedValue: param,
      }
      dispatch(requestPopupTypesAction(params))
    },
    [dispatch]
  )

  const setPopupTitleAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      title: param,
      titleErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setPopupApplicantTelePhoneAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      telephone: param,
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setPopupApplicantEmailAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      email: param,
      emailErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setPopupPhoneCallNmAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      phoneNm: param,
      phoneNmErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setPopupApplicantNameAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      name: param,
      nameErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setPopupContentAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      contents: param,
      contentsErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const onDeleteUserFile = useCallback(
    (param: FileType, e: requestPopupTypesProps) => {
      if (e.filesList && e.filesList.length > 0) {
        const files = e.filesList.filter(file => file.id !== param.id)
        const params = {
          ...e,
          filesList: files,
        }
        dispatch(requestPopupTypesAction(params))
      }
    },
    [dispatch]
  )

  const openRequestPopup = useCallback(
    async (param: requestPopupTypesProps) => {
      const params = {
        type: paymentTypeKey === 'non_user' ? 'customer' : 'login',
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        selectedList: param.selectedList,
        selectedValue: param.selectedList.length > 0 ? param.selectedList[0] : param.selectedValue,
        isOpen: true,
        name: '',
        nameErr: '',
        phoneNm: '',
        phoneNmErr: '',
        email: '',
        emailErr: '',
        telephone: '',
      }
      dispatch(requestPopupTypesAction(params))
    },
    [dispatch]
  )

  const requestPopupNonUserAction = async (e: requestPopupTypesProps) => {
    let params: UsePostNonUserInquiryParams = {
      request: {
        name: e.name,
        email: e.email,
        phone: e.phoneNm,
        mobile: e.telephone,
        title: e.title,
        content: e.contents,
        whyCode: '',
      },
      fileList: [],
    }
    if (e.filesList && e.filesList.length > 0) {
      for await (const newFile of e.filesList) {
        if (newFile.file) params.fileList = [...params.fileList, newFile.file]
      }
    }
    const { status, data, message } = await apiNonUserInquiryAction.mutateAsync(params)
    if (status === 'S') {
      dispatch(initRequestPopupTypesAction())
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const requestPopupUserAction = async (e: requestPopupTypesProps) => {
    let params: UsePostInquiryParams = {
      request: {
        whyCode: e.selectedValue.id,
        title: e.title,
        content: e.contents,
      },
      fileList: [],
    }
    if (e.filesList && e.filesList.length > 0) {
      for await (const newFile of e.filesList) {
        if (newFile.file) params.fileList = [...params.fileList, newFile.file]
      }
    }
    const { status, data, message } = await apiInquiryAction.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      dispatch(initRequestPopupTypesAction())
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setRequestPopupAction = async (e: requestPopupTypesProps) => {
    if (e.title === '') {
      const params = {
        ...e,
        titleErr: '제목을 입력해주세요',
      }
      dispatch(requestPopupTypesAction(params))
    } else if (e.type === 'customer' && !EMAIL_PATTERN.test(e.email)) {
      const params = {
        ...e,
        emailErr: EMAIL_PATTERN_DESCRIPTION,
      }
      dispatch(requestPopupTypesAction(params))
    } else if (e.type === 'customer' && e.name === '') {
      const params = {
        ...e,
        nameErr: '이름을 입력해주세요',
      }
      dispatch(requestPopupTypesAction(params))
    } else {
      e.type === 'login' ? await requestPopupUserAction(e) : await requestPopupNonUserAction(e)
    }
  }

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const uploadFile = async (files: FileList, items: FileType[]) => {
    let isProcess = false
    let res = items
    const filesArr = Array.from(files)
    const totalFileLength = items ? items.length + filesArr.length : filesArr.length
    fileLengthLimit > 1 && totalFileLength > fileLengthLimit
      ? openToast(messages[locale].code101, 'error')
      : (isProcess = true)

    if (isProcess) {
      for await (const totalFileLengthElement of filesArr) {
        const fileSize = getSize(totalFileLengthElement.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb')
        if (fileSizeLimit && fileSize > fileSizeLimit) {
          openToast(messages[locale].code100, 'error')
        } else {
          const temp = await processUpload(totalFileLengthElement)
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const processUpload = (file: File): Promise<{ code: string; data: FileType }> => {
    return new Promise((resolve, reject) => {
      const res = {
        code: '',
        data: {},
      }
      try {
        let fileSrc = ''
        let width = 0
        let height = 0
        const mimeType = file.type
        const isImage = mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/gif'

        if (isImage) {
          const reader = new FileReader()

          reader.onload = function (event) {
            const image = new Image()

            image.onload = function () {
              width = image.width
              height = image.height

              res.code = ''
              res.data = {
                width,
                height,
                isImage,
                file,
                fileSrc,
                id: uuid(),
                size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
                mimeType,
              }
              resolve(res)
            }

            image.onerror = function () {
              res.code = '잘못된 이미지 입니다'
              resolve(res)
              //reject(new Error('Image loading error'))
            }

            //@ts-ignore
            image.src = event.target.result
            fileSrc = event.target?.result as string
          }

          reader.onerror = function () {
            res.code = '파일이 손상되었습니다'
            resolve(res)
            //reject(new Error('File reading error'))
          }

          reader.readAsDataURL(file)
        } else {
          res.code = ''
          res.data = {
            width,
            height,
            isImage,
            file,
            fileSrc,
            id: uuid(),
            size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
            mimeType,
          }
          resolve(res)
        }
      } catch (e) {
        res.code = messages[locale].code200
        resolve(res)
      }
    })
  }

  const onChangeFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement> | any, items: requestPopupTypesProps): Promise<void> => {
      let selectFiles = []
      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files
      } else {
        selectFiles = e.target.files
      }
      if (selectFiles && selectFiles.length > 0) {
        const result = await uploadFile(selectFiles, items.filesList)
        const params = {
          ...items,
          filesList: result,
        }
        dispatch(requestPopupTypesAction(params))
      }
    },
    [requestPopupTypes]
  )

  useEffect(() => {
    if (!getCommonCode) return
    if (paymentsStep !== '0') return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      if (commonParentCode === 'INQUIRY_WHY_CODE') {
        const params = {
          ...requestPopupTypes,
          selectedValue: list[0],
          selectedList: list,
        }
        dispatch(requestPopupTypesAction(params))
      } else if (commonParentCode === 'PAY_METHOD') {
        dispatch(payMethodListAction(list))
      } else {
        dispatch(invoiceTypeListAction(list))
      }
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getCommonCode])

  useEffect(() => {
    if (!paymentDetailData) return
    if (paymentsStep !== '0') return
    if (getInfo) return
    const { status, data, message } = paymentDetailData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PayRequestInfoForFirstPayDto
      const params = {
        paymentInfo: {
          productNm: res?.productNameList || [],
          payAmount: res?.estimatedAmount || 0,
        },
        applicantInfo: {
          ...applicantInfo,
          email: res?.customerEmail || '',
          companyNm: res?.customerCompany || '',
          name: res?.customerName || '',
          phone: res?.customerPhone || '',
        },
      }
      dispatch(setInfoAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [paymentDetailData])

  useEffect(() => {
    if (!paymentNonUserDetailData) return
    if (paymentsStep !== '0') return
    if (getInfo) return
    const { status, data, message } = paymentNonUserDetailData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PayRequestInfoForFirstPayDto
      const params = {
        paymentInfo: {
          productNm: res?.productNameList || [],
          payAmount: res?.estimatedAmount || 0,
        },
        applicantInfo: {
          ...applicantInfo,
          email: res?.customerEmail || '',
          companyNm: res?.customerCompany || '',
          name: res?.customerName || '',
          phone: res?.customerPhone || '',
        },
      }
      dispatch(setInfoAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [paymentNonUserDetailData])

  useEffect(() => {
    if (!companyInfoData) return
    if (paymentsStep !== '0') return
    if (getInfo) return
    const { status, data, message } = companyInfoData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CompanyDto
      const params = {
        companyInfo: {
          email: userInfo?.email || '',
          companyNm: res?.name || '',
          ceoNm: res?.ceoName || '',
          businessNm: res?.bizRegisNo || '',
          zipCode: '',
          addressNm: res?.address || '',
          subAddressNm: res?.detailedAddress || '',
          phone: userInfo?.phone || '',
          name: userInfo?.name || '',
        },
        taxBillInfo: {
          ...taxBillInfo,
          getApplicatnInfo: true,
          companyNm: res?.name || '',
          name: res?.ceoName || '',
          businessNm: res?.bizRegisNo || '',
          email: userInfo?.email || '',
          zipCode: '',
          addressNm: res?.address || '',
          subAddressNm: res?.detailedAddress || '',
        },
        cashReceiptsInfo: {
          ...cashReceiptsInfo,
          getApplicatnInfo: true,
          name: userInfo?.name || '',
          phoneNm: userInfo?.phone || '',
        },
      }
      dispatch(setCompanyInfoAction(params))
    } else {
      router.replace('/dashboard')
    }
  }, [companyInfoData])

  return {
    paymentTypeKey,
    isActionButton,
    paymentsStep,
    linkPopup,
    addressPopup,
    setAddressPopupAction,
    productCode,
    paymentInfo,
    applicantInfo,
    requestInfo,
    taxBillInfo,
    cashReceiptsInfo,
    agreeNoticeInfo,
    totalAgreeNotice,
    textareaHeight,
    requestPopupTypes,
    payMethodList,
    invoiceTypeList,
    payMethodType,
    invoiceType,
    paymentsId,
    companyInfo,
    isLoading,

    payButtonAction,
    paymentCancel,
    resizeTextarea,
    onKeyEnter,
    setRequestPopupAction,
    setPopupTitleAction,
    setPopupContentAction,
    initDataAction,
    payAction,
    setPopupApplicantTelePhoneAction,
    setPopupApplicantNameAction,
    setPopupApplicantEmailAction,
    setPopupPhoneCallNmAction,

    setPayByAction,
    onChangeFiles,
    openRequestPopup,
    setPopupSelectedValueAction,
    onDeleteUserFile,
    setInitRequestPopupTypesAction,
    setPhoneCallNmAction,
    setNormalPhoneNmAction,
    setDepartmentAction,
    setPositionAction,
    setRequestInfoActionAction,
    setReceiptsByAction,
    totalNoticeChecked,
    setNoticeChecked,
    getCashReceiptsAction,
    setCashReceiptsNmAction,
    setCashReceiptsPhoneCallNmAction,
    setTaxBillInfoCompanyNmAction,
    getTaxBillAction,
    setTaxBillInfoNmAction,
    setTaxBillInfobusinessNmAction,
    setTaxBillInfoEmailAction,
    setTaxBillInfoSubAddressAction,
    setTaxBillInfoAdminNmAction,
    setTaxBillInfoAdminPhoneAction,
    setTaxBillInfoAddressAction,
  }
}
