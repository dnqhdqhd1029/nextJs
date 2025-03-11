import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ContentItem from '~/components/contents/monitoring/Clipbook/Result/LeftContent/ContentItem'
import { clipbookNewsListDto } from '~/stores/modules/contents/monitoring/clipbookDetail'

const Content = (props: clipbookNewsListDto) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isExpand, setIsExpand] = useState(1)

  return (
    <div
      className="aside-search__accordion"
      id={'clipbookNewsList__accordion_category' + props.categoryNm}
    >
      <div className={cn('accordion-type1__group')}>
        <button
          className="accordion-type1__btn"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="accordion-type1__btn-txt">{props.categoryNm}</span>
          <span className="accordion-type1__btn-ico">
            <IcoSvg data={!isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
        <motion.div
          initial={{
            height: 0,
            overflow: 'hidden',
          }}
          animate={{
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ type: 'easeOut', duration: 0.15 }}
        >
          <div className="accordion-type1-panel__group display-block">
            <ul className="accordion-type1-panel__option-list">
              {props.content && props.content.length > 0 && (
                <Fragment>
                  {props.content.slice(0, 10 * isExpand).map(e => (
                    <ContentItem
                      key={'clipbookNewsList__accordion_category_accordion-type1' + e.clipBookId}
                      {...e}
                    />
                  ))}
                  {props.content.length > isExpand * 10 && props.content.length > 10 && (
                    <li>
                      <button
                        className="accordion-type1-panel__option-item"
                        onClick={() => setIsExpand(prevState => prevState + 1)}
                      >
                        <span>더보기</span>
                      </button>
                    </li>
                  )}
                </Fragment>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Content
