import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { defaultSortOptionsByData, extendedShareScopeList } from '~/components/contents/distribution/Draft/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { UseGetActionListParams } from '~/utils/api/action/useGetActionList'

const DraftHeader = ({
  title,
  searchParams,
  isSearch,
  isOwnerByMe,
  stateList,
  nwStateList,
  selectedCategoryId,
  totalCount,
  onToggleSearch,
  onToggleOwnerByMe,
  onChangeShareCode,
  onChangeStateCode,
  onChangeNewswireStateCode,
  onChangeSort,
}: {
  title: string
  searchParams: UseGetActionListParams
  isSearch: boolean
  isOwnerByMe: boolean
  stateList: Record<string, string>
  nwStateList: Record<string, string>
  selectedCategoryId: string
  totalCount: number
  onToggleSearch: (isChangeSearch: boolean) => void
  onToggleOwnerByMe: (isOwnerByMe: boolean) => void
  onChangeShareCode: (shareCode: string) => void
  onChangeStateCode: (stateCode: string) => void
  onChangeNewswireStateCode: (state: string) => void
  onChangeSort: (sort: Array<string>) => void
}) => {
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const stateIdOpenRef = useRef<HTMLDivElement>(null)
  const [isShareOption, setIsShareOption] = useState(false)
  const [isStateOption, setIsStateOption] = useState(false)

  const handleShareClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsShareOption(() => false)
    },
    [isShareOption]
  )

  const handleStateClick = useCallback(
    (e: MouseEvent) => {
      if (stateIdOpenRef.current && !stateIdOpenRef.current.contains(e.target as Node)) setIsStateOption(() => false)
    },
    [isStateOption]
  )

  const handleShareCode = (e: SelectListOptionItem) => {
    setIsShareOption(() => false)
    onChangeShareCode(e.id)
  }

  const handleCloseState = () => setIsStateOption(() => false)

  useEffect(() => {
    window.addEventListener('mousedown', e => {
      handleShareClick(e)
      handleStateClick(e)
    })
    return () =>
      window.removeEventListener('mousedown', e => {
        handleShareClick(e)
        handleStateClick(e)
      })
  }, [])

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <ul className="interval-mt10">
          <li>
            <div className="search-result-type2__header">
              <h2 className="s-header__title">{title}</h2>
              <ul className="s-header__control">
                <li className="toggle">
                  {isOwnerByMe && (
                    <FormInputToggle
                      id="monitoring_management_toggle"
                      name="monitoring_management_toggle"
                      label="MY"
                      reverse={true}
                      checked={!!searchParams.ownerIdList?.length}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        onToggleOwnerByMe(e.target.checked)
                      }}
                    />
                  )}
                </li>
                <li className="select">
                  <div
                    className="select__section select-type1-small"
                    ref={shareIdOpenRef}
                  >
                    <button
                      className="select__label"
                      onClick={() => setIsShareOption(!isShareOption)}
                    >
                      <span className="select__label-text">공유설정</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                    <div className={cn('select-option__section', { 'display-block': isShareOption })}>
                      <div className="select-option__area">
                        <ul className="select-option__group">
                          <li>
                            <button className="select-option__item">
                              <span className="select-option__item-text pl-0">공유설정</span>
                            </button>
                          </li>
                          {extendedShareScopeList.map(e => (
                            <li key={'defaultSelectLabel_monitoring_management' + e.id}>
                              <button
                                className={cn('select-option__item', {
                                  'is-selected': (searchParams?.shareCode ?? '') === e.id,
                                })}
                                onClick={() => handleShareCode(e)}
                              >
                                <span className="select-option__item-text pl-5 pr-10">{e.name}</span>
                                <span className="select-option__item-ico">
                                  <IcoSvg data={icoSvgData.checkThick} />
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="select">
                  <div
                    className="select__section select-type1-small"
                    ref={stateIdOpenRef}
                  >
                    <button
                      className="select__label"
                      onClick={() => setIsStateOption(!isStateOption)}
                    >
                      <span className="select__label-text">상태</span>
                      <IcoSvg data={icoSvgData.chevronDown} />
                    </button>
                    <div className={cn('select-option__section', { 'display-block': isStateOption })}>
                      <div className="select-option__area">
                        <ul className="select-option__group">
                          <li>
                            <button className="select-option__item">
                              <span className="select-option__item-text pl-0">상태</span>
                            </button>
                          </li>
                          {selectedCategoryId !== 'NEWSWIRE_RELEASE'
                            ? Object.keys(stateList).map(key => (
                                <li key={'defaultSelectLabel_draft_management' + key}>
                                  <button
                                    className={cn('select-option__item', {
                                      'is-selected':
                                        (!!searchParams?.state_filter?.length && searchParams?.state_filter?.length < 2
                                          ? searchParams.state_filter[0]
                                          : '') === key,
                                    })}
                                    onClick={() => {
                                      handleCloseState()
                                      onChangeStateCode(key.toString())
                                    }}
                                  >
                                    <span className="select-option__item-text pl-5 pr-10">{stateList[key]}</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              ))
                            : Object.keys(nwStateList).map(key => (
                                <li key={'defaultSelectLabel_draft_management' + key}>
                                  <button
                                    className={cn('select-option__item', {
                                      'is-selected':
                                        (!!searchParams?.state?.length ? searchParams.state[0] : '') === key,
                                    })}
                                    onClick={() => {
                                      handleCloseState()
                                      onChangeNewswireStateCode(key.toString())
                                    }}
                                  >
                                    <span className="select-option__item-text pl-5 pr-10">{nwStateList[key]}</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="filter">
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                    onClick={() => onToggleSearch(!isSearch)}
                  />
                  {searchParams.sort && searchParams.sort.length > 0 && (
                    <SortFilterList
                      sortOptionsByData={defaultSortOptionsByData}
                      onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                        onChangeSort([`${dataItem.id}!${orderItem.id}`])
                      }
                      value={searchParams.sort as string[]}
                      disabled={!!!totalCount}
                    />
                  )}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DraftHeader
