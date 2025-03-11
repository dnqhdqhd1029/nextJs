import { Fragment, useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputToggle from '~/components/common/ui/FormInputToggle'
import Skeleton from '~/components/common/ui/Skeleton'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import { useSystemAlarm } from '~/utils/hooks/contents/setting/useSystemAlarm'

const SystemAlarm = () => {
  const { systemAlarmLoading, systemAlarmData, updatePolicy, handleCheckPolicy, init } = useSystemAlarm()

  useEffect(() => {
    init()
  }, [])

  if (systemAlarmLoading) {
    return null
  }
  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'설정'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">시스템 알림</h2>
                      </div>
                    </div>
                  </div>

                  <div className="setting-contents__section">
                    <ul className="interval-mt42">
                      <li>
                        <div className="setting-contents-list__header">
                          {systemAlarmData.isLoading ? (
                            <Skeleton
                              width={'141px'}
                              height={'24px'}
                            />
                          ) : (
                            <FormInputToggle
                              name="flagActive"
                              id="flagActive"
                              label="이메일 알림 켜기"
                              reverse={true}
                              checked={systemAlarmData.flagActive}
                              onChange={event => handleCheckPolicy('flagActive', event, systemAlarmData)}
                            />
                          )}
                        </div>
                      </li>
                      <li>
                        <h6 className="setting-contents-list__title">시스템 알림 선택</h6>
                        <div className="setting-contents-list__section">
                          <div className="list-type10__section">
                            <ul className="list-type10__group">
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="modifyContentOwnerContent"
                                      id="modifyContentOwnerContent"
                                      label="내가 소유한 콘텐츠를 누군가가 수정했을 때"
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.modifyContentOwnerContent}
                                      onChange={event =>
                                        handleCheckPolicy('modifyContentOwnerContent', event, systemAlarmData)
                                      }
                                    />
                                  )}
                                </div>
                              </li>
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="addCommentOwnerContent"
                                      id="addCommentOwnerContent"
                                      label="내가 소유한 콘텐츠에 누군가가 댓글을 달거나 댓글을 수정했을 때"
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.addCommentOwnerContent}
                                      onChange={event =>
                                        handleCheckPolicy('addCommentOwnerContent', event, systemAlarmData)
                                      }
                                    />
                                  )}
                                </div>
                              </li>
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="modifyContentCuContent"
                                      id="modifyContentCuContent"
                                      label="나를 콘텐츠의 소유자로 누군가가 변경했을 때 "
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.modifyContentCuContent}
                                      onChange={event =>
                                        handleCheckPolicy('modifyContentCuContent', event, systemAlarmData)
                                      }
                                    />
                                  )}
                                </div>
                              </li>
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="modifyContentAddCommentContent"
                                      id="modifyContentAddCommentContent"
                                      label="내가 댓글을 단 콘텐츠를 누군가가 수정했을 때"
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.modifyContentAddCommentContent}
                                      onChange={event =>
                                        handleCheckPolicy('modifyContentAddCommentContent', event, systemAlarmData)
                                      }
                                    />
                                  )}
                                </div>
                              </li>
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="addCommentAddCommentContent"
                                      id="addCommentAddCommentContent"
                                      label="내가 댓글을 단 콘텐츠에 누군가가 댓글을 달거나 댓글을 수정했을 때"
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.addCommentAddCommentContent}
                                      onChange={event =>
                                        handleCheckPolicy('addCommentAddCommentContent', event, systemAlarmData)
                                      }
                                    />
                                  )}
                                </div>
                              </li>
                              <li>
                                <div className="list-type10__item">
                                  {systemAlarmData.isLoading ? (
                                    <Skeleton
                                      width={'1526px'}
                                      height={'24px'}
                                    />
                                  ) : (
                                    <FormInputBtn
                                      type="checkbox"
                                      name="changeUserInfo"
                                      id="changeUserInfo"
                                      label="내 회원 정보나 권한, 그룹이 변경되었을 때"
                                      disabled={!systemAlarmData.flagActive}
                                      checked={systemAlarmData.changeUserInfo}
                                      onChange={event => handleCheckPolicy('changeUserInfo', event, systemAlarmData)}
                                    />
                                  )}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="setting-contents-list__button">
                          <Button
                            label={'초기 상태로 변경'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                            onClick={event =>
                              updatePolicy(
                                {
                                  policyInfo: {
                                    flagActive: true,
                                    addCommentAddCommentContent: true,
                                    modifyContentAddCommentContent: true,
                                    modifyContentCuContent: true,
                                    addCommentOwnerContent: true,
                                    modifyContentOwnerContent: true,
                                    changeUserInfo: true,
                                  },
                                },
                                systemAlarmData,
                                true
                              )
                            }
                          />
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
    </Fragment>
  )
}

export default SystemAlarm
