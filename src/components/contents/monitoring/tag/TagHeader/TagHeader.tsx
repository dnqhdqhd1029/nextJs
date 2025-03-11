import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import SortFilterList from '~/components/common/ui/SortFilterList'
import { defaultTagSortOptionsByData } from '~/components/contents/monitoring/tag/defaultData'
import { SelectListOptionItem } from '~/types/common'
import { useTagMonitoring } from '~/utils/hooks/contents/monitoring/useTagMonitoring'

const TagHeader = () => {
  const {
    tagListParams,
    tagType,
    pageCount,
    tagContentListButton,
    setTagContentListButtonAction,
    handleChangeSort,
    openPopup,
  } = useTagMonitoring()

  return (
    <div className="mb-contents-layout__header">
      <div className="search-result__header">
        <div className="search-result-type2__header">
          <h2 className="s-header__title">{tagType === 'mine' ? '내가 만든' : '전체'} 태그</h2>
          <ul className="s-header__control">
            <li className="filter">
              <Button
                label={'검색'}
                cate={'ico-only'}
                size={'s'}
                color={'body-text'}
                icoLeft={true}
                icoLeftData={icoSvgData.search}
                icoSize={18}
                onClick={() => setTagContentListButtonAction(!tagContentListButton)}
              />
              {tagListParams.sort && tagListParams.sort.length > 0 && (
                <SortFilterList
                  sortOptionsByData={defaultTagSortOptionsByData}
                  onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                    handleChangeSort([`${dataItem.id}!${orderItem.id}`], tagListParams, tagType)
                  }
                  value={tagListParams.sort as string[]}
                  disabled={pageCount.totalCount === undefined || pageCount.totalCount === 0}
                />
              )}
            </li>
            <li className="button">
              <Button
                label={'태그 만들기'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => openPopup('create', 0, '')}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TagHeader
