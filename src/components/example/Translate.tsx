/**
 * @file Translate.tsx
 * @description i18Next 테스트 컴포넌트
 */

import { useEffect, useState } from 'react'

import { useAppSelector } from '~/utils/hooks/common/useRedux'

export const Translate = () => {
  const [currentLocale, setcurrentLocale] = useState<string>('ko')
  const defaultLocale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const handleChangeLocale = () => {}

  useEffect(() => {
    setcurrentLocale(defaultLocale)
  }, [defaultLocale])

  return (
    <div style={{ padding: '20px' }}>
      {/*<div>{('common.hello', { name: '김삼식' })}</div>*/}
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          style={{ padding: '5px 10px', border: '1px solid red' }}
          onClick={handleChangeLocale}
        >
          언어 변경
        </button>
        <p>현재 언어: {currentLocale}</p>
      </div>
    </div>
  )
}

export default Translate
