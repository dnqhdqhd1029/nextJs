import { useEffect } from 'react'
import cn from 'classnames'

import AllPressContentShareCode from '~/components/contents/monitoring/Clipbook/Search/Content/AllPressContentShareCode'
import ClipbookCopyPopup from '~/components/contents/monitoring/Clipbook/Search/Content/ClipbookCopyPopup'
import ClipBookDetailPopup from '~/components/contents/monitoring/Clipbook/Search/Content/ClipBookDetailPopup'
import Content from '~/components/contents/monitoring/Clipbook/Search/Content/Content'
import ContentAllDeletePopup from '~/components/contents/monitoring/Clipbook/Search/Content/ContentAllDeletePopup'
import ContentDeletePopup from '~/components/contents/monitoring/Clipbook/Search/Content/ContentDeletePopup'
import OwnerChangePopup from '~/components/contents/monitoring/Clipbook/Search/Content/OwnerChangePopup'
import UserProfilePopup from '~/components/contents/monitoring/Clipbook/Search/Content/UserProfilePopup'
import Footer from '~/components/contents/monitoring/Clipbook/Search/Footer/Footer'
import Header from '~/components/contents/monitoring/Clipbook/Search/Header/Header'
import ClipbookPopup from '~/components/contents/monitoring/ClipbookPopup/ClipbookPopup'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const Search = () => {
  const { categoryList, clipbookListParams, handleChangeCategory, init } = useMonitoringClipbookSearch()

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <div className="lnb-search-result__header">
                <h2 className="lnb-search-result__title">클립북</h2>
              </div>

              <ul className="lnb-search-result__list">
                {categoryList &&
                  categoryList.map(e => (
                    <li
                      key={'lnb-search-clipbookListParams' + e.count + e.id}
                      id={'clipbookListParams' + e.count + e.id}
                      onClick={i => {
                        i.preventDefault()
                        handleChangeCategory(e, clipbookListParams)
                      }}
                    >
                      <button
                        type="button"
                        className={cn('lnb-search-result__menu', {
                          'is-selected': clipbookListParams.category.id === e.id,
                        })}
                        id={'clipbookListParams_button' + e.count + e.id}
                        name={'clipbookListParams_button' + e.count + e.id}
                      >
                        <span className="lnb-search-result__menu-text">{e.name}</span>
                        <span className="lnb-search-result__menu-text">{e.count}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-contents manage">
            <div className="mb-contents-layout__section">
              <Header />
              <Content />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <ClipbookPopup />
      <UserProfilePopup />
      <OwnerChangePopup />
      <ClipBookDetailPopup />
      <ContentDeletePopup />
      <ClipbookCopyPopup />
      <ContentAllDeletePopup />
      <AllPressContentShareCode />
    </>
  )
}

export default Search
