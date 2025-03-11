import { Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import TagList from '~/components/common/ui/TagList'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const OneByOneStep = () => {
  const {
    currentGroup,
    registerType,
    step,
    emailData,
    emailDataChecked,
    handlePagestepAction,
    setTagTargetEmailListAction,
    setAllResetTargetEmailListAction,
    setResetTargetEmailListAction,
  } = useAddUser()

  useEffect(() => {
    console.log('emailData', emailData)
  }, [])
  return (
    <Fragment>
      <div style={{ display: step === 'email' && registerType === 'self' ? 'block' : 'none' }}>
        <div className={cn('setting-member__section')}>
          <ul className="interval-line-list28">
            <li>
              <div className="mb-contents-pb16__group">
                <h3
                  className="setting__headings6"
                  style={{ fontWeight: 600 }}
                >
                  1명씩 추가
                </h3>
                <p className="font-body__regular">추가할 회원을 입력하세요</p>
              </div>
              <div className="form-pb0">
                <div className="ipt-text__section w480">
                  <FormInputText
                    title={'이메일 추가'}
                    required={true}
                    onAdd={e => setTagTargetEmailListAction(e, emailData)}
                    failed={emailData.emailErr !== ''}
                    msg={emailData.emailErr}
                    value={emailData.email}
                    addBtn={true}
                  />
                  <TagList
                    tagItems={emailData.targetEmail}
                    onTagItemClose={e => setResetTargetEmailListAction(e, emailData)}
                    onAllTagItemClose={() => setAllResetTargetEmailListAction(emailData)}
                  />
                </div>
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
                onClick={() => handlePagestepAction('', '', currentGroup)}
              />
            </div>
            <Button
              label={'다음'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              icoRight={true}
              disabled={!emailDataChecked}
              icoRightData={icoSvgData.chevronThickRight}
              onClick={() => emailDataChecked && handlePagestepAction('authority', 'self', currentGroup)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OneByOneStep
