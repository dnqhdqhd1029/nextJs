import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { adminLinks } from '~/components/contents/admin/defaultData'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const NavigationBar = () => {
  const router = useRouter()
  const { licenseInfo } = useAdminUser()

  return (
    <div className="lnb-search-setting__section">
      <h2 className="lnb-search-setting__title">관리자</h2>
      <div className="lnb-search-setting__menu">
        <ul className="lnb-search-setting-menu__list">
          {licenseInfo && (
            <>
              {adminLinks.map(e => {
                if (e.id === 'admin-group' && !licenseInfo.flagGroup) return
                return (
                  <li key={'lnb-search-setting-menu__text' + e.pathLink?.toString()}>
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
                )
              })}
            </>
          )}
        </ul>
      </div>

      <div className="lnb-search-setting__cs">
        {licenseInfo && !licenseInfo.isExpired && licenseInfo.flagManager && licenseInfo.member && (
          <>
            <h3 className="lnb-search-setting__sub-title">전담 도우미</h3>
            {/* <ul className="lnb-search-setting-menu__list">
              <li style={{ cursor: 'pointer' }}>
                <p className="lnb-search-setting-menu__text">{licenseInfo.member.name}</p>
              </li>
              <li style={{ cursor: 'pointer' }}>
                <p className="lnb-search-setting-menu__text">미디어비</p>
              </li>
              <li style={{ cursor: 'pointer' }}>
                <p className="lnb-search-setting-menu__text">
                  {licenseInfo.member.departmentName} {licenseInfo.member.position}
                </p>
              </li>
              <li style={{ cursor: 'pointer' }}>
                <p className="lnb-search-setting-menu__text">{licenseInfo.member.phone}</p>
              </li>
              <li>
                <p className="lnb-search-setting-menu__text">
                  <Button
                    elem="a"
                    url={`mailto:${licenseInfo.member.email}`}
                    label={licenseInfo.member?.email || ''}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </p>
              </li>
            </ul> */}
            <ul className="lnb-search-setting-menu__list">
              <li>
                <p className="lnb-search-setting-menu__text2">{licenseInfo.member.name}</p>
                <p className="lnb-search-setting-menu__text2">미디어비</p>
                <p className="lnb-search-setting-menu__text2">
                  {licenseInfo.member.departmentName} {licenseInfo.member.position}
                </p>
                <p className="lnb-search-setting-menu__text2">{licenseInfo.member.phone}</p>
                <p className="lnb-search-setting-menu__text2">
                  <Button
                    elem="a"
                    url={`mailto:${licenseInfo.member.email}`}
                    label={licenseInfo.member?.email || ''}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </p>
              </li>
            </ul>
          </>
        )}

        <h3 className="lnb-search-setting__sub-title">고객센터</h3>
        <ul className="lnb-search-setting-menu__list">
          <li>
            {/* <p
              className="lnb-search-setting-menu__text2 body-link"
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/help/my-inquiry')}
            >
              내 문의
            </p> */}
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

export default NavigationBar
