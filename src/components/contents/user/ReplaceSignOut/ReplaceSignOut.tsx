/**
 * @file ReplaceSignOut.tsx
 * @description 동시접속 자동 로그아웃
 */

import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'

const ReplaceSignOut = () => {
  const router = useRouter()

  const handleGoToSignIn = () => {
    router.replace({
      pathname: '/member/login',
    })
  }

  return (
    <div className="member__section log-type2__section">
      <div className="log-type2__group">
        <ul className="interval-mt14">
          <li>
            <h2 className="font-heading--h5">동시 접속 로그아웃</h2>
          </li>
          <li>
            <p className="font-body__regular">같은 계정으로 새로운 환경에서 로그인 되어 로그아웃 되었습니다.</p>
          </li>
        </ul>
        <div className="log-type2__btn">
          <Button
            label={'로그인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={handleGoToSignIn}
          />
        </div>
      </div>
    </div>
  )
}

export default ReplaceSignOut
