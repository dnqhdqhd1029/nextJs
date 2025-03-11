import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import GroupContent from '~/components/contents/common/forms/GroupSearchForm/GroupContent'
import { BaseResponseCommonObject } from '~/types/api/service'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { useGetAllGroups } from '~/utils/api/group/useGetAllGroups'
import type { GroupDto } from '~/utils/api/group/useGetGroupSearch'
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

const GroupSearchForm = (props: Props) => {
  const tagSearchIdKey = `group_TagSearch-${uuid()}`
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [ownerGroup, setOwnerGroup] = useState<MbTagSearchTagItem[]>([])
  const [inputData, setInputData] = useState<{ keyword: string; items: MbTagSearchTagItem[] }>({
    keyword: '',
    items: ownerGroup || [],
  })

  const { data: groupAutoComplete, refetch: refetchgroupAutoComplete } = useGetAllGroups(props.isOpen ? 1 : 0)

  const handleInputSearchChange = async (value: string) => {
    if (ownerGroup) {
      let res: MbTagSearchTagItem[] = []
      for await (const eElement of ownerGroup) {
        if (eElement.id && eElement.label) {
          if (eElement.label.toLowerCase().search(value.toLowerCase()) !== -1) {
            res = [...res, eElement]
          }
        }
      }
      const param = {
        keyword: value,
        items: res.length > 0 ? res : ownerGroup,
      }
      setInputData(() => param)
    }
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsOpen(() => false)
      }
    },
    [getOpenRef]
  )

  const onChangeCheckedProps = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.tagValueList, props.checkDataLimit)
    props.onChangeTagList(res)
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
          },
        ]
      }
    }
    return res
  }

  const initSetData = async (res: GroupDto[]) => {
    let tempGroups: MbTagSearchTagItem[] = []
    let param = {
      keyword: '',
      items: [],
    }
    if (res.length > 0) {
      for await (const newGroup of res) {
        tempGroups = [
          ...tempGroups,
          {
            id: newGroup.groupId?.toString() ?? '',
            label: newGroup.name ?? '',
            isDefault: newGroup?.isDefault || false,
          },
        ]
      }
      // @ts-ignore
      param.items = tempGroups
    }
    setOwnerGroup(() => tempGroups)
    setInputData(() => param)
  }

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    if (!groupAutoComplete) return
    const { data: resultData, status: resultStatus, message } = groupAutoComplete as BaseResponseCommonObject
    if (resultStatus === 'S') {
      const res = resultData as GroupDto[]
      initSetData(res)
    }
  }, [groupAutoComplete])

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
          failed={props.errMsg !== ''}
          msg={props.errMsg}
          onChange={e => handleInputSearchChange(e.target.value)}
          value={inputData.keyword}
        />
        {props.isOpen && (
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
              id={`group_TagSearch-${uuid()}`}
            >
              <ul className="select-form-option__group">
                {inputData.items && inputData.items.length > 0 ? (
                  <>
                    {inputData.items.map(e => (
                      <GroupContent
                        key={'journalistOccupationList' + e.id + e.label}
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
        )}
      </div>
    </div>
  )
}

export default GroupSearchForm
