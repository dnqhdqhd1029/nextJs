/**
 * @file CompanySearchCreateLayer.tsx
 * @description 발표 회사 검색 및 생성 레이어
 */

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import cn from 'classnames'

import FormInputSelectOption from '~/components/common/ui/FormInputSelectOption'
import FormInputText from '~/components/common/ui/FormInputText'
import Loader from '~/components/common/ui/Loader'
import { API_LOADING_DELAY_TIME, ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN } from '~/constants/common'
import { publishCompanyInfoType } from '~/stores/modules/contents/newswireRelease/newswireRelease'
import { BaseResponseCommonObject, TagDto } from '~/types/api/service'
import { TimeoutRef } from '~/types/common'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import type { TagSearchCreateLayerItem } from '~/types/contents/Common'
import { useGetPublishCompanyNameAutoComplete } from '~/utils/api/publishCompany/useGetPublishCompanyNameAutoComplete'
import { usePostPublishCompanyCreate } from '~/utils/api/publishCompany/usePostPublishCompanyCreate'
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
  onClickListOption?: (data: publishCompanyInfoType) => void
  onChangeInputValue?: (data: string) => void
  defaultValue?: string
}

const CompanySearchCreateLayer = ({
  isOpen = false,
  parentTagItems,
  onTotalTagListChange,
  onCreateSuccess,
  errorMessage = '',
  placeholder = '',
  position = 'down',
  checkDataLimit = 100,
  onClickListOption,
  onChangeInputValue,
  defaultValue,
}: Props) => {
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const { handleLimitValueLengthToMaxCount, getInputRef } = useValidate()

  const maxTitleCount = 30
  const maxTitleCountErrorMessage = `태그는 ${maxTitleCount}자를 넘을 수 없습니다.`
  const timerRef: TimeoutRef = useRef(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const [isLayerShow, setIsLayerShow] = useState(isOpen)
  const inputValueRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(defaultValue)
  const [inputValueErrorMessage, setInputValueErrorMessage] = useState('')
  const [pubComName, setPubComName] = useState(defaultValue)
  const [list, setList] = useState<publishCompanyInfoType[]>([])
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isResultListShow, setIsResultListShow] = useState(true)

  const { refetch: refetchGetPublishCompanyName } = useGetPublishCompanyNameAutoComplete({
    name: pubComName as string,
    groupId: storeUserSelectGroup,
  })

  const createPublishCompany = usePostPublishCompanyCreate()

  const afterRefetchTagData = (response: UseQueryResult<BaseResponseCommonObject, AxiosError>) => {
    const { isSuccess, data: fetchData } = response
    if (isSuccess) {
      const { status, data: apiData, message } = fetchData as BaseResponseCommonObject
      if (status === 'S') {
        //@ts-ignore
        const newList = apiData?.map(item => {
          return {
            id: item.nwPublishCompanyId?.toString(),
            name: item.name,
            countryCode: item.countryCode,
            zipCode: item.zipCode,
            address: item.address,
            addressDetail: item.addressDetail,
            wsite: item.wsite,
          } as TagSearchCreateLayerItem
        })
        setList(newList ?? [])
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

    if (value === '') {
      setInputValueErrorMessage('')
      setIsDataLoading(false)
      setIsResultListShow(false)
      return
    }

    setIsResultListShow(true)
    setPubComName(value)
    // setIsDataLoading(true)

    onChangeInputValue && onChangeInputValue(value)
  }

  const handleClickOption = (pubCom: publishCompanyInfoType) => {
    const value = pubCom.name
    setInputValue(pubCom.name || '')

    if (value === '') {
      setInputValueErrorMessage('')
      setIsDataLoading(false)
      setIsResultListShow(false)
      return
    }

    setIsResultListShow(true)
    setPubComName(value)
    setIsDataLoading(true)

    onClickListOption && onClickListOption(pubCom)
  }

  const handleTotalListChange = () => {
    onTotalTagListChange && onTotalTagListChange()
  }

  const handlePubComCreate = async () => {
    if (inputValue === '') {
      openToast('발표 회사명을 입력해주세요.', 'error')
      return
    }

    if (inputValue && inputValue.length > maxTitleCount) {
      setInputValueErrorMessage(maxTitleCountErrorMessage)
      return false
    }

    const result = await createPublishCompany.mutateAsync({
      name: inputValue || '',
      groupId: storeUserSelectGroup,
    })
    const { status, data, message } = result as BaseResponseCommonObject

    if (status === 'S') {
      const tagData = data as TagDto
      openToast(message?.message, 'success')
      onCreateSuccess && onCreateSuccess(tagData)
      setIsResultListShow(false)
      refetchGetPublishCompanyName().then(afterRefetchTagData)
    } else {
      openToast(message?.message, 'error')
    }
  }

  useOuterClick(layerRef, () => {
    setIsResultListShow(false)
  })

  useEffect(() => {
    setIsLayerShow(isOpen)
    setIsResultListShow(false)
  }, [isOpen])

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
    if (pubComName !== undefined && pubComName !== '') {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        refetchGetPublishCompanyName().then(afterRefetchTagData)
      }, API_LOADING_DELAY_TIME)
    }
  }, [pubComName])

  return (
    <div
      className={cn('select-form__section select-form-editor', {
        'flat-type': true,
      })}
      ref={layerRef}
    >
      <div className="select-form__group">
        <div
          className={cn('select-form-option__section', {
            'display-block': isLayerShow,
            'position-static': true,
          })}
          style={{ width: 'auto' }}
        >
          <div className="input-search__header">
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
          </div>
          {inputValue && inputValue.length > 0 && (
            <div
              className={cn('select-form-option__area input-search__result-list', {
                'display-none': !isResultListShow,
                'direction-up': position === 'up',
              })}
            >
              {!isDataLoading ? (
                <>
                  {list.length > 0 ? (
                    <ul className="select-form-option__group">
                      {list.map((item, index) => (
                        <li key={`clipbook-item-${index}`}>
                          <div className="select-form-option__item-input">
                            <FormInputSelectOption
                              type="checkbox"
                              id={`listsearchcreate-${item.name}`}
                              label={item.name}
                              checkDataLimit={checkDataLimit}
                              checkDataLimitDisable={checkDataLimit === parentTagItems?.length ? 'action' : 'non'}
                              onClickEvent={() => {
                                handleClickOption(item)
                                setIsResultListShow(false)
                              }}
                              checkDataLength={parentTagItems?.length}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div className="tag-search-no-result">검색 결과가 없습니다.</div>
                    </>
                  )}
                  {!list.find(e => e.name === inputValue) && (
                    <div className="select-form-footer__group">
                      <button
                        type="button"
                        className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                        onClick={handlePubComCreate}
                      >
                        {`"${inputValue}" 새 발표 회사 만들기`}
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

export default CompanySearchCreateLayer
