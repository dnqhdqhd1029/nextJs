import { useCallback, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { openToast } from '~/utils/common/toast'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const MenuNavigation = () => {
  const router = useRouter()
  const {
    isDemoLicense,
    currentNaviBar,
    naviBar,
    menuNavigationList,
    menuNavigationRef,
    setNaviBarBar,
    onNaviButton,
    licenseInfo,
  } = useHeader()

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (menuNavigationRef.current && !menuNavigationRef.current.contains(e.target as Node)) setNaviBarBar('', naviBar)
    },
    [naviBar]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <nav className="header-gnb__menu">
      <ul
        className="header-gnb__menu-list"
        ref={menuNavigationRef}
      >
        {menuNavigationList.map(e => (
          <li
            key={e.id + 'menuNavigationList'}
            className={cn({ 'is-current': currentNaviBar === e.id, 'is-active': naviBar === e.id })}
            //className={cn({ 'is-current': true, 'is-active': naviBar === e.id })}
          >
            <div
              className={
                e.id === 'monitoring' && !licenseInfo?.flagMonitoring
                  ? 'select__section select-type3-n2'
                  : 'select__section select-type3-n1'
              }
              style={{ zIndex: 10 }}
            >
              <button
                className="select__label"
                onClick={() => setNaviBarBar(e.id, naviBar)}
              >
                <span className="select__label-text">{e.title}</span>
                <IcoSvg data={naviBar !== e.id ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
              </button>
              <div className="select-option__section">
                {e.id === 'monitoring' && !licenseInfo?.flagMonitoring ? (
                  <div className="select-option__area">
                    <p className="select-option__notice-text">
                      현재 사용 중인 상품은 모니터링 기능이 없어 업그레이드가 필요합니다.
                    </p>
                    <Button
                      label={'업그레이드'}
                      cate={'default'}
                      size={'s'}
                      color={'success'}
                      onClick={() =>
                        isDemoLicense
                          ? openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
                          : router.push('/monitoring-upgrade')
                      }
                    />
                  </div>
                ) : (
                  <div className="select-option__area">
                    <ul className="select-option__group">
                      {e.subMenus.map(i => (
                        <li key={'select-option__area' + i.link.toString()}>
                          <button
                            className="select-option__item"
                            onClick={() => onNaviButton(i)}
                          >
                            <span className="select-option__item-text display-flex">
                              {i.title}
                              {i.id === 'briefing' && (
                                <span className="ico display-flex align-items__center ml-6">
                                  <IcoSvg data={icoSvgData.externalLink} />
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuNavigation
