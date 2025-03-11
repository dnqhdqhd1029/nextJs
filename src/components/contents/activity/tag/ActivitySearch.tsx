import { useEffect } from 'react'
import cn from 'classnames'

import TagActionPopup from '~/components/contents/activity/tag/Popup/TagActionPopup'
import TagDeletePopup from '~/components/contents/activity/tag/Popup/TagDeletePopup'
import TagContent from '~/components/contents/activity/tag/TagContent/TagContent'
import TagFooter from '~/components/contents/activity/tag/TagFooter/TagFooter'
import TagHeader from '~/components/contents/activity/tag/TagHeader/TagHeader'
import { useTagActivity } from '~/utils/hooks/contents/activity/useTagActivity'

const ActivitySearch = () => {
  const { tagType, init, getTagListData } = useTagActivity()

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
                <h2 className="lnb-search-result__title">활동 태그 관리</h2>
              </div>
              <ul className="lnb-search-result__list">
                <li
                  onClick={i => {
                    i.preventDefault()
                    getTagListData(
                      {
                        name: '',
                        page: 1,
                        size: 20,
                        sort: ['updateAt!desc'],
                      },
                      'total'
                    )
                  }}
                >
                  <button
                    type="button"
                    className={cn('lnb-search-result__menu', {
                      'is-selected': tagType === 'total',
                    })}
                  >
                    <span className="lnb-search-result__menu-text">전체 태그</span>
                  </button>
                </li>
                <li
                  onClick={i => {
                    i.preventDefault()
                    getTagListData(
                      {
                        name: '',
                        page: 1,
                        size: 20,
                        sort: ['updateAt!desc'],
                      },
                      'mine'
                    )
                  }}
                >
                  <button
                    type="button"
                    className={cn('lnb-search-result__menu', {
                      'is-selected': tagType === 'mine',
                    })}
                  >
                    <span className="lnb-search-result__menu-text">내가 만든 태그</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-contents manage">
            <div className="mb-contents-layout__section">
              <TagHeader />
              <TagContent />
              <TagFooter />
            </div>
          </div>
        </div>
      </div>
      <TagActionPopup />
      <TagDeletePopup />
    </>
  )
}

export default ActivitySearch
