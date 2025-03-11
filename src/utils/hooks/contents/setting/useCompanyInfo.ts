import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'react-daum-postcode'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  addressPopupAction,
  companyInfoDataAction,
  companyInfoDataProps,
  companyInfoLoadingAction,
  companyTypeListAction,
  regionListAction,
  userCountListAction,
} from '~/stores/modules/contents/setting/setting'
import { BaseResponseCommonObject, CompanyDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePutCompanyInfo, UsePutCompanyInfoParams } from '~/utils/api/company/usePutCompanyInfo'
import { useGetCompanyInfo } from '~/utils/api/purchaseRequest/usePurchaseRequest'
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

export const useCompanyInfo = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const {
    companyInfoLoading,
    commonParentCode,
    addressPopup,
    companyInfoData,
    companyTypeList,
    userCountList,
    regionList,
  } = useAppSelector(state => state.userSettingSlice)

  const {
    isLoading: isCompanyLoading,
    data: companyInfo,
    refetch: refetchGetCompanyInfo,
  } = useGetCompanyInfo({
    userCountList,
    regionList,
    companyTypeList,
  })
  const { data: getCommonCode } = useGetCommonCode({
    parentCode: router.pathname === '/admin/company-info' ? commonParentCode : '',
  })

  const updateCompanyInfo = usePutCompanyInfo()

  const setAddressPopupAction = useCallback((e: boolean) => dispatch(addressPopupAction(e)), [dispatch])

  const setIsOverseasPolicy = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, hooks: companyInfoDataProps, countryList: SelectListOptionItem[]) => {
      let region = { id: '', name: '선택' }
      if (!e.target.checked) {
        const find = countryList?.find(i => i.id === 'KOR')
        region = find ? find : { id: '', name: '선택' }
      }
      dispatch(
        companyInfoDataAction({
          ...hooks,
          addressNm: '',
          subAddressNm: '',
          isOverseas: e.target.checked,
          addressNmErr: '',
          regionNm: '',
          region: region,
        })
      )
    },
    [dispatch]
  )
  const setUserCountAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoDataProps) => {
      const params = {
        ...hooks,
        userCount: e,
      }
      dispatch(companyInfoDataAction(params))
    },
    [dispatch]
  )

  const setRegionAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoDataProps) => {
      const params = {
        ...hooks,
        region: e,
      }
      dispatch(companyInfoDataAction(params))
    },
    [dispatch]
  )

  const setTypeAction = useCallback(
    async (e: SelectListOptionItem, hooks: companyInfoDataProps) => {
      const params = {
        ...hooks,
        type: e,
      }
      dispatch(companyInfoDataAction(params))
    },
    [dispatch]
  )

  const setAddressAction = useCallback(
    async (e: Address, hooks: companyInfoDataProps) => {
      const { userSelectedType, address, roadAddress, jibunAddress } = e
      const params = {
        ...hooks,
        addressNm: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
        addressNmErr: '',
      }
      dispatch(companyInfoDataAction(params))
    },
    [dispatch]
  )

  const onDeleteUserFile = useCallback(
    (param: FileType, e: companyInfoDataProps) => {
      if (e.filesList && e.filesList.length > 0) {
        const files = e.filesList.filter(file => file.id !== param.id)
        const params = {
          ...e,
          filesList: files,
          deletefilesList: param.file ? e.deletefilesList : [...e.deletefilesList, Number(param.id)],
        }
        dispatch(companyInfoDataAction(params))
      }
    },
    [dispatch]
  )

  const onChangeFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement> | any, items: companyInfoDataProps): Promise<void> => {
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
        dispatch(companyInfoDataAction(params))
      }
    },
    [dispatch]
  )

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
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

  const actionValidate = (hooks: companyInfoDataProps) => {
    let isAction = false
    let temp = { ...hooks }

    if (hooks.isOverseas) {
      if (hooks.subAddressNm === '') {
        temp.addressNmErr = '주소를 입력하세요.'
        isAction = true
      }
      if (hooks.region.id === '') {
        temp.regionNm = '주소를 입력하세요.'
        isAction = true
      }
    } else {
      if (hooks.addressNm === '') {
        temp.addressNmErr = '주소를 입력하세요.'
        isAction = true
      }
    }
    dispatch(companyInfoDataAction(temp))

    return !isAction
  }

  const saveCompanyInfo = async (hooks: companyInfoDataProps) => {
    const check = actionValidate(hooks)
    if (check) {
      dispatch(companyInfoLoadingAction(true))
      const updateParams: UsePutCompanyInfoParams = {
        id: hooks.companyId,
        info: {
          request: {
            ceoName: hooks.name,
            categoryCode: hooks.type.id ?? '',
            totalMembers: hooks.userCount.id ?? '',
            bizRegisNo: hooks.businessNm,
            wsite: hooks.website,
            countryCode: hooks.region.id ?? '',
            address: hooks.addressNm,
            detailedAddress: hooks.subAddressNm,
          },
          fileList: [],
        },
      }

      if (hooks.filesList.length > 0) {
        for await (const newFile of hooks.filesList) {
          if (newFile.file) updateParams.info.fileList = [...updateParams.info.fileList, newFile.file]
        }
      }

      if (hooks.deletefilesList.length > 0) {
        updateParams.info.request.deletedAttachIdList = hooks.deletefilesList
      }

      const { status, message } = await updateCompanyInfo.mutateAsync(updateParams)
      if (status === 'S') {
        openToast(message?.message, 'success')
        await refetchGetCompanyInfo()
      } else {
        openToast(message?.message, 'error')
        dispatch(companyInfoLoadingAction(false))
      }
    }
  }

  const setNmAction = async (e: string, hooks: companyInfoDataProps) => {
    const params = {
      ...hooks,
      name: e,
    }
    dispatch(companyInfoDataAction(params))
  }

  const setBusinessNmAction = async (e: string, hooks: companyInfoDataProps) => {
    const params = {
      ...hooks,
      businessNm: e,
    }
    dispatch(companyInfoDataAction(params))
  }

  const setWebsiteAction = async (e: string, hooks: companyInfoDataProps) => {
    const params = {
      ...hooks,
      website: e,
    }
    dispatch(companyInfoDataAction(params))
  }

  const setSubAddressAction = async (e: string, hooks: companyInfoDataProps) => {
    const params = {
      ...hooks,
      subAddressNm: e,
    }
    dispatch(companyInfoDataAction(params))
  }

  const init = async (cData: CompanyDto) => {
    const findType = companyTypeList.find(i => i.id === cData.categoryCode)
    const findUser = userCountList.find(i => i.id === cData.totalMembers)
    const findRegion = regionList.find(i => i.id === cData.countryCode)
    let params: companyInfoDataProps = {
      companyId: Number(cData.companyId),
      name: cData.ceoName ?? '',
      companyNm: cData.name ?? '',
      type: findType ? findType : { id: '', name: '' },
      userCount: findUser ? findUser : { id: '', name: '' },
      businessNm: cData.bizRegisNo ?? '',
      website: cData.wsite ?? '',
      region: findRegion ? findRegion : { id: '', name: '' },
      addressNm: cData.address ?? '',
      regionNm: '',
      subAddressNm: cData.detailedAddress ?? '',
      addressNmErr: '',
      isOverseas: findRegion?.id !== 'KOR' ?? false,
      filesList: [],
      deletefilesList: [],
    }
    if (cData.attachedList && cData.attachedList.length > 0) {
      for await (const param of cData.attachedList) {
        let temp = {
          fileSrc: param?.path || '-',
          id: param?.attachedId?.toString() || '',
          filename: param?.name || '-',
        }
        params.filesList = [...params.filesList, temp]
      }
    }
    dispatch(companyInfoDataAction(params))
  }

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
      } else {
        dispatch(regionListAction(list))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }, [getCommonCode])

  useEffect(() => {
    if (!companyInfo) return
    const { status, data, message } = companyInfo as BaseResponseCommonObject
    if (status === 'S') {
      init(data as CompanyDto)
    } else {
      openToast(message?.message, 'error')
    }
  }, [companyInfo])

  return {
    isCompanyLoading,
    companyInfoData,
    companyTypeList,
    userCountList,
    regionList,
    addressPopup,
    companyInfoLoading,

    setUserCountAction,
    setRegionAction,
    setIsOverseasPolicy,
    setTypeAction,
    setAddressPopupAction,
    setAddressAction,
    onDeleteUserFile,
    onChangeFiles,

    saveCompanyInfo,
    setBusinessNmAction,
    setNmAction,
    setWebsiteAction,
    setSubAddressAction,
  }
}
