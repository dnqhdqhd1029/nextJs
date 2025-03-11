import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { BaseResponseCommonObject } from '~/types/api/service'
import { usePostPayRequestComplete } from '~/utils/api/payment/usePayment'
import { makeSignature, makeVerification } from '~/utils/common/inicis'
import { openToast } from '~/utils/common/toast'

const payResultSchema = z.object({
  payRequestId: z.coerce.string().optional(),
  CARD_Quota: z.coerce.string().optional(),
  CARD_ClEvent: z.coerce.string().optional(),
  CARD_CorpFlag: z.coerce.string().optional(),
  buyerTel: z.coerce.string().optional(),
  parentEmail: z.coerce.string().optional(),
  applDate: z.coerce.string().optional(),
  buyerEmail: z.coerce.string().optional(),
  OrgPrice: z.coerce.string().optional(),
  p_Sub: z.coerce.string().optional(),
  resultCode: z.coerce.string().optional(),
  mid: z.coerce.string().optional(),
  CARD_UsePoint: z.coerce.string().optional(),
  CARD_Num: z.coerce.string().optional(),
  authSignature: z.coerce.string().optional(),
  tid: z.coerce.string().optional(),
  EventCode: z.coerce.string().optional(),
  goodName: z.coerce.string().optional(),
  TotPrice: z.coerce.string().optional(),
  payMethod: z.coerce.string().optional(),
  CARD_MemberNum: z.coerce.string().optional(),
  MOID: z.coerce.string().optional(),
  CARD_Point: z.coerce.string().optional(),
  currency: z.coerce.string().optional(),
  CARD_PurchaseCode: z.coerce.string().optional(),
  CARD_PrtcCode: z.coerce.string().optional(),
  applTime: z.coerce.string().optional(),
  goodsName: z.coerce.string().optional(),
  CARD_CheckFlag: z.coerce.string().optional(),
  FlgNotiSendChk: z.coerce.string().optional(),
  CARD_Code: z.coerce.string().optional(),
  CARD_BankCode: z.coerce.string().optional(),
  CARD_TerminalNum: z.coerce.string().optional(),
  P_FN_NM: z.coerce.string().optional(),
  buyerName: z.coerce.string().optional(),
  p_SubCnt: z.coerce.string().optional(),
  applNum: z.coerce.string().optional(),
  resultMsg: z.coerce.string().optional(),
  CARD_Interest: z.coerce.string().optional(),
  CARD_SrcCode: z.coerce.string().optional(),
  CARD_ApplPrice: z.coerce.string().optional(),
  CARD_GWCode: z.coerce.string().optional(),
  custEmail: z.coerce.string().optional(),
  CARD_Expire: z.coerce.string().optional(),
  CARD_PurchaseName: z.coerce.string().optional(),
  CARD_PRTC_CODE: z.coerce.string().optional(),
  payDevice: z.coerce.string().optional(),
  authToken: z.coerce.string().optional(),
  netCancelUrl: z.coerce.string().optional(),
  returnUrl: z.coerce.string().optional(),
  payViewAt: z.coerce.string().optional(),
  companyName: z.coerce.string().optional(),
})

const InicisResult = () => {
  const router = useRouter()
  const [routerQuery, setRouterQuery] = useState<z.infer<typeof payResultSchema>>()

  const cancelPay = async () => {
    if (routerQuery) {
      const { mid, authToken, netCancelUrl } = routerQuery
      const timestamp = new Date().getTime()
      const signature = makeSignature(authToken ?? '', timestamp)
      const verification = makeVerification(authToken ?? '', timestamp)
      await axios
        .post('/api/post/inicisCancel', {
          netCancelUrl,
          mid: mid ?? '',
          authToken: authToken ?? '',
          timestamp,
          signature,
          verification,
          charset: 'UTF-8',
          format: 'JSON',
        })
        .then(res => {
          console.log(res)
          goBack()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const goBack = () => {
    if (routerQuery) {
      const { returnUrl } = routerQuery
      router.replace(returnUrl ?? '/dashboard')
    }
  }

  const setPayment = usePostPayRequestComplete({
    onSuccess: response => {
      const { status, message } = response as BaseResponseCommonObject

      if (status === 'S') {
        goBack()
      } else {
        openToast(message?.message ?? '결제 정보 등록에 실패했습니다.', 'error')
        cancelPay().then(() => {
          goBack()
        })
      }
    },
    onError: error => {
      console.log(error)
    },
  })

  const base64ToUtf8 = (base64String: string) => {
    const binaryString = atob(base64String)

    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const decoder = new TextDecoder('utf-8')
    return decoder.decode(bytes)
  }

  useEffect(() => {
    if (!!Object.keys(router.query).length) {
      setRouterQuery(
        Object.fromEntries(
          Object.entries(router.query)[0][0]
            .split('&')
            .map(keyValue => {
              const [key, value] = keyValue.split('=')
              return [key, value]
            })
        ) as z.infer<typeof payResultSchema>
      )
    }
  }, [router.query])

  useEffect(() => {
    if (routerQuery) {
      const { success } = payResultSchema.safeParse(routerQuery)
      if (success) {
        const { resultCode, resultMsg, payRequestId } = routerQuery

        if (resultCode === '0000') {
          if (!!payRequestId && !!parseInt(payRequestId)) {
            const { authToken, ...data } = routerQuery
            setPayment.mutate({
              payRequestId: parseInt(payRequestId),
              paymentTransactions: JSON.stringify(data),
              email: data.buyerEmail ?? '',
              userName: data.buyerName ?? '',
              companyName: base64ToUtf8(data.companyName ?? ''),
              amount: parseInt(data.TotPrice ?? '0'),
              payViewAt: data.payViewAt,
            })
            openToast(resultMsg ?? '결제에 성공했습니다.', 'success')
          } else {
            openToast('결제에 성공했지만 결제 정보를 찾을 수 없습니다.', 'warning')
            cancelPay()
          }
        } else {
          // 망 취소 로직
          cancelPay()
          openToast(resultMsg ?? '결제에 실패하였습니다.', 'error')
        }
      } else {
        cancelPay()
        openToast('결제 정보에 오류가 있습니다.', 'error')
      }
    }
  }, [routerQuery])

  return <></>
}

export default InicisResult
InicisResult.Layout = 'PAYMENT'
