import { Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const FirstStep = () => {
  const router = useRouter()
  const { currentGroup, step, emailDataChecked, handleStartPagestepAction } = useAddUser()

  return (
    <Fragment>
      <div className="mb-contents-header__section type-sticky">
        <div className="common-title__section">
          <div className="common-title__group">
            <h2 className="common-title__title">회원 추가</h2>
            {step !== '' && (
              <div className="common-title__buttons">
                <div className="steps__group">
                  <ul className="steps__list">
                    <li
                      className={cn({ 'is-active': step === 'email' })}
                      style={{ cursor: 'pointer' }}
                    >
                      <p className="steps__text">이메일</p>
                    </li>
                    <li
                      className={cn({ 'is-active': step === 'authority' })}
                      style={{ cursor: emailDataChecked ? 'pointer' : '' }}
                    >
                      <p className="steps__text">권한</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ height: '1px', backgroundColor: '#d9dbdb', marginBottom: '22px' }}></div>
      <div style={{ display: step === '' ? 'block' : 'none' }}>
        <div className={cn('setting-member__section')}>
          <ul>
            <li>
              <p className="font-body__regular">회원 추가할 방법을 선택하세요.</p>
            </li>
            <br />
            <li>
              <div className="button-add__section">
                <button
                  type="button"
                  className="button-add__button"
                  onClick={() => handleStartPagestepAction('email', 'self', currentGroup)}
                >
                  <span className="button-add__button-ico">
                    <span className="ico-svg">
                      <img
                        src="/assets/svg/add-news.svg"
                        alt=""
                      />
                    </span>
                  </span>
                  <span className="button-add__button-text">1명씩 추가</span>
                </button>
                <button
                  type="button"
                  className="button-add__button"
                  onClick={() => handleStartPagestepAction('email', 'excel', currentGroup)}
                >
                  <span className="button-add__button-ico">
                    <span className="ico-svg">
                      <img
                        src="/assets/svg/add-excel.svg"
                        alt=""
                      />
                    </span>
                  </span>
                  <span className="button-add__button-text">엑셀로 추가</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div className="mb-contents-footer__section">
          <div className="buttons__group type-between">
            <div className="buttons__group type-left">
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => router.push('/admin/user')}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FirstStep
