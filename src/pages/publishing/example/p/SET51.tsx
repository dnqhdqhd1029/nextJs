/**
 * @file SET51.tsx
 * @description SET51 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import { IcoPersonLineBroken } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
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
                      <h2 className="common-title__title">그룹 관리</h2>
                      <div className="common-title__buttons">
                        <Button
                          label={'새 그룹 추가'}
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
                          그룹은 회사 내에 독립된 데이터 파티션을 만들어 사용할 수 있는 기능입니다.
                        </p>
                        <ul className="control-list">
                          <li>
                            <FormInputBtn
                              type="checkbox"
                              name="ck1"
                              id="ck1"
                              label="내 그룹"
                            />
                          </li>
                          <li>
                            <div className="select__section select-type1-small">
                              <button className="select__label">
                                <span className="select__label-text">회원</span>
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
                                <th scope="col">그룹명</th>
                                <th scope="col">인원</th>
                                <th scope="col">그룹회원</th>
                                <th scope="col">만든이</th>
                                <th scope="col">새성일</th>
                                <th scope="col">관리</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Button
                                    label={'마케팅'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>3</td>
                                <td>
                                  <ul className="d-link__list type-tooltip">
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'홍길동'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                      <Tooltips
                                        tooltipId={'ipt-tt0'}
                                        tooltipPlace={'top'}
                                        tooltipHtml={'관리자'}
                                        tooltipComponent={<IcoPersonLineBroken />}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'김태리'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'최영무'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                    disabled={true}
                                  />
                                </td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">관리</span>
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
                                    label={'신제품 개발'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>1</td>
                                <td>
                                  <ul className="d-link__list type-tooltip">
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'서정민'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                      <Tooltips
                                        tooltipId={'ipt-tt0'}
                                        tooltipPlace={'top'}
                                        tooltipHtml={'관리자'}
                                        tooltipComponent={<IcoPersonLineBroken />}
                                      />
                                    </li>
                                  </ul>
                                </td>
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
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">관리</span>
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
                                    label={'전략기획'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>10</td>
                                <td>
                                  <ul className="d-link__list type-tooltip">
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'서현진'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'김훈'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'이무개'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">관리</span>
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
                                    label={'홍보'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>4</td>
                                <td>
                                  <ul className="d-link__list type-tooltip">
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'이정신'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'최미영'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'김갑수'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                      <Tooltips
                                        tooltipId={'ipt-tt0'}
                                        tooltipPlace={'top'}
                                        tooltipHtml={'관리자'}
                                        tooltipComponent={<IcoPersonLineBroken />}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'유영선'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'송해'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                    <li>
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'바긴주'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                  </ul>
                                </td>
                                <td>
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'김태리'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </td>
                                <td>2021-12-31</td>
                                <td>
                                  <div className="select__section select-type1-small select-ico-only select-align-right">
                                    <button className="select__label ico-size16">
                                      <span className="select__label-text">관리</span>
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
