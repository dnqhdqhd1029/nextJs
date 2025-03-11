import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import UserContent from '~/components/contents/common/forms/UserSearchForm/UserContent'
import { API_LIST_TYPE_MAX_COUNT } from '~/constants/common'
import { USER_STATE_CODE } from '~/constants/common/user'
import { type UserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetUsers } from '~/utils/api/user/useGetAllUsers'
import { openToast } from '~/utils/common/toast'

interface Props {
  isOpen: boolean
  checkDataLimit?: number
  placeholder?: string
  currentRef?: HTMLDivElement | null
  tagValueList: MbTagSearchTagItem[]
  errMsg?: string
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const UserSearchForm = (props: Props) => {
  const tagSearchIdKey = `userSearchForm_TagSearch-${uuid()}`
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [ownerUser, setOwnerUser] = useState<MbTagSearchTagItem[]>([])
  const [inputData, setInputData] = useState<{ keyword: string; items: MbTagSearchTagItem[] }>({
    keyword: '',
    items: [],
  })

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsOpen(() => false)
      }
    },
    [getOpenRef]
  )

  const handleInputSearchChange = async (value: string) => {
    if (ownerUser) {
      let res: MbTagSearchTagItem[] = []
      for await (const eElement of ownerUser) {
        if (eElement.id && eElement.label) {
          if (eElement.label.toLowerCase().search(value.toLowerCase()) !== -1) {
            res = [...res, eElement]
          }
        }
      }
      const param = {
        keyword: value,
        items: res.length > 0 ? res : ownerUser,
      }
      setInputData(() => param)
    }
  }

  const getUser = async () => {
    let tempList: SelectListOptionItem[] = [
      {
        id: '0',
        name: '전체 회원',
      },
    ]
    let newUserList: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetUsers({
      page: 1,
      size: API_LIST_TYPE_MAX_COUNT,
      sort: ['name!desc'],
    })
    if (status === 'S') {
      const { content } = data as PageableDataDto<UserDto>
      if (content && content.length > 0) {
        for await (const resItem of content) {
          const name =
            resItem.stateCode === USER_STATE_CODE.UNCERTIFIED
              ? resItem.email
              : resItem.displayName === ''
              ? resItem.name
              : resItem.displayName
          tempList = [
            ...tempList,
            {
              id: resItem.userId ? resItem.userId.toString() : '',
              name: name ?? '',
            },
          ]
          newUserList = [
            ...newUserList,
            {
              id: resItem.userId?.toString() ?? '',
              label:
                resItem.nickname && resItem.nickname !== ''
                  ? resItem.nickname
                  : resItem.name && resItem.name !== ''
                  ? resItem.name
                  : resItem.email && resItem.email !== ''
                  ? resItem.email
                  : '',
              checked: false,
              subData: resItem.groups ?? [],
            },
          ]
        }
      }
    }
    return {
      tempList,
      newUserList,
    }
  }

  const onChangeCheckedSearchData = (
    i: boolean,
    e: MbTagSearchTagItem,
    tagList: MbTagSearchTagItem[],
    limitAmount?: number
  ) => {
    let res: MbTagSearchTagItem[] = [...tagList]
    if (i) {
      res = res.filter(item => item.id !== e.id)
    } else {
      if (limitAmount && res.length >= limitAmount) {
        openToast(`${limitAmount}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`, 'warning')
      } else {
        res = [
          ...res,
          {
            id: e.id,
            label: e.label,
            subData: e.subData,
          },
        ]
      }
    }
    return res
  }

  const onChangeCheckedProps = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.tagValueList, props.checkDataLimit)
    props.onChangeTagList(res)
  }
  const initSetData = async () => {
    let tempUsers: MbTagSearchTagItem[] = []
    let param = {
      keyword: '',
      items: [],
    }
    const tempUserList = await getUser()
    if (tempUserList.newUserList.length > 0) {
      for await (const newUser of tempUserList.newUserList) {
        tempUsers = [
          ...tempUsers,
          {
            id: newUser?.id || '',
            label: newUser?.label || '',
            isDefault: false,
            subData: newUser?.subData || [],
          },
        ]
      }
      // @ts-ignore
      param.items = tempUsers
    }
    setOwnerUser(() => tempUsers)
    setInputData(() => param)
  }

  useEffect(() => {
    initSetData()
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    if (optionSectionRef.current && props.currentRef) {
      const divRect = props.currentRef.getBoundingClientRect()
      const dropdownRect = optionSectionRef.current.getBoundingClientRect()
      const spaceBelow = divRect.height - dropdownRect.bottom
      setIsOptionAbove(() => dropdownRect.bottom - spaceBelow > 200)
    }
  }, [isOpen, optionSectionRef.current])

  return (
    <div
      className={cn('select-form-input', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <div
        className="select-form__group"
        onClick={() => setIsOpen(() => !isOpen)}
      >
        <FormInputText
          onChange={e => handleInputSearchChange(e.target.value)}
          value={inputData.keyword}
          failed={props.errMsg !== ''}
          msg={props.errMsg}
        />
        <div
          className={cn('select-form-option__section')}
          style={{
            transition: 'all 0.3s',
            display: isOpen ? 'block' : 'none',
            top: isOpen && isOptionAbove ? 'auto' : '100%',
            bottom: isOpen && isOptionAbove ? '100%' : 'auto',
          }}
          ref={optionSectionRef}
        >
          <div
            className="select-form-option__area auto-complete__max-height"
            id={`user_TagSearch-${uuid()}`}
          >
            <ul className="select-form-option__group">
              {inputData.items && inputData.items.length > 0 ? (
                <>
                  {inputData.items.map(e => (
                    <UserContent
                      key={'userContent_' + e.id + e.label}
                      item={e}
                      idKey={tagSearchIdKey}
                      tagItems={props.tagValueList}
                      onChangeChecked={(i, key) => onChangeCheckedProps(i, key)}
                    />
                  ))}
                </>
              ) : (
                <div className="tag-search-no-result">검색 결과가 없습니다.</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserSearchForm
