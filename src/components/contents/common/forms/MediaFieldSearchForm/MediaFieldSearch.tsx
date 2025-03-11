import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputText from '~/components/common/ui/FormInputText'
import { ContentItem } from '~/components/contents/common/forms/MediaFieldSearchForm/ContentItem'
import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import type { NameCountDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetJournalistFieldAutoComplete } from '~/utils/api/journalist/useGetJournalistFieldAutoComplete'
import useDebounce from '~/utils/hooks/common/useDebounce'

interface Props {
  keywordParam: MbTagSearchTagItem[]
  setKeywordField: (e: MbTagSearchTagItem[]) => void
  setOpenKeywordFieldPopup: () => void
}

const MediaFieldContent = (props: Props) => {
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [contentList, setContentList] = useState<SelectListOptionItem[]>([])
  const [contentField, setContentField] = useState('')
  const debouncedUpdateState = useDebounce(contentField, 500)

  const journalistFieldAutoComplete = async (value: string) => {
    const { data: resultData, status: resultStatus } = await apiGetJournalistFieldAutoComplete({
      name: value,
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: 'name!asc',
    })
    if (resultStatus === 'S') {
      const reDefinedResultData = resultData as NameCountDto[]
      const autoCompleteData: SelectListOptionItem[] = reDefinedResultData.map(item => {
        return {
          id: item?.name || '',
          name: item?.name || '',
          extra: item.count ? item.count.toString() : '',
        }
      })
      setContentList(() => autoCompleteData)
    }
  }

  const onChngeKeywordField = async (i: boolean, e: SelectListOptionItem) => {
    let dataList = [...props.keywordParam]
    if (!i) {
      dataList = [
        ...dataList,
        {
          id: e.id?.toString() ?? '',
          label: e.name ?? '',
        },
      ]
    } else {
      dataList = dataList.filter(k => k.id !== e.id)
    }
    props.setKeywordField(dataList)
  }

  const handleInputSearchChange = async (value: boolean) => {
    setContentField(() => '')
    setContentList(() => [])
    setIsOpen(prevState => value)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) handleInputSearchChange(false)
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (contentField !== '') {
      journalistFieldAutoComplete(contentField)
    }
  }, [debouncedUpdateState])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className={cn('select-form__group', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <FormInputText
        onChange={e => setContentField(() => e.target.value)}
        value={contentField}
        onClick={() => setIsOpen(() => true)}
      />
      <div
        className={cn('select-form-option__section', `select-list__direction-up`)}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {contentField !== '' && (
          <div className="select-form-option__area auto-complete__max-height">
            <ul className="select-form-option__group">
              {contentList && contentList.length > 0 ? (
                <>
                  {contentList.map(e => (
                    <ContentItem
                      key={'journalistOccupationList' + e.id + e.name}
                      item={e}
                      tagItems={props.keywordParam}
                      onChangeChecked={(i, key) => onChngeKeywordField(i, key)}
                    />
                  ))}
                </>
              ) : (
                <div
                  className="tag-search-no-result"
                  style={{ margin: 10 }}
                >
                  검색 결과가 없습니다.
                </div>
              )}
            </ul>
          </div>
        )}
        <div className="select-form-footer__group">
          <button
            type="button"
            className="select-form-footer__button height__auto pt-7 pb-7"
            onClick={() => props.setOpenKeywordFieldPopup()}
          >
            카테고리로 선택하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaFieldContent
