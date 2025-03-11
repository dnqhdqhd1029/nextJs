import moment from 'moment'

import Popup from '~/components/common/ui/Popup'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'
import { usePressListManagement } from '~/utils/hooks/contents/pressMedia/usePressListManagement'

const PressContentDetailPopup = () => {
  const { pressContentDetailPopup, licenseInfo, setInitPressContentDetailPopupAction } = usePressListManagement()

  return (
    <Popup
      isOpen={pressContentDetailPopup.isOpen}
      title={'상세 정보'}
      onClose={() => setInitPressContentDetailPopupAction()}
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
            {pressContentDetailPopup.data !== null && pressContentDetailPopup.data.title}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">언론인</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {pressContentDetailPopup?.data?.journalistCount && pressContentDetailPopup?.data?.journalistCount > 0
              ? pressContentDetailPopup.data.journalistCount
              : 0}
            명
          </p>
        </dd>
        {licenseInfo?.flagShare && (
          <>
            <dt>
              <p className="dl-table-type1__text">공유</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {pressContentDetailPopup.data !== null && pressContentDetailPopup.data.shareCodeNm}
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">소유자</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {pressContentDetailPopup.data !== null && pressContentDetailPopup.data?.owner?.displayName}
              </p>
            </dd>
          </>
        )}
        <dt>
          <p className="dl-table-type1__text">수정자</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {pressContentDetailPopup.data !== null && pressContentDetailPopup.data?.updater?.displayName}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">생성일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {pressContentDetailPopup.data !== null &&
              moment(pressContentDetailPopup.data.regisAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">수정일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {pressContentDetailPopup.data !== null &&
              moment(pressContentDetailPopup.data.updateAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
      </dl>
    </Popup>
  )
}

export default PressContentDetailPopup
