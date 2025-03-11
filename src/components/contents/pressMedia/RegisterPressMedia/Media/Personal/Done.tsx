import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const EndStep = () => {
  const router = useRouter()
  const { categoryData, medialistKey, categoryDataInformationHandle } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.nextStep === 'end' && (
        <Fragment>
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">미디어를 추가했습니다.</p>
          </div>
          <div className="mb-contents-footer__section">
            <div className="buttons__group type-left">
              <Button
                label={`미디어 추가`}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => categoryDataInformationHandle('information', categoryData)}
              />
              <Button
                elem="button"
                label={`입력한 미디어 보기`}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => router.push(`/media/record/${Number(medialistKey.id) || 0}`)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default EndStep
