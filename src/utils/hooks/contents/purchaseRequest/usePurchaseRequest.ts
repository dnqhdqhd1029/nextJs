/**
 * @file usePayments.ts
 * @description 결제하기
 */

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Address } from 'react-daum-postcode'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { serviceNotice } from '~/components/contents/payment/defaultData'
import { PHONE_NUMBER_PATTERN, TELEPHONE_NUMBER_PATTERN } from '~/constants/common'
import {
  addressPopupAction,
  agreeNoticeInfoAction,
  applicantInfoAction,
  applicantInfoProps,
  companyInfoAction,
  companyInfoProps,
  companyTypeListAction,
  initDataAction,
  initRequestPopupTypesAction,
  pageTypeAction,
  payApplyRequestProps,
  productInfoAction,
  productInfoProps,
  productListProps,
  regionListAction,
  requestPopupTypesAction,
  requestPopupTypesProps,
  userCountListAction,
} from '~/stores/modules/contents/purchaseRequest/purchaseRequest'
import { BaseResponseCommonObject, CompanyDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useApplysheetUser, useGetCompanyInfo, useGetProductList } from '~/utils/api/purchaseRequest/usePurchaseRequest'
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

export const usePurchaseRequest = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    isActionButton,
    commonParentCode,
    userCountList,
    regionList,
    companyTypeList,
    totalAgreeNotice,
    agreeNoticeInfo,
    companyInfo,
    addressPopup,
    applicantInfo,
    productInfo,
    pageType,
    companyLoaing,
    requestPopupTypes,
  } = useAppSelector(state => state.purchaseRequestSlice)

  const { userInfo } = useAppSelector(state => state.authSlice)
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'

  const [textareaHeight, setTextareaHeight] = useState({
    row: 2,
    lineBreak: {},
  })

  const apiInquiryAction = usePostInquiry()
  const apiUseApplysheetUser = useApplysheetUser()

  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname === '/payment/purchase-request' ? commonParentCode : '',
  })
  const { data: productListData } = useGetProductList(companyLoaing ? 0 : 1)
  const { isLoading: isCompanyLoading, data: companyInfoData } = useGetCompanyInfo({
    userCountList,
    regionList,
    companyTypeList,
  })

  const actionValidate = async (items: payApplyRequestProps) => {
    let isAction = true
    let tempApplicantInfo = { ...items.applicantInfo }
    let tempCompanyInfo = { ...items.companyInfo }

    if (items.applicantInfo.position === '') {
      openToast('직책을 입력해주세요.', 'warning')
      tempApplicantInfo.positionErr = '직책을 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.department === '') {
      openToast('부서를 입력해주세요.', 'warning')
      tempApplicantInfo.departmentErr = '부서를 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.phone === '') {
      openToast('전화번호를 입력해주세요.', 'warning')
      tempApplicantInfo.phoneErr = '전화번호를 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.phone !== '' && !PHONE_NUMBER_PATTERN.test(items.applicantInfo.phone.trim())) {
      openToast('유효한 번호가 아닙니다.', 'warning')
      tempApplicantInfo.phoneErr = '유효한 번호가 아닙니다.'
      isAction = false
    }

    if (items.applicantInfo.telephone !== '' && !TELEPHONE_NUMBER_PATTERN.test(items.applicantInfo.telephone.trim())) {
      openToast('유효한 번호가 아닙니다.', 'warning')
      tempApplicantInfo.telePhoneErr = '유효한 번호가 아닙니다.'
      isAction = false
    }

    if (items.companyInfo.addressNm === '') {
      openToast('주소를 입력해주세요.', 'warning')
      tempCompanyInfo.addressNmErr = '주소를 입력해주세요.'
      isAction = false
    }

    if (items.productInfo.type.id === '') {
      openToast('상품종류를 선택해주세요.', 'warning')
      isAction = false
    }

    if (items.productInfo.userCount.id === '') {
      openToast('사용자 숫자를 선택해주세요.', 'warning')
      isAction = false
    }

    if (items.agreeNoticeInfo.length < 1) {
      openToast('이용 약관에 동의를 해주세요.', 'warning')
      isAction = false
    }

    dispatch(companyInfoAction(tempCompanyInfo))
    dispatch(applicantInfoAction(tempApplicantInfo))
    return isAction
  }

  const buyApplyRequest = async (items: payApplyRequestProps) => {
    const check = await actionValidate(items)
    if (check) {
      const find = items.agreeNoticeInfo.find(i => i === 'personal')
      const msg =
        '상품 종류: ' +
        items.productInfo.type.name +
        ', 사용자 숫자: ' +
        `${
          items.productInfo.userCount.id === 'none'
            ? ''
            : items.productInfo.userCount.name + ' 요청사항: ' + items.productInfo.detail
        }`
      const params = {
        phone: items.applicantInfo.phone.replace(/-/g, ''),
        mobile: items.applicantInfo.telephone.replace(/-/g, ''),
        department: items.applicantInfo.department,
        position: items.applicantInfo.position,
        comName: items.companyInfo.name,
        comCategoryCode: items.companyInfo.type.id,
        comTotalMbrsCode: items.companyInfo.userCount.id,
        comWsite: items.companyInfo.website,
        //ipAddress: '',
        address: items.companyInfo.addressNm,
        detailedAddress: items.companyInfo.subAddressNm,
        zipCode: items.companyInfo.zipCode,
        countryCode: items.companyInfo.region.id,
        message: msg,
        //clauseId: '',
        infoGatherAgreed: !!find,
      }
      const { status, data, message } = await apiUseApplysheetUser.mutateAsync(params)
      if (status === 'S') {
        dispatch(pageTypeAction())
      } else {
        openToast(message?.message, 'error')
      }
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

  const setRequestPopupAction = async (e: requestPopupTypesProps) => {
    if (e.title === '') {
      const params = {
        ...e,
        titleErr: '제목을 입력해주세요',
      }
      dispatch(requestPopupTypesAction(params))
    } else {
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
  }

  const setPopupTitleAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      title: param,
      titleErr: '',
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

  const setCompanyInfoRegionAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        region: e,
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setCompanyInfoTypeAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        type: e,
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setCompanyInfoUserCountAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        userCount: e,
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setCompanyInfoWebsiteAction = useCallback(
    async (e: string, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        website: e,
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setCompanyInfoSubAddressAction = useCallback(
    async (e: string, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        subAddressNm: e,
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setCompanyInfoAddressAction = useCallback(
    async (e: Address, hooks: companyInfoProps) => {
      const { userSelectedType, address, roadAddress, jibunAddress, zonecode } = e
      const params = {
        ...hooks,
        zipCode: zonecode,
        addressNm: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
        addressNmErr: '',
      }
      dispatch(companyInfoAction(params))
    },
    [dispatch]
  )

  const setNoticeChecked = useCallback(
    async (checked: boolean, keyId: string, list: string[]) => {
      let tempBoolean = false
      const temp = !checked ? [...list, keyId] : list.filter(e => e !== keyId)
      if (temp.length > 1) tempBoolean = true
      dispatch(agreeNoticeInfoAction({ list: temp, values: temp.length <= 1, isActive: tempBoolean }))
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

  const setApplicantInfoPhoneAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        phone: e,
        phoneErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setApplicantInfoDepartmentAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        department: e,
        departmentErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setApplicantInfoPositionAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        position: e,
        positionErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setApplicantInfoTelePhoneAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        telephone: e,
        telePhoneErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setProductInfoActionTypeAction = useCallback(
    async (e: SelectListOptionItem, hooks: productInfoProps) => {
      const find = hooks.originList.find(i => i.productId.toString() === e.id)
      let params = { ...hooks }
      if (find) {
        params = {
          ...hooks,
          type: e,
          isUser: !find.isUserNumFixed,
          userCount: { id: find.isUserNumFixed ? 'none' : '', name: '' },
        }
      } else {
        params = {
          ...hooks,
          type: e,
          isUser: false,
          userCount: { id: 'none', name: '' },
        }
      }
      dispatch(productInfoAction(params))
    },
    [dispatch]
  )

  const setProductInfoActionUserCountAction = useCallback(
    async (e: SelectListOptionItem, hooks: productInfoProps) => {
      const params = {
        ...hooks,
        userCount: e,
      }
      dispatch(productInfoAction(params))
    },
    [dispatch]
  )

  const setProductInfoActionDetailAction = useCallback(
    async (e: string, hooks: productInfoProps) => {
      const params = {
        ...hooks,
        detail: e,
      }
      dispatch(productInfoAction(params))
    },
    [dispatch]
  )

  const openRequestPopup = useCallback(
    async (param: requestPopupTypesProps) => {
      const params = {
        type: '',
        titleErr: '',
        title: '',
        contents: '',
        contentsErr: '',
        filesList: [],
        selectedList: param.selectedList,
        selectedValue: param.selectedList.length > 0 ? param.selectedList[0] : param.selectedValue,
        isOpen: true,
      }
      dispatch(requestPopupTypesAction(params))
    },
    [dispatch]
  )

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

  const setAddressPopupAction = useCallback((e: boolean) => dispatch(addressPopupAction(e)), [dispatch])
  const setInitRequestPopupTypesAction = useCallback(() => dispatch(initRequestPopupTypesAction()), [dispatch])

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      if (commonParentCode === 'COM_TOTAL_MEMBERS') {
        dispatch(userCountListAction(list))
      } else if (commonParentCode === 'COM_CATEGORY') {
        dispatch(companyTypeListAction(list))
      } else if (commonParentCode === 'INQUIRY_WHY_CODE') {
        const params = {
          ...requestPopupTypes,
          selectedValue: list[0],
          selectedList: list,
        }
        dispatch(requestPopupTypesAction(params))
      } else {
        dispatch(regionListAction(list))
      }
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getCommonCode])

  useEffect(() => {
    let list = [{ id: '', name: '선택' }]
    if (!productListData) return
    const { status, data, message } = productListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as productListProps[]
      const simple = res.map(e => {
        return { id: e.productId.toString(), name: e.name }
      })
      list = list.concat(simple)
      const params = {
        ...productInfo,
        originList: res,
        typeList: list,
      }
      dispatch(productInfoAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [productListData])

  useEffect(() => {
    if (!companyInfoData) return
    const { status, data, message } = companyInfoData as BaseResponseCommonObject
    console.log('companyInfoData', companyInfoData)
    if (status === 'S') {
      const res = data as CompanyDto
      const findType = companyTypeList.find(i => i.id === res.categoryCode)
      const findUser = userCountList.find(i => i.id === res.totalMembers)
      const findRegion = regionList.find(i => i.id === res.countryCode)
      console.log('findType', findType)
      console.log('findUser', findUser)
      console.log('findRegion', findRegion)
      if (findType && findUser && findRegion) {
        const params = {
          applicantInfo: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: '',
            telephone: '',
            department: '',
            position: '',
            phoneErr: '',
            telePhoneErr: '',
            departmentErr: '',
            positionErr: '',
          },
          companyInfo: {
            name: res?.name || '',
            type: findType,
            userCount: findUser,
            website: res?.wsite || '',
            region: findRegion,
            zipCode: '',
            addressNm: res?.address || '',
            subAddressNm: res?.detailedAddress || '',
            addressNmErr: '',
          },
        }
        dispatch(initDataAction(params))
      } else {
        openToast('잘못된 접근입니다', 'error')
        router.replace('/dashboard')
      }
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [companyInfoData])

  return {
    totalAgreeNotice,
    isActionButton,
    textareaHeight,
    agreeNoticeInfo,
    companyInfo,
    addressPopup,
    applicantInfo,
    productInfo,
    isCompanyLoading,
    userCountList,
    regionList,
    companyTypeList,
    pageType,
    requestPopupTypes,

    resizeTextarea,
    onKeyEnter,
    buyApplyRequest,
    setPopupTitleAction,
    setRequestPopupAction,
    setPopupContentAction,

    setPopupSelectedValueAction,
    setInitRequestPopupTypesAction,
    onChangeFiles,
    onDeleteUserFile,
    openRequestPopup,
    setApplicantInfoPhoneAction,
    setCompanyInfoUserCountAction,
    setCompanyInfoWebsiteAction,
    setAddressPopupAction,
    setCompanyInfoSubAddressAction,
    setCompanyInfoAddressAction,
    setNoticeChecked,
    totalNoticeChecked,
    setCompanyInfoTypeAction,
    setCompanyInfoRegionAction,
    setApplicantInfoTelePhoneAction,
    setApplicantInfoDepartmentAction,
    setApplicantInfoPositionAction,
    setProductInfoActionTypeAction,
    setProductInfoActionUserCountAction,
    setProductInfoActionDetailAction,
  }
}
