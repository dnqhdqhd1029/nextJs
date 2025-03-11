/**
 * @file EmailWarning.tsx
 * @description
 */
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { getCurrencyFormat } from '~/utils/common/number'

interface Props {
  emailReservedCount?: number
}
export const EmailWarningMsg = (props: Props) => {
  const router = useRouter()
  return (
    <>
      이메일 발송 가능 건수가 {getCurrencyFormat(props.emailReservedCount)}개 남았습니다.
      <br />
      이메일 건수를 구매해 충전할 수 있습니다.
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
