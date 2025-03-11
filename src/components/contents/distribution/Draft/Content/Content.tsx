import { useCallback, useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import ContentItem from '~/components/contents/distribution/Draft/Content/ContentItem'
import { importPopupType } from '~/stores/modules/contents/newswireRelease/newswireRelease'
import { ActionDtoForList, GroupDto, UserDtoForGroup } from '~/types/api/service'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const DraftContent = ({
  searchText,
  data,
  isSearch,
  stateList,
  nwStateList,
  onChangeSearchText,
  onDeleteSearchText,
  onToggleSearch,
  onRefetch,
  onClickItem,
}: {
  searchText: string
  data: Array<ActionDtoForList>
  isSearch: boolean
  stateList: Record<string, string>
  nwStateList: Record<string, string>
  onChangeSearchText: (txt: string) => void
  onDeleteSearchText: () => void
  onToggleSearch: (isChangeSearch: boolean) => void
  onRefetch: () => void
  onClickItem?: (e: number, props: importPopupType) => void
}) => {
  const { userSelectGroup } = useAppSelector(state => state.authSlice)
  const refineValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [ownerGroup, setOwnerGroup] = useState<Array<UserDtoForGroup>>([])

  const getUserList = async () => {
    let list: UserDtoForGroup[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      setOwnerGroup(res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[]))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const handleListRefetch = useCallback(() => {
    onRefetch()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [data])

  useEffect(() => {
    getUserList()
  }, [userSelectGroup])

  return (
    <div className="mb-contents-layout__contents">
      <div className="search-result__contents">
        <ul className="interval-mt12">
          {isSearch && (
            <li>
              <div className="search-result__search">
                <FormInputSearch
                  placeholder={'검색'}
                  value={searchText}
                  onKeyUp={e => {
                    e.preventDefault()
                    onChangeSearchText(e.currentTarget.value)
                  }}
                  onDeleteButtonClick={onDeleteSearchText}
                />
                <Button
                  label={'정렬'}
                  cate={'ico-only'}
                  size={'s'}
                  color={'transparent'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.iconCloseButton2}
                  icoSize={16}
                  onClick={e => {
                    e.preventDefault()
                    onToggleSearch(false)
                  }}
                />
              </div>
            </li>
          )}
          <li>
            <div className="search-result__list">
              <div className="list-type4__section">
                <ul className="list-type4__group"></ul>
                {isLoading ? (
                  <ul className="list-type4__group">
                    {Array.from({ length: 20 }).map((e, index) => (
                      <li key={'list-type4-item__section' + 'searchContentList' + index}>
                        <div className={'list-type4-item__section'}>
                          <Skeleton
                            key={10}
                            width={'100%'}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-type4__group">
                    {data && data.length > 0 ? (
                      data.map((e: ActionDtoForList, index) => (
                        <ContentItem
                          props={e}
                          stateList={stateList}
                          nwStateList={nwStateList}
                          refineValue={refineValue}
                          ownerGroup={ownerGroup}
                          key={'list-type4-item__section' + 'press_group_searchList' + e.actionId}
                          onListRefetch={handleListRefetch}
                          onClickItem={onClickItem}
                        />
                      ))
                    ) : (
                      <div className="search-result__nodata">
                        <p className="font-body__regular">검색 결과가 없습니다.</p>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DraftContent
