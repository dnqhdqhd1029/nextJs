import moment from 'moment'

import Popup from '~/components/common/ui/Popup'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaContentDetailPopup = () => {
  const { mediaContentDetailPopup, licenseInfo, setInitMediaContentDetailPopupAction } = useMediaListManagement()

  return (
    <Popup
      isOpen={mediaContentDetailPopup.isOpen}
      title={'상세 정보'}
      onClose={() => setInitMediaContentDetailPopupAction()}
      width={500}
      hasCloseButton
      showFooter={false}
    >
      <dl className="dl-table-type1__section">
        <dt>
          <p className="dl-table-type1__text">목록명</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {mediaContentDetailPopup.data !== null && mediaContentDetailPopup.data.title}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">매체</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {mediaContentDetailPopup?.data?.mediaCount && mediaContentDetailPopup.data.mediaCount > 0
              ? mediaContentDetailPopup.data.mediaCount
              : 0}
            개
          </p>
        </dd>
        {licenseInfo?.flagShare && (
          <>
            <dt>
              <p className="dl-table-type1__text">공유</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {mediaContentDetailPopup.data !== null && mediaContentDetailPopup.data.shareCodeNm}
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">소유자</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {mediaContentDetailPopup.data !== null && mediaContentDetailPopup.data?.owner?.displayName}
              </p>
            </dd>
          </>
        )}
        <dt>
          <p className="dl-table-type1__text">수정자</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {mediaContentDetailPopup.data !== null && mediaContentDetailPopup.data?.updater?.displayName}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">생성일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {mediaContentDetailPopup.data !== null &&
              moment(mediaContentDetailPopup.data.regisAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">수정일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {mediaContentDetailPopup.data !== null &&
              moment(mediaContentDetailPopup.data.updateAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
      </dl>
    </Popup>
  )
}

export default MediaContentDetailPopup
