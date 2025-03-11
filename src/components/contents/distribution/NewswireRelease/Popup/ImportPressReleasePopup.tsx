import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import DraftContent from '~/components/contents/distribution/Draft/Content/Content'
import { draftCategoryList } from '~/components/contents/distribution/Draft/defaultData'
import DraftHeader from '~/components/contents/distribution/Draft/Header/Header'
import { stateCodeList } from '~/components/contents/distribution/NewswireRelease/defaultData'
import {
  ActionDtoForList,
  ActionFilterDto,
  BaseResponseCommonObject,
  CodeNameCountDto,
  CommonCodeDto,
  PageActionDtoForList,
} from '~/types/api/service'
import { useGetActionList, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { useGetActionFilter } from '~/utils/api/action/usePostGetActionFilter'
import { useGetCommonCode } from '~/utils/api/common/useGetCommonCode'
import { openToast } from '~/utils/common/toast'
import { useDebounceFn } from '~/utils/hooks/common/useDebounce'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface ICategoryList extends CodeNameCountDto {
  id: string
}

const ImportPressReleasePopup = () => {
  const { userInfo, licenseInfo, userSelectGroup } = useAppSelector(state => state.authSlice)
  const { importPopup, setImportPopupAction, setPressReleaseDataToContent, setImportPopupSelectedId } =
    useNewswireRelease()
  const [categoryList, setCategoryList] = useState<Array<ICategoryList>>([])
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('PRESS_RELEASE')
  const [totalPage, setTotalPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [searchParams, setSearchParams] = useState<UseGetActionListParams>({
    page: 1,
    size: 20,
    sort: ['updateAt!desc'],
  })
  const [searchText, setSearchText] = useState<string>('')
  const [list, setList] = useState<Array<ActionDtoForList>>([])
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isOwnerByMeValue, setIsOwnerByMeValue] = useState<boolean>(false)
  const [nwStateCodeList, setNwStateCodeList] = useState<Record<string, string>>({})

  const { recordWorkAction } = useRecordActivity()

  const { data: filterData, refetch: filterRefetch } = useGetActionFilter(
    { groupId: selectedGroupId },
    { enabled: false }
  )

  const { data: stateData, refetch: stateRefetch } = useGetCommonCode(
    { parentCode: 'ACTION_STATE_FILTER' },
    { enabled: false }
  )
  const { data: nwStateData, refetch: nwStateRefetch } = useGetCommonCode(
    { parentCode: 'NEWSWIRE_STATE' },
    { enabled: false }
  )

  const { isLoading, data: listData, refetch: listReetch } = useGetActionList(searchParams, { enabled: false })

  const handleSetSearchParam = (param: UseGetActionListParams) => {
    setSearchParams(prev => {
      let newParam = { ...prev, ...param }
      return newParam
    })
  }

  const handleChangePage = (page_num: number) => {
    handleSetSearchParam({ page: page_num })
  }

  const handleChangeSize = (size_num: number) => {
    handleSetSearchParam({ size: size_num })
  }

  const handleChangeTitle = useCallback(() => {
    handleSetSearchParam({ title: searchText })
    console.log(searchText)
  }, [searchText])

  const handleChangeSearchText = (txt: string) => {
    setSearchText(txt)
  }

  const handleDeleteSearchText = () => {
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
    if (stateCode !== '') {
      handleSetSearchParam({ state_filter: !!stateCode ? [stateCode] : undefined, state: undefined })
    } else {
      handleSetSearchParam({ state_filter: ['RES', 'FIN'], state: undefined })
    }
  }

  const handleChangeNewswireStateCode = (stateCode: string) => {
    handleSetSearchParam({ state: !!stateCode ? [stateCode] : undefined, state_filter: undefined })
  }

  const handleChangeSort = (sort: Array<string>) => {
    handleSetSearchParam({ sort })
  }

  const handleRefetch = useCallback(() => {
    listReetch()
  }, [])

  useEffect(() => {
    searchParams.title !== searchText && handleChangeSearchTextDebounce && handleChangeSearchTextDebounce()
  }, [searchText])

  useEffect(() => {
    if (!!userSelectGroup && selectedGroupId !== userSelectGroup) {
      setSelectedGroupId(userSelectGroup)
    }
  }, [userSelectGroup])

  useEffect(() => {
    if (!!selectedGroupId) {
      filterRefetch()
      handleSetSearchParam({ groupId: selectedGroupId })
    }
  }, [selectedGroupId])

  useEffect(() => {
    if (licenseInfo) {
      setIsOwnerByMeValue(Boolean(licenseInfo?.userLimit && licenseInfo?.userLimit > 1))
    }
  }, [licenseInfo])

  useEffect(() => {
    if (filterData) {
      const { status, code, data, message } = filterData as BaseResponseCommonObject
      if (status === 'S') {
        const { codeNameCountListCategory } = data as ActionFilterDto
        const objCategory = Object.fromEntries(
          codeNameCountListCategory?.map((category: CodeNameCountDto) => [category.code, category]) || []
        )
        let arrCategoryList: Array<ICategoryList> = []
        draftCategoryList
          .filter(category => category.id !== 'ALL')
          .forEach(category => {
            if (objCategory[category.id]) {
              arrCategoryList.push({
                id: category.id,
                code: objCategory[category.id].code,
                name: objCategory[category.id].name,
                count: objCategory[category.id].count || 0,
              })
            } else {
              arrCategoryList.push({
                id: category.id,
                code: category.id,
                name: category.title,
                count: 0,
              })
            }
          })

        draftCategoryList
          .filter(category => category.id === 'ALL')
          .forEach(category => {
            const totalCount = arrCategoryList.reduce((acc, cur) => {
              return acc + (cur.count || 0)
            }, 0)
            arrCategoryList.splice(0, 0, {
              id: category.id,
              code: category.id,
              name: category.title,
              count: totalCount,
            })
          })

        setCategoryList(arrCategoryList)
      } else {
        openToast(message?.message, 'error')
      }
    }
  }, [filterData])

  useEffect(() => {
    if (searchParams && !!searchParams.groupId) {
      handleRefetch()
    }
  }, [searchParams])

  useEffect(() => {
    if (listData) {
      const { status, code, data, message } = listData as BaseResponseCommonObject
      if (status === 'S') {
        const { content, totalElements, totalPages } = data as PageActionDtoForList
        console.log('content : ', content)
        setList(content as Array<ActionDtoForList>)
        setTotalCount(totalElements || 0)
        setTotalPage(totalPages || 0)
      } else {
        openToast(message?.message, 'error')
      }
    }
  }, [listData])

  useEffect(() => {
    const currentCategory = draftCategoryList.find(category => category.id === selectedCategoryId)
    const currentCategoryList = []
    if (currentCategory) {
      if (currentCategory.id !== 'ALL') {
        currentCategoryList.push(currentCategory.id)
      } else {
        draftCategoryList.forEach(category => {
          if (category.id !== 'ALL') {
            currentCategoryList.push(category.id)
          }
        })
      }
    }

    handleSetSearchParam({
      ...searchParams,
      page: 1,
      size: 20,
      state_filter: ['RES', 'FIN'],
      ...(!!currentCategoryList && { categoryList: currentCategoryList }),
    })
  }, [selectedCategoryId])

  useEffect(() => {
    stateRefetch()
    nwStateRefetch()
  }, [])

  useEffect(() => {
    if (nwStateData) {
      const { status, data, code, message } = nwStateData as BaseResponseCommonObject
      if (status === 'S') {
        setNwStateCodeList(
          Object.fromEntries(
            [{ code: '', name: '전체' }, ...(data as Array<CommonCodeDto>)].map(code => [
              code.code ?? '',
              code.name ?? '',
            ])
          )
        )
      } else {
        openToast(message?.message, 'error')
      }
    }
  }, [nwStateData])

  return (
    <>
      <Popup
        isOpen={importPopup.isOpen}
        onClose={() => setImportPopupAction({ isOpen: false })}
        hasCloseButton={true}
        width={1200}
        title={'보도자료 가져오기'}
        height={'90vh'}
        buttons={
          <div className="popup-footer__section type2">
            <div className="buttons">
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => setImportPopupAction({ isOpen: false })}
              />
              <Button
                label={'선택'}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => setPressReleaseDataToContent(importPopup?.selectedId || 0)}
              />
            </div>
          </div>
        }
      >
        <div className="popup-contents__section import-popup">
          <div className="mb-contents manage">
            <div className="mb-contents-layout__section">
              <DraftHeader
                title={''}
                searchParams={searchParams}
                isSearch={isSearch}
                isOwnerByMe={isOwnerByMeValue}
                stateList={stateCodeList}
                nwStateList={nwStateCodeList}
                selectedCategoryId={selectedCategoryId}
                totalCount={totalCount}
                onToggleSearch={handleToggleSearch}
                onToggleOwnerByMe={handleToggleOwnerByMe}
                onChangeShareCode={handleChangeShareCode}
                onChangeStateCode={handleChangeStateCode}
                onChangeNewswireStateCode={handleChangeNewswireStateCode}
                onChangeSort={handleChangeSort}
              />
              <DraftContent
                searchText={searchText}
                data={list}
                isSearch={isSearch}
                stateList={stateCodeList}
                nwStateList={nwStateCodeList}
                onChangeSearchText={handleChangeSearchText}
                onDeleteSearchText={handleDeleteSearchText}
                onToggleSearch={handleToggleSearch}
                onRefetch={handleRefetch}
                onClickItem={setImportPopupSelectedId}
              />
            </div>
          </div>
        </div>
        <div className="search-result__footer">
          <MbPagination
            totalCount={totalCount}
            currentPageIndex={searchParams.page}
            viewCount={searchParams.size}
            totalPageCount={totalPage}
            onSelectSize={handleChangeSize}
            onPaginationChange={e => {
              handleChangePage(e)
            }}
            isPageLoadCompleted={!isLoading}
          />
        </div>
      </Popup>
    </>
  )
}

export default ImportPressReleasePopup
