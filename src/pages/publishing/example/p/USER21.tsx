/**
 * @file USER20.tsx
 * @description USER20 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
              <div className="member-header__section">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">회원 가입</h2>
                  </div>
                </div>
              </div>

              <h3 className="font-body__regular">
                입력한 이메일로 회원 가입 인증 메일이 발송되었습니다.
                <br />
                메일 내 인증 링크를 클릭해야 회원 가입이 최종 완료됩니다.
                <br />
                인증링크는 72시간만 유효합니다.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
