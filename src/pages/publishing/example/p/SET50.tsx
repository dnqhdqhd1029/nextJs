/**
 * @file SET50.tsx
 * @description SET50 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
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
                      <h2 className="common-title__title">사용자 관리</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'새 회원 추가'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="setting-contents__section">
                  <ul className="interval-mt16">
                    <li>
                      <div className="setting-contents-list__header">
                        <p className="font-body__regular">총 6명</p>
                        <ul className="control-list">
                          <li>
                            <div className="select__section select-type1-small">
                              <button className="select__label">
                                <span className="select__label-text">권한</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-option__section">
                                <div className="select-option__area">
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item is-selected">
                                        <span className="select-option__item-text">전체</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">관리자</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">사용자</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="select__section select-type1-small select-ico-only select-align-right">
                              <button className="select__label ico-size24">
                                <span className="select__label-text">필터(내림차순)</span>
                                <IcoSvg data={icoSvgData.sortDown} />
                              </button>

                              <div className="select-option__section">
                                <div className="select-option__area">
                                  <h6 className="select-option__group-title">정렬</h6>
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item is-selected">
                                        <span className="select-option__item-text">설정일</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">모니터링 이름</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                  <h6 className="select-option__group-title">순서</h6>
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item is-selected">
                                        <span className="select-option__item-text">내림차순</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">오름차순</span>
                                        <span className="select-option__item-ico">
                                          <IcoSvg data={icoSvgData.checkThick} />
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="search">
                            <FormInputSearch placeholder={'검색'} />
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
                                <th scope="col">이름</th>
                                <th scope="col">표시이름</th>
                                <th scope="col">이메일</th>
                                <th scope="col">권한</th>
                                <th scope="col">상태</th>
                                <th scope="col">등록일</th>
                                <th scope="col">관리</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Button
                                    label={'홍길동'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>홍길동</td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="mailto:gildong.hong@gmail.com"
                                    label={'gildong.hong@gmail.com'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>관리자</td>
                                <td>활성</td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">설정</span>
                                      <IcoSvg data={icoSvgData.threeDotsVertical} />
                                    </button>

                                    <div className="select-option__section">
                                      <div className="select-option__area">
                                        <ul className="select-option__group">
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">수정하기</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">삭제하기</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="mailto:Kim.tl@gmail.com"
                                    label={'Kim.tl@gmail.com'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>사용자</td>
                                <td>미인증</td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">설정</span>
                                      <IcoSvg data={icoSvgData.threeDotsVertical} />
                                    </button>

                                    <div className="select-option__section">
                                      <div className="select-option__area">
                                        <ul className="select-option__group">
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">수정하기</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">삭제하기</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'유영석'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                    disabled={true}
                                  />
                                </td>
                                <td>유영석</td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="mailto:you@daum.net"
                                    label={'you@daum.net'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>사용자</td>
                                <td>활성</td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">설정</span>
                                      <IcoSvg data={icoSvgData.threeDotsVertical} />
                                    </button>

                                    <div className="select-option__section">
                                      <div className="select-option__area">
                                        <ul className="select-option__group">
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">수정하기</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">삭제하기</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="setting-contents-list__footer">
                          <Pagination cate={'n3'} />
                          <Pagination cate={'n4'} />
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
