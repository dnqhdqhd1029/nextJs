/**
 * @file Pagination.tsx
 * @description Pagination 컴포넌트
 */

import { useEffect, useState } from 'react'

import { PaginationProps } from './common-ui'
import IcoSvg from './IcoSvg'

import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const Pagination = ({ cate, option }: PaginationProps) => {
  let startPage = 1
  let lastPage = option.length

  const [currentPage, setCurrentPage] = useState(1)
  const [disabled, setDisabled] = useState([false, false])

  const checkDisabled = (page = 1) => {
    if (cate === 'n3') {
      const copy = [...disabled]

      startPage === page ? (copy[0] = true) : (copy[0] = false)
      lastPage === page ? (copy[1] = true) : (copy[1] = false)

      setDisabled(copy)
    }
  }

  useEffect(() => {
    checkDisabled()
  }, [])

  return (
    <div className={`pagination__group cate-${cate}`}>
      {(cate === 'n1' || cate === 'n2' || cate === 'n3') && (
        <button
          className="pagination-prev"
          onClick={() => console.log('prev')}
          disabled={disabled[0]}
        >
          <IcoSvg data={icoSvgData.chevronThickLeft} />
          <span className="pagination-txt">이전</span>
        </button>
      )}
      {cate === 'n3' && (
        <div className="pagination-list__group">
          <ul className="pagination-list">
            {option.map(num => {
              return (
                <li key={num}>
                  <button
                    className={`pagination-list__number ${currentPage === num ? 'is-active' : ''}`}
                    onClick={() => {
                      setCurrentPage(num)
                      checkDisabled(num)
                    }}
                  >
                    <span className="pagination-txt">{num}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {(cate === 'n1' || cate === 'n2' || cate === 'n3') && (
        <button
          className="pagination-next"
          onClick={() => console.log('next')}
          disabled={disabled[1]}
        >
          <span className="pagination-txt">다음</span>
          <IcoSvg data={icoSvgData.chevronThickRight} />
        </button>
      )}
      {cate === 'n4' && (
        <div className="select__section select-type1-medium select-line">
          <button className="select__label">
            <span className="select__label-text">20개</span>
            <IcoSvg data={icoSvgData.chevronDown} />
          </button>

          <div className="select-option__section">
            <div className="select-option__area">
              <ul className="select-option__group">
                <li>
                  <button className="select-option__item">
                    <span className="select-option__item-text">10개</span>
                  </button>
                </li>
                <li>
                  <button className="select-option__item is-selected">
                    <span className="select-option__item-text">20개</span>
                  </button>
                </li>
                <li>
                  <button className="select-option__item">
                    <span className="select-option__item-text">30개</span>
                  </button>
                </li>
                <li>
                  <button className="select-option__item">
                    <span className="select-option__item-text">50개</span>
                  </button>
                </li>
                <li>
                  <button className="select-option__item">
                    <span className="select-option__item-text">100개</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Pagination.defaultProps = {
  option: new Array(5).fill(1).map((v, i) => v + i),
}

export default Pagination
