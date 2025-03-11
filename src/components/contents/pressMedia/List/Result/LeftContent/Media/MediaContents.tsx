import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import MediaContentItem from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaContentItem'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const MediaContents = () => {
  const {
    arrayMediaList,
    isOwner,
    originArrayMediaList,
    mediaArrayId,
    savedMediaListKeyword,
    setSavedMediaListKeywordAction,
    getMediaListByKeyword,
  } = usePressMediaListResult()
  const debouncedSearchInputValue = useDebounce(savedMediaListKeyword, 500)

  const [isOpen, setIsOpen] = useState(true)
  const [isExpand, setIsExpand] = useState(1)

  useEffect(() => {
    savedMediaListKeyword !== '' && getMediaListByKeyword(savedMediaListKeyword, isOwner, mediaArrayId)
  }, [debouncedSearchInputValue])

  return (
    <div className="aside-search__accordion">
      <div className={cn('accordion-type1__group')}>
        <button
          className="accordion-type1__btn"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="accordion-type1__btn-txt">매체</span>
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
              {arrayMediaList && arrayMediaList.length > 10 && (
                <div className="search">
                  <FormInputSearch
                    placeholder={'검색'}
                    value={savedMediaListKeyword}
                    onChange={e => setSavedMediaListKeywordAction(e.target.value, originArrayMediaList)}
                    onDeleteButtonClick={() => setSavedMediaListKeywordAction('', originArrayMediaList)}
                  />
                </div>
              )}
              {arrayMediaList && arrayMediaList.length > 0 && (
                <Fragment>
                  {arrayMediaList.slice(0, 10 * isExpand).map(e => (
                    <MediaContentItem
                      key={'savedMediaList__accordion_category_accordion-type1' + e.mediaListId}
                      {...e}
                    />
                  ))}
                  {arrayMediaList.length > isExpand * 10 && arrayMediaList.length > 10 && (
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

export default MediaContents
