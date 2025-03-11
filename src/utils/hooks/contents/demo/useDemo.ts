/**
 * @file usePayments.ts
 * @description 결제하기
 */

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { serviceNotice } from '~/components/contents/demo/defaultData'
import {
  ACCESS_TOKEN_NAME,
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  TELEPHONE_NUMBER_PATTERN,
} from '~/constants/common'
import {
  agreeNoticeInfoAction,
  applicantInfoAction,
  applicantInfoProps,
  companyInfoAction,
  companyInfoProps,
  companyTypeListAction,
  demoRequestProps,
  initRequestPopupTypesAction,
  pageTypeAction,
  requestPopupTypesAction,
  requestPopupTypesProps,
  userCountListAction,
} from '~/stores/modules/contents/demo/demo'
import { BaseResponseCommonObject } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { useDemoApplyUser } from '~/utils/api/demo/useDemoApplyUser'
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

export const useDemo = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    pageType,
    commonParentCode,
    applicantInfo,
    userCountList,
    companyInfo,
    companyTypeList,
    requestPopupTypes,
    totalAgreeNotice,
    agreeNoticeInfo,
    isActionButton,
  } = useAppSelector(state => state.demoSlice)
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'

  const [textareaHeight, setTextareaHeight] = useState({
    row: 2,
    lineBreak: {},
  })

  const apiInquiryAction = usePostInquiry()
  const apiDemoApplyUser = useDemoApplyUser()

  const actionValidate = async (items: demoRequestProps) => {
    let isAction = true
    let tempApplicantInfo = { ...items.applicantInfo }
    let tempCompanyInfo = { ...items.companyInfo }

    if (items.applicantInfo.name === '') {
      tempApplicantInfo.nameErr = '신청인의 이름을 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.email === '') {
      tempApplicantInfo.emailErr = '신청인의 이메일을 입력해주세요.'
      isAction = false
    } else {
      if (!EMAIL_PATTERN.test(items.applicantInfo.email)) {
        tempApplicantInfo.emailErr = EMAIL_PATTERN_DESCRIPTION
        isAction = false
      }
    }

    if (items.applicantInfo.position === '') {
      tempApplicantInfo.positionErr = '신청인의 직책을 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.department === '') {
      tempApplicantInfo.departmentErr = '신청인의 부서를 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.phoneNm === '') {
      tempApplicantInfo.phoneNmErr = '신청인의 전화를 입력해주세요.'
      isAction = false
    }

    if (items.applicantInfo.telephone !== '' && !TELEPHONE_NUMBER_PATTERN.test(items.applicantInfo.telephone)) {
      tempApplicantInfo.telephoneErr = '유효한 번호가 아닙니다.'
      isAction = false
    }

    if (items.companyInfo.name === '') {
      tempCompanyInfo.nameErr = '신청인의 회사명을 입력해주세요.'
      isAction = false
    }

    if (items.companyInfo.type.id === '') {
      openToast('상품종류를 선택해주세요.', 'warning')
      isAction = false
    }

    if (items.companyInfo.userCount.id === '') {
      openToast('사용자 숫자를 선택해주세요.', 'warning')
      isAction = false
    }

    if (items.agreeNoticeInfo.length < 1) {
      openToast('이용 약관에 동의를 해주세요.', 'warning')
      isAction = false
    }

    dispatch(applicantInfoAction(tempApplicantInfo))
    dispatch(companyInfoAction(tempCompanyInfo))
    return isAction
  }
  const demoRequest = async (items: demoRequestProps) => {
    const check = await actionValidate(items)
    if (check) {
      const find = items.agreeNoticeInfo.find(i => i === 'personal')
      const params = {
        name: items.applicantInfo.name,
        email: items.applicantInfo.email,
        phone: items.applicantInfo.phoneNm.replace(/-/g, ''),
        mobile: items.applicantInfo.telephone.replace(/-/g, ''),
        department: items.applicantInfo.department,
        position: items.applicantInfo.position,
        comName: items.companyInfo.name,
        comCategoryCode: items.companyInfo.type.id,
        comTotalMbrsCode: items.companyInfo.userCount.id,
        comWsite: items.companyInfo.website,
        infoGatherAgreed: !!find,
      }
      const { status, data, message } = await apiDemoApplyUser.mutateAsync(params)
      if (status === 'S') {
        openToast(message?.message, 'success')
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
        titleErr: '제목을 입력해주세요.',
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

  const extendedCommonCodeTargetList: SelectListOptionItem[] = [
    {
      id: 'COM_TOTAL_MEMBERS',
      name: 'COM_TOTAL_MEMBERS',
    },
    {
      id: 'COM_CATEGORY',
      name: 'COM_CATEGORY',
    },
    {
      id: 'INQUIRY_WHY_CODE',
      name: 'INQUIRY_WHY_CODE',
    },
  ]

  const getCommonCode = async (code: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const init = async () => {
    for await (const re of extendedCommonCodeTargetList) {
      const res = await getCommonCode(re.id)
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      if (re.id === 'COM_TOTAL_MEMBERS') {
        dispatch(userCountListAction(list))
      } else if (re.id === 'COM_CATEGORY') {
        dispatch(companyTypeListAction(list))
      } else {
        const params = {
          ...requestPopupTypes,
          selectedValue: list[0],
          selectedList: list,
        }
        dispatch(requestPopupTypesAction(params))
      }
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

  const totalNoticeChecked = useCallback(
    async (e: boolean) => {
      const temp = !e ? serviceNotice.map(arg => arg.id) : []
      dispatch(agreeNoticeInfoAction({ list: temp, values: e, isActive: !e }))
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

  const setApplicantNameAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        name: e,
        nameErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setApplicantEmailAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        email: e,
        emailErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setApplicantTelePhoneAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        telephone: e,
        telephoneErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
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
    [dispatch]
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
    [dispatch]
  )

  const setPhoneCallNmAction = useCallback(
    async (e: string, hooks: applicantInfoProps) => {
      const params = {
        ...hooks,
        phoneNm: e,
        phoneNmErr: '',
      }
      dispatch(applicantInfoAction(params))
    },
    [dispatch]
  )

  const setNameAction = useCallback(
    async (e: string, hooks: companyInfoProps) => {
      const params = {
        ...hooks,
        name: e,
        nameErr: '',
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

  const setInitRequestPopupTypesAction = useCallback(() => dispatch(initRequestPopupTypesAction()), [dispatch])

  return {
    pageType,
    textareaHeight,
    requestPopupTypes,
    totalAgreeNotice,
    agreeNoticeInfo,
    applicantInfo,
    companyInfo,
    userCountList,
    companyTypeList,
    isActionButton,

    resizeTextarea,
    onKeyEnter,
    setPopupTitleAction,
    setRequestPopupAction,
    setPopupContentAction,
    demoRequest,
    init,

    setNameAction,
    setPhoneCallNmAction,
    setDepartmentAction,
    setPositionAction,
    setNoticeChecked,
    totalNoticeChecked,
    setPopupSelectedValueAction,
    setInitRequestPopupTypesAction,
    onChangeFiles,
    onDeleteUserFile,
    openRequestPopup,
    setCompanyInfoTypeAction,
    setCompanyInfoUserCountAction,
    setCompanyInfoWebsiteAction,
    setApplicantTelePhoneAction,
    setApplicantNameAction,
    setApplicantEmailAction,
  }
}
