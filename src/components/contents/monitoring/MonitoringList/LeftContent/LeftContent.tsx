import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import DropDownButtonNoList from '~/components/contents/common/dropdownButton/DropdownButtonNoList'
import Content from '~/components/contents/monitoring/MonitoringList/LeftContent/Contents'
import ContentSelectForm from '~/components/contents/monitoring/MonitoringList/LeftContent/ContentSelectForm'
import { SelectListOptionItem } from '~/types/common'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const LeftContent = () => {
  const router = useRouter()
  const {
    newsLoading,
    licenseInfo,
    isOwner,
    newsMonitoringPeriodList,
    monitoringDate,
    monitoringList,
    isFilterSubParam,
    originMonitoringList,
    monitoringCategoryData,
    monitoringCategoryKeyword,
    setMonitoringCategoryKeywordAction,
    monitoringListLoading,
    monitoringParams,
    monitoringListParams,
    getMonitoringCategoryActionByKeyword,
    setChangeCategoryDate,
    setOwnerKey,
  } = useMonitoringSearch()
  const debouncedSearchInputValue = useDebounce(monitoringCategoryKeyword, 500)

  const [isOpen, setIsOpen] = useState(false)
  const periodOpenRef = useRef<HTMLDivElement>(null)

  const changeDate = (e: SelectListOptionItem) => {
    setIsOpen(() => false)
    monitoringCategoryData &&
      setChangeCategoryDate(
        monitoringCategoryData,
        monitoringParams,
        monitoringListParams,
        e,
        isOwner,
        isFilterSubParam
      )
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (periodOpenRef.current && !periodOpenRef.current.contains(e.target as Node)) setIsOpen(() => false)
    },
    [isOpen]
  )

  useEffect(() => {
    getMonitoringCategoryActionByKeyword(monitoringCategoryKeyword, originMonitoringList)
  }, [debouncedSearchInputValue])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className={cn('aside-search__section', { 'type-sticky': isFilterSubParam })}>
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">뉴스 맞춤 검색</h3>
          <DropDownButtonNoList
            topLayerList={[
              { id: '/news/saved-search-manage', name: '맞춤 검색 관리' },
              { id: '/news/search', name: '맞춤 검색 만들기' },
            ]}
            topLayerListAction={e => router.push(e.id)}
          />
        </div>
        {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
          <FormInputToggle
            id="monitoring_list_toggle"
            name="monitoring_list_toggle"
            label="MY"
            reverse={true}
            checked={isOwner}
            onChange={e => setOwnerKey(!isOwner, isFilterSubParam, monitoringDate)}
          />
        )}
      </div>
      <div
        className="aside-search__contents "
        style={{ paddingBottom: 14 }}
      >
        <div className="aside-search__search-select">
          <div className="search">
            <FormInputSearch
              placeholder={'검색'}
              value={monitoringCategoryKeyword}
              onChange={e => setMonitoringCategoryKeywordAction(e.target.value)}
              onDeleteButtonClick={() => setMonitoringCategoryKeywordAction('')}
            />
          </div>
          <div className="select">
            <div
              className="select__section select-type1-small select-align-right"
              ref={periodOpenRef}
            >
              <button
                className="select__label"
                onClick={() => !newsLoading && setIsOpen(() => !isOpen)}
              >
                <span className="select__label-text">{monitoringDate.name}</span>
                <IcoSvg data={icoSvgData.chevronDown} />
              </button>
              <div
                className={cn('select-option__section', {
                  'display-block': isOpen,
                })}
                style={{ background: '#fff' }}
              >
                <div className="select-option__area">
                  <ul className="select-option__group">
                    {newsMonitoringPeriodList &&
                      newsMonitoringPeriodList.length > 0 &&
                      newsMonitoringPeriodList.map(e => (
                        <li key={'newsMonitoringPeriodList' + e.id + e.name}>
                          <button
                            className={cn('select-option__item', {
                              'is-selected': monitoringDate.id === e.id,
                            })}
                            onClick={() => changeDate(e)}
                          >
                            {monitoringDate.id === e.id && <IcoSvg data={icoSvgData.checkThick} />}
                            <span
                              className="select-option__item-text"
                              style={{ paddingLeft: 5 }}
                            >
                              {e.name}
                            </span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aside-search__contents">
        {isFilterSubParam ? (
          <ContentSelectForm />
        ) : (
          <Fragment>
            {monitoringListLoading ? (
              <div className="aside-search__contents">
                {/*<Skeleton*/}
                {/*  key={10}*/}
                {/*  width={'100%'}*/}
                {/*  height={'508px'}*/}
                {/*/>*/}
              </div>
            ) : (
              <Fragment>
                {monitoringList &&
                  monitoringList.length > 0 &&
                  monitoringList.map(e => (
                    <Content
                      key={'monitoringList__accordion_category' + e.categoryNm}
                      {...e}
                    />
                  ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default LeftContent
