/**
 * @file useMyPurchase.ts
 * @description 내 구매
 */

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { DefaultPaymentPopup } from '~/components/contents/setting/Member/defaultData'
import {
  initAction,
  invoiceTypeAction,
  isLoadingAction,
  isMyLicensePopupOpenAction,
  licensePopupAction,
  licensePopupProps,
  listKeywordParamsAction,
  merchantIdAction,
  PaymentInformationPopupProps,
  paymentPopupAction,
  payRequestDetailAction,
  payRequestSearchParamsAction,
  PayRequestSearchParamsType,
  setPayListAction,
} from '~/stores/modules/contents/myPurchase/myPurchase'
import { licenseInformationPopupAction } from '~/stores/modules/contents/user/user'
import { BaseResponseCommonObject, PayRequestDto, PayRequestForListDto } from '~/types/api/service'
import { TimeoutRef } from '~/types/common'
import type { PageableDataDto } from '~/types/contents/api'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import {
  apiGetPayRequest,
  apiGetPayRequestDetail,
  useGetPayRequest,
  useGetPayRequestDetail,
} from '~/utils/api/payRequest/useGetPayRequest'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useValidate } from '~/utils/hooks/common/useValidate'

export const useMyPurchase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { getInputRef } = useValidate()
  const timerRef: TimeoutRef = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    isLoading,
    listKeywordParams,
    payRequestSearchParams,
    invoiceType,
    merchantId,
    payRequestDetail,
    isMyLicensePopupOpen,
    payList,
    licensePopup,
    paymentPopup,
    pageCount,
  } = useAppSelector(state => state.myPurchaseSlice)
  const { isDemoLicense, licenseInfo, timeZone } = useAppSelector(state => state.authSlice)

  const setIsMyLicensePopupOpen = useCallback(
    (params: boolean) => dispatch(isMyLicensePopupOpenAction(params)),
    [dispatch]
  )

  const setLicensePopupAction = useCallback(
    (params: licensePopupProps) => dispatch(licensePopupAction(params)),
    [licensePopup]
  )

  const setPaymentPopupAction = useCallback(
    (params: PaymentInformationPopupProps) => dispatch(paymentPopupAction(params)),
    [paymentPopup]
  )

  const listKeywordParamsChange = useCallback(
    (e: string) => {
      dispatch(listKeywordParamsAction(e))
    },
    [listKeywordParams]
  )

  const initMerchantIdAction = useCallback(() => dispatch(initAction()), [dispatch])

  const moveToDetail = async (param: number) => {
    let tempParam = DefaultPaymentPopup
    try {
      const { status, data, message } = await apiGetPayRequestDetail(param)
      if (status === 'S') {
        const res = data as PayRequestDto
        tempParam = {
          isOpen: true,
          // @ts-ignore
          productNameList: res?.productNameList || '',
          licenseName: res?.licenseName || '',
          customerName: res?.customerName || '',
          payerName: res?.payerName || '',
          payerEmail: res?.payerEmail || '',
          payMethod: res?.payMethod || '',
          depositedAmount: res?.depositedAmount || 0,
          estimatedAmount: res?.estimatedAmount || 0,
          depositedAt: res?.depositedAt || '',
          // @ts-ignore
          isIssueInvoice: res?.isIssueInvoice || '',
          reigsName: res?.reigsName || '',
          regisAt: res?.regisAt || '',
        }
        if (res.invoiceType !== null && res.invoiceType !== undefined) {
          const { status, data, message } = await apiGetCommonCode({
            parentCode: 'INVOICE_TYPE',
          })
          if (status === 'S') {
            const versionCodes = data as CommonCode[]
            if (versionCodes.length > 0) {
              const findData = versionCodes.find(e => e.code === res.invoiceType)
              tempParam.invoiceType = findData ? findData.name : ''
            }
          }
        }
      }
    } catch (e) {}
    dispatch(paymentPopupAction(tempParam))
  }

  const openLicensePopup = async (param: number) => {
    dispatch(
      licenseInformationPopupAction({
        isOpen: true,
        idKey: param,
        license: null,
      })
    )
  }

  const handleKeywordsChange = async (e: string, hook: PayRequestSearchParamsType) => {
    const param = {
      ...hook,
      keyword: e,
    }
    await getPayRequestList(param, 0)
  }

  const handleChangeSize = async (e: number, hook: PayRequestSearchParamsType) => {
    const param = {
      ...hook,
      page: 1,
      size: e,
    }
    await getPayRequestList(param, 0)
  }

  const handleChangeSort = async (e: string[], hook: PayRequestSearchParamsType) => {
    const param = {
      ...hook,
      sort: e,
    }
    await getPayRequestList(param, 0)
  }

  const handlePaginationChange = async (e: number, hook: PayRequestSearchParamsType) => {
    const param = {
      ...hook,
      page: e,
    }
    await getPayRequestList(param, 0)
  }

  const handleChange = async (param: string, origin: PayRequestSearchParamsType) => {
    const params = {
      ...origin,
      keyword: param,
    }
    await getPayRequestList(params, 0)
  }

  const init = async () => {
    dispatch(initAction())
    await getPayRequestList({ page: 1, size: 20, sort: ['expireAt!desc'], keyword: '' }, 0)
  }

  const getInvoiceData = async (typeCheck: string) => {
    try {
      const { status, data, message } = await apiGetCommonCode({
        parentCode: 'INVOICE_TYPE',
      })
      if (status === 'S') {
        const versionCodes = data as CommonCode[]
        if (versionCodes.length > 0) {
          const findData = versionCodes.find(e => e.code === typeCheck)
          if (findData) dispatch(invoiceTypeAction(findData?.name))
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (error) {
      console.log('>> e', error)
    }
  }

  const getPayRequestList = async (param: PayRequestSearchParamsType, idKey: number) => {
    let tempContent: PayRequestForListDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 0,
    }
    dispatch(isLoadingAction(true))
    try {
      const { status, data, message } = await apiGetPayRequest({
        UseGetPayRequestParams: param,
        mId: idKey,
      })
      if (status === 'S') {
        const { content, totalElements, totalPages } = data as PageableDataDto<PayRequestForListDto>
        tempContent = content
        tempPageCount = {
          totalCount: totalElements ?? 0,
          totalPageCount: totalPages ?? 0,
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (error) {}
    dispatch(
      setPayListAction({
        apiDto: param,
        payList: tempContent,
        pageCount: tempPageCount,
      })
    )
  }

  return {
    licenseInfo,
    invoiceType,
    merchantId,
    payRequestDetail,
    isMyLicensePopupOpen,
    isLoading,
    payList,
    payRequestSearchParams,
    pageCount,
    timerRef,
    searchInputRef,
    listKeywordParams,
    timeZone,
    isDemoLicense,
    licensePopup,
    paymentPopup,

    moveToDetail,
    getInputRef,
    handleChange,
    init,
    handleKeywordsChange,
    handleChangeSort,
    handleChangeSize,
    handlePaginationChange,
    openLicensePopup,

    setLicensePopupAction,
    setPaymentPopupAction,
    setIsMyLicensePopupOpen,
    initMerchantIdAction,
    listKeywordParamsChange,
  }
}
