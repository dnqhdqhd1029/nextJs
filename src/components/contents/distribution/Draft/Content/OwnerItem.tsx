import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import DraftOwnerChangePopup from '~/components/contents/distribution/Draft/Popup/DraftOwnerChangePopup'
import { ActionDtoForList, UserDtoForGroup } from '~/types/api/service'
import { openToast } from '~/utils/common/toast'
import { useValidate } from '~/utils/hooks/common/useValidate'

const OwnerItem = ({
  props,
  ownerGroup,
  onChage,
}: {
  props: ActionDtoForList
  ownerGroup: Array<UserDtoForGroup>
  onChage: (owner_id: number) => Promise<void>
}) => {
  const { getInputRef } = useValidate()
  const ownerOpenRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState<{ layerOpen: boolean; isList: boolean }>({ layerOpen: false, isList: false })
  const [inputData, setInputData] = useState<{ keyword: string; items: UserDtoForGroup[] }>({
    keyword: '',
    items: ownerGroup || [],
  })
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserDtoForGroup>()

  const handleOpenOwnerChangeModal = (user: UserDtoForGroup) => {
    setIsConfirmModal(true)
    setSelectedUser(user)
  }
  const handleCloseOwnerChangeModal = () => {
    setIsConfirmModal(false)
    setSelectedUser(undefined)
  }
  const handleConfirmOwnerChangeModal = () => {
    if (selectedUser?.userId) {
      onChage(selectedUser.userId)
      handleCloseOwnerChangeModal()
    } else {
      openToast('회원 정보를 찾을 수 없습니다.', 'error')
    }
  }

  const layerChange = useCallback(() => {
    const temp = {
      layerOpen: isOpen.layerOpen,
      isList: true,
    }
    setIsOpen(() => temp)
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
      <li
        className={`list-type4-item__share-group + ${props.actionId}`}
        id={'list-type4-item__share-group' + props.actionId}
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
              {props?.owner?.displayName}
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
                              'is-selected': props?.owner?.userId === e.userId,
                            })}
                            onClick={
                              () => handleOpenOwnerChangeModal(e)
                              // e.userId &&
                              // props?.owner?.userId !== e.userId &&
                              // setOwnerPopupAction({
                              //   isOpen: true,
                              //   key: e.userId,
                              //   name: e?.displayName || '',
                              //   pressId: props?.actionId || 0,
                              //   title: props.title,
                              // })
                            }
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
                        id={`select-option__item-text_${props?.actionId}`}
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

      {isConfirmModal && !!selectedUser && (
        <DraftOwnerChangePopup
          owner_info={selectedUser}
          onClose={handleCloseOwnerChangeModal}
          onConfirm={handleConfirmOwnerChangeModal}
        />
      )}
    </>
  )
}

export default OwnerItem
