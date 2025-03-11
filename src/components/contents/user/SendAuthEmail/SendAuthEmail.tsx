/**
 * @file SendAuthEmail.tsx
 * @description 인증 메일 발송 안내
 */

const SendAuthEmail = () => {
  return (
    <>
      <div className="header-breadcrumb__section breadcrumb-title-type1 max-w960">
        <div className="header-breadcrumb__group">
          <h2 className="header-breadcrumb__title">회원 가입</h2>
        </div>
      </div>
      <div className="mb-container">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section">
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

export default SendAuthEmail
