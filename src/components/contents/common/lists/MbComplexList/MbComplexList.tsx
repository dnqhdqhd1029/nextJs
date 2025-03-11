/**
 * @file MbComplexList.tsx
 * @description 복합 리스트(검색 결과, 일반 목록 등)
 */

import { ChangeEvent, ReactNode, RefObject, useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'

interface Props {
  title?: string
  titlePosition?: 'top' | 'inside'
  isNoData?: boolean
  hasAsideFilter?: boolean
  onFilterToggle?: () => void
  onUpdateLink?: () => void
  updateLinkTitle?: string
  addButtonTitle?: string
  headUtilContent?: ReactNode
  headFilterTagContent?: ReactNode
  searchMajorUtilContent?: ReactNode
  searchExtraUtilContent?: ReactNode
  searchResultContent?: ReactNode
  searchResultToggleContent?: ReactNode
  paginationContent?: ReactNode
  totalCountText?: string
  totalCount?: number
  pageItemSize?: number
  selectedItemSize?: number
  isPageLoadCompleted?: boolean
  onAllCheckChange?: (e: ChangeEvent<HTMLInputElement>) => void
  allCheckValue?: boolean
  searchResultContentRef?: RefObject<HTMLDivElement>
  allCheckButtonShowText?: string
  isShowAllCheckButton?: boolean
  onAllCheckButtonClick?: () => void
  checkedPages?: number[]
}

const MbComplexList = ({
  title = '',
  titlePosition = 'top',
  isPageLoadCompleted = false,
  headUtilContent,
  hasAsideFilter = false,
  onFilterToggle,
  onUpdateLink,
  updateLinkTitle,
  headFilterTagContent,
  searchResultContent,
  searchMajorUtilContent,
  searchExtraUtilContent,
  searchResultToggleContent,
  totalCountText,
  totalCount = 0,
  paginationContent,
  onAllCheckChange,
  allCheckValue,
  searchResultContentRef,
  allCheckButtonShowText,
  isShowAllCheckButton,
  onAllCheckButtonClick,
  checkedPages,
}: Props) => {
  const [isAllCheck, setIsAllCheck] = useState(false)
  const [showAllCheckButton, setShowAllCheckButton] = useState(false)

  const handleFilterOpen = () => {
    onFilterToggle && onFilterToggle()
  }

  const handleUpdateLink = () => {
    onUpdateLink && onUpdateLink()
  }

  const handleAllCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAllCheckChange && onAllCheckChange(e)
  }

  useEffect(() => {
    if (allCheckValue === undefined) {
      return
    }
    setIsAllCheck(allCheckValue)
  }, [allCheckValue])

  useEffect(() => {
    if (isShowAllCheckButton === undefined) {
      return
    }

    setShowAllCheckButton(isShowAllCheckButton)
  }, [isShowAllCheckButton])

  return (
    <div className="mb-contents-layout__section">
      <div className="mb-contents-layout__header">
        <div
          className="search-result__header"
          style={{
            minHeight: titlePosition === 'top' ? '91px' : 'auto',
          }}
        >
          <ul className="interval-mt10">
            {titlePosition === 'top' && (
              <li>
                <div className="search-result__header-title">
                  <div className="display-flex align-items__center">
                    <h2 className="s-header__title">
                      {title !== '' && isPageLoadCompleted ? (
                        <>{title}</>
                      ) : (
                        <Skeleton
                          width="200px"
                          height="100%"
                          wrapperStyle={{
                            display: 'inline-flex',
                            width: '150px',
                            height: '28px',
                            alignItems: 'center',
                          }}
                        />
                      )}
                    </h2>

                    {onUpdateLink && updateLinkTitle && (
                      <>
                        {isPageLoadCompleted ? (
                          <Button
                            label={updateLinkTitle}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.chevronLeft}
                            onClick={handleUpdateLink}
                          />
                        ) : (
                          <Skeleton
                            width="80px"
                            height="26px"
                          />
                        )}
                      </>
                    )}
                  </div>

                  <div className="search-result__header-buttons">
                    {hasAsideFilter && (
                      <Button
                        label={'필터'}
                        cate={'default-ico-text'}
                        size={'s'}
                        color={'tertiary'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.funnelFill}
                        onClick={handleFilterOpen}
                      />
                    )}

                    {headUtilContent && headUtilContent}
                  </div>
                </div>
              </li>
            )}

            {headFilterTagContent && <li>{headFilterTagContent}</li>}

            {titlePosition === 'inside' && (
              <li className={cn({ 'display-flex justify-content__space-between': titlePosition === 'inside' })}>
                <h2 className="s-header__title display-flex align-items__center">{title}</h2>

                <div className="search-result__header-sort ml-14">
                  {totalCountText && (
                    <>
                      <div style={{ minWidth: '80px' }}>
                        <FormInputBtn
                          type="checkbox"
                          name="mb-complex-list-total"
                          id="mb-complex-list-total"
                          label={totalCountText ?? ''}
                          onChange={handleAllCheckChange}
                          checked={isAllCheck}
                          disabled={totalCount === 0}
                        />
                      </div>
                    </>
                  )}

                  {searchExtraUtilContent && searchExtraUtilContent}

                  {searchMajorUtilContent && searchMajorUtilContent}

                  {titlePosition === 'inside' && headUtilContent && headUtilContent}
                </div>
              </li>
            )}

            {titlePosition === 'top' && (
              <>
                <li>
                  <div className="search-result__header-sort ml-14">
                    {!isPageLoadCompleted ? (
                      <Skeleton
                        width="80px"
                        height="26px"
                      />
                    ) : (
                      <>
                        {totalCountText && (
                          <div style={{ minWidth: '80px' }}>
                            <FormInputBtn
                              type="checkbox"
                              name="mb-complex-list-total"
                              id="mb-complex-list-total"
                              label={totalCountText ?? ''}
                              onChange={handleAllCheckChange}
                              checked={isAllCheck}
                              disabled={totalCount === 0}
                            />
                          </div>
                        )}
                      </>
                    )}

                    {searchExtraUtilContent && searchExtraUtilContent}

                    {searchMajorUtilContent && searchMajorUtilContent}
                  </div>
                </li>
                {showAllCheckButton && (
                  <li>
                    <div className="search-result__header-sort-second-line">
                      {!isPageLoadCompleted ? (
                        <Skeleton
                          width="100px"
                          height="14px"
                          wrapperStyle={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                          }}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={onAllCheckButtonClick}
                        >
                          {allCheckButtonShowText}
                          {/*{checkedPages && checkedPages.length > 0 ? `(${checkedPages.join(', ')})` : ''}*/}
                        </button>
                      )}
                    </div>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
      <div
        className="mb-contents-layout__contents"
        ref={searchResultContentRef ?? undefined}
        id={`complextlist-${uuid()}`}
        style={{ overflowY: isPageLoadCompleted ? 'auto' : 'hidden' }}
      >
        <div
          className="search-result__contents"
          style={{ minHeight: '100%' }}
        >
          <ul className="interval-mt12">
            {/* 검색창 */}
            <li id="mb-head-sort-filter__portal"></li>

            {/* 검색된 뉴스 펼치기 */}
            {searchResultToggleContent && searchResultToggleContent}

            {/* 검색 리스트 나열 */}
            <li>{searchResultContent && <div className="search-result__list">{searchResultContent}</div>}</li>
          </ul>
        </div>
      </div>
      {paginationContent && (
        <div className="mb-contents-layout__footer">
          <div className="search-result__footer">{paginationContent}</div>
        </div>
      )}
    </div>
  )
}

export default MbComplexList
