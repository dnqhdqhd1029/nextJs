/**
 * @file useAdditionalServices.ts
 * @description 부가 서비스
 */

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  initPopupTypesAction,
  itemListAction,
  itemTypeAction,
  popupTypesAction,
  PopupTypesProps,
  selectedAction,
  selectedValueAction,
  servicePopupAction,
} from '~/stores/modules/contents/additionalServices/additionalServices'
import { paymentsIdAction } from '~/stores/modules/contents/payment/payment'
import { BaseResponseCommonObject, PayRequestDto, ProductDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import {
  useGetAdditionsProduct,
  useGetAdditionsProductDetail,
  usePostInquiry,
  UsePostInquiryParams,
} from '~/utils/api/additionalServices/useGetLicenseInfo'
import { CommonCode, useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePayRequestAdditionalService } from '~/utils/api/payment/usePayment'
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

export const useAdditionalServices = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const { selectedValue, itemType, servicePopup, popupTypes, selectedList, itemList, itemKey } = useAppSelector(
    state => state.additionalServicesSlice
  )

  const { data: getCommonCode } = useGetCommonCode({
    parentCode:
      router.pathname === '/payment/additional-services'
        ? popupTypes.selectedList.length < 1
          ? 'INQUIRY_WHY_CODE'
          : ''
        : '',
  })
  const { isLoading: additionsProductLoading, data: getAdditionsProduct } = useGetAdditionsProduct(
    router.pathname === '/payment/additional-services' ? (popupTypes.selectedList.length > 0 ? 1 : 0) : 0
  )
  const { isLoading: listItemLoading, data: getAdditionsProductDetail } = useGetAdditionsProductDetail(
    router.pathname === '/payment/additional-services' ? (selectedValue.id !== '' ? Number(selectedValue.id) : 0) : 0
  )

  const apiInquiryAction = usePostInquiry()
  const apiPayRequestAdditionalService = usePayRequestAdditionalService()

  const setPopupSelectedValueAction = useCallback(
    (param: SelectListOptionItem, e: PopupTypesProps) => {
      const params = {
        ...e,
        selectedValue: param,
      }
      dispatch(popupTypesAction(params))
    },
    [dispatch]
  )

  const setPopupTitleAction = async (param: string, e: PopupTypesProps) => {
    const params = {
      ...e,
      title: param,
      titleErr: '',
    }
    dispatch(popupTypesAction(params))
  }

  const setPopupContentAction = async (param: string, e: PopupTypesProps) => {
    const params = {
      ...e,
      contents: param,
      contentsErr: '',
    }
    dispatch(popupTypesAction(params))
  }

  const onDeleteUserFile = useCallback(
    (param: FileType, e: PopupTypesProps) => {
      if (e.filesList && e.filesList.length > 0) {
        const files = e.filesList.filter(file => file.id !== param.id)
        const params = {
          ...e,
          filesList: files,
        }
        dispatch(popupTypesAction(params))
      }
    },
    [dispatch]
  )

  const openRequestPopup = useCallback(
    async (param: PopupTypesProps) => {
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
      dispatch(popupTypesAction(params))
    },
    [dispatch]
  )

  const setPopupAction = async (e: PopupTypesProps, type: string) => {
    if (e.title === '') {
      const params = {
        ...e,
        titleErr: '제목을 입력해주세요',
      }
      dispatch(popupTypesAction(params))
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
        dispatch(initPopupTypesAction())
        type === '13' && (await router.push('/setting/license-info'))
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const additionalServiceDone = async (e: string, type: string) => {
    if (e === '' || type === '') {
      openToast('수량을 선택해주세요', 'warning')
    } else {
      let params = {
        productId: Number(e),
        count: Number(type),
      }
      const { status, data, message } = await apiPayRequestAdditionalService.mutateAsync(params)
      if (status === 'S') {
        const res = data as PayRequestDto
        if (res.payRequestId) {
          const param = {
            paymentsId: res.payRequestId,
            paymentTypeKey: 'additionalService',
            count: Number(type),
            productId: Number(e),
          }
          dispatch(paymentsIdAction(param))
          await router.replace('/payment')
        }
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const setItemTypeAction = useCallback(
    (e: string, i: string) => dispatch(itemTypeAction({ itemType: e, itemKey: i })),
    [dispatch]
  )
  const setServicePopupAction = useCallback((e: boolean) => dispatch(servicePopupAction(e)), [dispatch])
  const setInitPopupTypesAction = useCallback(() => dispatch(initPopupTypesAction()), [dispatch])
  const setSelectedValueAction = useCallback((e: SelectListOptionItem) => dispatch(selectedValueAction(e)), [dispatch])

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

  const onChangeFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement> | any, items: PopupTypesProps): Promise<void> => {
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
        dispatch(popupTypesAction(params))
      }
    },
    [popupTypes]
  )

  useEffect(() => {
    if (!getCommonCode) return
    const { status, data, message } = getCommonCode as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as CommonCode[]
      const list = res.map(e => {
        return { id: e.code, name: e.name }
      })
      const params = {
        ...popupTypes,
        selectedValue: list[0],
        selectedList: list,
      }
      dispatch(popupTypesAction(params))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getCommonCode])

  useEffect(() => {
    if (!getAdditionsProduct) return
    let params = [{ id: '', name: '선택' }]
    const { status, data, message } = getAdditionsProduct as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as ProductDto[]
      const list = res.map(e => {
        return { id: e?.productId?.toString() || '', name: e?.name || '' }
      })
      dispatch(selectedAction({ item: { id: '', name: '선택' }, list: params.concat(list) }))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getAdditionsProduct])

  useEffect(() => {
    if (!getAdditionsProductDetail) return
    const { status, data, message } = getAdditionsProductDetail as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as { count: number; computedPrice: number; price: number }[]
      const list = res.map(e => {
        return { count: e?.count || 0, price: e?.price || 0, computedPrice: e?.computedPrice || 0 }
      })
      dispatch(itemListAction(list))
    } else {
      openToast(message?.message, 'error')
      router.replace('/dashboard')
    }
  }, [getAdditionsProductDetail])

  return {
    additionsProductLoading,
    listItemLoading,
    itemType,
    itemKey,
    selectedList,
    itemList,
    popupTypes,
    servicePopup,
    selectedValue,
    setSelectedValueAction,
    setItemTypeAction,
    setServicePopupAction,
    setInitPopupTypesAction,
    setPopupSelectedValueAction,
    onDeleteUserFile,
    openRequestPopup,
    onChangeFiles,
    additionalServiceDone,
    setPopupAction,
    setPopupContentAction,
    setPopupTitleAction,
  }
}
