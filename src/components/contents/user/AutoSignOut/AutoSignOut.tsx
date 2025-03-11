/**
 * @file AutoSignOut.tsx
 * @description 자동 로그아웃
 */

import { ReactNode } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import Button from '~/components/common/ui/Button'
import { DEMO_LICENSE } from '~/constants/common'

const AutoSignOut = () => {
  const router = useRouter()
  const isDemo = Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true'

  return (
    <div className="member__section log-type2__section">
      <div className="log-type2__group">
        <ul className="interval-mt14">
          <li>
            <h2 className="font-heading--h5">{isDemo ? '데모 체험 종료' : '자동 로그아웃'}</h2>
          </li>
          <li>
            {isDemo ? (
              <p className="font-body__regular">
                데모 체험 시간이 경과해 자동으로 서비스에서 로그아웃 했습니다.
                <br />
                체험이 더 필요하다면 다시 한번 데모 체험을 신청하세요.
              </p>
            ) : (
              <p className="font-body__regular">
                세션 유효 시간이 초과해 회원 정보 보호를 위해 자동으로 로그아웃 했습니다.
              </p>
            )}
          </li>
        </ul>
        {!isDemo && (
          <div className="log-type2__btn">
            <Button
              label={'로그인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => router.push('/member/login')}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AutoSignOut
