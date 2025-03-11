import { Fragment, useState } from 'react'

import ExcelStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Excel/Excel'
import EndStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Personal/Done'
import PersonalStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Personal/Personal'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const MediaStep = () => {
  const { categoryData } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.id === 'media' && categoryData.main === 'next' && (
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                {/* <h2 className="common-title__title">{categoryData.name} 추가</h2> */}
                <h2 className="common-title__title">연락처 추가</h2>
                {categoryData.nextStep === 'excel' && (
                  <div className="common-title__buttons">
                    <div className="steps__group">
                      <ul className="steps__list">
                        <li className={categoryData.addStep === 'add' ? 'is-active' : ''}>
                          <p className="steps__text">파일</p>
                        </li>
                        <li className={categoryData.addStep === 'list' ? 'is-active' : ''}>
                          <p className="steps__text">목록</p>
                        </li>
                        <li className={categoryData.addStep === 'end' ? 'is-active' : ''}>
                          <p className="steps__text">완료</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <PersonalStep />
            <ExcelStep />
            <EndStep />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default MediaStep
