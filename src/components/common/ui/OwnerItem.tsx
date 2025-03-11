import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { UserInfoAuth } from '~/stores/modules/contents/auth/auth'
import { UserDtoForGroup } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { useValidate } from '~/utils/hooks/common/useValidate'

type Props = {
  id: number
  title: string
  keyString: string
  type?: string
  owner: UserDtoForGroup
  ownerGroup: UserDtoForGroup[]
  userInfo: UserInfoAuth
  getOwnerLayer: Function
  setOwnerPopupAction: Function
  ownerFunction: Function
}

const OwnerItem = ({
  id,
  keyString,
  title,
  type,
  owner,
  ownerGroup,
  userInfo,
  getOwnerLayer,
  setOwnerPopupAction,
  ownerFunction,
}: Props) => {
  const { getInputRef } = useValidate()
  const ownerOpenRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState<{ layerOpen: boolean; isList: boolean }>({ layerOpen: false, isList: false })
  const [inputData, setInputData] = useState<{ keyword: string; items: UserDtoForGroup[] }>({
    keyword: '',
    items: ownerGroup || [],
  })

  const layerChange = useCallback(() => {
    const temp = {
      layerOpen: isOpen.layerOpen,
      isList: true,
    }
    setIsOpen(() => temp)
    getOwnerLayer()
  }, [isOpen.layerOpen])

  const setIsOpenAction = useCallback(() => {
    const temp = {
      layerOpen: !isOpen.layerOpen,
      isList: false,
    }
    setIsOpen(() => temp)
  }, [isOpen.layerOpen, isOpen.isList])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ownerOpenRef.current && !ownerOpenRef.current.contains(e.target as Node)) {
        const temp = {
          layerOpen: false,
          isList: false,
        }
        setIsOpen(() => temp)
      }
    },
    [isOpen.layerOpen, isOpen.isList]
  )

  const handleKeywordsOnChange = async (e: string) => {
    if (ownerGroup) {
      let res: UserDtoForGroup[] = []
      for await (const eElement of ownerGroup) {
        if (eElement.userId && eElement.displayName) {
          if (eElement.displayName.toLowerCase().search(e.toLowerCase()) !== -1) {
            res = [...res, eElement]
          }
        }
      }
      const param = {
        keyword: e,
        items: res.length > 0 ? res : ownerGroup,
      }
      setInputData(() => param)
    }
  }

  const handleKeywordsDelete = () => {
    const param = {
      keyword: '',
      items: ownerGroup || [],
    }
    setInputData(() => param)
  }

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    const param = {
      keyword: '',
      items: ownerGroup || [],
    }
    setInputData(() => param)
  }, [ownerGroup])

  return (
    <>
      {userInfo.userId === owner?.userId ? (
        <li
          className={`list-type4-item__share-group`}
          id={'list-type4-item__share-group' + id}
        >
          <div
            className="select__section select-type2-pd"
            ref={ownerOpenRef}
          >
            <button
              className="select__label"
              onClick={() => setIsOpenAction()}
            >
              <span
                className="select__label-text"
                style={{ paddingLeft: 4 }}
              >
                {owner?.displayName}
              </span>
              <IcoSvg data={icoSvgData.chevronDown} />
            </button>
            <div
              className={cn('select-option__section', {
                'display-block': isOpen.layerOpen,
              })}
              style={{ background: '#fff' }}
            >
              {isOpen.isList ? (
                <>
                  {ownerGroup && ownerGroup.length >= 8 && (
                    <FormInputSearch
                      placeholder={'검색'}
                      id={'list-search' + 'ownerGroup'}
                      name={'list-search' + 'ownerGroup'}
                      onChange={e => handleKeywordsOnChange(e.target.value)}
                      getInputRef={ref => getInputRef(ref, searchInputRef)}
                      onKeyUp={() => handleKeywordsOnChange(searchInputRef?.current?.value || '')}
                      value={inputData.keyword}
                      onDeleteButtonClick={() => handleKeywordsDelete()}
                      className="form-input-inner-padding"
                    />
                  )}
                  <div className="select-option__area">
                    <ul className="select-option__group">
                      {inputData.items &&
                        inputData.items.length > 0 &&
                        inputData.items.map(e => (
                          <li key={'ownerGroup' + e.email + e.userId}>
                            <button
                              className={cn('select-option__item', {
                                'is-selected': owner?.userId === e.userId,
                              })}
                              onClick={() => {
                                if (e.userId && owner?.userId !== e.userId) {
                                  let actionProps: {
                                    [key: string]: string | number | boolean
                                  } = {
                                    isOpen: true,
                                    key: e.userId,
                                    name: e?.displayName || '',
                                    title: title,
                                  }
                                  actionProps[keyString] = `${id}`
                                  if (type) actionProps['type'] = type
                                  setOwnerPopupAction(actionProps)
                                }
                              }}
                            >
                              <span className="select-option__item-text">{e.displayName}</span>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button
                        className={'select-option__item'}
                        onClick={() => layerChange()}
                      >
                        <span
                          className="select-option__item-text"
                          id={`select-option__item-text_${id}`}
                        >
                          소유자 변경
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      ) : (
        <li className={`list-type4-item__share-group`}>
          <div className="select__section select-type2-pd">
            <button
              className="select__label"
              onClick={async () => {
                if (owner?.userId) {
                  const { status, message } = await apiGetOneUser(owner?.userId)
                  if (status === 'S') {
                    ownerFunction(owner?.userId)
                  } else {
                    openToast(message?.message, 'error')
                  }
                }
              }}
            >
              <span
                className="select__label-text"
                style={{ paddingLeft: 4 }}
              >
                {owner?.displayName}
              </span>
            </button>
          </div>
        </li>
      )}
    </>
  )
}

export default OwnerItem
