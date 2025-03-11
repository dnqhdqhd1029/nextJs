/**
 * @file useCustomerCenter.ts
 * @description 고객센터
 */

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { ACCESS_TOKEN_NAME, EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import {
  detailDataAction,
  initCustomerCenterAction,
  initRequestPopupTypesAction,
  inquiryListPageAction,
  menuBarAction,
  requestPopupTypesAction,
  requestPopupTypesProps,
  setInquiryListPageAction,
} from '~/stores/modules/contents/customerCenter/customerCenter'
import { BaseResponseCommonObject, InquiryDto, PageInquiryDtoForList } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import {
  usePostInquiry,
  UsePostInquiryParams,
  usePostNonUserInquiry,
  UsePostNonUserInquiryParams,
} from '~/utils/api/additionalServices/useGetLicenseInfo'
import { apiGetCommonCode, CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { UseGetMyInquiryDetail, UseGetMyInquiryList } from '~/utils/api/myInquiry/useMyInquiry'
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

export const useCustomerCenter = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''

  const { detailData, inquiryList, page, size, totalCount, totalPageCount, sort, menuBar, requestPopupTypes } =
    useAppSelector(state => state.customerCenterSlice)
  const { licenseInfo, userInfo, userSelectGroup } = useAppSelector(state => state.authSlice)
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'

  const [textareaHeight, setTextareaHeight] = useState({
    row: 2,
    lineBreak: {},
  })

  const apiInquiryAction = usePostInquiry()
  const apiNonUserInquiryAction = usePostNonUserInquiry()

  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname.startsWith('/help') ? (accessToken !== '' ? 'INQUIRY_WHY_CODE' : '') : '',
  })
  const { isLoading: isDetailLoading, data: myInquiryDetailData } = UseGetMyInquiryDetail(
    accessToken !== '' ? Number(router?.query?.id) || 0 : 0
  )
  const {
    isLoading,
    isRefetching,
    data: myInquiryListData,
    refetch: refetchMyInquiryListData,
  } = UseGetMyInquiryList({
    paramData: {
      pageableDto: {
        page,
        size,
        sort,
      },
      requestDto: {
        title: '',
      },
    },
    userId: router.pathname === '/help/my-inquiry' ? (accessToken !== '' ? userInfo?.userId || 0 : 0) : 0,
  })

  const setInquiryDetail = async (params: InquiryDto) => {
    let stateCodeList: { id: string; name: string }[] = []
    if (requestPopupTypes.selectedList.length > 0) {
      stateCodeList = requestPopupTypes.selectedList
    } else {
      const { status, data, message } = await apiGetCommonCode({ parentCode: 'INQUIRY_WHY_CODE' })
      if (status === 'S') {
        const res = data as CommonCode[]
        stateCodeList = res.map(e => {
          return { id: e.code, name: e.name }
        })
      }
    }

    if (stateCodeList.length > 0) {
      const find = stateCodeList.find(e => e.id === params.whyCode)
      if (find) {
        const param = {
          ...params,
          whyCode: find.name,
        }
        dispatch(detailDataAction(param))
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
      dispatch(initRequestPopupTypesAction())
      openToast(message?.message, 'success')
      if (router.pathname === '/help/my-inquiry') await refetchMyInquiryListData()
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

  const setPopupTitleAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      title: param,
      titleErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setApplicantTelePhoneAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      telephone: param,
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setApplicantEmailAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      email: param,
      emailErr: '',
    }
    dispatch(requestPopupTypesAction(params))
  }

  const setApplicantNameAction = async (param: string, e: requestPopupTypesProps) => {
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

  const setPhoneCallNmAction = async (param: string, e: requestPopupTypesProps) => {
    const params = {
      ...e,
      phoneNm: param,
      phoneNmErr: '',
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

  const openRequestPopup = useCallback(
    async (param: requestPopupTypesProps) => {
      const params = {
        type: accessToken !== '' ? 'login' : 'customer',
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

  const initCustomerCenter = useCallback(() => dispatch(initCustomerCenterAction()), [dispatch])

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

  const setInitRequestPopupTypesAction = useCallback(() => dispatch(initRequestPopupTypesAction()), [dispatch])
  const setMenuBarActionAction = useCallback((e: boolean) => dispatch(menuBarAction(e)), [dispatch])
  const setMediaPopupSizeAction = useCallback(async (i: number) => dispatch(inquiryListPageAction(i)), [dispatch])

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      const params = {
        ...requestPopupTypes,
        selectedValue: list[0],
        selectedList: list,
      }
      dispatch(requestPopupTypesAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getCommonCode])

  useEffect(() => {
    if (!myInquiryListData) return
    const { status, data, message } = myInquiryListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageInquiryDtoForList
      if (res.content && res.content.length > 0) {
        const params = {
          page: page === 1 ? 1 : res.content.length > 0 ? page : page - 1,
          totalCount: res.totalElements ?? 0,
          totalPageCount: res.totalPages ?? 0,
          list: res.content,
        }
        dispatch(setInquiryListPageAction(params))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }, [myInquiryListData])

  useEffect(() => {
    if (!myInquiryDetailData) return
    const { status, data, message } = myInquiryDetailData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as InquiryDto
      setInquiryDetail(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [myInquiryDetailData])

  return {
    textareaHeight,
    requestPopupTypes,
    userInfo,
    licenseInfo,
    menuBar,
    isLoading,
    inquiryList,
    page,
    size,
    totalCount,
    totalPageCount,
    sort,
    isRefetching,
    isDetailLoading,
    detailData,
    userSelectGroup,

    resizeTextarea,
    onKeyEnter,
    setPopupTitleAction,
    setRequestPopupAction,
    setPopupContentAction,
    setApplicantTelePhoneAction,
    setApplicantNameAction,
    setApplicantEmailAction,
    setPhoneCallNmAction,

    initCustomerCenter,
    setMenuBarActionAction,
    setPopupSelectedValueAction,
    setInitRequestPopupTypesAction,
    onChangeFiles,
    onDeleteUserFile,
    openRequestPopup,
    setMediaPopupSizeAction,
  }
}
