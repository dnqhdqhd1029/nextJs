import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { getActionDataProps } from '~/stores/modules/contents/activity/activityList'
import { UserInfoAuth } from '~/stores/modules/contents/auth/auth'
import { UserDtoForGroup } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { openToast } from '~/utils/common/toast'
import { useValidate } from '~/utils/hooks/common/useValidate'
type Props = {
  getActionData: getActionDataProps
  userInfo: UserInfoAuth
  activityOwnerLayer: {
    layerOpen: boolean
    isList: boolean
  }
  activityOwnerGroup: UserDtoForGroup[]
  setActivityOwnerLayerAction: Function
  getActivityOwnerLayer: Function
  setOwnerPopupAction: Function
  ownerFunction: Function
}
const OwnerItem = ({
  getActionData,
  userInfo,
  activityOwnerLayer,
  activityOwnerGroup,
  setActivityOwnerLayerAction,
  getActivityOwnerLayer,
  setOwnerPopupAction,
  ownerFunction,
}: Props) => {
  const { getInputRef } = useValidate()
  const activityOpenRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [inputData, setInputData] = useState<{ keyword: string; items: UserDtoForGroup[] }>({
    keyword: '',
    items: activityOwnerGroup || [],
  })

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (activityOpenRef.current && !activityOpenRef.current.contains(e.target as Node))
        setActivityOwnerLayerAction(false)
    },
    [activityOwnerLayer.layerOpen]
  )

  const handleKeywordsOnChange = async (e: string) => {
    if (activityOwnerGroup) {
      let res: UserDtoForGroup[] = []
      for await (const eElement of activityOwnerGroup) {
        if (eElement.userId && eElement.displayName) {
          if (eElement.displayName.toLowerCase().search(e.toLowerCase()) !== -1) {
            res = [...res, eElement]
          }
        }
      }
      const param = {
        keyword: e,
        items: res.length > 0 ? res : activityOwnerGroup,
      }
      setInputData(() => param)
    }
  }

  const handleKeywordsDelete = () => {
    const param = {
      keyword: '',
      items: activityOwnerGroup || [],
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
      items: activityOwnerGroup || [],
    }
    setInputData(() => param)
  }, [activityOwnerGroup])

  return (
    <>
      <dt>
        <p className="dl-table-type1__text">소유자</p>
      </dt>
      {getActionData &&
      getActionData.owner &&
      getActionData.owner.userId &&
      getActionData?.owner.userId === userInfo.userId ? (
        <dd ref={activityOpenRef}>
          <div className="d-select-type1__section">
            <div className="select__section select-type2-primary">
              <button
                className="select__label"
                onClick={() => setActivityOwnerLayerAction(!activityOwnerLayer.layerOpen)}
              >
                <span className="select__label-text">{userInfo.displayName}</span>
                <IcoSvg data={icoSvgData.chevronDown} />
              </button>
              <div
                className={cn('select-option__section', {
                  'display-block': activityOwnerLayer.layerOpen,
                })}
                style={{ background: '#fff' }}
              >
                {activityOwnerLayer.isList ? (
                  <>
                    {activityOwnerGroup && activityOwnerGroup.length >= 8 && (
                      <FormInputSearch
                        placeholder={'검색'}
                        id={'list-search' + 'activityOwnerGroup'}
                        name={'list-search' + 'activityOwnerGroup'}
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
                            <li key={'activityOwnerGroup' + e.email + e.userId}>
                              <button
                                className={cn('select-option__item', {
                                  'is-selected': getActionData?.owner?.userId === e.userId,
                                })}
                                onClick={() =>
                                  e.userId &&
                                  getActionData?.owner?.userId !== e.userId &&
                                  setOwnerPopupAction({
                                    isOpen: true,
                                    key: e.userId,
                                    name: e?.displayName || '',
                                    activityId: getActionData?.actionId || 0,
                                    userData: e,
                                  })
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
                          className={cn('select-option__item')}
                          onClick={() => getActivityOwnerLayer()}
                        >
                          <span className="select-option__item-text">소유자 변경</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </dd>
      ) : (
        <dd>
          <p className="dl-table-type1__text">
            <Button
              label={getActionData?.owner?.displayName || ''}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              onClick={async () => {
                if (getActionData?.owner?.userId) {
                  const { status, message } = await apiGetOneUser(getActionData?.owner?.userId)
                  if (status === 'S') {
                    ownerFunction(getActionData?.owner)
                  } else {
                    openToast(message?.message, 'error')
                  }
                }
              }}
            />
          </p>
        </dd>
      )}
    </>
  )
}

export default OwnerItem
