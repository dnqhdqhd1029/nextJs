/**
 * @file EmailWarning.tsx
 * @description
 */
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { getCurrencyFormat } from '~/utils/common/number'

interface Props {
  emailReservedCount: number
  emailSendCount: number
}
export const EmailErrorMsg = (props: Props) => {
  const router = useRouter()
  return (
    <>
      이메일 건수가 부족해 메일과 보도자료를 보낼 수 없습니다.
      <br />
      보유한 이메일 건수: {getCurrencyFormat(props.emailReservedCount)}개
      <br />
      필요한 이메일 건수: {getCurrencyFormat(props.emailSendCount)}개
      <p className="mt-8">
        <Button
          elem="button"
          label={'이메일 구매하기'}
          cate={'link-text-arrow'}
          size={'m'}
          color={'primary'}
          icoRight={true}
          icoRightData={icoSvgData.chevronRight}
          onClick={() => router.push('/payment/additional-services')}
        />
      </p>
    </>
  )
}
