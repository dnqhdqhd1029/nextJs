import { ChangeEvent, Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Editor from '~/components/common/ui/Editor'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { FileType } from '~/stores/modules/contents/email/email'
import { contactInfoPopupAction } from '~/stores/modules/contents/pressRelease/pressRelease'
import { apiGetContactInfo } from '~/utils/api/setting/contactInfo/userGetContactInfo'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

interface Props {
  offRouteChangeBlocking: any
}

const fileSizeUnit = 'KB'
const fileSizeLimit = 5 * 1024
const fileLengthLimit = 5

const ContentsStep = (props: Props) => {
  const router = useRouter()
  const {
    templatePageData,
    settingPageData,
    contentPageData,
    mediaPopup,
    tab,
    mailingId,
    confirmPageData,
    isAddTemplate,
    contactInfoPopup,
    tabChangeAction,
    initNoticePopup,
    contentPageDataFilesOnChange,
    contentPageDataTitleOnChange,
    contentPageDataDeleteUserFile,
    contentPageDataPhoneCheck,
    contactInfoTemplateOpen,
    previewPopupOpen,
    editorData,
    iinitTemplatePopupAction,
    initMediaPopup,
    initInputMediaPopupPopup,
    contentStepValidate,
    fromContentsToConfirm,
    unLockAction,
    editStepMailingIdAndOut,
    handleEditorContentGet,
    uploadFile,
    fromDataToContents,
    fromSettingToTemplate,
    contentPageDataContactInfoInsert,
  } = usePressRelese()

  const dispatch = useDispatch()
  const [isLoadingId, setIsLoadingId] = useState<string>('')
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const dragRef = useRef<HTMLDivElement | null>(null)
  const [currentCursorPosition, setCurrentCursorPosition] = useState<string>('')

  const actionAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoadingId('out')
    const check = await contentStepValidate(contentPageData, editorData)
    if (check) {
      const releaseData = await fromDataToContents(mailingId, editorData)
      const res = await editStepMailingIdAndOut(
        settingPageData,
        templatePageData,
        contentPageData,
        releaseData ? releaseData.confirm : confirmPageData,
        editorData,
        mailingId,
        tab.id
      )
      if (res === 'S') {
        const unLock = await unLockAction(mailingId)
        unLock === 'S' && props.offRouteChangeBlocking(() => router.push('/activity/search'))
      }
    }
    setIsLoadingId('')
  }

  const actionAndNext = async () => {
    setIsLoadingId('next')
    const check = await contentStepValidate(contentPageData, editorData)
    if (check) {
      const releaseData = await fromDataToContents(mailingId, editorData)
      const res = await editStepMailingIdAndOut(
        settingPageData,
        templatePageData,
        contentPageData,
        releaseData ? releaseData.confirm : confirmPageData,
        editorData,
        mailingId,
        tab.id
      )
      if (res === 'S') await fromContentsToConfirm(mailingId)
    }
    setIsLoadingId('')
  }
  const actionAndPrev = async () => {
    setIsLoadingId('prev')
    const releaseData = await fromDataToContents(mailingId, editorData)
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      contentPageData,
      releaseData ? releaseData.confirm : confirmPageData,
      editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') {
      isAddTemplate
        ? await fromSettingToTemplate(mailingId)
        : await tabChangeAction({ id: 'template', title: '템플릿' })
    }
    setIsLoadingId('')
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any) => {
    let selectFiles = []
    let tempFiles: FileType[] = contentPageData.filesList
    if (e.type === 'drop') {
      selectFiles = e.dataTransfer.files
    } else {
      selectFiles = e.target.files
    }
    if (selectFiles && selectFiles.length > 0) {
      const result = await uploadFile(selectFiles, tempFiles, fileSizeUnit, fileSizeLimit, fileLengthLimit)
      result.length > 0 && contentPageDataFilesOnChange(result, contentPageData)
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

  useEffect(() => {
    initDragEvents()
    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  return (
    <>
      {tab.id === 'content' && (
        <Fragment>
          <div
            className="mb-contents-layout__contents"
            ref={dragRef}
          >
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <ul>
                  <li>
                    <FormTitle
                      title="이메일 제목"
                      required={true}
                    />
                    <FormInputText
                      required={true}
                      onChange={e => contentPageDataTitleOnChange(e.target.value, contentPageData)}
                      failed={contentPageData.titleErr !== ''}
                      msg={contentPageData.titleErr}
                      value={contentPageData.title}
                    />
                  </li>
                  <li>
                    <div
                      className="mb-contents-pb16__group"
                      style={{ paddingTop: 10 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                          <FormTitle
                            title="본문"
                            required={true}
                          />
                          <div style={{ paddingBottom: 13, paddingLeft: 21 }}>
                            <Button
                              elem="a"
                              url={''}
                              label={'미리보기'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => previewPopupOpen('', settingPageData)}
                            />
                          </div>
                          <div style={{ paddingBottom: 13, paddingLeft: 21 }}>
                            <Button
                              elem="a"
                              url={''}
                              label={'치환태그 사용법'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => initNoticePopup(true)}
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
                            onClick={() => initMediaPopup(true)}
                          />
                          <Button
                            label={'템플릿 저장'}
                            cate={'default'}
                            size={'s'}
                            color={'tertiary'}
                            onClick={() =>
                              iinitTemplatePopupAction({
                                isOpen: true,
                                key: 0,
                                content: editorData,
                                valueErr: '',
                                value: '',
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="iframe-content__container__wrapper position-relative">
                        {!mediaPopup.isOpen && (
                          <Editor
                            getEditorContentString={contentPageData.getEditorContentString}
                            editorContent={contentPageData.receivedEditorContent}
                            onGetEditorContent={(e: string) => handleEditorContentGet(e)}
                            onGetEditorImage={(e: string) => console.log('onGetEditorImage', e)}
                            onSetCurrentCursorPosition={(position: string) => setCurrentCursorPosition(position)}
                            currentCursorPosition={currentCursorPosition}
                            errorMessage={contentPageData.contentError}
                            height={400}
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
                          onClick={() => initInputMediaPopupPopup(true)}
                        />
                      </div>
                    </div>
                    <div className="file-uploader__section file-type2">
                      <section className={cn('fui-dropzone-root', { 'is-disabled': isDragging })}>
                        <div className="files-ui-dropzone-children-container">
                          <label htmlFor="fileUpload_press_release">
                            {' '}
                            클릭하거나 드래그해 파일을 올리세요.
                            <span>여러 개를 한꺼번에 첨부할 수 있습니다. 최대 파일 크기는 5MB.</span>
                          </label>
                          <input
                            id={'fileUpload_press_release'}
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
                        {contentPageData.filesList.map((item, i) => (
                          <li
                            className="file-uploader__list-item"
                            key={'file-uploader__list-item_fileUpload_press_release' + item.filename + item.fileSrc}
                          >
                            <div>
                              <p className="file-uploader__list-item-title">
                                {item?.file?.name || item.filename} (
                                {getCurrencyFormat(
                                  Math.round(item?.file?.size ? item?.file?.size / 1024 : item?.size ?? 0)
                                )}
                                KB)
                              </p>
                            </div>
                            <button
                              type="button"
                              className="file-uploader__list-item-delete"
                              onClick={e => contentPageDataDeleteUserFile(item, contentPageData)}
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
                              contentPageDataContactInfoInsert(contactInfoPopup.content, editorData, contentPageData)
                            }}
                          />
                        </div>
                        <div
                          className="form-default__header form-pb0"
                          style={{ justifyContent: 'flex-end', gap: 5 }}
                        >
                          <Button
                            elem="a"
                            label={'이메일 서명 수정'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                            onClick={async () => {
                              const { status, message, data } = await apiGetContactInfo()
                              if (status === 'S') {
                                const param = {
                                  isOpen: true,
                                  type: 'contactInfo_press',
                                  content: String(data),
                                  contentErrorMessage: '',
                                  data: '',
                                }
                                dispatch(contactInfoPopupAction(param))
                              } else {
                                openToast(message?.message, 'error')
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <li>
                        <FormBasicCheckbox
                          label={'연락처 정보 표시'}
                          name="pressRelease-content-add-check"
                          id="pressRelease-content-add-check"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            contentPageDataPhoneCheck(e.target.checked, contentPageData)
                          }
                          checked={contentPageData.checkPhone}
                        />
                      </li>
                      <li>
                        <Button
                          elem="a"
                          url={''}
                          label={'연락처 정보 수정'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() =>
                            contactInfoTemplateOpen({
                              isOpen: false,
                              type: 'contactInfo_press',
                              data: '',
                              content: '',
                              contentErrorMessage: '',
                            })
                          }
                        />
                      </li>
                    </ul> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-contents-layout__footer">
            <div className="distribute-steps__footer">
              <div className="footer-button__group">
                <ul className="footer-button__list">
                  <li>
                    <Button
                      label={'이전'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'tertiary'}
                      icoLeft={true}
                      isLoading={isLoadingId === 'prev'}
                      disabled={isLoadingId !== ''}
                      icoLeftData={icoSvgData.chevronThickLeft}
                      onClick={() => actionAndPrev()}
                    />
                  </li>
                </ul>
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'저장하고 나가기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      isLoading={isLoadingId === 'out'}
                      disabled={isLoadingId !== ''}
                      onClick={e => actionAndOut(e)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      isLoading={isLoadingId === 'next'}
                      disabled={isLoadingId !== ''}
                      icoRightData={icoSvgData.chevronThickRight}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default ContentsStep
