import { ChangeEvent, Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import EditorSimple from '~/components/common/ui/EditorSimple'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import UploadImageListItem from '~/components/contents/distribution/NewswireRelease/List/UploadImageListItem'
import { FileType } from '~/stores/modules/contents/email/email'
import { getYoutubeThumbnailUrl } from '~/utils/common/helper'
import { openToast } from '~/utils/common/toast'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface Props {
  offRouteChangeBlocking: any
}

const fileSizeUnit = 'MB'
const fileSizeLimit = 5
const fileLengthLimit = 5

const ContentsStep = (props: Props) => {
  const router = useRouter()
  const {
    tab,
    nwReleaseId,
    settingPageData,
    contentPageData,
    editorData,
    isEdit,
    importPopup,
    contentPageDataTitleOnChange,
    contentPageDataSubtitleOnChange,
    contentPageDataContactInfoOnChange,
    contentPageDataVideoSrcOnChange,
    contentPageDataVideoSrcOnDelete,
    contentPageDataVideoDescOnChange,
    fromContentsToSetting,
    contentStepValidate,
    editNewswireReleaseIdAndOut,
    createNewswireReleaseIdAndOut,
    lockAction,
    unLockAction,
    fromDataToContents,
    previewPopupOpen,
    uploadFile,
    contentPageDataFilesOnChange,
    handleEditorContentGet,
    initInputMediaPopupPopup,
    setImportPopupAction,
    setContentPageData,
  } = useNewswireRelease()
  const [isLoadingId, setIsLoadingId] = useState<string>('')
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [currentCursorPosition, setCurrentCursorPosition] = useState<string>('')
  const dragRef = useRef<HTMLDivElement | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>('')

  const actionAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoadingId('out')
    if (nwReleaseId > 0) {
      const check = await contentStepValidate(contentPageData, editorData)
      const lock = await lockAction(nwReleaseId)
      if (lock !== 'S') {
        openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
        return
      }
      if (check) {
        const releaseData = await fromDataToContents(nwReleaseId, editorData)
        const res = await editNewswireReleaseIdAndOut(
          contentPageData,
          releaseData ? releaseData.setting : settingPageData,
          releaseData ? releaseData.content.content : editorData,
          nwReleaseId,
          tab.id
        )
        if (res === 'S') {
          const unLock = await unLockAction(nwReleaseId)
          if (unLock === 'S') {
            openToast('보도자료를 초안으로 임시저장했습니다.', 'success')
            props.offRouteChangeBlocking(() => router.push('/activity/search'))
          }
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    } else {
      const check = await contentStepValidate(contentPageData, editorData)
      if (check) {
        const res = await createNewswireReleaseIdAndOut(contentPageData, editorData)
        if (res !== 0) {
          openToast('보도자료를 초안으로 임시저장했습니다.', 'success')
          props.offRouteChangeBlocking(() => router.push('/activity/search', undefined))
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    }
    setIsLoadingId('')
  }

  const actionAndNext = async () => {
    setIsLoadingId('next')
    if (nwReleaseId > 0) {
      const check = await contentStepValidate(contentPageData, editorData)
      const lock = await lockAction(nwReleaseId)
      if (lock !== 'S') {
        openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
        return
      }
      if (check) {
        const releaseData = await fromDataToContents(nwReleaseId, editorData)
        const res = await editNewswireReleaseIdAndOut(
          contentPageData,
          releaseData ? releaseData.setting : settingPageData,
          releaseData ? releaseData.content.content : editorData,
          nwReleaseId,
          tab.id
        )
        if (res === 'S') await fromContentsToSetting(nwReleaseId)
      }
    } else {
      const check = await contentStepValidate(contentPageData, editorData)
      if (check) {
        const res = await createNewswireReleaseIdAndOut(contentPageData, editorData)
        if (res !== 0) {
          openToast('보도자료를 초안으로 임시저장했습니다.', 'success')
          await fromContentsToSetting(res)
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
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
    if (contentPageData.filesList.length > 2) {
      openToast('이미지는 최대 3개만 등록할 수 있습니다.', 'error')
      return
    }
    if (selectFiles && selectFiles.length > 0) {
      const result = await uploadFile(selectFiles, tempFiles, fileSizeUnit, fileSizeLimit, fileLengthLimit, true)
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

  const handleChangeVideoSrc = (i: string) => {
    setVideoSrc(i)
    contentPageDataVideoSrcOnChange(i, false, contentPageData)
  }

  useEffect(() => {
    initDragEvents()
    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  useEffect(() => {
    if (tab.id === 'content' && nwReleaseId > 0) {
      setContentPageData(nwReleaseId)
    }
  }, [tab.id, nwReleaseId])

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
                      title="제목"
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
                    <div className="textarea__area">
                      <FormTitle title="부제목" />
                      <div className="textarea__group">
                        <textarea
                          placeholder=""
                          rows={3}
                          onChange={e => contentPageDataSubtitleOnChange(e.target.value, contentPageData)}
                          value={contentPageData.subtitle}
                          style={{
                            resize: 'none',
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div style={{ paddingTop: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                          <FormTitle
                            title="내용"
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
                              onClick={() => previewPopupOpen('', contentPageData)}
                            />
                          </div>
                        </div>
                        <div
                          className="form-default__header form-pb0"
                          style={{ justifyContent: 'flex-end', gap: 5 }}
                        >
                          <Button
                            label={'보도자료 가져오기'}
                            cate={'default'}
                            size={'s'}
                            color={'tertiary'}
                            onClick={() => setImportPopupAction({ isOpen: true })}
                          />
                        </div>
                      </div>
                      <div className="iframe-content__container__wrapper position-relative">
                        <EditorSimple
                          getEditorContentString={contentPageData.getEditorContentString}
                          editorContent={contentPageData.receivedEditorContent}
                          onGetEditorContent={(e: string) => handleEditorContentGet(e)}
                          onGetEditorImage={(e: string) => console.log('onGetEditorImage', e)}
                          onSetCurrentCursorPosition={(position: string) => setCurrentCursorPosition(position)}
                          currentCursorPosition={currentCursorPosition}
                          errorMessage={contentPageData.contentError}
                          height={400}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div style={{ display: 'flex', position: 'relative', top: '-10px' }}>
                      <FormTitle title="보도자료 하단에 회사 소개를 입력하면 보도자료의 신뢰성을 높일 수 있습니다." />
                      <div style={{ paddingBottom: 13, paddingLeft: 10 }}>
                        <Button
                          elem="a"
                          label={'보도자료 양식'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => window.open('https://www.newswire.co.kr/?ed=6', '_blank')}
                        />
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="textarea__area">
                      <FormTitle
                        title="언론 연락처"
                        tooltip={true}
                        required={true}
                      >
                        <Tooltips
                          tooltipId={'tt1-1'}
                          tooltipPlace={'top'}
                          tooltipHtml={`뉴스와이어는 보도자료에 언론 연락처에 입력한 이메일을 직접 노출하지 않고, 대신 '메시지 보내기' 링크로 표시하여 보도자료 배포자를 스팸으로부터 보호해드립니다.`}
                          tooltipComponent={<IcoTooltip />}
                        />
                      </FormTitle>
                      <div
                        className={cn('textarea__group', {
                          'is-succeeded': contentPageData.contactInfoError === '',
                          'is-failed': contentPageData.contactInfoError !== '',
                        })}
                      >
                        <textarea
                          placeholder={'OOO전자\n홍길동 과장\n00-999-0000\nhong@abc.com'}
                          rows={5}
                          onChange={e => contentPageDataContactInfoOnChange(e.target.value, contentPageData)}
                          value={contentPageData.contactInfo}
                          style={{
                            resize: 'none',
                          }}
                        ></textarea>
                      </div>
                      {contentPageData.contactInfoError !== '' && (
                        <FormMsg
                          msg={contentPageData.contactInfoError}
                          type={'error'}
                        />
                      )}
                    </div>
                  </li>

                  <li style={{ paddingBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex' }}>
                        <FormTitle title="이미지" />
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
                    <FormTitle title="이미지를 직접 선택해 업로드하거나 미디어 자료실을 사용하세요." />
                    <div className="file-uploader__section file-type2">
                      <section className={cn('fui-dropzone-root', { 'is-disabled': isDragging })}>
                        <div className="files-ui-dropzone-children-container">
                          <label htmlFor="fileUpload_email">
                            {' '}
                            이 영역을 클릭하거나 파일을 마우스로 끌어 오세요.
                            <span>여러 개를 한꺼번에 첨부할 수 있습니다. JPG, GIF, PNG 3MB 이내</span>
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
                        {contentPageData.filesList.map((e, index) => (
                          <UploadImageListItem
                            key={index.toString() + e.id + 'file-uploader-list__area imageList'}
                            item={e}
                            editable
                          />
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group">
                      <FormTitle title="유튜브 URL" />
                      <ul className="form-default__flex align-start">
                        <li>
                          <FormInputText
                            onChange={e => handleChangeVideoSrc(e.target.value)}
                            failed={contentPageData.videoSrcError !== ''}
                            msg={contentPageData.videoSrcError}
                            value={contentPageData.videoSrc}
                            disabled={contentPageData.videoSrc !== ''}
                          />
                        </li>
                        <li className="flex-shrink">
                          <Button
                            label={'입력'}
                            cate={'default'}
                            size={'m'}
                            color={'tertiary'}
                            onClick={() => {
                              contentPageDataVideoSrcOnChange(videoSrc, true, contentPageData)
                            }}
                            disabled={contentPageData.videoSrc !== ''}
                          />
                        </li>
                      </ul>
                    </div>
                    {contentPageData.videoSrc && (
                      <div className="distribute-media__item">
                        <div className="distribute-media-item__thumb">
                          <Image
                            src={getYoutubeThumbnailUrl(contentPageData.videoSrc) || ''}
                            width={240}
                            height={160}
                            alt="유튜브 이미지"
                          />

                          <div className="thumb-delete">
                            <button
                              type="button"
                              className="thumb-delete__button"
                              onClick={() => {
                                setVideoSrc('')
                                contentPageDataVideoSrcOnDelete(contentPageData)
                              }}
                            >
                              <span className="hidden">삭제</span>
                            </button>
                          </div>
                        </div>
                        <div className="distribute-media-item__textarea">
                          <div
                            className={cn('textarea__group', {
                              'is-succeeded': contentPageData.videoDescError === '',
                              'is-failed': contentPageData.videoDescError !== '',
                            })}
                          >
                            <textarea
                              rows={2}
                              placeholder="동영상 설명을 입력하세요."
                              value={contentPageData.videoDesc}
                              onChange={e => contentPageDataVideoDescOnChange(e.target.value, contentPageData)}
                              style={{
                                resize: 'none',
                              }}
                            />
                          </div>
                          {contentPageData.videoDescError !== '' && (
                            <FormMsg
                              msg={contentPageData.videoDescError}
                              type={'error'}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                  <li>
                    <div className="mb-contents-pb16__group pt14">
                      <div className="bullet-list__group">
                        <h6 className="bullet-list__title fw700">주의사항</h6>
                        <ul className="bullet-list narrow">
                          <li>
                            <p className="bullet-list__text">
                              이미지는 3개까지 첨부할 수 있습니다. (JPG, JPEG, PNG, GIF 형식으로 사진당 최대 3MB)
                            </p>
                          </li>
                          <li>
                            <p className="bullet-list__text">
                              이미지와 동영상은 뉴스 보도에 사용하기 부적합하거나, 광고성이거나, 품질이 낮으면 편집
                              가이드라인에 따라 삭제될 수 있습니다.
                            </p>
                          </li>
                          <li>
                            <p className="bullet-list__text">
                              이미지와 동영상은 등록자가 저작권을 가진 것이어야 합니다. 이미지 라이브러리에서 구매한
                              이미지를 여기에 등록하는 것은 불법 재배포 행위이므로 저작권법에 따라 처벌됩니다.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-contents-layout__footer">
            <div className="distribute-steps__footer">
              <div className="footer-button__group">
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'저장하고 나가기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      isLoading={isLoadingId === 'out'}
                      disabled={!isEdit || isLoadingId !== ''}
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
