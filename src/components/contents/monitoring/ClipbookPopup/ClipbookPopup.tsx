import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import SharedCheckBox from '~/components/contents/monitoring/ClipbookPopup/CheckBoxItem'
import {
  defaultClipbookSetting,
  extendedShareScopeList,
} from '~/components/contents/monitoring/ClipbookPopup/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const ClipbookPopup = () => {
  const {
    clipbookListParams,
    activityOpenRef,
    activityOpen,
    keyword,
    prjList,
    keywordList,
    clipbookPopup,
    setClipbookPopupTitleOnChange,
    setActivityOpenActionAction,
    setInitClipbookPopup,
    setClipbookPopupCoverageIdOnChange,
    setClipbookPopupHandleShareSetting,
    setClipbookPopupHandleScropChanged,
    setClipbookPopupHandleSelectedUser,
    clipbookPopupKeywordsOnChange,
    clipbookPopupTagCloseOnChange,
    clipbookPopupResetTagListOnChange,
    getSearchActionByKeywordSearch,
    checkValidation,
    clipbookAction,
  } = useMonitoringClipbookSearch()
  const debouncedSearchInputValue = useDebounce(keyword, 300)

  const [isLoading, setIsLoading] = useState(false)

  const setAction = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(clipbookPopup)
    if (check) {
      await clipbookAction(clipbookPopup, prjList, clipbookListParams)
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

  useEffect(() => {
    keyword !== '' && getSearchActionByKeywordSearch(keyword)
  }, [debouncedSearchInputValue])

  return (
    <>
      <Popup
        isOpen={clipbookPopup.isOpen}
        onClose={() => setInitClipbookPopup()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={clipbookPopup.key > 0 ? '클립북 수정' : '클립북 만들기'}
        width={500}
        // height={500}
        className="popup-none-scroll"
        buttons={
          <div className="popup-footer__section">
            <Button
              label={clipbookPopup.key > 0 ? '수정' : '저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => setAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => setInitClipbookPopup()}
            />
          </div>
        }
      >
        {/* <div className="popup-contents__section"> */}
        {/* <ul className="interval-mt14"> */}
        <ul>
          <li>
            <FormTitle
              title={'이름'}
              required={true}
            />
            <FormInputText
              required={true}
              onChange={e => setClipbookPopupTitleOnChange(e.target.value, clipbookPopup)}
              failed={clipbookPopup.nameErr !== ''}
              msg={clipbookPopup.nameErr}
              value={clipbookPopup.name}
            />
          </li>
          <li>
            <FormTitle
              title={'유형 선택'}
              tooltip={true}
            >
              <Tooltips
                tooltipId={'tt1-1'}
                tooltipPlace={'top'}
                tooltipHtml={
                  '커버리지 클립북을 설정하면 보도자료 배포 후 클립한 뉴스를 효율적으로 관리할 수 있습니다. 또한, 커버리지 클립북에는 일반 클립북에는 없는 관련 보도자료 연결 기능이 포함되어 있습니다.'
                }
                tooltipComponent={<IcoTooltip />}
              />
            </FormTitle>
            <div
              className="ipt-btn__section"
              // style={{ paddingTop: 10, paddingBottom: 10 }}
            >
              {defaultClipbookSetting.map((e, index) => (
                <FormBasicRadio
                  key={'defaultClipbookSetting' + e.id + e.name}
                  name={'coverage-check' + e.id}
                  id={'coverage-check' + e.id}
                  label={e.name}
                  checked={clipbookPopup.coverageId.id === e.id}
                  value={e.id}
                  onChange={() => setClipbookPopupCoverageIdOnChange(e, clipbookPopup)}
                  className={index === 1 ? 'ml-20' : ''}
                />
              ))}
            </div>
          </li>
          {clipbookPopup.coverageId.id === 'COVERAGE' && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'관련 보도자료'} />
                <div
                  className={cn('select-form__group', {
                    'is-show': activityOpen,
                    // 'is-danger': failed,
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
                    <FormInputSearch
                      id={'list-search' + 'clipbookPopup'}
                      name={'list-search' + 'clipbookPopup'}
                      placeholder={'검색'}
                      onChange={e => clipbookPopupKeywordsOnChange(e.target.value)}
                      value={keyword}
                      onDeleteButtonClick={() => clipbookPopupKeywordsOnChange('')}
                    />
                    <div className="select-form-option__area">
                      <ul className="select-form-option__group">
                        {/* <li>
                          <div className="lnb-filter__search">
                            <FormInputSearch
                              id={'list-search' + 'clipbookPopup'}
                              name={'list-search' + 'clipbookPopup'}
                              placeholder={'검색'}
                              onChange={e => clipbookPopupKeywordsOnChange(e.target.value)}
                              value={keyword}
                              onDeleteButtonClick={() => clipbookPopupKeywordsOnChange('')}
                            />
                          </div>
                        </li> */}
                        {keywordList &&
                          keywordList.length > 0 &&
                          keywordList.map(i => (
                            <SharedCheckBox
                              key={'clipbookPopup_filterSearchData' + i.id}
                              {...i}
                            />
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <TagList
                  isTitle={true}
                  tagItems={prjList}
                  onTagItemClose={e => clipbookPopupTagCloseOnChange(e, prjList)}
                  onAllTagItemClose={() => clipbookPopupResetTagListOnChange()}
                />
              </div>
            </li>
          )}
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'공유 설정'} />
              <Select
                options={extendedShareScopeList}
                onChange={(option: SelectListOptionItem) => setClipbookPopupHandleShareSetting(option, clipbookPopup)}
                value={clipbookPopup.scrop}
                disabled={!clipbookPopup.isOwner}
              />
            </div>
          </li>
          {clipbookPopup.key < 1 && (
            <li>
              <div className="ipt-btn__section">
                <FormTitle title={'변경한 공유 설정을 목록 만들기에 기본값으로 사용하겠습니까?'} />
                <ul className="ipt-btn__list--row">
                  <li>
                    <FormBasicCheckbox
                      label={'기본값으로 사용'}
                      name={'clipbook-create_clipbookPopup'}
                      id={'clipbook-create_clipbookPopup'}
                      onChange={() => setClipbookPopupHandleScropChanged(!clipbookPopup.isScropChanged, clipbookPopup)}
                      checked={clipbookPopup.isScropChanged}
                    />
                  </li>
                </ul>
              </div>
            </li>
          )}
          {clipbookPopup.key > 0 && (
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'소유자'} />
                <Select
                  options={clipbookPopup.userList}
                  onChange={(option: SelectListOptionItem) => setClipbookPopupHandleSelectedUser(option, clipbookPopup)}
                  value={clipbookPopup.selectedUser}
                  disabled={!clipbookPopup.isOwner}
                />
              </div>
            </li>
          )}
        </ul>
        {/* </div> */}
      </Popup>
    </>
  )
}

export default ClipbookPopup
