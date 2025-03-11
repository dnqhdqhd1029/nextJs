import { Fragment, useState } from 'react'

import Button from '~/components/common/ui/Button'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const EndStep = () => {
  const { categoryData, categoryDataInformationHandle, movePressSearchResult } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.addStep === 'end' && (
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
                onClick={() => movePressSearchResult()}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default EndStep
