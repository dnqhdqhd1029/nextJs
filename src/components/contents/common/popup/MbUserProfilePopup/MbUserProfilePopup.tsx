/**
 * @file MbUserCountLimitPopup.tsx
 * @description 유저 정보 팝업
 */

import Popup from '~/components/common/ui/Popup'
import type { UserDto } from '~/types/api/service'
import { getApiStringDataFormat } from '~/utils/common/string'

interface Props {
  isOpen: boolean
  userInfo?: UserDto
  onClose: () => void
}

const MbUserProfilePopup = ({ isOpen, onClose, userInfo }: Props) => {
  const getUserRole = (role: string) => {
    return role === 'ADMIN' ? '관리자' : '사용자'
  }

  const handleClose = () => {
    onClose()
  }

  if (!userInfo) {
    return null
  }

  return (
    <Popup
      isOpen={isOpen}
      title={'회원 정보'}
      onClose={handleClose}
      width={'500px'}
      hasCloseButton
      buttons={<></>}
    >
      <dl className="dl-table-type1__section">
        <dt>
          <p className="dl-table-type1__text">표시 이름</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{userInfo.displayName}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">이메일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            <a
              href={`mailto:${userInfo.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link-text colors-body-link "
            >
              <span className="button__label button-link-text__label size-m">{userInfo.email}</span>
            </a>
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{getApiStringDataFormat(userInfo.phone)}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">휴대전화</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{getApiStringDataFormat(userInfo.mobile)}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">권한</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{getUserRole(userInfo.role ?? '')}</p>
        </dd>
      </dl>
    </Popup>
  )
}

export default MbUserProfilePopup
