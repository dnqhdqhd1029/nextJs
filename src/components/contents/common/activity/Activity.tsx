import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import Editor from '~/components/common/ui/Editor'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import SelectTime from '~/components/common/ui/SelectTime'
import TagList from '~/components/common/ui/TagList'
import { extendedShareScopeList, settingReceiverList } from '~/components/contents/activity/common/defaultData'
import MediaBookSearch from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import PressBookSearch from '~/components/contents/common/forms/PressBookSearchForm/PressBookSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import TagSearch from '~/components/contents/common/forms/TagSearchForm/TagSearch'
import { SelectListOptionItem } from '~/types/common'
import { transformTimezoneText } from '~/utils/common/date'
import { useActivityPopup } from '~/utils/hooks/contents/activity/useActivityPopup'

const Activity = () => {
  const customHooks = useActivityPopup()
  const [isLoading, setIsLoading] = useState(false)
  const [currentCursorPosition, setCurrentCursorPosition] = useState<string>('')
  const getMiddleOpenRef = useRef<HTMLDivElement>(null)

  const activityAction = async () => {
    setIsLoading(() => true)
    const res = await customHooks.nextStepValidate(customHooks.activity)
    if (res) await customHooks.setActivityAction(customHooks.activity, customHooks.editorData)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])

  return (
    <>
      <Popup
        isOpen={customHooks.activity.isOpen}
        onClose={() =>
          customHooks.isWrite ? customHooks.setActivityCancelPopupAction(true) : customHooks.setActivityPopup()
        }
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={customHooks.activity.key > 0 ? '활동 수정' : '활동 만들기'}
        width={800}
        // height={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={customHooks.activity.key > 0 ? '수정' : '저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => activityAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'tertiary'}
              disabled={isLoading}
              onClick={() =>
                customHooks.isWrite ? customHooks.setActivityCancelPopupAction(true) : customHooks.setActivityPopup()
              }
            />
          </div>
        }
      >
        <div ref={getMiddleOpenRef}>
          <ul>
            {customHooks.activity.key > 0 && customHooks.ownerId === customHooks.userInfo.userId && (
              <li>
                <div className="select-form__section select-form-btn">
                  <FormTitle title={'소유자'} />
                  <Select
                    options={customHooks.activity.ownerGroupList}
                    onChange={(option: SelectListOptionItem) =>
                      customHooks.setOwnerChangedkey(option, customHooks.activity)
                    }
                    value={customHooks.activity.ownerChangedkey}
                  />
                </div>
              </li>
            )}
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle
                  title={'유형'}
                  required={true}
                />
                <Select
                  options={customHooks.activity.activityTypeList}
                  onChange={(option: SelectListOptionItem) => customHooks.setActivityType(option, customHooks.activity)}
                  value={customHooks.activity.activityType}
                  failed={customHooks.activity.activityTypeMsg !== ''}
                  msg={customHooks.activity.activityTypeMsg ? customHooks.activity.activityTypeMsg : ''}
                />
              </div>
            </li>
            <li>
              <FormTitle
                title="제목"
                required={true}
              />
              <FormInputText
                required={true}
                maxLength={100}
                onChange={e => customHooks.setEmailPopupTitleAction(e.target.value, customHooks.activity)}
                failed={customHooks.activity.titleErr !== ''}
                msg={customHooks.activity.titleErr}
                value={customHooks.activity.title}
              />
            </li>
            {(customHooks.activity.key > 0 && customHooks.ownerId === customHooks.userInfo.userId) ||
              (customHooks.activity.key === 0 && (
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle
                      title={'공유 설정'}
                      required={true}
                    />
                    <Select
                      options={extendedShareScopeList}
                      onChange={(option: SelectListOptionItem) => customHooks.setScrop(option, customHooks.activity)}
                      value={customHooks.activity.scrop}
                    />
                  </div>
                </li>
              ))}
            {customHooks.activity.activityType.id !== 'NOTE' && (
              <li>
                <div className="select-form__section select-form-btn">
                  <FormTitle title={'상태'} />
                  <Select
                    options={customHooks.activity.activityStateList}
                    onChange={(option: SelectListOptionItem) =>
                      customHooks.setActivityState(option, customHooks.activity)
                    }
                    value={customHooks.activity.activityState}
                    listDirection="up"
                  />
                </div>
              </li>
            )}
            <li>
              {/* <div className="mb-contents-pb16__group"> */}
              <div>
                <div className="ipt-btn__section sp-pb-2">
                  <FormTitle title={'관련 항목'} />
                  <ul className="ipt-btn__list--row">
                    {settingReceiverList.map((e, index) => (
                      <li key={index + e.id}>
                        <FormBasicRadio
                          name={e.id}
                          id={e.id}
                          label={e.title}
                          onChange={() => customHooks.setReceiverGroupAction(e.id, customHooks.activity)}
                          checked={customHooks.activity.receiverGroup === e.id}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="select-form__section select-form-input">
                  {customHooks.activity.receiverGroup === 'press' && (
                    <PressSearch
                      highlightedString={true}
                      mediaListValueList={customHooks.activity.tagPressList}
                      onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.activity)}
                    />
                  )}
                  {customHooks.activity.receiverGroup === 'media' && (
                    <MediaSearch
                      highlightedString={true}
                      mediaListValueList={customHooks.activity.tagPressList}
                      onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.activity)}
                    />
                  )}
                  {customHooks.activity.receiverGroup === 'pressList' && (
                    <PressBookSearch
                      isJustCount={true}
                      isDetail={true}
                      mediaListValueList={customHooks.activity.tagPressList}
                      onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.activity)}
                    />
                  )}
                  {customHooks.activity.receiverGroup === 'mediaList' && (
                    <MediaBookSearch
                      isJustCount={false}
                      isDetail={true}
                      mediaListValueList={customHooks.activity.tagPressList}
                      onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.activity)}
                    />
                  )}
                  <TagList
                    tagItems={customHooks.activity.tagPressList}
                    onTagItemClose={e => customHooks.setResetTagPressListAction(e, customHooks.activity)}
                    onAllTagItemClose={() => customHooks.setAllResetTagPressListAction(customHooks.activity)}
                  />
                </div>
              </div>
            </li>
            {customHooks.activity.activityType.id === 'PROMISE' && (
              <li>
                <FormTitle title={'날짜'} />
                <div className="datepicker-time__section">
                  <div className="datepicker-time__group">
                    <DatePicker
                      forbiddenBefore={true}
                      onCalendarChange={(date: Date) =>
                        customHooks.dateConfirmPageDataAction(date, customHooks.activity)
                      }
                      selectedDate={customHooks.activity.selectedDate}
                      errorMsg={customHooks.activity.dateErrorMessage}
                    />
                    <SelectTime
                      placeholder={'시간 선택'}
                      changeWidth={'min(50%, 100px)'}
                      value={customHooks.activity.selectedTime}
                      onSelect={(hour: number, minute: number) =>
                        customHooks.timeConfirmPageDataAction(hour, minute, customHooks.activity)
                      }
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150 }}>
                      {transformTimezoneText(customHooks.timeZoneData.name)}
                    </div>
                  </div>
                </div>
              </li>
            )}
            <li>
              <div
                className="mb-contents-pb16__group"
                // style={{ paddingTop: 5 }}
              >
                <FormTitle title="본문" />
                <div className="iframe-content__container__wrapper position-relative activity-popup__editor">
                  <Editor
                    getEditorContentString={customHooks.activity.getEditorContentString}
                    editorContent={customHooks.activity.receivedEditorContent}
                    onGetEditorContent={(e: string) => {
                      customHooks.handleEditorContentGet(e)
                    }}
                    onGetEditorImage={(e: string) => console.log('onGetEditorImage', e)}
                    onSetCurrentCursorPosition={(position: string) => setCurrentCursorPosition(position)}
                    currentCursorPosition={currentCursorPosition}
                    errorMessage={customHooks.activity.contentErrorMessage}
                    height={250}
                    type="E"
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="select-form__section select-form-input">
                <div className="select-form__group">
                  <FormTitle title={'태그'} />
                  <TagSearch
                    isOpen={true}
                    isAdd={true}
                    category={'ACTION'}
                    currentRef={
                      getMiddleOpenRef && typeof getMiddleOpenRef !== 'function' ? getMiddleOpenRef.current : null
                    }
                    tagValueList={customHooks.activity.tagList}
                    onChangeTagList={e => customHooks.handleTagStatusChange(e, customHooks.activity)}
                  />
                  <TagList
                    tagItems={customHooks.activity.tagList}
                    onTagItemClose={e => customHooks.handleTagClose(e, customHooks.activity)}
                    onAllTagItemClose={() => customHooks.handleResetTagList(customHooks.activity)}
                  />
                </div>
              </div>
            </li>
            <li className="mb-contents-pb8__group">
              <div className="file-uploader-button__section type-only">
                <FormTitle title="첨부" />
                <div className="file-uploader-button__header">
                  <div className="file-uploader-button__group">
                    <button
                      type="button"
                      className="file-uploader-button__upload"
                      disabled={
                        customHooks.filesListLoading
                          ? true
                          : customHooks.activity.filesList && customHooks.activity.filesList.length > 4
                      }
                    >
                      <span className="file-uploader-button__text">파일 찾기</span>
                    </button>
                    <input
                      type="file"
                      className="file-uploader-button__input"
                      onChangeCapture={e => customHooks.onChangeFiles(e, customHooks.activity)}
                      disabled={
                        customHooks.filesListLoading
                          ? true
                          : customHooks.activity.filesList && customHooks.activity.filesList.length > 4
                      }
                      multiple
                    />
                  </div>
                  <p className="file-uploader-button__text">
                    {parseInt(customHooks.settingsRefinedValue['max_size_per_file'])}MB 이하 이미지와 문서 첨부 가능
                  </p>
                </div>
                <div className="file-uploader__list-container">
                  <ul className="file-uploader__list">
                    {customHooks.activity.filesList.map((item, i) => (
                      <li
                        className="file-uploader__list-item"
                        key={'file-uploader__list-item' + item.id}
                      >
                        <span className="file-uploader__list-item-title cursor-pointer width__auto">
                          {item?.file?.name || item.filename} ({item.size}
                          {'kb'})
                        </span>
                        <button
                          type="button"
                          className="file-uploader__list-item-delete"
                          onClick={e => customHooks.onDeleteUserFile(item, customHooks.activity)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default Activity
