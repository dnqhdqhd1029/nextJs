import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import Editor from '~/components/common/ui/Editor'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import PartitionSelect from '~/components/common/ui/PartitionSelect'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import SelectTime from '~/components/common/ui/SelectTime'
import TagList from '~/components/common/ui/TagList'
import {
  defaultSendEmailTemplateTypeList,
  defaultSendEmailTypeList,
  extendedShareScopeList,
  settingReceiverList,
} from '~/components/contents/common/email/defaultData'
import InputMediaPopup from '~/components/contents/common/email/MediaPopup/InputMediaPopup'
import TemplateChangePopup from '~/components/contents/common/email/TemplateChangePopup'
import TemplateDeletePopup from '~/components/contents/common/email/TemplateDeletePopup'
import { EmailWarningMsg } from '~/components/contents/common/email/Warning'
import MbTagSearch from '~/components/contents/common/forms/MbTagSearch'
import MediaBookSearch from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import PressBookSearch from '~/components/contents/common/forms/PressBookSearchForm/PressBookSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import MbTagSearchCreateLayer from '~/components/contents/common/layer/MbTagSearchCreateLayer/MbTagSearchCreateLayer'
import { FileType } from '~/stores/modules/contents/email/email'
import { TagDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem, TagSearchCreateLayerItem } from '~/types/contents/Common'
import { transformTimezoneText } from '~/utils/common/date'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

export type emailResultType = {
  resultCode: string
  resultCount: number
}

const fileSizeUnit = 'KB'
const fileSizeLimit = 5 * 1024
const fileLengthLimit = 5

const Email = () => {
  const customHooks = useEmail()

  const dragRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState(false)
  const [showAddEmail, setShowAddEmail] = useState<boolean>(false)
  const [currentCursorPosition, setCurrentCursorPosition] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState<SelectListOptionItem>()
  const [isChangeTemplateModal, setIsChangeTemplateModal] = useState<boolean>(false)
  const [isDeleteTemplateModal, setIsDeleteTemplateModal] = useState<boolean>(false)

  const checkCount = async () => {
    if (!customHooks.isDemoLicense && customHooks.emailPopup.isOpen) {
      const res: emailResultType = customHooks.checkReservedEmailCount()
      if (res.resultCode === 'warning') {
        openToast(<EmailWarningMsg emailReservedCount={res.resultCount} />, 'warning')
      }
    }
  }

  const emailAction = async (type: string) => {
    setIsFetching(() => true)
    const res = await customHooks.nextStepValidate(customHooks.emailPopup, customHooks.editorData)
    if (res) {
      if (type === 'send') {
        customHooks.popupConfirmAction(true)
      } else {
        await customHooks.setEmailAction(
          customHooks.emailPopup,
          customHooks.editorData,
          type,
          customHooks.deletedFileIdList
        )
      }
    }
    setIsFetching(() => false)
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any) => {
    let selectFiles = []
    let tempFiles: FileType[] = customHooks.emailPopup.filesList
    if (e.type === 'drop') {
      selectFiles = e.dataTransfer.files
    } else {
      selectFiles = e.target.files
    }
    if (selectFiles && selectFiles.length > 0) {
      const result = await customHooks.uploadFile(selectFiles, tempFiles, fileSizeUnit, fileSizeLimit, fileLengthLimit)
      result.length > 0 && customHooks.contentFilesOnChange(result, customHooks.emailPopup)
    }

    e.target.value = null
  }

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer?.files) {
      setIsDragging(true)
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles]
  )

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn)
      dragRef.current.addEventListener('dragleave', handleDragOut)
      dragRef.current.addEventListener('dragover', handleDragOver)
      dragRef.current.addEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn)
      dragRef.current.removeEventListener('dragleave', handleDragOut)
      dragRef.current.removeEventListener('dragover', handleDragOver)
      dragRef.current.removeEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const validateTime = (hours: number, minutes: number) => {
    const year = customHooks.emailPopup.selectedDate.getFullYear()
    const month = customHooks.emailPopup.selectedDate.getMonth()
    const day = customHooks.emailPopup.selectedDate.getDate()
    const date = new Date(year, month, day, hours, minutes)
    if (date < new Date()) {
      openToast('예약 시간은 현재 시간보다 늦은 시간이어야 합니다.', 'warning')
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    initDragEvents()
    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  useEffect(() => {
    checkCount()
    if (customHooks.emailPopup.isOpen) {
      setTimeout(() => {
        customHooks.contactInfoTemplateOpen({ ...customHooks.contactInfoPopup, type: 'contactInfo_emal' })
      }, 500)
    }
  }, [customHooks.emailPopup.isOpen])

  useEffect(() => {
    setIsFetching(() => false)
  }, [])

  return (
    <>
      <Popup
        isOpen={customHooks.emailPopup.isOpen}
        onClose={() =>
          customHooks.isWrite ? customHooks.setEmailCancelPopupAction(true) : customHooks.setEmailPopup()
        }
        hasCloseButton
        hasCloseButtonLoading={isFetching}
        title={customHooks.emailPopup.key > 1 ? '이메일 수정' : '이메일 보내기'}
        width={1140}
        // height={800}
        buttons={
          <div className="popup-footer__section type2">
            <ul className="buttons">
              <li className="outline">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  disabled={isFetching}
                  onClick={() =>
                    customHooks.isWrite ? customHooks.setEmailCancelPopupAction(true) : customHooks.setEmailPopup()
                  }
                />
                <Button
                  label={customHooks.emailPopup.key > 1 ? '수정' : '저장'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  isLoading={isFetching}
                  disabled={isFetching}
                  onClick={() => {
                    emailAction(customHooks.emailPopup.key > 1 ? 'edit' : 'register')
                  }}
                />
              </li>
              <li>
                <Button
                  label={'보내기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  disabled={isFetching}
                  onClick={() => {
                    if (customHooks.isDemoLicense) {
                      openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
                    } else {
                      emailAction('send')
                    }
                  }}
                />
              </li>
            </ul>
          </div>
        }
      >
        <div
          /* className="popup-contents__section" */
          ref={dragRef}
        >
          <ul className="grid-col2">
            <li>
              <div className="ipt-btn__section">
                <FormTitle title={'템플릿'} />
                <ul className="ipt-btn__list--row">
                  {defaultSendEmailTemplateTypeList.map(e => (
                    <li key={'defaultSendEmailTemplateTypeList' + e.id.toString()}>
                      <FormBasicRadio
                        name={e.id}
                        id={e.id}
                        label={e.title}
                        onChange={() => {
                          if (e.id === 'no' && selectedTemplate) {
                            setIsDeleteTemplateModal(true)
                          } else {
                            customHooks.setTemplateActionAction(e.id, customHooks.emailPopup)
                          }
                        }}
                        checked={customHooks.emailPopup.isTemplate === e.id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              {customHooks.emailPopup.isTemplate === 'use' && (
                <div className="select-form__section select-form-btn">
                  <FormTitle
                    title={'템플릿 선택'}
                    required={true}
                  />
                  <PartitionSelect
                    options={[
                      {
                        id: 'sample',
                        name: '샘플',
                        subOptions: customHooks.userTemplateList.filter(
                          template => template.extra === 'true' && !!template.id
                        ),
                      },
                      {
                        id: 'save',
                        name: '저장',
                        subOptions: customHooks.userTemplateList.filter(
                          template => template.extra === 'false' && !!template.id
                        ),
                      },
                    ]}
                    onChange={(option: SelectListOptionItem) => {
                      if (customHooks.emailPopup.templateType.id === '') {
                        setSelectedTemplate(option)
                        customHooks.handleShareSetting(option, customHooks.emailPopup)
                      } else {
                        setSelectedTemplate(option)
                      }
                      setIsChangeTemplateModal(true)
                    }}
                    value={customHooks.emailPopup.templateType}
                    listDirection="down"
                    onClickList={e => customHooks.setAdjustTemplateAction(e)}
                  />
                </div>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <FormInputText
                title={'보내는 사람'}
                tooltip={true}
                value={customHooks.emailPopup.name}
                readonly={true}
              />
            </li>
            <li>
              {/* <div className="mb-contents-pb16__group"> */}
              <div>
                <div className="ipt-btn__section sp-pb-2">
                  <FormTitle
                    title={'받는 사람'}
                    required={true}
                  />
                  <ul className="ipt-btn__list--row">
                    {settingReceiverList.map((e, index) => (
                      <li key={index + e.id + uuid()}>
                        <FormBasicRadio
                          name={e.id + uuid()}
                          id={e.id + uuid()}
                          label={e.title}
                          onChange={() => customHooks.setReceiverGroupAction(e.id, customHooks.emailPopup)}
                          checked={customHooks.emailPopup.receiverGroup === e.id}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="select-form__section select-form-input">
                  <Fragment>
                    {customHooks.emailPopup.receiverGroup === 'press' && (
                      <PressSearch
                        highlightedString={true}
                        mediaListValueList={customHooks.emailPopup.tagPressList}
                        onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.emailPopup)}
                      />
                    )}
                    {customHooks.emailPopup.receiverGroup === 'media' && (
                      <MediaSearch
                        highlightedString={true}
                        mediaListValueList={customHooks.emailPopup.tagPressList}
                        onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.emailPopup)}
                      />
                    )}
                    {customHooks.emailPopup.receiverGroup === 'pressList' && (
                      <PressBookSearch
                        isJustCount={true}
                        isDetail={true}
                        mediaListValueList={customHooks.emailPopup.tagPressList}
                        onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.emailPopup)}
                      />
                    )}
                    {customHooks.emailPopup.receiverGroup === 'mediaList' && (
                      <MediaBookSearch
                        isJustCount={false}
                        isDetail={true}
                        mediaListValueList={customHooks.emailPopup.tagPressList}
                        onChangeTagList={e => customHooks.setTagPressListAction(e, customHooks.emailPopup)}
                      />
                    )}
                    <TagList
                      tagItems={customHooks.emailPopup.tagPressList}
                      onTagItemClose={e => customHooks.setResetTagPressListAction(e, customHooks.emailPopup)}
                      onAllTagItemClose={() => customHooks.setAllResetTagPressListAction(customHooks.emailPopup)}
                    />
                  </Fragment>
                </div>
              </div>
            </li>
            <li style={{ paddingBottom: showAddEmail ? 0 : 13 }}>
              <Button
                elem="a"
                url={''}
                label={'메일 추가'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => {
                  setShowAddEmail(!showAddEmail)
                }}
              />
            </li>
            <li
              style={{
                position: showAddEmail ? 'relative' : 'absolute',
                left: showAddEmail ? '0' : '-99999999px',
                opacity: showAddEmail ? 1 : 0,
                transform: showAddEmail ? 'translateY(0)' : 'translateY(-20%)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <MbTagSearch
                title={''}
                onTagListChange={(tagItems: MbTagSearchTagItem[]) =>
                  customHooks.setTagTargetEmailListAction(customHooks.emailPopup, tagItems)
                }
                storedTagItems={customHooks.emailPopup.targetEmail}
                key={'targetEmail'}
                functionType={'inputTagAdd'}
                validateType={'email'}
                maxTagLimitTitle={'받는 메일'}
              />
            </li>
            <li>
              <FormTitle
                title="제목"
                required={true}
              />
              <FormInputText
                required={true}
                onChange={e => customHooks.setEmailPopupTitleAction(e.target.value, customHooks.emailPopup)}
                failed={customHooks.emailPopup.contentTitleErr !== ''}
                msg={customHooks.emailPopup.contentTitleErr}
                value={customHooks.emailPopup.title}
              />
            </li>
            <li>
              <div
                className="mb-contents-pb16__group"
                style={{ paddingTop: 5 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    <FormTitle
                      title="내용"
                      required={true}
                    />
                    <div style={{ /*  paddingBottom: 13, */ paddingLeft: 16 }}>
                      <Button
                        elem="a"
                        url={''}
                        label={'미리보기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                        onClick={() => customHooks.previewPopupOpen('', customHooks.emailPopup)}
                      />
                    </div>
                    <div style={{ /*  paddingBottom: 13, */ paddingLeft: 16 }}>
                      <Button
                        elem="a"
                        url={''}
                        label={'치환태그 사용법'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                        onClick={() => customHooks.popupNoticeAction(true)}
                      />
                    </div>
                  </div>
                  <div
                    className="form-default__header form-pb0"
                    style={{ justifyContent: 'flex-end', gap: 5 }}
                  >
                    <Button
                      label={'미디어 자료실'}
                      cate={'default'}
                      size={'s'}
                      color={'tertiary'}
                      onClick={() => customHooks.initMediaPopup(true)}
                    />
                  </div>
                </div>
                <div className="iframe-content__container__wrapper position-relative email-popup__editor">
                  {!customHooks.mediaPopup.isOpen && (
                    <Editor
                      getEditorContentString={customHooks.emailPopup.getEditorContentString}
                      editorContent={customHooks.emailPopup.receivedEditorContent}
                      onGetEditorContent={(e: string) => {
                        customHooks.handleEditorContentGet(e)
                      }}
                      onGetEditorImage={(e: string) => console.log('onGetEditorImage', e)}
                      onSetCurrentCursorPosition={(position: string) => setCurrentCursorPosition(position)}
                      currentCursorPosition={currentCursorPosition}
                      errorMessage={customHooks.emailPopup.contentErrorMessage}
                      height={250}
                      type="E"
                    />
                  )}
                </div>
              </div>
            </li>
            <li style={{ paddingBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <FormTitle title="파일 첨부" />
                </div>
                <div
                  className="form-default__header form-pb0"
                  style={{ justifyContent: 'flex-end', gap: 5 }}
                >
                  <Button
                    label={'미디어 자료실'}
                    cate={'default'}
                    size={'s'}
                    color={'tertiary'}
                    onClick={() => customHooks.initInputMediaPopupPopup(true)}
                  />
                </div>
              </div>
              <div className="file-uploader__section file-type2">
                <section className={cn('fui-dropzone-root', { 'is-disabled': isDragging })}>
                  <div className="files-ui-dropzone-children-container">
                    <label htmlFor="fileUpload_email">
                      {' '}
                      클릭하거나 드래그해 파일을 올리세요.
                      <span>여러 개를 한꺼번에 첨부할 수 있습니다. 최대 파일 크기는 5MB.</span>
                    </label>
                    <input
                      id={'fileUpload_email'}
                      type="file"
                      className="file-uploader__input"
                      onChangeCapture={onChangeFiles}
                      multiple={true}
                      style={{ display: 'none' }}
                    />
                  </div>
                </section>
              </div>
              <div className="file-uploader__list-container">
                <ul className="file-uploader__list">
                  {customHooks.emailPopup.filesList.map((item, i) => (
                    <li
                      className="file-uploader__list-item"
                      key={'file-uploader__list-item' + item.filename}
                    >
                      <div>
                        <p className="file-uploader__list-item-title">
                          {item?.file?.name || item.filename} ({getCurrencyFormat(Math.round(item.size ?? 0))}
                          {'KB'})
                        </p>
                      </div>
                      <button
                        type="button"
                        className="file-uploader__list-item-delete"
                        onClick={e =>
                          customHooks.onDeleteUserFile(
                            item,
                            customHooks.emailPopup.filesList,
                            customHooks.emailPopup,
                            customHooks.deletedFileIdList
                          )
                        }
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div
                className="mb-contents-pb16__group"
                style={{ paddingTop: 10 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    <Button
                      elem="a"
                      label={'+ 이메일 서명 추가'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                      onClick={e => {
                        e.preventDefault()
                        customHooks.actionContactInfoInsert(
                          customHooks.contactInfoPopup.content,
                          customHooks.editorData
                        )
                      }}
                    />
                  </div>
                  <div
                    className="form-default__header form-pb0"
                    style={{ justifyContent: 'flex-end', gap: 5 }}
                  >
                    <Button
                      elem="a"
                      url={''}
                      label={'이메일 서명 수정'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                      onClick={e => {
                        e.preventDefault()
                        customHooks.contactInfoTemplateOpen({ ...customHooks.contactInfoPopup, isOpen: true })
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="grid-col2">
            <li>
              <div className="ipt-btn__section">
                <FormTitle
                  title={'발송 시간'}
                  required={true}
                />
                <ul className="ipt-btn__list--row">
                  {defaultSendEmailTypeList.map(e => (
                    <li key={'defaultSendEmailTypeList' + e.id.toString()}>
                      <FormBasicRadio
                        name={e.id}
                        id={e.id}
                        label={e.title}
                        onChange={() => customHooks.setmailStateGroupActionAction(e.id, customHooks.emailPopup)}
                        checked={customHooks.emailPopup.mailStateGroup === e.id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              {customHooks.emailPopup.mailStateGroup !== 'now' && (
                <Fragment>
                  <FormTitle
                    title={'예약시간 선택'}
                    required={true}
                  />
                  <div className="datepicker-time__section">
                    <div className="datepicker-time__group">
                      <DatePicker
                        forbiddenBefore={true}
                        onCalendarChange={(date: Date) =>
                          customHooks.dateConfirmPageDataAction(date, customHooks.emailPopup)
                        }
                        selectedDate={customHooks.emailPopup.selectedDate}
                        errorMsg={customHooks.emailPopup.dateErrorMessage}
                      />
                      <SelectTime
                        placeholder={'시간 선택'}
                        changeWidth={'min(50%, 100px)'}
                        value={customHooks.emailPopup.selectedTime}
                        onSelect={(hour: number, minute: number) =>
                          customHooks.timeConfirmPageDataAction(hour, minute, customHooks.emailPopup)
                        }
                        validateFunc={validateTime}
                      />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150 }}>
                        {transformTimezoneText(customHooks.timeZoneData.name)}
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle title={'공유 설정'} />
                <Select
                  options={extendedShareScopeList}
                  onChange={(option: SelectListOptionItem) =>
                    customHooks.setScropShareSetting(option, customHooks.emailPopup)
                  }
                  value={customHooks.emailPopup.scrop}
                  listDirection="up"
                />
              </div>
            </li>
            <li>
              {/* <div className="select-form__section select-form-input"> */}
              <div className="select-form__section select-form-input">
                <div className="select-form__group">
                  <FormTitle title={'태그'} />
                  <Fragment>
                    <MbTagSearchCreateLayer
                      isOpen={true}
                      category={'ACTION'}
                      mode={'FLAT'}
                      position={'up'}
                      parentTagItems={customHooks.emailPopup.tagList}
                      onCreateSuccess={(item: TagDto) =>
                        customHooks.handleTagCreateSuccess(item, customHooks.emailPopup)
                      }
                      onTagStatusChange={(e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) =>
                        customHooks.handleTagStatusChange(e, item, customHooks.emailPopup)
                      }
                    />
                    <TagList
                      tagItems={customHooks.emailPopup.tagList}
                      onTagItemClose={e => customHooks.handleTagClose(e, customHooks.emailPopup)}
                      onAllTagItemClose={() => customHooks.handleResetTagList(customHooks.emailPopup)}
                    />
                  </Fragment>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Popup>
      {isChangeTemplateModal && (
        <TemplateChangePopup
          onClose={() => setIsChangeTemplateModal(false)}
          onConfirm={() => {
            if (selectedTemplate) {
              customHooks.handleShareSetting(selectedTemplate, customHooks.emailPopup)
              setIsChangeTemplateModal(false)
            } else {
              openToast('템플릿을 찾을 수 없습니다.', 'error')
            }
          }}
        />
      )}
      {isDeleteTemplateModal && (
        <TemplateDeletePopup
          onClose={() => setIsDeleteTemplateModal(false)}
          onConfirm={() => {
            customHooks.setTemplateActionAction('no', customHooks.emailPopup)
            setIsDeleteTemplateModal(false)
            setSelectedTemplate(undefined)
          }}
        />
      )}
      <InputMediaPopup />
    </>
  )
}

export default Email
