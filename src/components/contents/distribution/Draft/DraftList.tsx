import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'

import MbPagination from '~/components/contents/common/forms/MbPagination'
import DraftContent from '~/components/contents/distribution/Draft/Content/Content'
import { draftCategoryList } from '~/components/contents/distribution/Draft/defaultData'
import DraftHeader from '~/components/contents/distribution/Draft/Header/Header'
import { useDebounceFn } from '~/utils/hooks/common/useDebounce'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useDraft } from '~/utils/hooks/contents/draft/useDraft'

const DraftList = () => {
  const { userInfo, licenseInfo, userSelectGroup } = useAppSelector(state => state.authSlice)
  const {
    searchParams,
    pageCount,
    draftList,
    categoryList,
    stateCodeList,
    nwStateCodeList,
    handleSetSearchParam,
    initDraftList,
  } = useDraft()
  // const [selectedGroupId, setSelectedGroupId] = useState<number>(0)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ALL')
  const [title, setTitle] = useState<string>('전체')
  const [searchText, setSearchText] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isOwnerByMeValue, setIsOwnerByMeValue] = useState<boolean>(false)

  const handleChangePage = (page_num: number) => {
    handleSetSearchParam({ page: page_num })
  }

  const handleChangeSize = (size_num: number) => {
    handleSetSearchParam({ size: size_num })
  }

  const handleChangeTitle = useCallback(() => {
    if (searchText === '') return
    handleSetSearchParam({ title: searchText })
  }, [searchText])

  const handleChangeSearchText = (txt: string) => {
    setSearchText(txt)
  }

  const handleDeleteSearchText = () => {
    setSearchText('')
    handleSetSearchParam({ title: '' })
  }

  const handleChangeSearchTextDebounce = useDebounceFn(handleChangeTitle, 250)

  const handleToggleSearch = (isChangeSearch: boolean) => setIsSearch(isChangeSearch)

  const handleToggleOwnerByMe = (isOwnerByMe: boolean) => {
    isOwnerByMe && !!userInfo?.userId
      ? handleSetSearchParam({ ownerIdList: [userInfo.userId.toString()] })
      : handleSetSearchParam({ ownerIdList: [] })
  }

  const handleChangeShareCode = (shareCode: string) => {
    handleSetSearchParam({ shareCode: !!shareCode ? shareCode : undefined })
  }

  const handleChangeStateCode = (stateCode: string) => {
    handleSetSearchParam({ state_filter: !!stateCode ? [stateCode] : undefined, state: undefined })
  }

  const handleChangeNewswireStateCode = (stateCode: string) => {
    handleSetSearchParam({ state: !!stateCode ? [stateCode] : undefined, state_filter: undefined })
  }

  const handleChangeSort = (sort: Array<string>) => {
    handleSetSearchParam({ sort })
  }

  const handleRefetch = useCallback(() => {
    // listReetch()
  }, [])

  useEffect(() => {
    searchParams.title !== searchText && handleChangeSearchTextDebounce && handleChangeSearchTextDebounce()
  }, [searchText])

  useEffect(() => {
    if (licenseInfo) {
      setIsOwnerByMeValue(Boolean(licenseInfo?.userLimit && licenseInfo?.userLimit > 1))
    }
  }, [licenseInfo])

  useEffect(() => {
    const currentCategory = draftCategoryList.find(category => category.id === selectedCategoryId)
    const currentCategoryList = []
    if (currentCategory) {
      setTitle(currentCategory.title)
      if (currentCategory.id !== 'ALL') {
        currentCategoryList.push(currentCategory.id)
      } else {
        draftCategoryList.forEach(category => {
          if (category.id !== 'ALL') {
            currentCategoryList.push(category.id)
          }
        })
      }
    } else {
      setTitle('전체')
      draftCategoryList.forEach(category => {
        if (category.id !== 'ALL') {
          currentCategoryList.push(category.id)
        }
      })
    }

    handleSetSearchParam({
      ...searchParams,
      page: 1,
      size: 20,
      state_filter: [],
      ...(!!currentCategoryList && { categoryList: currentCategoryList }),
    })
  }, [selectedCategoryId])

  useEffect(() => {
    initDraftList()
  }, [])

  return (
    <>
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <div className="lnb-search-result__header">
                <h2 className="lnb-search-result__title">배포 관리</h2>
              </div>
              <ul className="lnb-search-result__list">
                {categoryList &&
                  categoryList.map(e => (
                    <li
                      key={'lnb-search-result__title_usePressMediaManagement' + e.count + e.id}
                      id={'usePressMediaManagement' + e.id}
                      onClick={i => {
                        i.preventDefault()
                        setSelectedCategoryId(e.id)
                      }}
                    >
                      <button
                        type="button"
                        className={cn('lnb-search-result__menu', {
                          'is-selected': selectedCategoryId === e.id,
                        })}
                        id={'usePressMediaManagement_button' + e.id}
                      >
                        <span className="lnb-search-result__menu-text">{e.name}</span>
                        <span className="lnb-search-result__menu-text">{e.count}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-contents manage">
            <div className="mb-contents-layout__section">
              <DraftHeader
                title={title}
                searchParams={searchParams}
                isSearch={isSearch}
                isOwnerByMe={isOwnerByMeValue}
                stateList={stateCodeList}
                nwStateList={nwStateCodeList}
                selectedCategoryId={selectedCategoryId}
                totalCount={pageCount.totalCount}
                onToggleSearch={handleToggleSearch}
                onToggleOwnerByMe={handleToggleOwnerByMe}
                onChangeShareCode={handleChangeShareCode}
                onChangeStateCode={handleChangeStateCode}
                onChangeNewswireStateCode={handleChangeNewswireStateCode}
                onChangeSort={handleChangeSort}
              />
              <DraftContent
                searchText={searchText}
                data={draftList}
                isSearch={isSearch}
                stateList={stateCodeList}
                nwStateList={nwStateCodeList}
                onChangeSearchText={handleChangeSearchText}
                onDeleteSearchText={handleDeleteSearchText}
                onToggleSearch={handleToggleSearch}
                onRefetch={handleRefetch}
              />
              <div className="mb-contents-layout__footer">
                <div className="search-result__footer">
                  <MbPagination
                    totalCount={pageCount.totalCount}
                    currentPageIndex={searchParams.page}
                    viewCount={searchParams.size}
                    totalPageCount={pageCount.totalPageCount}
                    onSelectSize={handleChangeSize}
                    onPaginationChange={e => {
                      handleChangePage(e)
                    }}
                    isPageLoadCompleted={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DraftList
