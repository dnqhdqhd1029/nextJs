/**
 * @file N10-2.tsx
 * @description N10-2 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 type-max-w1400">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="activity__section">
              <div className="mb-contents-header__section type-control">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <div className="common-title__path">
                      <Button
                        label={'arrowLeft'}
                        cate={'ico-only'}
                        size={'s'}
                        color={'body-text'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.arrowLeft}
                        icoSize={24}
                      />
                    </div>
                    <div className="common-title__buttons">
                      <div className="select__section select-type1-small select-line select-align-right">
                        <button className="select__label">
                          <span className="select__label-text">작업</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
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
                              <li>
                                <button className="select-option__item">
                                  <span className="select-option__item-text">공유하기</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="monitoring__section">
                <div className="aside-monitoring__section">
                  <ul className="interval-mt28">
                    <li>
                      <ul className="interval-mt16">
                        <li>
                          <ul className="interval-mt8">
                            <li>
                              <p className="font-body__regular">2023년 03월 12일 14:30</p>
                            </li>
                            <li>
                              <div className="monitoring-header__title">
                                <h3 className="aside-monitoring__title">
                                  삼성전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어 개발 전략과 비전 발표
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div className="monitoring-header__title">
                                {/* 개인 추가 뉴스 표시 아이콘 */}
                                <Tooltips
                                  tooltipId={'tt10-1'}
                                  tooltipPlace={'top'}
                                  tooltipHtml={'개인 추가 뉴스 표시 아이콘'}
                                  tooltipComponent={
                                    <IcoAvatar
                                      label={'이미지없음'}
                                      icoData={icoSvgData.lockFill}
                                      size={'s48'}
                                      icoSize={'s24'}
                                    />
                                  }
                                />
                                <h3 className="aside-monitoring__title">
                                  삼성전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어 개발 전략과 비전 발표
                                </h3>
                              </div>
                            </li>
                            <li>
                              <ul className="grid-col2 type-interval20">
                                <li>
                                  <dl className="dl-table-type1__section">
                                    <dt>
                                      <p className="dl-table-type1__text">미디어</p>
                                    </dt>
                                    <dd>
                                      <p className="dl-table-type1__text type-link">
                                        <Button
                                          elem="a"
                                          url="#!"
                                          label={'중앙일보'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                        <span className="color-secondary">종합일간신문</span>
                                      </p>
                                    </dd>
                                    <dt>
                                      <p className="dl-table-type1__text">저자</p>
                                    </dt>
                                    <dd>
                                      <p className="dl-table-type1__text type-link">
                                        <Button
                                          elem="a"
                                          url="#!"
                                          label={'서정민'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                        <span className="color-secondary">문화부 기자</span>
                                      </p>
                                    </dd>
                                    <dt>
                                      <p className="dl-table-type1__text">작성자</p>
                                    </dt>
                                    <dd>
                                      <p className="dl-table-type1__text type-link">
                                        <Button
                                          elem="a"
                                          url="#!"
                                          label={'홍길동'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                      </p>
                                    </dd>
                                  </dl>
                                </li>
                                <li>
                                  <dl className="dl-table-type1__section">
                                    <dt>
                                      <p className="dl-table-type1__text">수집일</p>
                                    </dt>
                                    <dd>
                                      <p className="dl-table-type1__text">2021년 10월 12일 16:00</p>
                                    </dd>
                                    <dt>
                                      <p className="dl-table-type1__text">클립북</p>
                                    </dt>
                                    <dd>
                                      <p className="dl-table-type1__text type-link">
                                        <Button
                                          elem="a"
                                          url="#!"
                                          label={'갤럭시 사전 예약 이벤트 브리핑'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                      </p>
                                      <p className="dl-table-type1__text type-link">
                                        <Button
                                          elem="a"
                                          url="#!"
                                          label={'DDR5 메모리 업계 동향'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                      </p>
                                    </dd>
                                  </dl>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="aside-monitoring__buttons">
                            <li>
                              <Button
                                label={'저장됨'}
                                cate={'check-number'}
                                size={'m'}
                                color={'outline-secondary'}
                                count={10}
                                icoLeft={true}
                                icoLeftData={icoSvgData.checkThick}
                              />
                            </li>
                            <li>
                              <Button
                                label={'버튼'}
                                cate={'default'}
                                size={'m'}
                                color={'primary'}
                              />
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="table-type2__section">
                        <table>
                          <caption>caption</caption>
                          <thead>
                            <tr>
                              <th scope="col">미디어 가치</th>
                              <th scope="col">논조</th>
                              <th scope="col">글자수</th>
                              <th scope="col">사진</th>
                              <th scope="col">영상</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>62,510</td>
                              <td>
                                <div className="editor__group">
                                  중립
                                  <Button
                                    label={'정렬'}
                                    cate={'ico-only'}
                                    size={'es'}
                                    color={'gray-500'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.pencilFill2}
                                    icoSize={12}
                                  />
                                </div>
                              </td>
                              <td>1,345</td>
                              <td>1</td>
                              <td>-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>
                    <li>
                      <p className="aside-monitoring-table__title">내용</p>
                      <div className="import-info__group">
                        <div className="import-info__contents">컨텐츠 내용</div>
                      </div>
                    </li>
                    <li>
                      <div className="title-select__section">
                        <div className="title-select__header">
                          <p className="aside-monitoring-table__title">태그</p>
                          <div className="select-form__section select-form-editor">
                            <div className="select-form__group">
                              <button className="select__label">
                                <span className="hidden">편집</span>
                                <b className="ico">
                                  <IcoSvg data={icoSvgData.pencilFill2} />
                                </b>
                                <b className="arrow">
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </b>
                              </button>

                              <div className="select-form-option__section">
                                <FormInputSearch placeholder={'검색'} />
                                <div className="select-form-option__area">
                                  <ul className="select-form-option__group">
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck30"
                                          id="ck30"
                                          label="옵션 30"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck31"
                                          id="ck31"
                                          label="옵션 31"
                                        />
                                      </div>
                                    </li>
                                    <li>
                                      <div className="select-form-option__item-input">
                                        <FormInputBtn
                                          type="checkbox"
                                          name="ck32"
                                          id="ck32"
                                          label="옵션 32"
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                  <div className="select-form-footer__group">
                                    <button
                                      type="button"
                                      className="select-form-footer__button button-tag"
                                    >
                                      "갤럭시" 새 태그 만들기
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="title-select__tags">
                          <div className="tags__section">
                            <ul className="tags__list">
                              <li>
                                <Tag
                                  label={'태그1'}
                                  cate={'n2'}
                                  shape={'round'}
                                  close={true}
                                />
                              </li>
                              <li>
                                <Tag
                                  label={'태그2'}
                                  cate={'n2'}
                                  shape={'round'}
                                  close={true}
                                />
                              </li>
                            </ul>
                          </div>
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
Sample.PublishingLayout = 'LAYOUT4'
