import { Fragment, useEffect, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  defaultGroupSortOptionsByData,
  defaultGroupTableHeaderData,
  DefaultSettingLinks,
} from '~/components/contents/admin/defaultData'
import GroupListTable from '~/components/contents/admin/Group/GroupList'
import CreateGroupPopup from '~/components/contents/admin/Group/Popup/CreateGroupPopup'
import EditGroupNmPopup from '~/components/contents/admin/Group/Popup/EditGroupNmPopup'
import GroupDeletePopup from '~/components/contents/admin/Group/Popup/GroupDeletePopup'
import GroupUserManagePopup from '~/components/contents/admin/Group/Popup/GroupUserManagePopup'
import DropDownButton from '~/components/contents/common/dropdownButton/DropdownButton'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { SelectListOptionItem } from '~/types/common'
import { useAdminGroup } from '~/utils/hooks/contents/admin/useAdminGroup'

const AdminGroup = () => {
  const {
    requestSearchParams,
    licenseInfo,
    pageCount,
    handleChangeSort,
    isLoading,
    handleAuthChange,
    groupList,
    handleChangeSize,
    requestSearchText,
    handlePaginationChange,
    companyGroupOptions,
    searchUserIdActionChange,
    userInfo,
    setOpenCreatGroup,
    requestSearchTextChange,
    init,
    handleChange,
  } = useAdminGroup()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [isLoading])

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'관리자'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div
                className="mb-contents-layout__contents"
                ref={scrollRef}
              >
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">그룹 관리</h2>
                        <div className="common-title__buttons">
                          <Button
                            label={'새 그룹 추가'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            disabled={
                              licenseInfo?.groupLimit ? Number(licenseInfo?.groupLimit) <= pageCount?.totalCount : true
                            }
                            onClick={() => setOpenCreatGroup(true, 0, 'create')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <ul className="interval-mt16">
                      <li>
                        <div className="setting-contents-list__header">
                          <p className="font-body__regular">
                            그룹은 회사 내에 독립된 데이터 파티션을 만들어 사용할 수 있는 기능입니다.
                          </p>
                          <ul className="control-list">
                            <li>
                              <FormInputToggle
                                id="admin-group-manage_list_toggle"
                                name="admin-group-manage_list_toggle"
                                label="내 그룹"
                                reverse={true}
                                checked={requestSearchParams.searchUserId === userInfo?.userId}
                                onChange={e => searchUserIdActionChange(e, requestSearchParams)}
                              />
                            </li>
                            <li>
                              <DropDownButton
                                mainText={'회원'}
                                icoSvgData={'chevronDown'}
                                selectedValue={requestSearchParams.searchUserId.toString()}
                                classNameTopLayerRef={'select__section select-type1-small'}
                                topLayerList={companyGroupOptions}
                                topLayerListAction={e => handleAuthChange(e, requestSearchParams)}
                              />
                            </li>
                            <li>
                              <SortFilterList
                                sortOptionsByData={defaultGroupSortOptionsByData}
                                onChange={(dataItem: SelectListOptionItem, orderItem: SelectListOptionItem) =>
                                  handleChangeSort([`${dataItem.id}!${orderItem.id}`], requestSearchParams)
                                }
                                value={requestSearchParams.sort}
                                disabled={pageCount.totalCount === undefined || pageCount.totalCount === 0}
                              />
                            </li>
                            <li className="search">
                              <FormInputSearch
                                placeholder={'검색'}
                                value={requestSearchText}
                                onChange={e => requestSearchTextChange(e.target.value)}
                                onKeyDown={e =>
                                  e.key === 'Enter' && handleChange(requestSearchText, requestSearchParams)
                                }
                                onDeleteButtonClick={() => requestSearchTextChange('')}
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="setting-contents-list__section type-table">
                          <div className="table-type4__section">
                            <table>
                              <thead>
                                <tr>
                                  {defaultGroupTableHeaderData.map(e => (
                                    <th
                                      scope="col"
                                      key={'defaultTableHeaderData' + e.id}
                                      style={{ width: e.width ?? 'auto' }}
                                    >
                                      {e.title}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {!isLoading && (
                                  <Fragment>
                                    {groupList && groupList.length > 0 ? (
                                      <Fragment>
                                        {groupList.map((e, index: number) => (
                                          <GroupListTable
                                            key={'AdminGroup_groupList' + e.groupId}
                                            {...e}
                                          />
                                        ))}
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        <tr>
                                          <td
                                            colSpan={7}
                                            style={{ borderBottom: 'none' }}
                                          >
                                            <div className="search-result__nodata">
                                              <p className="font-body__regular">결과가 없습니다.</p>
                                            </div>
                                          </td>
                                        </tr>
                                      </Fragment>
                                    )}
                                  </Fragment>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="setting-contents-list__footer">
                            <MbPagination
                              totalCount={pageCount.totalCount}
                              currentPageIndex={requestSearchParams.page}
                              viewCount={requestSearchParams.size}
                              totalPageCount={pageCount.totalPageCount}
                              onSelectSize={(e: number) => handleChangeSize(e, requestSearchParams)}
                              onPaginationChange={(e: number) => handlePaginationChange(e, requestSearchParams)}
                              isPageLoadCompleted={true}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateGroupPopup />
      <EditGroupNmPopup />
      <GroupDeletePopup />
      <GroupUserManagePopup />
    </Fragment>
  )
}
export default AdminGroup
