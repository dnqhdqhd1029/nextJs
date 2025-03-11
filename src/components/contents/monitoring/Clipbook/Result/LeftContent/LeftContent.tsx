import { Fragment } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import FormInputToggle from '~/components/common/ui/FormInputToggle'
import Skeleton from '~/components/common/ui/Skeleton'
import Content from '~/components/contents/monitoring/Clipbook/Result/LeftContent/Contents'
import ContentSelectForm from '~/components/contents/monitoring/Clipbook/Result/LeftContent/ContentSelectForm'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const LeftContent = () => {
  const { clipbookListLoading, licenseInfo, isOwner, clipbookCategory, isFilterSubParam, setOwnerKey } =
    useClipbookDetail()

  return (
    <div className={cn('aside-search__section', { 'type-sticky': isFilterSubParam })}>
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">클립북</h3>
        </div>
        {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
          <FormInputToggle
            id="clipbookNews_list_toggle"
            name="clipbookNews_list_toggle"
            label="MY"
            reverse={true}
            disabled={clipbookCategory.length <= 0}
            checked={isOwner}
            onChange={e => setOwnerKey(!isOwner, isFilterSubParam)}
          />
        )}
      </div>
      <div className="aside-search__contents">
        {isFilterSubParam ? (
          <ContentSelectForm />
        ) : (
          <Fragment>
            {clipbookListLoading ? (
              <div className="aside-search__contents">
                {/*<Skeleton*/}
                {/*  key={10}*/}
                {/*  width={'100%'}*/}
                {/*  height={'508px'}*/}
                {/*/>*/}
              </div>
            ) : (
              <Fragment>
                {clipbookCategory &&
                  clipbookCategory.length > 0 &&
                  clipbookCategory.map(e => (
                    <Content
                      key={'clipbookNewsList__accordion_category' + e.categoryNm}
                      {...e}
                    />
                  ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default LeftContent
