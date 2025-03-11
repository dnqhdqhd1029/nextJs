import { Fragment, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'

import IcoSvg from './IcoSvg'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import type { PaginationInfo } from '~/types/common'

// 페이지 아이템 너비
const pageItemWidth = 50

// 3개의 점 아이콘 텍스트 너비
const dotItemStyles = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: `34px`,
  height: `34px`,
}

const navButtonStyles = {}

// 숫자 버튼 스타일
const buttonStyles = {
  transition: '0s',
  maxWidth: `${pageItemWidth}px`,
  // minWidth: '30px',
  // paddingLeft: 5,
  // paddingRight: 5,
}

export interface Props {
  /** Pagination 모양 */
  type: 'n1' | 'n2' | 'n3'

  /** 전체 페이지 수 */
  count: number

  /** 보여지는 아이템 갯수. 5보다 작을 경우 5로 보정됨. */
  viewCount?: number

  /** 현재 페이지 */
  page?: number

  elementSize?: number

  /**
   * 페이지 번호가 변경되었을 때 호출되는 함수
   * @param {number} page 변경된 페이지 번호
   * @returns
   */
  onPageChange?: (page: number) => void
}

const Pagination = ({ type, count, elementSize = 20, onPageChange, page = 1, viewCount = 7 }: Props) => {
  const [pageStatus, setPageStatus] = useState<PaginationInfo>({
    viewCount: viewCount > 5 ? viewCount : 5,
    currentPage: 1,
    clickedPage: 1,
    totalPage: 0,
    isPrevDisabled: false,
    isNextDisabled: false,
    pages: [],
  })

  const getPageStartEnd = (cur: number, view: number) => {
    let start = Math.floor(cur / view) * view + 1
    let end = Math.ceil(cur / view) * view

    if (start < 1) {
      start = 1
      end = pageStatus.viewCount
    }

    if (end > pageStatus.totalPage) {
      end = pageStatus.totalPage
    }

    return {
      start,
      end,
    }
  }

  /**
   * prev, next 버튼 활성화 체크
   * @returns
   */
  const checkDisabled = () => {
    // if (count === 1) {
    //   setPageStatus(prevState => ({
    //     ...prevState,
    //     isPrevDisabled: true,
    //     isNextDisabled: true,
    //   }))
    // } else {
    //   if (pageStatus.currentPage === 1) {
    //     setPageStatus(prevState => ({
    //       ...prevState,
    //       isPrevDisabled: true,
    //       isNextDisabled: false,
    //     }))
    //   } else {
    //     setPageStatus(prevState => ({
    //       ...prevState,
    //       isPrevDisabled: pageStatus.currentPage === 1,
    //       isNextDisabled: pageStatus.currentPage === pageStatus.totalPage,
    //     }))
    //   }
    // }

    const isViewEndPage = pageStatus.currentPage % pageStatus.viewCount === 0
    const { start, end } = getPageStartEnd(
      isViewEndPage ? pageStatus.currentPage - 1 : pageStatus.currentPage,
      pageStatus.viewCount
    )

    if (count === 1 || (type === 'n3' && count <= pageStatus.viewCount)) {
      setPageStatus(prevState => ({
        ...prevState,
        isPrevDisabled: true,
        isNextDisabled: true,
      }))
    } else {
      if (pageStatus.currentPage === 1 && type === 'n3') {
        setPageStatus(prevState => ({
          ...prevState,
          isPrevDisabled: true,
          isNextDisabled: false,
        }))
      } else {
        setPageStatus(prevState => ({
          ...prevState,
          isPrevDisabled:
            type === 'n3'
              ? pageStatus.currentPage === 1 || pageStatus.currentPage < pageStatus.viewCount
              : pageStatus.currentPage === 1,
          isNextDisabled:
            type === 'n3'
              ? pageStatus.currentPage === pageStatus.totalPage || end >= pageStatus.totalPage
              : pageStatus.currentPage === pageStatus.totalPage,
        }))
      }
    }
  }

  /**
   * prev, next 버튼 클릭 이벤트
   * @param {number} param -1: prev, 1: next
   */
  const navigationButtonEvent = (param: number) => {
    const condition = param < 0 ? pageStatus.currentPage > 1 : pageStatus.currentPage < count
    if (condition) {
      let nextState = pageStatus.currentPage + param
      if (param > 0) {
        nextState > count && (nextState = count)
      } else {
        nextState < 1 && (nextState = 1)
      }
      if (Number(nextState) * Number(elementSize) < 20000) {
        setPageStatus(prevState => ({
          ...prevState,
          currentPage: nextState,
        }))
      }
      onPageChange && onPageChange(nextState)
    }
  }

  /**
   * prev 버튼 클릭
   */
  const handlePrevButtonClick = () => {
    navigationButtonEvent(type === 'n3' ? pageStatus.viewCount * -1 : -1)
  }

  /**
   * next 버튼 클릭
   */
  const handleNextButtonClick = () => {
    navigationButtonEvent(type === 'n3' ? pageStatus.viewCount : 1)
  }

  /**
   * 숫자 버튼 클릭
   * @param {MouseEvent<HTMLButtonElement>} e 이벤트 객체
   * @param {number} pageNo 클릭된 페이지 번호
   */
  const handleNumberButtonClick = (e: MouseEvent<HTMLButtonElement>, pageNo: number) => {
    if (Number(pageNo) * Number(elementSize) < 20000) {
      setPageStatus(prevState => ({
        ...prevState,
        currentPage: pageNo,
      }))
    }
    onPageChange && onPageChange(pageNo)
  }

  /**
   * Page 렌더링하기 위한 배열 얻기
   */
  const getPageArray = () => {
    const isOdd = pageStatus.viewCount % 2 === 1
    const halfViewCount = Math.floor(pageStatus.viewCount / 2)
    let start = pageStatus.currentPage - halfViewCount
    let end = isOdd ? pageStatus.currentPage + halfViewCount : pageStatus.currentPage + halfViewCount - 1

    if (start < 1) {
      start = 1
      end = start + pageStatus.viewCount - 1
    }

    // if (end > pageStatus.totalPage) {
    //   end = pageStatus.totalPage
    //   start = end - pageStatus.viewCount + 1
    // }

    const arr = Array.from({ length: pageStatus.totalPage }, (v, k) => k + 1).slice(start - 1, end)

    if (pageStatus.currentPage < pageStatus.totalPage - halfViewCount + 1) {
      arr[pageStatus.viewCount - 1] = pageStatus.totalPage
      arr[pageStatus.viewCount - 2] = 0
    }

    if (start > 1) {
      arr[0] = 1
      arr[1] = 0
    }
    return arr
  }

  /**
   * Page 렌더링하기 위한 배열 얻기 New
   */
  const getPageArrayNew = () => {
    const isViewEndPage = pageStatus.currentPage % pageStatus.viewCount === 0
    const { start, end } = getPageStartEnd(
      isViewEndPage ? pageStatus.currentPage - 1 : pageStatus.currentPage,
      pageStatus.viewCount
    )

    const arr = [...Array(end - start + 1).keys()].map(i => i + start)

    return arr
  }

  /**
   * 보이는 페이지 아이템 렌더링
   */
  const changePages = () => {
    if (!pageStatus || !pageStatus.viewCount || !pageStatus.totalPage) {
      return
    }
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // const arr =
    //   pageStatus.viewCount < pageStatus.totalPage ? getPageArray() : Array.from({ length: count }, (v, k) => k + 1)
    const arr = getPageArrayNew()

    setPageStatus(prevState => ({
      ...prevState,
      clickedPage: pageStatus.currentPage,
      pages: arr,
    }))
  }

  /**
   * currentPage 변경 이벤트
   */
  useEffect(() => {
    type === 'n3' && changePages()
    checkDisabled()
  }, [pageStatus.currentPage, pageStatus.totalPage, pageStatus.viewCount])

  /**
   * count, viewCount 변경 이벤트
   */
  useEffect(() => {
    if (count === undefined || count === 0 || count === null || count === Infinity) {
      return
    }
    const changedValues = {
      viewCount: pageStatus.viewCount,
      totalPage: pageStatus.totalPage,
      currentPage: pageStatus.currentPage,
    }

    if (count) {
      changedValues['totalPage'] = count
    }

    if (viewCount) {
      if (viewCount < 5) {
        changedValues['viewCount'] = 5
      } else {
        changedValues['viewCount'] = viewCount
      }
    }

    if (page) {
      changedValues['currentPage'] = page
    }

    setPageStatus(prevState => ({
      ...prevState,
      ...changedValues,
    }))
    checkDisabled()
  }, [count, viewCount, page])

  if (count === undefined || count === 0 || count === null || count === Infinity) {
    return null
  }

  return (
    <div className={cn('pagination__group', { [`cate-${type}`]: type })}>
      <button
        className="pagination-prev"
        onClick={handlePrevButtonClick}
        disabled={pageStatus.isPrevDisabled}
      >
        <IcoSvg data={icoSvgData.chevronThickLeft} />
        <span className="pagination-txt">이전</span>
      </button>

      {type === 'n3' && (
        <div className="pagination-list__group">
          <ul className="pagination-list">
            {pageStatus.pages.length === 1 ? (
              <li>
                <button
                  className="pagination-list__number is-active"
                  style={buttonStyles}
                >
                  <span className="pagination-txt">{pageStatus.pages[0]}</span>
                </button>
              </li>
            ) : (
              <Fragment>
                {pageStatus.pages.map((num, index) => {
                  if (num === 0) {
                    return (
                      <li key={`${num}${index}`}>
                        <span style={dotItemStyles}>{'...'}</span>
                      </li>
                    )
                  } else {
                    return (
                      <li key={num}>
                        <button
                          className={cn('pagination-list__number', { 'is-active': pageStatus.clickedPage === num })}
                          onClick={e => handleNumberButtonClick(e, num)}
                          style={buttonStyles}
                        >
                          <span className="pagination-txt">{num}</span>
                        </button>
                      </li>
                    )
                  }
                })}
              </Fragment>
            )}
          </ul>
        </div>
      )}

      <button
        className="pagination-next"
        onClick={handleNextButtonClick}
        disabled={pageStatus.isNextDisabled}
        style={navButtonStyles}
      >
        <span className="pagination-txt">다음</span>
        <IcoSvg data={icoSvgData.chevronThickRight} />
      </button>
    </div>
  )
}

export default Pagination
