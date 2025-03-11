import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import Image from 'next/image'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import UploadImageListItem from '~/components/contents/distribution/NewswireRelease/List/UploadImageListItem'
import { BaseResponseCommonObject, MailTemplatesFooterDto } from '~/types/api/service'
import { useGetMailTemplateFooter } from '~/utils/api/email/useGetMailTemplateFooter'
import { getYoutubeThumbnailUrl } from '~/utils/common/helper'
import { getHtmlContentFromString } from '~/utils/common/string'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const PreviewPopup = () => {
  const [footer, setFooter] = useState<string>('')
  const { userInfo, previewPopup, contentPageData, editorData, setPreviewPopupAction } = useNewswireRelease()
  const { data: footerData, refetch: footerRefetch } = useGetMailTemplateFooter('USER_MAIL', { enabled: false })
  useEffect(() => {
    footerRefetch()
  }, [])

  useEffect(() => {
    if (footerData) {
      const { status, data, message } = footerData as BaseResponseCommonObject
      if (status === 'S') {
        setFooter(((data as MailTemplatesFooterDto).body ?? '').replace('${SENDER_NAME}', userInfo.name as string))
      } else {
        console.log(message?.message)
      }
    }
  }, [footerData])

  return (
    <>
      <Popup
        isOpen={previewPopup.isOpen}
        onClose={() => setPreviewPopupAction({ isOpen: false, type: '', data: '', receiver: '' })}
        hasCloseButton={contentPageData.title !== ''}
        width={800}
        title={contentPageData.title}
        height={'90vh'}
        showFooter={contentPageData.title === ''}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'닫기'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setPreviewPopupAction({ isOpen: false, type: '', data: '', receiver: '' })}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <ul>
            <li>
              <dl className="dl-table-type1__section">
                <dt>
                  <p className="dl-table-type1__text">제목</p>
                </dt>
                <dd>
                  <p className="dl-table-type1__text">{contentPageData.title || '-'}</p>
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
          <div
            className="popup-template__footer"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(footer, {
                FORBID_ATTR: ['href', 'target'],
              }),
            }}
          ></div>
        </div>
      </Popup>
    </>
  )
}

export default PreviewPopup
