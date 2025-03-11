import { useCallback, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const UserMenu = () => {
  const router = useRouter()
  const { menuLinks, menuBar, menuRef, setMenuBar, moveLink } = useHeader()

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuBar(false)
    },
    [menuBar]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    setMenuBar(false)
  }, [])

  return (
    <div className="header-my">
      <div
        className="select__section select-type3-n3"
        ref={menuRef}
      >
        <button
          className="select__label"
          onClick={() => setMenuBar(!menuBar)}
        >
          <span className="select__label-text">사용자</span>
          <span className="ico-svg">
            <img
              src="/assets/svg/my-header.svg"
              alt=""
            />
          </span>
        </button>

        <div className={cn('select-option__section', { 'display-block': menuBar })}>
          <div className="select-option__area">
            {/*<ul className="select-option__group">
              {menuLinks.map((e) => (
                <li key={e.id + "select-option__item"}>
                  <button
                    className="select-option__item"
                    onClick={() => moveLink(e)}
                  >
                    <span className="select-option__item-text">{e.title}</span>
                  </button>
                </li>
              ))}
            </ul>*/}

            {/*로그인 시만 보이므로 하드코딩으로 대체*/}
            <ul className="select-option__group">
              <li>
                <button
                  className="select-option__item"
                  onClick={() => {
                    router.push('/publishing/member')
                  }}
                >
                  <span className="select-option__item-text">회원 정보</span>
                </button>
              </li>
              <li>
                <button className="select-option__item">
                  <span className="select-option__item-text">설정</span>
                </button>
              </li>
              <li>
                <button className="select-option__item">
                  <span className="select-option__item-text">로그아웃</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
