import { ChangeEvent, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ContentItem from '~/components/contents/pressMedia/PressSearch/SavedSearchList/ContentItem'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const PressContent = () => {
  const { pressMediaList } = usePressSearchOptions()
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="aside-search__accordion">
      <div
        className={cn('accordion-type1__group')}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <button className="accordion-type1__btn">
          <span className="accordion-type1__btn-txt">언론인</span>
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
              {pressMediaList.pressContent &&
                pressMediaList.pressContent.length > 0 &&
                pressMediaList.pressContent.map(e => (
                  <ContentItem
                    key={'accordion-type1-panel__option-list_ContentItem' + e.contact_id + e.title}
                    item={e}
                    type={'press'}
                  />
                ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PressContent
