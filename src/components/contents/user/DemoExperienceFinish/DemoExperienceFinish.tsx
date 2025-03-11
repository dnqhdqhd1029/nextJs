/**
 * @file EndOfDemoExperience.tsx
 * @description 데모 체험 종료
 */

const EndOfDemoExperience = () => {
  return (
    <div className="member__section log-type2__section position-blank-center no-padding-top">
      <div className="log-type2__group">
        <ul className="interval-mt14">
          <li>
            <h2 className="font-heading--h5">데모 체험 종료</h2>
          </li>
          <li>
            <p className="font-body__regular">
              데모 체험 시간이 경과해 자동으로 서비스에서 로그아웃 했습니다.
              <br />
              체험이 더 필요하다면 다시 한번 데모 체험을 신청하세요.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default EndOfDemoExperience
