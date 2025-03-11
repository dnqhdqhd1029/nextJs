import { Fragment } from 'react'
import cn from 'classnames'

import FormInputToggle from '~/components/common/ui/FormInputToggle'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentSelectForm from '~/components/contents/pressMedia/List/Result/LeftContent/ContentSelectForm'
import MediaContents from '~/components/contents/pressMedia/List/Result/LeftContent/Media/MediaContents'
import PressContents from '~/components/contents/pressMedia/List/Result/LeftContent/Press/PressContents'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const LeftContent = () => {
  const {
    listDefine,
    isOwner,
    licenseInfo,
    arrayJournalList,
    isFilterSubParam,
    savedJournalListLoading,
    savedMediaListLoading,
    setOwnerKey,
  } = usePressMediaListResult()

  return (
    <div className={cn('aside-search__section', { 'type-sticky': isFilterSubParam })}>
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">리스트</h3>
        </div>
        {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
          <FormInputToggle
            id="saved-search-manage_list_toggle"
            name="saved-search-manage_list_toggle"
            label="MY"
            reverse={true}
            checked={isOwner}
            onChange={e => setOwnerKey(listDefine, !isOwner, isFilterSubParam)}
          />
        )}
      </div>
      <div className="aside-search__contents">
        {isFilterSubParam ? (
          <ContentSelectForm />
        ) : (
          <Fragment>
            {savedJournalListLoading ? (
              <div className="aside-search__contents">
                {/*<Skeleton*/}
                {/*  key={10}*/}
                {/*  width={'100%'}*/}
                {/*  height={'208px'}*/}
                {/*/>*/}
              </div>
            ) : (
              <Fragment>
                <PressContents />
              </Fragment>
            )}
            {savedMediaListLoading ? (
              <div className="aside-search__contents">
                {/*<Skeleton*/}
                {/*  key={10}*/}
                {/*  width={'100%'}*/}
                {/*  height={'208px'}*/}
                {/*/>*/}
              </div>
            ) : (
              <Fragment>
                <MediaContents />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default LeftContent
