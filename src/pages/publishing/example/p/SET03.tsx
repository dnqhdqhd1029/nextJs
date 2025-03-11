/**
 * @file SET03.tsx
 * @description SET03 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import Flag from '~/publishing/components/common/ui/Flag'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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
                      <h2 className="common-title__title">뉴스 알리미</h2>
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
                          label="뉴스 알리미 이메일 수신"
                          reverse={true}
                        />
                        <ul className="control-list">
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
                                <th scope="col">모니터링 이름</th>
                                <th scope="col">내 수신 시간</th>
                                <th scope="col">종료일</th>
                                <th scope="col">설정일</th>
                                <th scope="col">소유자</th>
                                <th scope="col">수신자</th>
                                <th scope="col">관리</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Button
                                    label={'휴대폰 브랜드'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>
                                  월: 09:00
                                  <br />
                                  수: 09:00
                                  <br />
                                  금: 09:00
                                </td>
                                <td>
                                  <div className="table-flex-align-c">2023-09-30</div>
                                </td>
                                <td>03-22 </td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'홍길동'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>1</td>
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
                                    label={'노트북 브랜드'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>
                                  월: 09:00, 12:00, 16:00, 20:00
                                  <br />
                                  화: 09:00, 12:00, 16:00, 20:00
                                  <br />
                                  수: 09:00, 12:00, 16:00, 20:00
                                  <br />
                                  목: 09:00, 12:00, 16:00, 20:00
                                  <br />
                                  금: 09:00, 12:00, 16:00
                                  <br />
                                  토: 09:00, 12:00
                                  <br />
                                  일: 09:00
                                </td>
                                <td>
                                  <div className="table-flex-align-c">-</div>
                                </td>
                                <td>03-03</td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'김철수'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>4</td>
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
                                    label={'자율 주행'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>월: 12:00</td>
                                <td>
                                  <div className="table-flex-align-c">
                                    2023-10-30
                                    <Flag
                                      label={'종료'}
                                      color={'gray-500'}
                                      size={'es'}
                                    />
                                  </div>
                                </td>
                                <td>03-22</td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'홍길동'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>1</td>
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
