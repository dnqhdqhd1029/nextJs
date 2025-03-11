/**
 * @file Header.tsx
 * @description 헤더 공통
 */
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import GroupIconPage from '~/components/common/layouts/Header/GroupIcon/GroupIconPage'
import HeadNotification from '~/components/common/layouts/Header/HeadNotification/HeadNotification'
import MenuNavigation from '~/components/common/layouts/Header/MenuNavigation/MenuNavigation'
import NavigationForMobile from '~/components/common/layouts/Header/NavigationForMobile'
import UserMenu from '~/components/common/layouts/Header/UserMenu/UserMenu'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'
import Tag from '~/components/common/ui/Tag'
import { openToast } from '~/utils/common/toast'
import { useDemo } from '~/utils/hooks/contents/demo/useDemo'
import { useGlobalSearch } from '~/utils/hooks/contents/globalSearch/useGlobalSearch'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const Header = () => {
  const router = useRouter()
  const { licenseInfo, isDemoLicense } = useHeader()
  const { globalSeaarchPopup, setIsOpenGloablSearchPopup } = useGlobalSearch()

  return (
    <>
      <header className="header__section">
        <HeadNotification />
        <div className="header-gnb__section">
          <NavigationForMobile />
          <div className="header-gnb__group">
            <Link
              href="/dashboard"
              legacyBehavior
            >
              <a className="header-logo">
                <MediaBeeLogo />
                <Tag
                  label={'alpha1'}
                  cate={'n1'}
                  shape={'round'}
                  /* style={{ paddingLeft: '5px' }} */
                />
              </a>
            </Link>
            {!licenseInfo.isExpired && (
              <>
                <MenuNavigation />
                {/* <Link href={'/__example__/editor'}>
                  <a style={{ color: 'silver', marginLeft: '15px' }}>이메일 발송</a>
                </Link> */}
                {/* <Link href={''}>
                  <a
                    style={{ color: 'lightgray', marginLeft: '60px' }}
                    onClick={() => openRequestPopup(requestPopupTypes)}
                  >
                    문의하기
                  </a>
                </Link>
                <Link href={'/payment/purchase-request'}>
                  <a style={{ color: 'lightgray', marginLeft: '15px' }}>서비스 구매</a>
                </Link>
                <Link href={'/demo'}>
                  <a style={{ color: 'lightgray', marginLeft: '15px' }}>데모 신청</a>
                </Link>
                <Link href={'/user/demo-signin/Tvw123'}>
                  <a style={{ color: 'lightgray', marginLeft: '15px' }}>데모 로그인</a>
                </Link> */}
              </>
            )}
          </div>
          <div className="header-gnb__group">
            {!licenseInfo?.isExpired && (
              <>
                <div className="header-search">
                  <button
                    type="button"
                    className="header-search__button"
                    onClick={() => setIsOpenGloablSearchPopup(true)}
                    style={{
                      opacity: globalSeaarchPopup.isOpen ? 0 : 1,
                    }}
                  >
                    <IcoSvg data={icoSvgData.search} />
                    <span className="text">이름, 매체, 이메일</span>
                  </button>
                </div>
                {licenseInfo?.flagGroup ? <GroupIconPage /> : <p>{licenseInfo?.company?.name}</p>}
              </>
            )}
            <div className="header-cs">
              <button
                className={cn(
                  `button-${'link-ico'}`,
                  `size-${'navbar'}`,
                  `colors-${'body-selected'}`,
                  'position-relative'
                )}
                onClick={() => {
                  router.push('/help')
                }}
                title={'고객센터' ?? ''}
              >
                <span className="ico-svg">
                  <img
                    src="/assets/svg/cs-center.svg"
                    alt=""
                  />
                </span>
              </button>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
