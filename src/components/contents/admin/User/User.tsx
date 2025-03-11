import { Fragment, useEffect, useRef } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import 'moment/locale/ko'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import SortFilterList from '~/components/common/ui/SortFilterList'
import {
  authorityOptions,
  DefaultSettingLinks,
  defaultSortOptionsByData,
  defaultTableHeaderData,
  PermissionList,
} from '~/components/contents/admin/defaultData'
import UserDeletePopup from '~/components/contents/admin/User/Popup/UserDeletePopup'
import UserPasswordPopup from '~/components/contents/admin/User/Popup/UserPasswordPopup'
import UserStatusChange from '~/components/contents/admin/User/Popup/UserStatusChange'
import UserUpdatePopup from '~/components/contents/admin/User/Popup/UserUpdatePopup'
import UserList from '~/components/contents/admin/User/UserList'
import DropDownButton from '~/components/contents/common/dropdownButton/DropdownButton'
import MbPagination from '~/components/contents/common/forms/MbPagination'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { UserDto } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const AdminUser = () => {
  const router = useRouter()
  const {
    isLoading,
    userParamKeyword,
    requestSearchParams,
    pageCount,
    isOnlyActiveUser,
    userList,
    handleChangeSort,
    handleAuthChange,
    handleChangeSize,
    handlePaginationChange,
    setUserParamKeywordAction,
    handleStateChange,
    init,
    handleChange,
  } = useAdminUser()
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
                        <h2 className="common-title__title">사용자 관리</h2>
                        <div className="common-title__buttons">
                          <Button
                            label={'새 회원 추가'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            onClick={() => router.push('/admin/user-add')}
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
                            총{' '}
                            {pageCount.totalCount -
                              (userList.filter(user => user.stateCode === 'INACTIVE').length ?? 0)}
                            명
                          </p>
                          <ul className="control-list">
                            <li>
                              <FormInputToggle
                                id="admin-user-manage_list_toggle"
                                name="admin-user-manage_list_toggle"
                                label="활성 사용자"
                                reverse={true}
                                checked={isOnlyActiveUser}
                                onChange={e => handleStateChange(!isOnlyActiveUser, requestSearchParams)}
                              />
                            </li>
                            <li>
                              <DropDownButton
                                mainText={'권한'}
                                icoSvgData={'chevronDown'}
                                selectedValue={requestSearchParams.role.id}
                                classNameTopLayerRef={'select__section select-type1-small'}
                                topLayerList={PermissionList}
                                topLayerListAction={e => handleAuthChange(e, requestSearchParams)}
                              />
                            </li>
                            <li>
                              <SortFilterList
                                sortOptionsByData={defaultSortOptionsByData}
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
                                value={userParamKeyword}
                                onChange={e => setUserParamKeywordAction(e.target.value)}
                                onKeyDown={e =>
                                  e.key === 'Enter' && handleChange(userParamKeyword, requestSearchParams)
                                }
                                onDeleteButtonClick={() => setUserParamKeywordAction('')}
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="setting-contents-list__section type-table">
                          <div className="table-type4__section">
                            <table>
                              <caption>caption</caption>
                              <thead>
                                <tr>
                                  {defaultTableHeaderData.map(e => (
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
                                    {userList && userList.length > 0 ? (
                                      <Fragment>
                                        {userList.map((e: UserDto, index: number) => (
                                          <UserList
                                            key={'AdminUser_userList' + e.email}
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
      <UserUpdatePopup />
      <UserDeletePopup />
      <UserPasswordPopup />
      <UserStatusChange />
    </Fragment>
  )
}
export default AdminUser
