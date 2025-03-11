import { Fragment, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import SharedCheckBox from '~/components/contents/common/shared/CheckboxItem'
import { openToast } from '~/utils/common/toast'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useShared } from '~/utils/hooks/contents/shared/useShared'

const Shared = () => {
  const {
    isDemoLicense,
    activityOpenRef,
    keyword,
    sharedPopup,
    activityOpen,
    keywordList,
    searchInputRef,
    sharedPopupContentAction,
    initPopupAction,
    sharedPopupAddEmailpAction,
    sharedPopupTargetEmailpAction,
    setActivityOpenActionAction,
    sharedPopupResetTagListOnChange,
    sharedPopupTagCloseOnChange,
    sharedPopupKeywordsOnChange,
    sharedPopupKeywordsDelete,
    sharedPopupTargetEmailCloseOnChange,
    sharedPopupResetTargetEmailListOnChange,
    validationCheck,
    sharedAction,
  } = useShared()
  const { getInputRef } = useValidate()
  const [isLoading, setIsLoading] = useState(false)

  const emailAction = async () => {
    setIsLoading(() => true)
    const check = await validationCheck(sharedPopup)
    if (check) {
      if (isDemoLicense) {
        openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
      } else {
        await sharedAction(sharedPopup)
      }
    }
    setIsLoading(() => false)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node))
        setActivityOpenActionAction(false)
    },
    [activityOpen]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <>
      <Popup
        isOpen={sharedPopup.isOpen}
        onClose={() => initPopupAction()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={sharedPopup.popupTitle === '' ? '공유하기' : sharedPopup.popupTitle}
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={sharedPopup.popupConfirmText === '' ? '확인' : sharedPopup.popupConfirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => emailAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => initPopupAction()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        <ul>
          <li>
            <FormTitle
              title="제목"
              required={true}
            />
            <FormInputText
              disabled={true}
              value={sharedPopup.title}
            />
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'받는 사람'}
                required={true}
              />
              <div
                className={cn('select-form__group', {
                  'is-show': activityOpen,
                  'is-selected': activityOpen,
                })}
                ref={activityOpenRef}
              >
                <button
                  className="select-form__label"
                  onClick={() => setActivityOpenActionAction(!activityOpen)}
                >
                  <span className="select-form__label-text">선택</span>
                  <IcoSvg data={icoSvgData.chevronDown} />
                </button>
                <div className={cn('select-form-option__section')}>
                  <div className="select-form-option__area">
                    <ul className="select-form-option__group">
                      <li>
                        <div className="lnb-filter__search">
                          <FormInputSearch
                            id={'list-search' + 'sharedPopup'}
                            name={'list-search' + 'sharedPopup'}
                            onChange={e => sharedPopupKeywordsOnChange(e.target.value, sharedPopup)}
                            getInputRef={ref => getInputRef(ref, searchInputRef)}
                            onKeyUp={() =>
                              sharedPopupKeywordsOnChange(searchInputRef?.current?.value || '', sharedPopup)
                            }
                            value={keyword}
                            onDeleteButtonClick={() => sharedPopupKeywordsDelete(sharedPopup)}
                          />
                        </div>
                      </li>
                      {keywordList &&
                        keywordList.length > 0 &&
                        keywordList.map(i => (
                          <SharedCheckBox
                            key={'sharedPopup_filterSearchData' + i.id}
                            {...i}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              {sharedPopup.receiverErr !== '' && (
                <FormMsg
                  msg={sharedPopup.receiverErr}
                  type={'error'}
                />
              )}
              <TagList
                isTitle={true}
                tagItems={sharedPopup.receiverList}
                onTagItemClose={e => sharedPopupTagCloseOnChange(e, sharedPopup)}
                onAllTagItemClose={() => sharedPopupResetTagListOnChange(sharedPopup)}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'받는 메일 추가'} />
              <div className="select-form__group">
                <div className={cn('ipt-text__group', 'container-type')}>
                  <FormInputText
                    value={sharedPopup.addEmail}
                    onAdd={e => sharedPopupTargetEmailpAction(sharedPopup)}
                    addBtn={true}
                    onChange={e => sharedPopupAddEmailpAction(e.target.value, sharedPopup)}
                  />
                </div>
              </div>
              {sharedPopup.targetEmailErr !== '' && (
                <FormMsg
                  msg={sharedPopup.targetEmailErr}
                  type={'error'}
                />
              )}
              <TagList
                isTitle={true}
                tagItems={sharedPopup.targetEmail}
                onTagItemClose={e => sharedPopupTargetEmailCloseOnChange(e, sharedPopup)}
                onAllTagItemClose={() => sharedPopupResetTargetEmailListOnChange(sharedPopup)}
              />
            </div>
          </li>
          {sharedPopup.type === 'fileShare' ? (
            <Fragment>
              <li className="textarea__area">
                <FormTitle title="내용" />
                <div className="textarea__group">
                  <textarea
                    placeholder=""
                    rows={6}
                    onChange={e => sharedPopupContentAction(e.target.value, sharedPopup)}
                    value={sharedPopup.contents}
                  ></textarea>
                </div>
              </li>
              <li className="mb-contents-pb16__group">
                <FormTitle title="첨부파일" />
                {sharedPopup.files.length > 0 && (
                  <>
                    {sharedPopup.files.map((e, index) => (
                      <p key={index.toString() + e.name + e.type}>
                        <Button
                          elem="a"
                          url={''}
                          label={e.name ? e.name : ''}
                          cate={'link-text'}
                          size={'s'}
                          color={'gray-500'}
                        />
                      </p>
                    ))}
                  </>
                )}
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="textarea__area">
                <FormTitle title="메세지" />
                <div className="textarea__group">
                  <textarea
                    placeholder=""
                    rows={6}
                    onChange={e => sharedPopupContentAction(e.target.value, sharedPopup)}
                    value={sharedPopup.contents}
                  ></textarea>
                </div>
              </li>
              <li>
                <FormTitle title="내용" />
                <FormTitle title={sharedPopup.editorData} />
              </li>
            </Fragment>
          )}
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default Shared
