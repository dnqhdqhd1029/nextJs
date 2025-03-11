import { Fragment } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { useMediaBriefing } from '~/utils/hooks/contents/mediaBriefing/useMediaBriefing'

const Header = () => {
  const {
    isMediabriefingSearch,
    mediabriefingSearchParams,
    setIsMediabriefingSearch,
    handleKeywordsChange,
    getSearchActionByKeyword,
  } = useMediaBriefing()

  return (
    <div className="service-search__header">
      <div className="common-title__section">
        <div className="common-title__group">
          <h2 className="common-title__title">미디어 소식</h2>
          <div className="common-title__buttons type-search">
            {isMediabriefingSearch ? (
              <Fragment>
                <FormInputSearch
                  placeholder={'검색'}
                  value={mediabriefingSearchParams.title}
                  onChange={e => handleKeywordsChange(e.target.value, mediabriefingSearchParams)}
                  onDeleteButtonClick={() => getSearchActionByKeyword(mediabriefingSearchParams)}
                />
                <Button
                  label={'정렬'}
                  cate={'ico-only'}
                  size={'s'}
                  color={'transparent'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.iconCloseButton2}
                  icoSize={16}
                  onClick={() => setIsMediabriefingSearch(false)}
                />
              </Fragment>
            ) : (
              <Button
                label={'검색'}
                cate={'ico-only'}
                size={'s'}
                color={'body-text'}
                icoLeft={true}
                icoLeftData={icoSvgData.search}
                icoSize={18}
                onClick={() => setIsMediabriefingSearch(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
