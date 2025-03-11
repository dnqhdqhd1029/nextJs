import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Pagination from '~/components/common/ui/Pagination'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import ActivityItem from '~/components/contents/pressMedia/MediaProfile/Activity/ActivityItem'
import { activityNaviLinks } from '~/components/contents/pressMedia/MediaProfile/defaultData'
import { searchContentListProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { useMediaProfile } from '~/utils/hooks/contents/pressMedia/useMediaProfile'

const Activity = () => {
  const {
    mediaIdKeyParam,
    mediaIdKey,
    activityParamKeyword,
    activityLoading,
    activityTabList,
    activityTab,
    actionCategoryList,
    activityDataList,
    commonCodeState,
    actionStateFilterList,
    activityDataListPaginationInfo,
    setActivityParamKeywordAction,
    activityHandlePaginationChange,
    activityHandleKeywordChange,
    activityChangeTab,
    mediaFilterOptionAction,
  } = useMediaProfile()
  const updateButtonLayerRef = useRef<HTMLDivElement>(null)

  const [isSelected, setIsSelected] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (updateButtonLayerRef.current && !updateButtonLayerRef.current.contains(e.target as Node))
        setIsSelected(() => false)
    },
    [isSelected]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className="flexible-item__group">
      <div className="flexible-item__header">
        <h4 className="font-heading--h5">활동</h4>
        <div
          // className="select__section select-type1-small select-line"
          className={cn('select__section select-type1-small select-type1-tertiary', { 'is-show': isSelected })}
          ref={updateButtonLayerRef}
        >
          <button
            className="select__label"
            onClick={() => setIsSelected(!isSelected)}
          >
            <span className="select__label-text">활동 추가</span>
            <IcoSvg data={icoSvgData.chevronDown} />
          </button>

          <div className={cn('select-option__section', { 'display-block': isSelected })}>
            <div className="select-option__area">
              <ul className="select-option__group">
                {activityNaviLinks &&
                  activityNaviLinks.length > 0 &&
                  activityNaviLinks.map(e => {
                    if (e.id === 'PRESS_RELEASE' || e.id === 'MAILING') {
                      // @ts-ignore
                      if (!mediaIdKeyParam?.isSysInfo && mediaIdKeyParam?.email && mediaIdKeyParam?.email !== '') {
                        return (
                          <li key={'PressActivityOption' + e.id}>
                            <button
                              className="select-option__item"
                              onClick={() => mediaIdKeyParam && mediaFilterOptionAction(e.id, mediaIdKeyParam)}
                            >
                              <span className="select-option__item-text">{e.name}</span>
                            </button>
                          </li>
                        )
                      } else if (
                        mediaIdKeyParam?.isSysInfo &&
                        mediaIdKeyParam?.contacts?.all?.beemail &&
                        mediaIdKeyParam?.contacts?.all?.beemail !== ''
                      ) {
                        return (
                          <li key={'PressActivityOption' + e.id}>
                            <button
                              className="select-option__item"
                              onClick={() => mediaIdKeyParam && mediaFilterOptionAction(e.id, mediaIdKeyParam)}
                            >
                              <span className="select-option__item-text">{e.name}</span>
                            </button>
                          </li>
                        )
                      }
                    } else {
                      return (
                        <li key={'PressActivityOption' + e.id}>
                          <button
                            className="select-option__item"
                            onClick={() => mediaIdKeyParam && mediaFilterOptionAction(e.id, mediaIdKeyParam)}
                          >
                            <span className="select-option__item-text">{e.name}</span>
                          </button>
                        </li>
                      )
                    }
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flexible-item__contents">
        <div className="tabs__section type1-small">
          <div className="tabs-menu__group">
            <ul className="tabs-menu__list">
              {activityTabList &&
                activityTabList.length > 0 &&
                activityTabList.map(e => (
                  <li
                    key={'activityTabList' + e.id}
                    className={cn({ 'is-active': e.id === activityTab.id })}
                  >
                    <button
                      type="button"
                      className="tabs-menu__btn"
                      onClick={() =>
                        activityChangeTab(e, mediaIdKey, actionCategoryList, commonCodeState, actionStateFilterList)
                      }
                    >
                      <span className="tabs-menu__name">{e.name}</span>
                      <span className="tabs-menu__number">{e.extra}</span>
                      {e.id === 'corverage' && (
                        <Tooltips
                          className="ml-4"
                          tooltipId={'tt1-1'}
                          tooltipPlace={'top'}
                          tooltipHtml={`이 언론인의 기사가 커버리지 클립북에 클리핑되어 있으면 이곳에 노출됩니다.`}
                          tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                        />
                      )}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="tabs-panel__section">
            {activityTab.extra && Number(activityTab.extra) > 8 && (
              <FormInputSearch
                placeholder={'검색'}
                value={activityParamKeyword}
                onChange={e => setActivityParamKeywordAction(e.target.value)}
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  activityHandleKeywordChange(
                    activityTab.id,
                    activityParamKeyword,
                    mediaIdKey,
                    actionCategoryList,
                    commonCodeState,
                    actionStateFilterList
                  )
                }
                onDeleteButtonClick={() => setActivityParamKeywordAction('')}
              />
            )}
            {activityLoading ? (
              <div className="list-type1__section">
                <ul className="list-type1__group before-none">
                  {Array.from({ length: 8 }).map((e, index) => (
                    <li key={'list-type5-list-type8__group' + 'searchContentList' + index}>
                      {/*<Skeleton*/}
                      {/*  key={10}*/}
                      {/*  width={'100%'}*/}
                      {/*  height={'42px'}*/}
                      {/*/>*/}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="tabs-panel__group">
                {activityDataList && activityDataList.length > 0 ? (
                  <Fragment>
                    <div className="list-type1__section">
                      <ul className="list-type1__group">
                        {activityDataList.map(e => {
                          const item = e as searchContentListProps
                          return (
                            <ActivityItem
                              key={
                                'activityDataList_ActivityItem' + item.actionId?.toString() ||
                                '' + item.title?.toString() ||
                                ''
                              }
                              {...item}
                            />
                          )
                        })}
                      </ul>
                    </div>
                    {activityDataListPaginationInfo.totalPageCount > 1 && (
                      <div className="flexible-item__pagination">
                        <Pagination
                          type={'n1'}
                          viewCount={activityDataListPaginationInfo.size}
                          page={activityDataListPaginationInfo.page}
                          count={activityDataListPaginationInfo.totalPageCount}
                          onPageChange={e =>
                            activityHandlePaginationChange(
                              activityTab.id,
                              e,
                              mediaIdKey,
                              actionCategoryList,
                              commonCodeState,
                              actionStateFilterList
                            )
                          }
                        />
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <div className="list-type1__result-none">활동이 없습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
