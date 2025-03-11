import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/publishing/components/common/ui/Button'
import { NavigationLinkItem } from '~/types/common'

interface Props {
  headerTitle: string
  naviList: NavigationLinkItem[]
  isCustomerInfo: boolean
}

const NavigationBar = (props: Props) => {
  const router = useRouter()

  return (
    <div className="lnb-search-setting__section">
      <h2 className="lnb-search-setting__title">{props.headerTitle}</h2>
      <div className="lnb-search-setting__menu">
        <ul className="lnb-search-setting-menu__list">
          {props.naviList &&
            props.naviList.length > 0 &&
            props.naviList.map(e => (
              <li key={'settingLinks' + e.id?.toString()}>
                <button
                  type="button"
                  className={cn('lnb-search-setting-menu__text', {
                    'is-selected': e.pathLink === router.pathname,
                  })}
                  onClick={() => e.pathLink && router.push(e.pathLink)}
                >
                  {e.title}
                </button>
              </li>
            ))}
        </ul>
      </div>
      {props.isCustomerInfo && (
        <div className="lnb-search-setting__cs">
          <h3 className="lnb-search-setting__title">고객센터</h3>
          <ul className="lnb-search-setting-menu__list">
            <li>
              <p className="lnb-search-setting-menu__text2">
                <Button
                  elem="a"
                  label={'문의하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                />
              </p>
              <p className="lnb-search-setting-menu__text2">070-0000-0000</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
export default NavigationBar
