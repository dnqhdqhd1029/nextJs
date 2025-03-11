import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import Skeleton from '~/components/common/ui/Skeleton'
import NavigationBar from '~/components/contents/setting/NavigationBar/NavigationBar'
import { useShareSettingDefaults } from '~/utils/hooks/contents/setting/useShareSettingDefaults'

const ShareSettingDefaults = () => {
  const router = useRouter()
  const { shareSettingLoading, shareSettingData, licenseInfo, listOptions, handleSelectPolicy, updatePolicy, init } =
    useShareSettingDefaults()

  useEffect(() => {
    init()
  }, [])

  if (shareSettingLoading) {
    return null
  }

  return (
    <div className="mb-container">
      <div className="mb-common-inner setting">
        <div className="mb-lnb__section type-w2">
          <NavigationBar />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__contents">
              <div className="setting__contents">
                <div className="setting__header">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <h2 className="common-title__title">공유 설정 기본값</h2>
                    </div>
                  </div>
                </div>
                <div className="setting-contents__section">
                  <div className="setting-contents__desc">
                    <p>
                      내가 콘텐츠를 만들 때 적용할 공유 설정 기본값을 설정합니다.
                      <br />
                      설정 기본값을 정해 놓으면 콘텐츠를 만들 때마다 일일이 공유 설정값을 입력하지 않아도 되므로
                      편리합니다.
                      <br />
                      콘텐츠를 만든 후에는 공유 설정을 개별적으로 수정할 수 있습니다.
                    </p>
                  </div>
                  <ul className="interval-mt16 w480">
                    <li>
                      <ul className="max-width__m">
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'언론인, 미디어 목록'} />
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                value={shareSettingData.pressMediaListPolicy}
                                onChange={item => handleSelectPolicy('list', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'언론인, 미디어 맞춤 검색'} />
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                value={shareSettingData.pressMediaCustomSearchPolicy}
                                onChange={item => handleSelectPolicy('jrnlstMediaSrch', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'클립북'} />
                              {!licenseInfo?.flagMonitoring && (
                                <Button
                                  label={'업그레이드'}
                                  cate={'default'}
                                  size={'es'}
                                  color={'success'}
                                  onClick={() => router.push('/monitoring-upgrade')}
                                />
                              )}
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                disabled={!licenseInfo?.flagMonitoring}
                                value={shareSettingData.clipbookPolicy}
                                onChange={item => handleSelectPolicy('clipbook', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'모니터링'} />
                              {!licenseInfo?.flagMonitoring && (
                                <Button
                                  label={'업그레이드'}
                                  cate={'default'}
                                  size={'es'}
                                  color={'success'}
                                  onClick={() => router.push('/monitoring-upgrade')}
                                />
                              )}
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                disabled={!licenseInfo?.flagMonitoring}
                                value={shareSettingData.monitoringPolicy}
                                onChange={item => handleSelectPolicy('news_search', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'활동(노트, 약속, 전화, 문의)'} />
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                value={shareSettingData.activityPolicy}
                                onChange={item => handleSelectPolicy('action', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn is-selected">
                            <div className="select-form__title">
                              <FormTitle title={'이메일, 보도자료, 뉴스와이어 배포'} />
                            </div>
                            {shareSettingData.isLoading ? (
                              <Skeleton
                                width={'480px'}
                                height={'35px'}
                              />
                            ) : (
                              <Select
                                options={listOptions}
                                value={shareSettingData.distributionPolicy}
                                onChange={item => handleSelectPolicy('distribute', item, shareSettingData)}
                              />
                            )}
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="setting-contents-list__button type-pl0">
                        <Button
                          label={'초기 상태로 변경'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() =>
                            updatePolicy(
                              {
                                isLoading: false,
                                pressMediaListPolicy: { id: 'READABLE', name: '' },
                                pressMediaCustomSearchPolicy: { id: 'READABLE', name: '' },
                                clipbookPolicy: { id: 'READABLE', name: '' },
                                monitoringPolicy: { id: 'READABLE', name: '' },
                                projectPolicy: { id: 'READABLE', name: '' },
                                activityPolicy: { id: 'READABLE', name: '' },
                                distributionPolicy: { id: 'READABLE', name: '' },
                              },
                              shareSettingData,
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
  )
}

export default ShareSettingDefaults
