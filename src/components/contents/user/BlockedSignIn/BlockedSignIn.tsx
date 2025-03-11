/**
 * @file BlockedLogin.tsx
 * @description 컴포넌트 mount
 *              -> 로그인 차단 이유 조회
 *              -> 로그인 차단 이유에 따른 도움말 텍스트 조회
 *              -> 도움말 텍스트 설정된 후 노출
 */

import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'

interface BlockedReason {
  infoType: 'ID' | 'IP' | null
  status: 'TRAFFIC' | 'FAILURE' | null
  info: string
}

const BlockedLogin = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [blockMode, setBlockMode] = useState<BlockedReason>({
    infoType: null,
    status: null,
    info: '',
  })
  const [helpText, setHelpText] = useState<string>('')

  const getHelpText = () => {
    const { infoType, status } = blockMode
    if (infoType === 'ID') {
      if (status === 'FAILURE') {
        setHelpText('5회 이상 로그인 연속 실패해 정보 보호를 위해 로그인을 차단했습니다.')
      } else if (status === 'TRAFFIC') {
        setHelpText('위 ID는 비정상적인 대량 트래픽으로 정보 보호를 위해 임시 차단되었습니다.')
      }
    } else if (infoType === 'IP') {
      if (status === 'TRAFFIC') {
        setHelpText('위 IP는 비정상적인 대량 트래픽으로 정보 보호를 위해 임시 차단되었습니다.')
      }
    }
  }

  useEffect(() => {
    if (blockMode.infoType && blockMode.status) {
      getHelpText()
    }
  }, [blockMode])

  useEffect(() => {
    if (helpText !== '') {
      setIsShow(true)
    }
  }, [helpText])

  useEffect(() => {
    setBlockMode({
      infoType: 'ID',
      status: 'FAILURE',
      info: 'gildong*****@gmai*****',
    })
  }, [])

  if (!isShow) {
    return null
  }

  return (
    <div className="member__section log-type2__section position-blank-center no-padding-top">
      <div className="log-type2__group">
        <ul className="interval-mt14">
          <li>
            <h2 className="font-heading--h5">로그인이 차단되었습니다.</h2>
          </li>
          <li>
            <p className="font-body__regular">
              {blockMode.infoType}: {blockMode.info}
            </p>
          </li>
          <li>
            <p className="font-body__regular">
              {helpText}
              <br />
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'도움말'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              을 확인한 후 다시 시도해 보거나{' '}
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'고객센터'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              로 문의하기 바랍니다.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BlockedLogin
