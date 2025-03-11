import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import PressContentItem from '~/components/contents/pressMedia/SavedSearch/LeftContent/Press/PressContentItem'
import { useDebounce } from '~/utils/hooks/common/useDebounce'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressContents = () => {
  const {
    isOwner,
    originSavedJournalList,
    savedJournalList,
    savedJournalListKeyword,
    savedJournalKey,
    setSavedJournalListKeywordAction,
    getJournalistByKeyword,
  } = useSavedSearch()
  const debouncedSearchInputValue = useDebounce(savedJournalListKeyword, 1000)

  const [isOpen, setIsOpen] = useState(true)
  const [isExpand, setIsExpand] = useState(1)

  useEffect(() => {
    savedJournalListKeyword !== '' && getJournalistByKeyword(savedJournalListKeyword, isOwner, savedJournalKey)
  }, [debouncedSearchInputValue])

  return (
    <div className="aside-search__accordion">
      <div className={cn('accordion-type1__group')}>
        <button
          className="accordion-type1__btn"
          onClick={() => setIsOpen(prev => !prev)}
        >
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
              {originSavedJournalList && originSavedJournalList.length >= 10 && (
                <div className="search">
                  <FormInputSearch
                    placeholder={'검색'}
                    value={savedJournalListKeyword}
                    onChange={e => setSavedJournalListKeywordAction(e.target.value, originSavedJournalList)}
                    onDeleteButtonClick={() => setSavedJournalListKeywordAction('', originSavedJournalList)}
                  />
                </div>
              )}
              {savedJournalList && savedJournalList.length > 0 && (
                <Fragment>
                  {savedJournalList.slice(0, 10 * isExpand).map(e => (
                    <PressContentItem
                      key={'savedJournalList__accordion_category_accordion-type1' + e.jrnlstSrchId}
                      {...e}
                    />
                  ))}
                  {savedJournalList.length > isExpand * 10 && savedJournalList.length > 10 && (
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

export default PressContents
