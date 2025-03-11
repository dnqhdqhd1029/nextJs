import { Fragment } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import FormInputToggle from '~/components/common/ui/FormInputToggle'
import DropDownButton from '~/components/contents/common/dropdownButton/DropdownButton'
import DropDownButtonNoList from '~/components/contents/common/dropdownButton/DropdownButtonNoList'
import ContentSelectForm from '~/components/contents/pressMedia/SavedSearch/LeftContent/ContentSelectForm'
import MediaContents from '~/components/contents/pressMedia/SavedSearch/LeftContent/Media/MediaContents'
import PressContents from '~/components/contents/pressMedia/SavedSearch/LeftContent/Press/PressContents'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const LeftContent = () => {
  const router = useRouter()
  const {
    listDefine,
    isOwner,
    licenseInfo,
    isFilterSubParam,
    savedJournalListLoading,
    savedMediaListLoading,
    setOwnerKey,
  } = useSavedSearch()

  return (
    <div className={cn('aside-search__section', { 'type-sticky': isFilterSubParam })}>
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">맞춤 검색</h3>
          <DropDownButtonNoList
            topLayerList={[
              { id: '/contacts/saved-search-manage', name: '맞춤 검색 관리' },
              { id: '/contacts/search', name: '맞춤 검색 만들기' },
            ]}
            topLayerListAction={e => router.push(e.id)}
          />
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
