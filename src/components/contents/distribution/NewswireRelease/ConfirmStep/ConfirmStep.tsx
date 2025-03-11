import { Fragment, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import CompleteModal from '~/components/contents/distribution/NewswireRelease/ConfirmStep/CompleteModal'
import ConfirmModal from '~/components/contents/distribution/NewswireRelease/ConfirmStep/ConfirmModal'
import UploadImageListItem from '~/components/contents/distribution/NewswireRelease/List/UploadImageListItem'
import ReleaseProcedurePopup from '~/components/contents/distribution/NewswireRelease/Popup/ReleaseProcedurePopup'
import { StepItem } from '~/types/common'
import { getYoutubeThumbnailUrl } from '~/utils/common/helper'
import { getHtmlContentFromString } from '~/utils/common/string'
import { openToast } from '~/utils/common/toast'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const ConfirmStep = () => {
  const {
    userInfo,
    isDemoLicense,
    settingPageData,
    contentPageData,
    editorData,
    tab,
    tabChangeAction,
    previewPopupOpen,
    sendNwRelease,
    nwReleaseId,
  } = useNewswireRelease()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false)
  const [isReleaseProcedurePopup, setIsReleaseProcedurePopup] = useState<boolean>(false)

  const actionAndNext = async () => {
    if (isDemoLicense) {
      openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
    } else {
      setIsConfirmModal(true)
    }
  }

  const handleConfirmModalClose = () => setIsConfirmModal(false)

  const handleConfirmModalAction = async () => {
    await sendNwRelease(nwReleaseId)
    setIsConfirmModal(false)
  }

  const actionAndPrev = async (type: StepItem) => {
    setIsLoading(() => true)
    await tabChangeAction(type)
    setIsLoading(() => false)
  }

  return (
    <>
      {tab.id === 'confirm' && (
        <Fragment>
          <div className="mb-contents-layout__contents">
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <div className="distribute-steps__title">
                  <h3 className="font-heading--h5">보도자료</h3>
                  <Button
                    elem="a"
                    label={'수정하기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => actionAndPrev({ id: 'content', title: '내용' })}
                  />
                </div>
                <ul>
                  <li>
                    <dl className="dl-table-type1__section">
                      <dt>
                        <p className="dl-table-type1__text">제목</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{contentPageData.title}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">부제목</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text white-space__pre-line">{contentPageData.subtitle || '-'}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">내용</p>
                      </dt>
                      <dd>
                        <p
                          className="dl-table-type1__text p-margin preview-popup"
                          dangerouslySetInnerHTML={{
                            __html: getHtmlContentFromString(editorData || contentPageData.content) || '-',
                          }}
                        ></p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">언론연락처</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular white-space__pre-line">{contentPageData.contactInfo || '-'}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">사진</p>
                      </dt>
                      <dd>
                        {(contentPageData?.filesList &&
                          contentPageData?.filesList.length > 0 &&
                          contentPageData.filesList.map((e, index) => (
                            <UploadImageListItem
                              key={index.toString() + e.id + 'file-uploader-list__area imageList'}
                              item={e}
                              editable={false}
                            />
                          ))) ||
                          '-'}
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">유튜브 URL</p>
                      </dt>
                      <dd>
                        {(contentPageData.videoSrc && (
                          <div style={{ display: 'flex' }}>
                            <Image
                              src={getYoutubeThumbnailUrl(contentPageData.videoSrc) || ''}
                              width={240}
                              height={160}
                              alt="유튜브 이미지"
                            />
                            <div className="distribute-media-item__desc">{contentPageData.videoDesc || ''}</div>
                          </div>
                        )) ||
                          '-'}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
              <div className="distribute-steps__group">
                <div className="distribute-steps__title">
                  <h3 className="font-heading--h5">설정 정보</h3>
                  <Button
                    elem="a"
                    label={'수정하기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => actionAndPrev({ id: 'setting', title: '설정' })}
                  />
                </div>
                <ul>
                  <li>
                    <dl className="dl-table-type1__section">
                      <dt>
                        <p className="dl-table-type1__text">서비스</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">베이직</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">발표 회사</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{settingPageData?.publishComType?.name}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">발표 회사명</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">
                          {settingPageData?.publishComType?.id === 'my'
                            ? settingPageData.publisherMy
                            : settingPageData.publisher}
                        </p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">발표 회사 웹사이트</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">
                          {settingPageData?.publishComType?.id === 'my'
                            ? settingPageData.wsiteMy || '-'
                            : settingPageData.wsite || '-'}
                        </p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">발표 회사 주소</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">
                          {settingPageData?.publishComType?.id === 'my'
                            ? settingPageData.regionMy.name || '-'
                            : settingPageData.region.name || '-'}
                        </p>
                        <p className="font-body__regular">
                          {settingPageData?.publishComType?.id === 'my'
                            ? settingPageData.addressNmMy || '-'
                            : settingPageData.addressNm || '-'}
                        </p>
                        <p className="font-body__regular">
                          {settingPageData?.publishComType?.id === 'my'
                            ? settingPageData.subAddressNmMy || '-'
                            : settingPageData.subAddressNm || '-'}
                        </p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">언어</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData?.language?.name}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">뉴스 발표지</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData.publishWhere}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">발송 시간</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData?.publishNow?.name}</p>
                      </dd>
                      {settingPageData?.publishNow?.id === 'reserved' && (
                        <>
                          <dt>
                            <p className="dl-table-type1__text">배포 희망시간</p>
                          </dt>
                          <dd>
                            <p className="font-body__regular">
                              {moment(settingPageData?.publishDate).format('YYYY-MM-DD HH:mm')}
                            </p>
                          </dd>
                        </>
                      )}
                      <dt>
                        <p className="dl-table-type1__text">게재 알림</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData.alarmMobile}</p>
                        <p>
                          {'나 ('}
                          <Button
                            elem="a"
                            url={`mailto:${userInfo?.email}`}
                            label={userInfo?.email || ''}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                          {')'}
                        </p>
                        <p className="font-body__regular">
                          <Button
                            elem="a"
                            url={`mailto:${settingPageData.alarmEmail}`}
                            label={settingPageData.alarmEmail || ''}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">요청사항</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData.msgToNwire || '-'}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">공유 설정</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">{settingPageData?.scrop?.name}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">태그</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">
                          {settingPageData?.tagList && settingPageData?.tagList.length > 0
                            ? settingPageData?.tagList
                                .map(e => e.label)
                                .join(',')
                                .replace(/,(\S)/g, ', $1')
                            : '-'}
                        </p>
                      </dd>
                    </dl>
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
                      icoLeftData={icoSvgData.chevronThickLeft}
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => actionAndPrev({ id: 'setting', title: '설정' })}
                    />
                  </li>
                </ul>
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'미리보기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      disabled={isLoading}
                      onClick={() => previewPopupOpen('', contentPageData)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'등록하기'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      disabled={isLoading}
                      icoRightData={icoSvgData.chevronThickRight}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isConfirmModal && (
            <ConfirmModal
              onClose={handleConfirmModalClose}
              onConfirm={handleConfirmModalAction}
            />
          )}
          <CompleteModal
            onOpenPopup={() => {
              setIsReleaseProcedurePopup(true)
            }}
          />
          {isReleaseProcedurePopup && (
            <ReleaseProcedurePopup
              onClose={() => setIsReleaseProcedurePopup(false)}
              onConfirm={() => setIsReleaseProcedurePopup(false)}
            />
          )}
        </Fragment>
      )}
    </>
  )
}

export default ConfirmStep
