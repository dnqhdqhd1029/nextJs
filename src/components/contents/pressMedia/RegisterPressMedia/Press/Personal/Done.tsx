import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const EndStep = () => {
  const router = useRouter()
  const { categoryData, journalistKey, categoryDataInformationHandle } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.nextStep === 'end' && (
        <Fragment>
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">언론인을 추가했습니다.</p>
          </div>
          <div className="mb-contents-footer__section">
            <div className="buttons__group type-left">
              <Button
                label={`연락처 추가`}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => categoryDataInformationHandle('information', categoryData)}
              />
              <Button
                elem="button"
                label={`입력한 언론인 보기`}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => router.push(`/contacts/record/${Number(journalistKey.id) || 0}`)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default EndStep
