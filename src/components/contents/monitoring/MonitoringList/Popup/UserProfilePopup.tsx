import Popup from '~/components/common/ui/Popup'
import { useSearchActivity } from '~/utils/hooks/contents/activity/useSearchActivity'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const UserProfilePopup = () => {
  const { userPopup, setUserProfilePopupAction } = useMonitoringSearch()

  return (
    <Popup
      isOpen={userPopup.isOpen}
      title={'회원 정보'}
      onClose={() => setUserProfilePopupAction()}
      width={500}
      hasCloseButton
      showFooter={false}
    >
      <dl className="dl-table-type1__section">
        <dt>
          <p className="dl-table-type1__text">표시 이름</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userPopup.displayName}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">이메일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            <a
              href={`mailto:${userPopup.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link-text colors-body-link "
            >
              <span className="button__label button-link-text__label size-m">{userPopup.email}</span>
            </a>
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userPopup.phone}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">휴대전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userPopup.mobile}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">권한</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userPopup.role}</p>
        </dd>
      </dl>
    </Popup>
  )
}

export default UserProfilePopup
