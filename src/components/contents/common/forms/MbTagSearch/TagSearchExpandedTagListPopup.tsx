/**
 * @file MbExpandedTagListPopup.tsx
 * @description 확장된 태그 선택 팝업
 */

import { ChangeEvent, useContext, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Popup from '~/components/common/ui/Popup'
import Skeleton from '~/components/common/ui/Skeleton'
import { TagSearchContext } from '~/components/contents/common/forms/MbTagSearch/TagSearchContainer'
import MbSearchTagList from '~/components/contents/common/forms/MbTagSearch/TagSearchTagList'
import type {
  MbTagSearchExpandedItemObject,
  MbTagSearchExpandedTagItem,
  MbTagSearchResultItem,
  MbTagSearchTagItem,
} from '~/types/contents/Common'

const LowerTagLoader = () => {
  return (
    <>
      {[...Array(15)].map((_, index) => (
        <Skeleton
          key={index}
          width={'100%'}
          height="28px"
          wrapperStyle={{
            display: 'block',
            marginBottom: '8px',
            padding: '1px 14px',
            width: '100%',
            alignItems: 'center',
          }}
        />
      ))}
    </>
  )
}

interface Props {
  width?: number
  height?: number
  upperItems?: MbTagSearchExpandedItemObject
  lowerItems?: MbTagSearchExpandedItemObject
  onSelectUpperItem?: (item: MbTagSearchExpandedTagItem, title: string) => void
  tagDeleteHook?: (item: MbTagSearchResultItem) => Promise<boolean>
  tagAddHook?: (item: MbTagSearchResultItem) => Promise<boolean>
}

const MbExpandedTagListPopup = ({
  width = 800,
  height = 450,
  upperItems,
  lowerItems,
  onSelectUpperItem,
  tagAddHook,
  tagDeleteHook,
}: Props) => {
  const {
    nameTagItems,
    setNameTagItems,
    listItems,
    setListItems,
    title,
    isExapandedTagListPopupOpen,
    setIsExapandedTagListPopupOpen,
  } = useContext(TagSearchContext)

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  const [upperTagTitle, setUpperTagTitle] = useState<string>('')
  const [upperTagItems, setUpperTagItems] = useState<MbTagSearchExpandedTagItem[]>([])

  const [lowerTagItems, setLowerTagItems] = useState<MbTagSearchExpandedTagItem[]>([])
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)

  const handleClose = () => {
    setIsExapandedTagListPopupOpen && setIsExapandedTagListPopupOpen(false)
  }

  const handleClickUpperItem = (item: MbTagSearchExpandedTagItem) => {
    onSelectUpperItem && onSelectUpperItem(item, upperTagTitle)
  }

  const changeEventHook = async (
    e: ChangeEvent<HTMLInputElement>,
    item: MbTagSearchExpandedTagItem
  ): Promise<boolean> => {
    if (tagAddHook && e.target.checked) {
      return await tagAddHook(item)
    } else if (tagDeleteHook && !e.target.checked) {
      return await tagDeleteHook(item)
    } else {
      return Promise.resolve(true)
    }
  }

  const handleChangeLowerItemsRemoveChecked = () => {
    setLowerTagItems(prev => {
      prev.map(item => {
        item.checked = false
      })
      return prev
    })
  }

  const handleItemCheckStatusChange = (e: ChangeEvent<HTMLInputElement>, item: MbTagSearchExpandedTagItem) => {
    const checked = e.target.checked
    const id = item.id

    const newLowerTagItems: MbTagSearchExpandedTagItem[] = []

    lowerTagItems.map(item => {
      if (item.id === id) {
        newLowerTagItems.push({
          ...item,
          checked,
        })
      } else {
        newLowerTagItems.push(item)
      }
    })

    setLowerTagItems([...newLowerTagItems])

    adjustNameTagItems(newLowerTagItems)
  }

  const handleSelectAll = (isChecked: boolean) => {
    // const checked = nameTagItems.length !== lowerTagItems.length
    const newLowerItems: MbTagSearchExpandedTagItem[] = []

    lowerTagItems.map(item => {
      newLowerItems.push({
        ...item,
        checked: !isChecked,
      })
    })

    setLowerTagItems(() => [...newLowerItems])

    adjustNameTagItems(newLowerItems)
  }

  const adjustNameTagItems = async (items: MbTagSearchExpandedTagItem[]) => {
    let newNameTagItems: MbTagSearchTagItem[] = [...nameTagItems]

    items.map(item => {
      const findItem = newNameTagItems.find(prevItem => prevItem.id === item.id)
      if (findItem) {
        if (!item.checked) {
          newNameTagItems = newNameTagItems.filter(prevItem => prevItem.id !== item.id)
        }
      } else {
        if (item.checked) {
          newNameTagItems.push({
            id: item.id,
            label: item.label,
          })
        }
      }
    })

    setNameTagItems(newNameTagItems)
  }

  useEffect(() => {
    if (upperItems) {
      setUpperTagTitle(upperItems.title)
      setUpperTagItems(upperItems.items)
    }
  }, [upperItems])

  useEffect(() => {
    if (lowerItems) {
      const newLowerItems: MbTagSearchExpandedTagItem[] = [...lowerItems.items]

      newLowerItems.map(item => {
        const isExist = nameTagItems.find(prevItem => prevItem.id === item.id)
        item.checked = !!isExist
      })

      setLowerTagItems(newLowerItems)

      setIsAllChecked(!!newLowerItems.length && newLowerItems.every(item => item.checked))
    }
  }, [lowerItems])

  useEffect(() => {
    // setIsAllChecked(nameTagItems.length === lowerTagItems.length)
    setIsAllChecked(!!lowerTagItems.length && lowerTagItems.every(item => !!item.checked))
  }, [nameTagItems])

  useEffect(() => {
    if (isExapandedTagListPopupOpen) {
      setTimeout(() => {
        setIsPopupOpen(true)
      }, 250)
    } else {
      setIsPopupOpen(false)
    }
  }, [isExapandedTagListPopupOpen])

  return (
    <Popup
      isOpen={isExapandedTagListPopupOpen ?? false}
      hasCloseButton={true}
      minWidth={width}
      minHeight={height}
      title={title ?? ''}
      onClose={handleClose}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={handleClose}
          />
        </div>
      }
    >
      <div className="tree-menu__section">
        <div className="tree-menu__area">
          <div className="tree-menu__group type1">
            <ul className="tree-menu__list">
              {upperTagItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={cn('tree-menu__button', {
                      'is-selected': item.checked,
                    })}
                    onClick={() => handleClickUpperItem(item)}
                  >
                    <span className="tree-menu__button-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tree-menu__group type2">
            {!isPopupOpen && <LowerTagLoader />}
            <div style={{ height: '100%', visibility: isPopupOpen ? 'visible' : 'hidden' }}>
              {lowerTagItems.length > 0 ? (
                <>
                  <ul className="tree-menu__list">
                    {lowerTagItems.map(item => (
                      <li key={item.id}>
                        <div className="tree-menu__button-input">
                          <FormInputBtn
                            type="checkbox"
                            name="ck10"
                            id={item.id}
                            label={item.label}
                            count={item.subLabel ?? 0}
                            checked={item.checked}
                            onChange={e => handleItemCheckStatusChange(e, item)}
                            changeEventHook={e => changeEventHook(e, item)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="tree-menu-footer__group">
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => {
                        handleSelectAll(isAllChecked)
                      }}
                    >
                      {isAllChecked ? '전체 해제' : '전체 선택'}
                    </button>
                  </div>
                </>
              ) : (
                <LowerTagLoader />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="tag-search__expanded-popup__tag-list">
        {nameTagItems && nameTagItems.length > 0 && (
          <MbSearchTagList onDeleteAll={handleChangeLowerItemsRemoveChecked} />
        )}
      </div>
    </Popup>
  )
}

export default MbExpandedTagListPopup
