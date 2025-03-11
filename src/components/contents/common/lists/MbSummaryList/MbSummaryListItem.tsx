/**
 * @file MbSummaryListItem.tsx
 * @description search-type4
 */

import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { debounce } from 'throttle-debounce'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { SettingOption, ShareItem, SummaryListItem } from '~/types/contents/Common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useAlarm } from '~/utils/hooks/common/useAlarm'

interface Props {
  item: SummaryListItem
  isItemClickable?: boolean
  type_title?: string
  onItemSelected?: (item: SummaryListItem) => void
}

const MbSummaryListItem = ({ item, isItemClickable = true, type_title = '맞춤 검색', onItemSelected }: Props) => {
  const {
    id,
    isChecked,
    name,
    nameLink,
    taggingCount,
    isCoverage,
    itemCounter,
    customInfo,
    groupScope,
    shareTargetCode,
    category,
    shareScope,
    shareScopeList,
    onShareScopeSelected,
    shareTarget,
    shareTargetList,
    onShareTargetSelected,
    logHistory,
    settingOptions,
    itemUnit = '명',
    isMyItem = false,
    isAlarm = false,
    onCheck,
    onSettingOptionClick,
  } = item
  const { setConfirm } = useAlarm()

  const router = useRouter()

  const blankShareItem: ShareItem = { id: '', name: '' }

  const itemShareRef = useRef<HTMLLIElement>(null)
  const itemShareTargetRef = useRef<HTMLLIElement>(null)
  const settingOptionRef = useRef<HTMLLIElement>(null)

  const [isActive, setIsActive] = useState(false)

  const [itemShareScope, setItemShareScope] = useState<ShareItem>(shareScope ?? blankShareItem)
  const [isShareScopeOptionOpen, setIsShareScopeOptionOpen] = useState(false)
  const [itemShareTarget, setItemShareTarget] = useState<ShareItem>(shareTarget ?? blankShareItem)
  const [filteredShareTargetList, setFilteredShareTargetList] = useState<ShareItem[]>(shareTargetList ?? [])
  const [isShareTargetOptionOpen, setIsShareTargetOptionOpen] = useState(false)
  const [isSettingOptionOpen, setIsSettingOptionOpen] = useState(false)

  const getShareTargetCodeName = (code: string) => {
    switch (code) {
      case 'COMPANY':
        return '전체그룹'
      default:
        return ''
    }
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, item: SummaryListItem) => {
    e.stopPropagation()
    onCheck && onCheck(e, item)
  }

  const handleMoveToLink = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    e.stopPropagation()

    router.push({
      pathname: nameLink,
    })
  }

  const handleShareScopeOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsShareScopeOptionOpen(!isShareScopeOptionOpen)
  }

  const handleShareScopeSelected = (e: MouseEvent<HTMLButtonElement>, item: ShareItem) => {
    e.preventDefault()
    e.stopPropagation()

    setItemShareScope(item)
    setIsShareScopeOptionOpen(false)
    onShareScopeSelected && onShareScopeSelected(item)
  }

  const handleShareTargetOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isMyItem && shareScope?.id !== 'WRITABLE') {
      return
    }
    setIsShareTargetOptionOpen(!isShareTargetOptionOpen)
  }

  const handleShareTargetSelected = (e: MouseEvent<HTMLButtonElement>, item: ShareItem) => {
    e.preventDefault()
    e.stopPropagation()

    setConfirm({
      title: `소유자 변경 확인`,
      message: (
        <p>
          공유 권한 설정에 따라 {type_title}에 접근하지 못할 수 있습니다.
          <br />이 {type_title}의 소유자를 "{item.name}"으로 변경하겠습니까?
        </p>
      ),
      open: true,
      onConfirm: () => {
        setItemShareTarget(item)
        setIsShareTargetOptionOpen(false)
        onShareTargetSelected && onShareTargetSelected(item)
      },
    })
  }

  const handleChangeTargetSearch = debounce(200, (e: ChangeEvent<HTMLInputElement>) => {
    const filteredList = shareTargetList?.filter(item => item.name.includes(e.target.value)) ?? []
    setFilteredShareTargetList(filteredList)
  })

  const handleSettingOptionOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsSettingOptionOpen(!isSettingOptionOpen)
  }

  const handleSettingOptionClick = (e: MouseEvent<HTMLButtonElement>, option: SettingOption) => {
    e.stopPropagation()
    e.preventDefault()

    onSettingOptionClick && onSettingOptionClick(e, item, option)
    setIsSettingOptionOpen(false)
  }

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsActive(true)
  }

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsActive(false)
  }

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isItemClickable) {
      onItemSelected && onItemSelected(item)
    }
  }

  useOuterClick(itemShareRef, () => {
    setIsShareScopeOptionOpen(false)
  })

  useOuterClick(itemShareTargetRef, () => {
    setIsShareTargetOptionOpen(false)
  })

  useOuterClick(settingOptionRef, () => {
    setIsSettingOptionOpen(false)
  })

  useEffect(() => {
    if (shareScope) {
      setItemShareScope(shareScope)
    }
  }, [shareScope])

  useEffect(() => {
    if (shareTarget) {
      setItemShareTarget(shareTarget)
    }
  }, [shareTarget])

  useEffect(() => {
    if (shareTargetList) {
      setFilteredShareTargetList(shareTargetList)
    }
  }, [shareTargetList])

  return (
    <li>
      <div
        className={cn('list-type4-item__section', { 'is-not-active': isActive })}
        style={{ overflow: 'visible' }}
      >
        <ul className="list-type4-item__list">
          {isChecked !== undefined && (
            <li className="list-type4-item__check">
              <FormInputBtn
                type="checkbox"
                name={id}
                id={id}
                label=""
                checked={isChecked}
                onChange={e => handleCheck(e, item)}
              />
            </li>
          )}
          <li
            className="list-type4-item__contents"
            onClick={handleClick}
            style={{ cursor: isItemClickable ? 'pointer' : 'default' }}
          >
            <ul className="list-type4-item__contents-container">
              <li className="list-type4-item__title type-flex-grow">
                <p className="list-type4-item__text">
                  <span
                    className={cn({ 'no-link': !nameLink })}
                    onClick={e => nameLink && handleMoveToLink(e)}
                  >
                    {name}
                  </span>
                  {isMyItem && <IcoSvg data={icoSvgData.personLineBroken} />}
                  {isAlarm && <IcoSvg data={icoSvgData.bell} />}
                </p>
              </li>

              {taggingCount && (
                <li className="list-type4-item__tagging">
                  <p className="list-type4-item__text">활동 {getCurrencyFormat(taggingCount)}</p>
                </li>
              )}

              {isCoverage && (
                <li className="list-type4-item__coverage">
                  <p className="list-type4-item__text">{isCoverage ? '커버리지' : ''}</p>
                </li>
              )}

              {itemCounter !== undefined && (
                <li className="list-type4-item__counter">
                  <p className="list-type4-item__text">
                    <>
                      {itemCounter}
                      {itemUnit}
                    </>
                  </p>
                </li>
              )}

              {customInfo && (
                <li className="list-type4-item__counter">
                  <p className="list-type4-item__text">{customInfo}</p>
                </li>
              )}

              {shareTargetCode && (
                <li className="list-type4-item__counter">
                  <p className="list-type4-item__text">{getShareTargetCodeName(shareTargetCode)}</p>
                </li>
              )}

              {groupScope && (
                <li className="list-type4-item__group">
                  <p className="list-type4-item__text">{groupScope.name}</p>
                </li>
              )}

              {category && (
                <li className="list-type4-item__category">
                  <p className="list-type4-item__text">{category}</p>
                </li>
              )}

              {shareScope && shareScopeList && (
                <li
                  className="list-type4-item__share-filter"
                  ref={itemShareRef}
                >
                  <div className="select__section select-type1-small">
                    <button
                      className={cn('select__label', { 'is-disabled': !isMyItem })}
                      onClick={e => isMyItem && handleShareScopeOpen(e)}
                      onMouseDown={e => isMyItem && handleMouseDown(e)}
                      onMouseUp={e => isMyItem && handleMouseUp(e)}
                    >
                      <span className="select__label-text">{itemShareScope.shortName ?? itemShareScope.name}</span>
                      {isMyItem && (
                        <IcoSvg data={isShareScopeOptionOpen ? icoSvgData.chevronUp : icoSvgData.chevronDown} />
                      )}
                    </button>

                    <div
                      className="select-option__section"
                      style={{ display: isShareScopeOptionOpen ? 'block' : 'none' }}
                    >
                      <div className="select-option__area">
                        <ul className="select-option__group">
                          {shareScopeList.map(item => (
                            <li key={item.id}>
                              <button
                                className={cn('select-option__item', { 'is-selected': item.id === itemShareScope.id })}
                                onClick={e => handleShareScopeSelected(e, item)}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                              >
                                <span className="select-option__item-text">{item.name}</span>
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
              )}

              {shareTarget && shareTargetList && (
                <li
                  className="list-type4-item__share-group"
                  ref={itemShareTargetRef}
                >
                  <div className="select__section select-type2-secondary">
                    <button
                      className={cn('select__label', { 'is-disabled': !isMyItem })}
                      onClick={e => isMyItem && handleShareTargetOpen(e)}
                      onMouseDown={e => isMyItem && handleMouseDown(e)}
                      onMouseUp={e => isMyItem && handleMouseUp(e)}
                    >
                      <span className="select__label-text">{itemShareTarget.name}</span>
                      {isMyItem && (
                        <IcoSvg data={isShareTargetOptionOpen ? icoSvgData.chevronUp : icoSvgData.chevronDown} />
                      )}
                    </button>

                    <div
                      className="select-option__section"
                      style={{ display: isShareTargetOptionOpen ? 'block' : 'none' }}
                    >
                      {shareTargetList.length >= 10 && (
                        <div className="select-option-search__section">
                          <FormInputSearch
                            placeholder={'검색'}
                            onChange={handleChangeTargetSearch}
                          />
                        </div>
                      )}

                      <div className="select-option__area">
                        <ul className="select-option__group">
                          {filteredShareTargetList.map(item => (
                            <li key={item.id}>
                              <button
                                className={cn('select-option__item', { 'is-selected': item.id === itemShareTarget.id })}
                                onClick={e => handleShareTargetSelected(e, item)}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                              >
                                <span className="select-option__item-text">{item.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {logHistory && (
                <li className="list-type4-item__history">
                  <div className="list-type4-item__history-user">
                    <p className="list-type4-item__text">{logHistory.comment}</p>
                  </div>
                  <div className="list-type4-item__history-date">
                    <p className="list-type4-item__text">{logHistory.date}</p>
                  </div>
                </li>
              )}

              {settingOptions && settingOptions.length > 0 && (
                <li
                  className="list-type4-item__more"
                  ref={settingOptionRef}
                >
                  <div className="select__section select-type1-small select-ico-only select-align-right">
                    <button
                      className="select__label ico-size16"
                      onClick={handleSettingOptionOpen}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                    >
                      <span className="select__label-text">설정</span>
                      <IcoSvg data={icoSvgData.threeDotsVertical} />
                    </button>

                    <div
                      className="select-option__section"
                      style={{ display: isSettingOptionOpen ? 'block' : 'none' }}
                    >
                      <div className="select-option__area">
                        <ul className="select-option__group">
                          {settingOptions.map((settingOption, settingOptionIndex) => {
                            return (
                              <li
                                key={settingOptionIndex}
                                className={cn({
                                  'display-none': settingOption.isAvaliableToBeDisabled,
                                })}
                              >
                                <button
                                  className="select-option__item"
                                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                                    !settingOption.isAvaliableToBeDisabled && handleSettingOptionClick(e, settingOption)
                                  }
                                >
                                  <span className="select-option__item-text">{settingOption.title}</span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default MbSummaryListItem
