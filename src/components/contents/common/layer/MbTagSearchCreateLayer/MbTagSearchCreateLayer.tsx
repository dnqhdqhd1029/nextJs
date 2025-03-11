/**
 * @file MbTagSearchCreateLayer.tsx
 * @description 태그 검색 및 생성 레이어
 */

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputText from '~/components/common/ui/FormInputText'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Loader from '~/components/common/ui/Loader'
import { API_LOADING_DELAY_TIME, ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN } from '~/constants/common'
import { BaseResponseCommonObject, PageResponseTagDto, ResponseTaggingDto, TagDto } from '~/types/api/service'
import { TimeoutRef } from '~/types/common'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import type { TagSearchCreateLayerItem } from '~/types/contents/Common'
import { useGetTagNameAutoComplete } from '~/utils/api/tag/useGetTagNameAutoComplete'
import { usePostTagCreate } from '~/utils/api/tag/usePostTagCreate'
import { useGetTaggingList, useUsedGetTaggingList } from '~/utils/api/tagging/useGetTagginList'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useValidate } from '~/utils/hooks/common/useValidate'

type CategoryType = 'NEWS' | 'ACTION'

interface Props {
  isOpen?: boolean
  mode?: 'LAYER' | 'FLAT'
  category?: CategoryType
  position?: 'up' | 'down'
  parentTagItems?: MbTagSearchTagItem[]
  errorMessage?: string
  placeholder?: string
  isTotalTagList?: boolean
  isExcept?: boolean
  checkDataLimit?: number
  targetIdList?: number[]
  onTagStatusChange?: (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) => void
  onTotalTagListChange?: () => void
  onCreateSuccess?: (data: TagDto) => void
}

const MbTagSearchCreateLayer = ({
  isOpen = false,
  mode = 'LAYER',
  category = 'NEWS',
  parentTagItems,
  onTagStatusChange,
  onTotalTagListChange,
  onCreateSuccess,
  errorMessage = '',
  placeholder = '검색 또는 새 태그 만들기',
  isTotalTagList = false,
  position = 'down',
  checkDataLimit = 100,
  targetIdList = [],
  isExcept = false,
}: Props) => {
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const { handleLimitValueLengthToMaxCount, getInputRef } = useValidate()

  const maxTitleCount = 30
  const maxTitleCountErrorMessage = `태그는 ${maxTitleCount}자를 넘을 수 없습니다.`
  const [tagCategory, setTagCategory] = useState<CategoryType>('NEWS')
  const timerRef: TimeoutRef = useRef(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [isLayerShow, setIsLayerShow] = useState(isOpen)
  const inputValueRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [inputValueErrorMessage, setInputValueErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [size, setSize] = useState(10)
  const [tags, setTags] = useState<TagSearchCreateLayerItem[]>([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isResultListShow, setIsResultListShow] = useState(true)

  // 태그 api
  const { refetch: refetchGetTagNames } = useGetTagNameAutoComplete(
    {
      name,
      category: tagCategory,
      groupId: storeUserSelectGroup,
      page: 1,
      size,
      sort: 'name!asec',
    },
    {
      enabled: false,
    }
  )
  const { refetch: refetchUsedGetTaggingListData } = useUsedGetTaggingList(
    {
      name,
      page: 1,
      size,
      targetIdList: targetIdList,
      category: tagCategory,
      groupId: storeUserSelectGroup,
      sort: ['name!asec'],
    },
    {
      enabled: name !== '' && targetIdList && targetIdList.length > 0,
    }
  )

  // 태그 생성
  const createTag = usePostTagCreate()

  const isAvaliableToCreateItem = useMemo(() => {
    return tags.length === 0 && inputValueErrorMessage === ''
  }, [tags])

  const handleLayerOpen = () => {
    setIsLayerShow(!isLayerShow)
    if (isLayerShow) {
      setInputValue('')
    }
  }

  const afterRefetchTagData = (response: UseQueryResult<BaseResponseCommonObject, AxiosError>) => {
    const { isSuccess, data: fetchData } = response
    if (isSuccess) {
      const { status, data, message } = fetchData as BaseResponseCommonObject
      if (status === 'S') {
        console.log('>> data')
        const { content } = data as PageResponseTagDto
        const newTags = content?.map(item => {
          const isExist = parentTagItems?.find(parentItem => parentItem.id === item.tagId?.toString())
          return {
            id: item.tagId?.toString(),
            name: item.tagName,
            isChecked: !!isExist,
          } as TagSearchCreateLayerItem
        })
        setTags(newTags ?? [])
      } else {
        openToast(message?.message, 'error')
        setIsDataLoading(false)
      }
    }
    setIsDataLoading(false)
  }

  const afterRefetchTagExceptData = (response: UseQueryResult<BaseResponseCommonObject, AxiosError>) => {
    const { isSuccess, data: fetchData } = response
    if (isSuccess) {
      const { status, data, message } = fetchData as BaseResponseCommonObject
      if (status === 'S') {
        console.log('>> data')
        const { content } = data as PageResponseTagDto
        const newTags = content?.map(item => {
          const isExist = parentTagItems?.find(parentItem => parentItem.id === item.tagId?.toString())
          return {
            id: item.tagId?.toString(),
            name: item.tagName,
            isChecked: !!isExist,
          } as TagSearchCreateLayerItem
        })
        setTags(newTags ?? [])
      } else {
        openToast(message?.message, 'error')
        setIsDataLoading(false)
      }
    }
    setIsDataLoading(false)
  }
  const handleInputFocus = () => {
    setIsResultListShow(true)
  }

  const handleInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(e.target.value.trim())

    //@ts-ignore
    const isComposing = e.nativeEvent?.isComposing
    if (isComposing !== undefined) {
      if (!isComposing) {
        if (value !== '' && !ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN.test(value)) {
          setIsDataLoading(false)
          return false
        }
      }
    }

    if (value === '') {
      setInputValueErrorMessage('')
      setIsDataLoading(false)

      if (mode === 'FLAT') {
        setIsResultListShow(false)
      }

      return
    }

    if (mode === 'FLAT') {
      setIsResultListShow(true)
    }

    setName(value)

    setIsDataLoading(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      if (isExcept) {
        refetchUsedGetTaggingListData().then(afterRefetchTagExceptData)
      } else {
        refetchGetTagNames().then(afterRefetchTagData)
      }
    }, API_LOADING_DELAY_TIME)
  }

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) => {
    console.log('>> handleItemChange: ', e.target.checked, item)
    e.preventDefault()
    e.stopPropagation()
    onTagStatusChange && onTagStatusChange(e, item)
  }

  const handleTotalListChange = () => {
    onTotalTagListChange && onTotalTagListChange()
  }

  const handleTagCreate = async () => {
    if (inputValue === '') {
      openToast('태그를 입력해주세요.', 'error')
      return
    }

    if (inputValue.length > maxTitleCount) {
      setInputValueErrorMessage(maxTitleCountErrorMessage)
      return false
    }

    const result = await createTag.mutateAsync({
      name: inputValue,
      category: tagCategory,
      groupId: storeUserSelectGroup,
    })
    const { status, data, message } = result as BaseResponseCommonObject

    if (status === 'S') {
      const tagData = data as TagDto
      openToast(message?.message, 'success')
      setInputValue('')
      if (checkDataLimit !== parentTagItems?.length) {
        onCreateSuccess && onCreateSuccess(tagData)
      }
      if (mode === 'LAYER') {
        setIsLayerShow(false)
      } else {
        setIsResultListShow(false)
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    if (parentTagItems) {
      const newTags: TagSearchCreateLayerItem[] = tags.map(item => {
        const isExist = parentTagItems.find(parentItem => parentItem.id === item.id)
        return {
          ...item,
          isChecked: !!isExist,
        } as TagSearchCreateLayerItem
      })
      setTags(newTags)
    }
  }, [parentTagItems])

  useOuterClick(layerRef, () => {
    if (mode === 'LAYER') {
      setInputValue('')
      setInputValueErrorMessage('')
      setIsLayerShow(false)
    }
    if (mode === 'FLAT') {
      setIsResultListShow(false)
    }
  })

  useEffect(() => {
    setIsLayerShow(isOpen)
    setIsResultListShow(false)
  }, [isOpen])

  useEffect(() => {
    if (mode === 'LAYER') {
      setIsResultListShow(true)
    }
  }, [mode])

  useEffect(() => {
    if (errorMessage !== '') {
      setInputValueErrorMessage(errorMessage)
      setTimeout(() => {
        inputValueRef.current?.focus()
      }, 100)
    } else {
      setInputValueErrorMessage('')
    }
  }, [errorMessage])

  useEffect(() => {
    if (category === undefined) {
      setTagCategory('NEWS')
      return
    }

    setTagCategory(category)
  }, [category])

  return (
    <div
      className={cn('select-form__section select-form-editor', {
        'flat-type': mode === 'FLAT',
      })}
      ref={layerRef}
    >
      <div className="select-form__group">
        {mode === 'LAYER' && (
          <button
            className="select__label"
            onClick={handleLayerOpen}
          >
            <span className="hidden">편집</span>
            <b className="ico">
              <IcoSvg data={icoSvgData.pencilFill2} />
            </b>
            <b className="arrow">
              <IcoSvg data={icoSvgData.chevronDown} />
            </b>
          </button>
        )}

        <div
          className={cn('select-form-option__section', {
            'display-block': isLayerShow,
            'reverse-type': mode === 'LAYER',
            'position-static': mode === 'FLAT',
          })}
          style={{ width: mode === 'LAYER' ? '230px' : 'auto' }}
        >
          <div className="input-search__header">
            {mode === 'LAYER' && (
              <FormInputSearch
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputSearchChange}
                getInputRef={ref => getInputRef(ref, inputValueRef)}
                onKeyDown={e =>
                  handleLimitValueLengthToMaxCount(
                    e,
                    maxTitleCount,
                    setInputValue,
                    setInputValueErrorMessage,
                    maxTitleCountErrorMessage
                  )
                }
                msg={inputValueErrorMessage}
                failed={inputValueErrorMessage !== ''}
              />
            )}
            {mode === 'FLAT' && (
              <FormInputText
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputSearchChange}
                getInputRef={ref => getInputRef(ref, inputValueRef)}
                onKeyDown={e =>
                  handleLimitValueLengthToMaxCount(
                    e,
                    maxTitleCount,
                    setInputValue,
                    setInputValueErrorMessage,
                    maxTitleCountErrorMessage
                  )
                }
                onFocus={handleInputFocus}
                msg={inputValueErrorMessage}
                failed={inputValueErrorMessage !== ''}
              />
            )}
          </div>
          {inputValue.length > 0 && (
            <div
              className={cn('select-form-option__area input-search__result-list', {
                'display-none': !isResultListShow,
                'direction-up': position === 'up',
              })}
            >
              {!isDataLoading ? (
                <>
                  {tags.length > 0 ? (
                    <ul className="select-form-option__group">
                      {tags.map((tag, index) => (
                        <li key={`clipbook-item-${index}`}>
                          <div className="select-form-option__item-input">
                            <FormInputBtn
                              type="checkbox"
                              name={`tagsearchcreate-${tag.id}`}
                              id={`tagsearchcreate-${tag.id}`}
                              label={tag.name}
                              checked={tag.isChecked}
                              checkDataLimit={checkDataLimit}
                              checkDataLimitDisable={checkDataLimit === parentTagItems?.length ? 'action' : 'non'}
                              onClickEvent={() =>
                                checkDataLimit &&
                                checkDataLimit === parentTagItems?.length &&
                                openToast(
                                  `${checkDataLimit}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`,
                                  'warning'
                                )
                              }
                              checkDataLength={parentTagItems?.length}
                              onChange={e => handleItemChange(e, tag)}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="tag-search-no-result">검색 결과가 없습니다.</div>
                  )}

                  {isAvaliableToCreateItem && !isExcept && (
                    <div className="select-form-footer__group">
                      <button
                        type="button"
                        className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                        onClick={handleTagCreate}
                      >
                        {`"${inputValue}" 새 태그 만들기`}
                      </button>
                    </div>
                  )}
                  {isTotalTagList && (
                    <div className="select-form-footer__group">
                      <button
                        type="button"
                        className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                        onClick={() => handleTotalListChange()}
                      >
                        전체 태그 보기
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MbTagSearchCreateLayer
