/**
 * @file SET02.tsx
 * @description SET02 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner setting">
        <div className="mb-lnb__section type-w2">
          <LnbSetting />
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
                  <ul className="interval-mt16">
                    <li>
                      <div className="setting-contents-list__header">
                        <FormInputToggle
                          name="cT100"
                          id="cT100"
                          label="이메일 알림 켜기"
                          reverse={true}
                        />
                      </div>
                    </li>
                    <li>
                      <h6 className="setting-contents-list__title">시스템 알림 선택</h6>
                      <div className="setting-contents-list__section">
                        <div className="list-type10__section">
                          <ul className="list-type10__group">
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck01"
                                  id="ck01"
                                  label="내가 소유한 콘텐츠를 누군가가 수정했을 때"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck02"
                                  id="ck02"
                                  label="내가 소유한 콘텐츠에 누군가가 댓글을 달았을 때"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck03"
                                  id="ck03"
                                  label="내가 생성하거나 수정한 콘텐츠를 누군가가 수정했을 때"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck04"
                                  id="ck04"
                                  label="내가 댓글을 단 콘텐츠를 누군가가 수정했을 때"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck05"
                                  id="ck05"
                                  label="내가 댓글을 단 콘텐츠에 누군가가 댓글을 달았을 때"
                                />
                              </div>
                            </li>
                            <li>
                              <div className="list-type10__item">
                                <FormInputBtn
                                  type="checkbox"
                                  name="ck06"
                                  id="ck06"
                                  label="내 회원 회원정보나 권한, 그룹이 변경되었을 때"
                                />
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
