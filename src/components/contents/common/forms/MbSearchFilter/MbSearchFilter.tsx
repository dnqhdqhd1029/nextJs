/**
 * @file MbSearchFilter.tsx
 * @description 검색용 필터 기능
 */

import { ChangeEvent, Fragment, MouseEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import _ from 'lodash'
import moment from 'moment'

import FilterChildItemHasSub from './children/FilterChildItemHasSub'
import FilterChildItemOnly from './children/FilterChildItemOnly'
import FilterParentItem from './children/FilterParentItem'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { FILTER_CHECK_ITEM_LIMIT } from '~/constants/common'
import { TimeoutRef } from '~/types/common'
import type { MbSearchFilterItem, ReturnValueCalcurateDateRange } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

export const filterTransition = { type: 'easeOut', duration: 0.15 }

interface Props {
  isShow?: boolean
  filterData?: MbSearchFilterItem[]
  standAlone?: boolean
  hasCloseButton?: boolean
  onClose?: () => void
  onFilterChange?: (items: MbSearchFilterItem[], prevItems: MbSearchFilterItem[], isActToggling: boolean) => void
  isReadyToCheckFilter?: string
  unavailableItemsToDelete?: string[]
}

const MbSearchFilter = ({
  isShow = true,
  filterData,
  standAlone = false,
  hasCloseButton = false,
  onClose,
  onFilterChange,
  isReadyToCheckFilter,
  unavailableItemsToDelete = [],
}: Props) => {
  const timerRef: TimeoutRef = useRef(null)
  const toggleRef = useRef(false)
  const prevFilterItemsRef = useRef<MbSearchFilterItem[]>() // 이전 filterItems 값을 추적하기 위한 ref 생성
  const [filterItems, setFilterItems] = useState<MbSearchFilterItem[]>([])
  const [originFilterItems, setOriginFilterItems] = useState<MbSearchFilterItem[]>([])
  const isFirstLoadCompleted = useRef<boolean>()
  const [isReadyToActive, setIsReadyToActive] = useState(true)
  const [isAllExpanded, setIsAllExpanded] = useState(false)

  const handleClose = () => {
    handleFilterItemsReset()

    onClose && onClose()
  }

  const handleAllItemExapandOrCollapse = () => {
    const newFilterItems = _.cloneDeep(filterItems)
    const flag = !isAllExpanded

    newFilterItems.forEach(item => {
      if (item.subItems) {
        item.checked = flag
        item.subItems.forEach(subItem => {
          if (subItem.subItems) {
            subItem.checked = flag
          }
        })
      }
    })

    toggleRef.current = true

    setFilterItems(newFilterItems)
    setIsAllExpanded(flag)

    handleFilterItemsChange(newFilterItems)
  }

  const handleAllItemExapand = () => {
    const newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(item => {
      if (item.subItems) {
        item.checked = true
        item.subItems.forEach(subItem => {
          if (subItem.subItems) {
            subItem.checked = true
          }
        })
      }
    })

    toggleRef.current = true

    setFilterItems(newFilterItems)
    setIsAllExpanded(true)

    handleFilterItemsChange(newFilterItems)
  }

  const handleAllItemCollapse = () => {
    const newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(item => {
      if (item.subItems) {
        item.checked = false
        item.subItems.forEach(subItem => {
          if (subItem.subItems) {
            subItem.checked = false
          }
        })
      }
    })

    toggleRef.current = true

    setFilterItems(newFilterItems)
    setIsAllExpanded(false)

    handleFilterItemsChange(newFilterItems)
  }

  const handleToggleDropDown = (e: MouseEvent<HTMLButtonElement>, item: MbSearchFilterItem) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    toggleRef.current = true

    const newFilterItems: MbSearchFilterItem[] = []

    filterItems.forEach(parent => {
      if (parent.id === item.id) {
        newFilterItems.push({
          ...parent,
          checked: !parent.checked,
        })
      } else {
        newFilterItems.push(parent)
      }
    })

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleChildItemToggleDropdown = (
    e: MouseEvent<HTMLButtonElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem
  ) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    toggleRef.current = true

    const newFilterItems = _.cloneDeep(filterItems) // Lodash를 사용하여 깊은 복사

    newFilterItems.forEach(parent => {
      if (parent.id === parentItem.id && parent.subItems) {
        parent.subItems = parent.subItems.map(child => {
          if (child.id === childItem.id) {
            return {
              ...child,
              checked: !child.checked,
            }
          }
          return child
        })
      }
    })

    setFilterItems(newFilterItems) // 변경된 newItems로 상태 업데이트

    handleFilterItemsChange(newFilterItems)
  }

  /**
   * 체크 박스 변경 이벤트
   * @param {ChangeEvent<HTMLInputElement>} e event
   * @param {MbSearchFilterItem} parentItem 뎁스 1 아이템
   * @param {MbSearchFilterItem} childItem 뎁스 2 아이템
   * @param {MbSearchFilterItem} grandChildItem 뎁스 3 아이템
   */
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem,
    grandChildItem?: MbSearchFilterItem
  ) => {
    e.stopPropagation()

    const checkedItemCount = parentItem.checkedItems?.length ?? 0

    if (!isReadyToActive) {
      return
    }

    if (e.target.checked && checkedItemCount >= FILTER_CHECK_ITEM_LIMIT) {
      openToast('항목은 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해 보세요.', 'warning')
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)
    newFilterItems = newFilterItems.map(parent => {
      if (parent.id === parentItem.id && parent.subItems) {
        const newSubItems = parent.subItems?.map(child => {
          if (child.id === childItem.id) {
            if (child.subItems && grandChildItem) {
              const newGrandChildItems = child.subItems?.map(grandChild => {
                if (grandChild.id === grandChildItem.id) {
                  return {
                    ...grandChild,
                    checked: !grandChild.checked,
                  }
                }
                return grandChild
              })
              return {
                ...child,
                subItems: newGrandChildItems,
              }
            }
            return {
              ...child,
              checked: !child.checked,
            }
          }
          return child
        })
        return {
          ...parent,
          subItems: newSubItems,
        }
      }
      return parent
    })

    const checkedCountNewItems = calcurateCheckedCount(newFilterItems)

    setFilterItems(checkedCountNewItems)

    handleFilterItemsChange(checkedCountNewItems)
  }

  /**
   * 체크된 아이템을 찾아 chckedItems에 저장
   * @param {MbSearchFilterItem[]} items 전체 아이템
   * @returns {MbSearchFilterItem[]} 체크된 아이템을 계산한 아이템
   */
  const calcurateCheckedCount = (items: MbSearchFilterItem[]): MbSearchFilterItem[] => {
    let newItems = _.cloneDeep(items)
    newItems = newItems.map(parentItem => {
      if (parentItem.checkedItems === undefined) return parentItem

      const childItems = parentItem.subItems

      let checkedItems: MbSearchFilterItem[] = []

      if (childItems) {
        childItems.map(childItem => {
          const grandChildItems = childItem.subItems

          if (!grandChildItems) {
            if (childItem.checked) {
              checkedItems.push(childItem)
            }
          } else {
            grandChildItems.map(grandChildItem => {
              if (grandChildItem.checked) {
                checkedItems.push(grandChildItem)
              }
            })
          }
        })
      }

      return {
        ...parentItem,
        checkedItems,
      }
    })

    return newItems
  }

  /**
   * 검색을 하면 필터링해서 맞는 아이템만 보여준다.
   * @param {ChangeEvent<HTMLInputElement>} e 이벤트
   * @param {MbSearchFilterItem} parentItem 뎁스 1 아이템
   * @param {MbSearchFilterItem} childItem 뎁스 2 아이템
   */
  const handleChildItemSearch = (
    e: ChangeEvent<HTMLInputElement>,
    parentItem: MbSearchFilterItem,
    childItem?: MbSearchFilterItem
  ) => {
    const value = e.target.value.trim()

    if (!isReadyToActive) {
      return
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(async () => {
      const newFilterItems: MbSearchFilterItem[] = []

      filterItems.forEach(parentItem => {
        if (childItem) {
          // 부모 항목에 자식 항목들이 있고, 특정 자식 항목을 변경해야 하는 경우
          const newSubItems = parentItem?.subItems?.map(child => {
            if (child.id === childItem.id) {
              // 특정 자식 항목에 searchTerm 값을 업데이트
              return {
                ...child,
                searchTerm: value,
              }
            }
            return child
          })

          // 부모 항목에 업데이트된 자식 항목들을 설정
          newFilterItems.push({
            ...parentItem,
            subItems: newSubItems,
          })
        } else {
          // 자식 항목 없이 부모 항목만 변경하는 경우
          newFilterItems.push({
            ...parentItem,
            searchTerm: value,
          })
        }
      })

      setFilterItems(newFilterItems)

      handleFilterItemsChange(newFilterItems)
    }, 200)
  }

  /**
   * 현재 선택된 select option item에 따라 날짜 범위를 계산한다.
   * @param {MbSearchFilterItem} item 선택된 아이템
   * @returns {ReturnValueCalcurateDateRange}
   */
  const calcurateDateRange = (item: MbSearchFilterItem): ReturnValueCalcurateDateRange => {
    let endDate = moment().format('YYYY.MM.DD')
    let startDate = moment().format('YYYY.MM.DD')
    switch (item.dateValue) {
      case 'today':
        startDate = moment().format('YYYY.MM.DD')
        break
      case 'last3days':
        startDate = moment().subtract(3, 'days').format('YYYY.MM.DD')
        break
      case 'last7days':
        startDate = moment().subtract(7, 'days').format('YYYY.MM.DD')
        break
      case 'last1month':
        startDate = moment().subtract(1, 'months').format('YYYY.MM.DD')
        break
    }

    return {
      selectedDateValue: `${startDate} ~ ${endDate}`,
      dateRange: {
        startDate,
        endDate,
      },
    }
  }

  /**
   * select 형식의 아이템 변경 이벤트
   * @param {MouseEvent<HTMLButtonElement>} e 이벤트
   * @param {MbSearchFilterItem} parentItem 뎁스 1 아이템
   * @param {MbSearchFilterItem} childItem 뎁스 2 아이템
   */
  const handleSelectChange = (
    e: MouseEvent<HTMLButtonElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem
  ) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(parent => {
      if (parent.id === parentItem.id && parent.subItems) {
        const newSubItems = parent.subItems.map(child => {
          if (child.id === childItem.id) {
            return {
              ...child,
              checked: true,
            }
          }
          return {
            ...child,
            checked: false,
          }
        })

        if (parentItem.radioType) {
          parent.selectedItem = childItem
        } else if (parentItem.dateType) {
          if (!childItem.directDate) {
            parent.selectedItem = childItem
            parent.selectedDateValue = ''
            parent.dateRange = {
              startDate: null,
              endDate: null,
            }
          } else {
            parent.selectedItem = null
            parent.selectedDateValue = ''
            parent.dateRange = {
              startDate: null,
              endDate: null,
            }
          }
        }

        parent.subItems = newSubItems
      }
    })

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleDateChange = (sDate: Date, eDate: Date, parentItem: MbSearchFilterItem) => {
    if (!isReadyToActive) {
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(parent => {
      if (parent.id === parentItem.id) {
        const startDate = moment(sDate).format('YYYY.MM.DD')
        const endDate = moment(eDate).format('YYYY.MM.DD')
        const selectedDateValue = `${startDate} ~ ${endDate}`

        parent.dateRange = {
          startDate,
          endDate,
        }
        parent.selectedDateValue = selectedDateValue
      }
    })

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleRemoveAllCheckedItems = (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(parent => {
      const findUnavailableItem = unavailableItemsToDelete.find(item => item === parent.id)

      if (parent.id === parentItem.id && !findUnavailableItem) {
        const childItems = parent.subItems

        if (childItems) {
          parent.subItems = childItems.map(child => {
            const grandChildItems = child.subItems

            if (grandChildItems) {
              return {
                ...child,
                subItems: grandChildItems.map(grandChild => ({
                  ...grandChild,
                  checked: false,
                })),
              }
            } else {
              return {
                ...child,
                checked: false,
              }
            }
          })
        } else {
          parent.checked = false
        }
      }
    })

    newFilterItems = calcurateCheckedCount(newFilterItems)

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleRemoveSelectedValue = (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(parent => {
      const findUnavailableItem = unavailableItemsToDelete.find(item => item === parent.id)

      if (parent.id === parentItem.id && !findUnavailableItem) {
        parent.selectedItem = null

        if (parent.subItems) {
          parent.subItems = parent.subItems.map(child => {
            return {
              ...child,
              checked: false,
            }
          })
        }
      }
    })

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleRemoveDateValue = (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => {
    e.stopPropagation()

    if (!isReadyToActive) {
      return
    }

    let newFilterItems = _.cloneDeep(filterItems)

    newFilterItems.forEach(parent => {
      const findUnavailableItem = unavailableItemsToDelete.find(item => item === parent.id)

      if (parent.id === parentItem.id && !findUnavailableItem) {
        parent.selectedDateValue = ''
        parent.dateRange = {
          startDate: null,
          endDate: null,
        }

        if (parent.subItems) {
          parent.subItems = parent.subItems.map(child => {
            return {
              ...child,
              checked: false,
            }
          })
        }
      }
    })

    setFilterItems(newFilterItems)

    handleFilterItemsChange(newFilterItems)
  }

  const handleFilterItemsReset = () => {
    if (!isReadyToActive) {
      return
    }

    // originFilterItems의 각 항목을 새 객체로 만들어 변경 적용
    const newOriginItems = originFilterItems.map(parent => {
      const findUnavailableItem = unavailableItemsToDelete.find(item => item === parent.id)
      if (findUnavailableItem) {
        return { ...parent, checked: false }
      }

      const newSubItems = parent.subItems?.map(child => {
        const newGrandChildItems = child.subItems?.map(grandChild => {
          return { ...grandChild, checked: false }
        })

        return {
          ...child,
          checked: false,
          subItems: newGrandChildItems,
        }
      })

      return {
        ...parent,
        checked: false,
        subItems: newSubItems,
        selectedItem: null,
        selectedDateValue: '',
        checkedItems: [],
      }
    })

    setFilterItems(newOriginItems)
    handleFilterItemsChange(newOriginItems)
  }

  // eslint-disable-next-line
  const handleAnimationComplete = (latest: any, item: MbSearchFilterItem) => {
    // if (!item.checked) {
    //   setFilterItems(prev => {
    //     let newItems = _.cloneDeep(prev)
    //     newItems = newItems.map(parent => {
    //       if (parent.id === item.id) {
    //         return {
    //           ...parent,
    //           overflowProperty: 'visible',
    //         }
    //       }
    //       return parent
    //     })
    //     return newItems
    //   })
    // }
  }

  // eslint-disable-next-line
  const handleAnimationStart = (latest: any, item: MbSearchFilterItem) => {
    // setFilterItems(prev => {
    //   let newItems = _.cloneDeep(prev)
    //   newItems = newItems.map(parent => {
    //     if (parent.id === item.id) {
    //       return {
    //         ...parent,
    //         overflowProperty: 'hidden',
    //       }
    //     }
    //     return parent
    //   })
    //   return newItems
    // })
  }

  const handleFilterItemsChange = (fItems: MbSearchFilterItem[]) => {
    if (fItems && fItems.length > 0) {
      const toggleFlag = toggleRef.current

      setIsReadyToActive(false)
      onFilterChange && onFilterChange(fItems, prevFilterItemsRef.current ?? [], toggleFlag)
    }

    toggleRef.current = false
  }

  useEffect(() => {
    if (filterData === undefined) {
      setFilterItems([])
      setOriginFilterItems([])
      isFirstLoadCompleted.current = false
      return
    }

    let newFilterData = _.cloneDeep(filterData)

    newFilterData?.map(item => {
      if (!!item.subItems) {
        if (item.subItems?.findIndex(subItem => !!subItem.subItems) >= 0) {
          let subItems = _.cloneDeep(item.subItems)
          subItems.map(subItem => {
            const newSubItems = _.cloneDeep(subItem.subItems)
            newSubItems?.sort((a: MbSearchFilterItem, b: MbSearchFilterItem) => (b?.count ?? 0) - (a?.count ?? 0))
            subItem.subItems = newSubItems
            return subItem
          })

          item.subItems = subItems
        } else if (item.subItems?.findIndex(subItem => !!subItem.count) >= 0) {
          const newSubItems = _.cloneDeep(item.subItems)
          newSubItems?.sort((a: MbSearchFilterItem, b: MbSearchFilterItem) => (b?.count ?? 0) - (a?.count ?? 0))
          item.subItems = newSubItems
        }
      }

      return item
    })

    setFilterItems(newFilterData)
    setOriginFilterItems(newFilterData)

    setTimeout(() => {
      isFirstLoadCompleted.current = true
    }, 750)
  }, [filterData])

  useEffect(() => {
    if (isReadyToCheckFilter === undefined) {
      return
    }
    setIsReadyToActive(true)
  }, [isReadyToCheckFilter])

  return (
    <div className={cn('lnb-filter__section', { 'display-none': !isShow, 'display-block': standAlone })}>
      <div className={cn('lnb-filter__header', { 'top-0': standAlone })}>
        <div className="display-flex align-items__center">
          <h2 className="lnb-filter__header-title">필터</h2>
          <Button
            label={'모두 열기'}
            cate={'link-text'}
            size={'s'}
            color={'primary'}
            onClick={handleAllItemExapand}
            className="ml-8"
          />
          <Button
            label={'모두 닫기'}
            cate={'link-text'}
            size={'s'}
            color={'danger'}
            onClick={handleAllItemCollapse}
            className="ml-8"
          />
        </div>

        <div className="lnb-filter__header-buttons">
          {!!filterItems.reduce((acc, cur) => acc + (cur.checkedItems?.length ?? 0), 0) && (
            <Button
              label={'초기화'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={handleFilterItemsReset}
            />
          )}
          {hasCloseButton && (
            <Button
              label={'닫기'}
              cate={'ico-only'}
              size={'s32'}
              color={'transparent'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton2}
              icoSize={16}
              onClick={handleClose}
            />
          )}
        </div>
      </div>

      <div className="lnb-filter__menu">
        <ul className="lnb-filter__menu-list">
          {filterItems.map(parentItem => {
            return (
              <li key={parentItem.id}>
                <FilterParentItem
                  parentItem={parentItem}
                  onToggleDropdown={handleToggleDropDown}
                  onDateChange={handleDateChange}
                  onRemoveAllCheckedItems={handleRemoveAllCheckedItems}
                  onRemoveSelectedValue={handleRemoveSelectedValue}
                  onRemoveDateValue={handleRemoveDateValue}
                  isUnavailableToDelete={unavailableItemsToDelete.find(item => item === parentItem.id) !== undefined}
                />

                {parentItem.subItems && parentItem.subItems.length > 0 && (
                  <motion.ul
                    className={cn('lnb-filter-depth2__list overflow-hidden')}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height: parentItem.checked ? 'auto' : 0,
                    }}
                    style={{
                      overflow: parentItem.overflowProperty ?? 'hidden',
                    }}
                    onAnimationComplete={latest => handleAnimationComplete(latest, parentItem)}
                    onAnimationStart={latest => handleAnimationStart(latest, parentItem)}
                    transition={filterTransition}
                  >
                    {/*{parentItem.checkedItems &&*/}
                    {/*  parentItem.subItems &&*/}
                    {/*  parentItem.subItems.length > 10 &&*/}
                    {/*  parentItem.subItems?.filter(sub => sub.subItems && sub.subItems.length > 0).length === 0 && (*/}
                    {/*    <>*/}
                    {/*      <FilterSearchItem onChange={e => handleChildItemSearch(e, parentItem)} />*/}
                    {/*    </>*/}
                    {/*  )}*/}

                    {parentItem.subItems.map(childItem => (
                      <Fragment key={childItem.id}>
                        {!childItem.subItems && (
                          <>
                            <FilterChildItemOnly
                              parentItem={parentItem}
                              childItem={childItem}
                              onChildCheckboxChange={handleCheckboxChange}
                              onSelectItemChange={handleSelectChange}
                              onDateChange={handleDateChange}
                            />
                          </>
                        )}

                        {childItem.subItems && (
                          <FilterChildItemHasSub
                            parentItem={parentItem}
                            childItem={childItem}
                            onChildItemToggleDropdown={handleChildItemToggleDropdown}
                            onGrandChildCheckboxChange={handleCheckboxChange}
                            onChange={e => handleChildItemSearch(e, parentItem, childItem)}
                          />
                        )}
                      </Fragment>
                    ))}
                  </motion.ul>
                )}
                <div
                  id="datepicker-portal"
                  className="datepicker__group type-range"
                  style={{
                    height: 0,
                  }}
                ></div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MbSearchFilter
