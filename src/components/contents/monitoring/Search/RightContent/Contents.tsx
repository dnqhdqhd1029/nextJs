import { ChangeEvent, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ContentItem from '~/components/contents/monitoring/Search/RightContent/ContentItem'
import { monitoringListDto } from '~/stores/modules/contents/monitoring/newsSearch'

const Content = (props: monitoringListDto) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div
      className="aside-search__accordion"
      key={'monitoringList__accordion_category' + props.category}
    >
      <div
        className={cn('accordion-type1__group')}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <button className="accordion-type1__btn">
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
              {props.content &&
                props.content.length > 0 &&
                props.content.map(e => (
                  <ContentItem
                    key={'accordion-type1-panel__option-list_ContentItem' + e.newsSrchId + e.title}
                    {...e}
                  />
                ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Content
