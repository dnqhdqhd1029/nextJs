/**
 * @file NewswireWarning.tsx
 * @description
 */
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

export const NewswireErrorMsg = () => {
  const router = useRouter()
  return (
    <>
      뉴스와이어 배포를 모두 사용했습니다.
      <br />
      뉴스와이어 배포 건수를 구매해 충전할 수 있습니다.
      <p className="mt-8">
        <Button
          elem="button"
          label={'뉴스와이어 구매하기'}
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
