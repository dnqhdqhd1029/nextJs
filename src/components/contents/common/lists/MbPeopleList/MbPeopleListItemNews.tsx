/**
 * @file ListTypePeople.tsx
 * @description search-type3
 */

import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import type { Props } from './MbPeopleListItem'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MbContentListItem from '~/components/contents/common/lists/MbContentList/MbContentListItem'

type NewsProps = Omit<Props, 'onCheck'>

const MbPeopleListItemNews = ({ item, index, onShowRelatedNews, onShowRelatedNewsMore, onSelectItem }: NewsProps) => {
  const { isRelatedNewsShow = false, relatedNewsMaxIndex = 7, relatedNews } = item
  const [isOpen, setIsOpen] = useState(false)
  const [isLayerOpenFlag, setIsLayerOpenFlag] = useState(false)

  const handleItemClick = () => {
    onSelectItem && onSelectItem(item)
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onShowRelatedNews(index)
    setIsOpen(!isOpen)
    setIsLayerOpenFlag(!isLayerOpenFlag) // 버튼 클릭에 의해 상태 변경
  }

  useEffect(() => {
    if (isRelatedNewsShow) {
      setIsLayerOpenFlag(true)
    } else {
      setIsLayerOpenFlag(false)
    }
  }, [isRelatedNewsShow])

  return (
    <div
      className="list-type2-contents__footer"
      onClick={handleItemClick}
    >
      <div className="accordion-type2__group is-opened">
        <button
          className="accordion-type2__btn"
          onClick={handleClick}
        >
          <span className="accordion-type2__btn-txt">검색된 뉴스 {relatedNews && relatedNews.length}개</span>
          <span className="accordion-type2__btn-ico">
            <IcoSvg data={isLayerOpenFlag ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
        <motion.div
          className="accordion-type2-panel__group display-block overflow-hidden"
          initial={{
            height: 0,
            paddingTop: 0,
          }}
          animate={{
            height: isLayerOpenFlag ? 'auto' : 0,
            paddingTop: isLayerOpenFlag ? '14px' : 0,
          }}
          transition={{ type: 'easeIn', duration: 0.15 }}
        >
          <ul className="interval-mt14">
            <li>
              <div className="list-type1__section">
                <ul className="list-type1__group before-none">
                  {relatedNews &&
                    relatedNews.map((news, newsIndex) => {
                      if (newsIndex > relatedNewsMaxIndex) return null
                      return (
                        <MbContentListItem
                          key={newsIndex}
                          item={news}
                          index={newsIndex}
                        />
                      )
                    })}
                </ul>
              </div>
            </li>
            {relatedNews && relatedNews.length > 8 && relatedNewsMaxIndex < relatedNews.length - 1 && (
              <li>
                <div className="list-type1__footer">
                  <Button
                    label={'더보기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => onShowRelatedNewsMore(item, relatedNewsMaxIndex)}
                  />
                </div>
              </li>
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default MbPeopleListItemNews
