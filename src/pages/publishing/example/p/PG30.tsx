/**
 * @file PG30.tsx
 * @description PG30 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">부가 서비스 구매</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular fw700">부가서비스</p>
                </div>
                <div className="service-addition__group">
                  <div className="service-addition__title">종류</div>
                  <div className="service-addition__select">
                    <div className="select-form__section select-form-btn">
                      <div className="select-form__group">
                        <button className="select-form__label">
                          <span className="select-form__label-text">선택</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>

                        <div className="select-form-option__section">
                          <div className="select-form-option__area">
                            <ul className="select-form-option__group">
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">
                                    비공개 (소유자만 보고 수정할 수 있음)
                                  </span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">
                                    공개 (동료가 볼 수 있으나 수정은 할 수 없음)
                                  </span>
                                </button>
                              </li>
                              <li>
                                <button className="select-form-option__item">
                                  <span className="select-form-option__item-text">
                                    수정 (동류가 볼 수 있고 추가, 수정, 삭제 가능)
                                  </span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="service-addition__table">
                  <div className="table-type4__section">
                    <table>
                      <colgroup>
                        <col width={'6%'} />
                        <col width={'19%'} />
                        <col
                          span={3}
                          width={'25%'}
                        />
                      </colgroup>
                      <caption>caption</caption>
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">수량</th>
                          <th scope="col">가격(부가세 별도)</th>
                          <th scope="col">단가</th>
                          <th scope="col">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <FormInputBtn
                              type="radio"
                              name="rdo-pg30"
                              id="rdo-pg30-0"
                              checked
                            />
                          </td>
                          <td>5,000</td>
                          <td>100,000</td>
                          <td>20</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <FormInputBtn
                              type="radio"
                              name="rdo-pg30"
                              id="rdo-pg30-1"
                            />
                          </td>
                          <td>15,000</td>
                          <td>100,000</td>
                          <td>20</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <FormInputBtn
                              type="radio"
                              name="rdo-pg30"
                              id="rdo-pg30-2"
                            />
                          </td>
                          <td>25,000</td>
                          <td>100,000</td>
                          <td>20</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <FormInputBtn
                              type="radio"
                              name="rdo-pg30"
                              id="rdo-pg30-3"
                            />
                          </td>
                          <td>35,000</td>
                          <td>1,200,000</td>
                          <td>12</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
              <li>
                <div className="service-addition__text">
                  <span className="type-bold">
                    구매한 부가 서비스는 사용권의 유효기간 내에서만 사용할 수 있습니다. 사용권의 유효기간이 지나면
                    소멸해 쓸 수 없습니다.
                  </span>
                  <Button
                    label={'환불 규청'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </div>
                <div className="service-addition__text">
                  <span>더 많은 이메일 건수 추가가 필요하면 견적을 요청하세요. 견적 후 카드 결제도 가능합니다.</span>
                  <Button
                    label={'견적 요청'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                </div>
              </li>
            </ul>

            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'선택하기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT5'
