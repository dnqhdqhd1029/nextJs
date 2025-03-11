import { Fragment } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import { settingLinks } from '~/components/contents/setting/defaultData'
import Button from '~/publishing/components/common/ui/Button'
import { NavigationLinkItem } from '~/types/common'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

type Props = {
  navi: NavigationLinkItem
}

const NavigationBar = () => {
  const router = useRouter()
  const { licenseInfo, userInfo } = useAppSelector(state => state.authSlice)

  return (
    <div className="lnb-search-setting__section">
      <h2 className="lnb-search-setting__title">설정</h2>
      <div className="lnb-search-setting__menu">
        <Fragment>
          {settingLinks.map(i => {
            if (licenseInfo && licenseInfo.isExpired) {
              if (i.id === 'billing') {
                return (
                  <NaviItem
                    key={'licenseInfo.isExpired settingLinks' + i.title?.toString()}
                    navi={i}
                  />
                )
              }
            } else if (i.id === 'company') {
              if (userInfo.role === 'ADMIN') {
                return (
                  <NaviItem
                    key={'licenseInfo.valid settingLinks' + i.title?.toString()}
                    navi={i}
                  />
                )
              }
            } else {
              return (
                <NaviItem
                  key={'licenseInfo.valid settingLinks' + i.title?.toString()}
                  navi={i}
                />
              )
            }
          })}
        </Fragment>
      </div>

      <div className="lnb-search-setting__cs">
        <h3 className="lnb-search-setting__sub-title">고객센터</h3>
        {/* <ul className="lnb-search-setting-menu__list">
          <li style={{ cursor: 'pointer' }}>
            <p
              className="lnb-search-setting-menu__text"
              onClick={() => router.push('/help/my-inquiry')}
            >
              내 문의
            </p>
          </li>
          <li style={{ cursor: 'pointer' }}>
            <p className="lnb-search-setting-menu__text">070-0000-0000</p>
          </li>
        </ul> */}
        <ul className="lnb-search-setting-menu__list">
          <li>
            <p className="lnb-search-setting-menu__text2">
              <Button
                elem="a"
                url={`/help/my-inquiry`}
                label={'내 문의'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
            </p>
            <p className="lnb-search-setting-menu__text2">070-0000-0000</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

const NaviItem = (item: Props) => {
  const router = useRouter()
  const { licenseInfo } = useAppSelector(state => state.authSlice)
  const mainProductInfo = licenseInfo.productList?.find(e => e.name === licenseInfo.mainProductName)

  return (
    <Fragment key={'settingLinks' + item.navi.title?.toString()}>
      <h3 className="lnb-search-setting__sub-title">{item.navi.title}</h3>
      <ul className="lnb-search-setting-menu__list">
        {item.navi?.subMenus?.map(i => {
          if (i.id === 'share-setting-defaults') {
            return (
              !!licenseInfo?.flagShare && (
                <li key={'lnb-search-setting-menu__text' + i.pathLink?.toString()}>
                  <button
                    type="button"
                    className={cn('lnb-search-setting-menu__text', {
                      'is-selected': i.pathLink === router.pathname,
                    })}
                    onClick={() => i.pathLink && router.push(i.pathLink)}
                  >
                    {i.title}
                  </button>
                </li>
              )
            )
          } else if (!(i.id === 'news-notifier' && !mainProductInfo?.newsNoticeOn)) {
            return (
              <li key={'lnb-search-setting-menu__text' + i.pathLink?.toString()}>
                <button
                  type="button"
                  className={cn('lnb-search-setting-menu__text', {
                    'is-selected': i.pathLink === router.pathname,
                  })}
                  onClick={() => i.pathLink && router.push(i.pathLink)}
                >
                  {i.title}
                </button>
              </li>
            )
          }
        })}
      </ul>
    </Fragment>
  )
}

export default NavigationBar
