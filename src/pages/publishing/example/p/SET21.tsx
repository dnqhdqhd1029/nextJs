/**
 * @file SET21.tsx
 * @description SET21 페이지
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
                      <h2 className="common-title__title">내 구매</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'서비스 구매'}
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
                        <p className="font-body__regular">
                          내가 구매한 사용권 및 부가서비스 구매 내역을 확인할 수 있습니다.
                        </p>
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
                                <th scope="col">상품</th>
                                <th scope="col">사용권</th>
                                <th scope="col">유효기간</th>
                                <th scope="col">결제일</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Button
                                    label={'이메일 추가'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'스타터'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>2023-05-16 ~ 2024-05-15 </td>
                                <td>2023-05-12</td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'베이직'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>2023-05-16 ~ 2024-05-15 </td>
                                <td>2023-05-12</td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'비즈니스'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>2023-05-16 ~ 2024-05-15 </td>
                                <td>2023-05-12</td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'이메일 추가'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                              <tr>
                                <td>
                                  <Button
                                    label={'이메일 추가'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>L230516ST001</td>
                                <td>2023-05-16 ~ 2024-05-15 </td>
                                <td>2023-05-12</td>
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
