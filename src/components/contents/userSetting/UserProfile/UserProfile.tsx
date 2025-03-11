import moment from 'moment/moment'

import 'moment/locale/ko'

import Button from '~/components/common/ui/Button'
import PasswordUpdatePopup from '~/components/contents/userSetting/UserProfile/Popup/PasswordUpdatePopup'
import UpdateUserProfilePopup from '~/components/contents/userSetting/UserProfile/Popup/UpdateUserProfilePopup'
import { PHONE_NUMBER_HYPHEN_PATTERN } from '~/utils/common/regex'
import { useUserProfile } from '~/utils/hooks/contents/setting/useUserProfile'

const Profile = () => {
  const { userInfo, resetPasswordPopupAction, updateUserProfilePopupAction } = useUserProfile()
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
              <div className="member-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">회원 정보</h2>
                  </div>
                </div>
              </div>

              <ul className="interval-mt28">
                <li>
                  <h3 className="font-body__regular">이 회원 정보는 미디어비 모든 곳에 적용됩니다.</h3>
                </li>
                <li>
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">이름</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">{userInfo?.name || ''}</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">표시 이름</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">{userInfo?.nickname || '-'}</p>
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
                      <p className="dl-table-type1__text">비밀번호</p>
                    </dt>
                    <dd>
                      <div className="dl-table-type1__flex">
                        <Button
                          label={'비밀번호 수정'}
                          cate={'default'}
                          size={'s'}
                          color={'tertiary'}
                          onClick={() => resetPasswordPopupAction(true)}
                        />
                        <p className="dl-table-type1__text">
                          마지막 수정{' '}
                          {userInfo?.passwdChangeAt
                            ? moment(userInfo.passwdChangeAt).format('LL')
                            : moment(userInfo.regisAt).format('LL')}
                        </p>
                      </div>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">전화</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        {userInfo?.phone?.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                      </p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">휴대전화</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        {userInfo?.mobile?.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                      </p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">뉴스레터 수신</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">{userInfo?.receiveLetter ? '수신함' : '수신안함'}</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <Button
                    label={'수정하기'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    onClick={() => updateUserProfilePopupAction(true, 'passwordCheck')}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PasswordUpdatePopup />
      <UpdateUserProfilePopup />
    </>
  )
}

export default Profile
