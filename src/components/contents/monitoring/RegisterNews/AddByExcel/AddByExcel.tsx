import { ChangeEvent, Fragment, MouseEvent, useLayoutEffect, useState } from 'react'

import Done from '~/components/contents/monitoring/RegisterNews/AddByExcel/Done/Done'
import FileStep from '~/components/contents/monitoring/RegisterNews/AddByExcel/FileStep/FileStep'
import ListStep from '~/components/contents/monitoring/RegisterNews/AddByExcel/ListStep/ListStep'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const RegisterNewsExcel = () => {
  const { step, addStep, onChangeStep } = useRegisterNews()

  return (
    <Fragment>
      {step === 'excel' && (
        <Fragment>
          <div className="mb-contents-header__section type-sticky">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">뉴스 추가</h2>
                <div className="common-title__buttons">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li className={addStep === 'add' ? 'is-active' : ''}>
                        <p className="steps__text">파일</p>
                      </li>
                      <li className={addStep === 'clipbook' ? 'is-active' : ''}>
                        <p className="steps__text">목록</p>
                      </li>
                      <li className={addStep === 'done' ? 'is-active' : ''}>
                        <p className="steps__text">완료</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FileStep />
          <ListStep />
          <Done />
        </Fragment>
      )}
    </Fragment>
  )
}

export default RegisterNewsExcel
