/**
 * @file PJ07.tsx
 * @description PJ07 페이지
 */

import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="project-header__section">
        <ul className="interval-mt12">
          <li>
            <div className="project-header-control__group">
              <ul className="project-header-control__list">
                <li className="control-path">
                  <div className="control-path-arrow">
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
                  <h4 className="control-path-name">갤럭시 Z 폴드3 프로모션</h4>
                </li>
                <li className="control-obj">
                  <div className="control-obj-select">
                    <div className="select__section select-type1-small select-type1-button select-align-right">
                      <button className="select__label">
                        <span className="select__label-text">활동 추가</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>

                      <div className="select-option__section">
                        <div className="select-option__area">
                          <ul className="select-option__group">
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">이메일 보내기</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">보도자료 배포</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="project-header-tabs__group">
              <div className="tabs__section type1-small">
                <div className="tabs-menu__group">
                  <ul className="tabs-menu__list">
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">개요</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">모니터링</span>
                        <span className="tabs-menu__number">2</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">클립북</span>
                        <span className="tabs-menu__number">3</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">목록</span>
                        <span className="tabs-menu__number">5</span>
                      </button>
                    </li>
                    <li className="is-active">
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">활동</span>
                        <span className="tabs-menu__number">24</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-container">
        <div className="mb-common-inner">
          <div className="mb-lnb__section type-w1">
            <LnbFilter />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__header">
                <div className="search-result__header">
                  <ul className="interval-mt10">
                    <li>
                      <div className="search-result__header-sort type-pl-14">
                        <FormInputBtn
                          type="checkbox"
                          name="total1"
                          id="total1"
                          label="2명 / 총 240명"
                        />
                        <div className="header-sort__action">
                          <Button
                            label={'프로젝트 제외'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <Button
                            label={'태그 수정'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <Button
                            label={'내보내기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                        </div>
                        <div className="header-sort__filter">
                          <ul className="s-header__control">
                            <li className="filter">
                              <Button
                                label={'검색'}
                                cate={'ico-only'}
                                size={'s'}
                                color={'body-text'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.search}
                                icoSize={18}
                              />
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
                                          <span className="select-option__item-text">미디어 가치</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">관련성</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">이름</span>
                                          <span className="select-option__item-ico">
                                            <IcoSvg data={icoSvgData.checkThick} />
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="select-option__item">
                                          <span className="select-option__item-text">미디어명</span>
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
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-contents-layout__contents">
                <div className="search-result__contents">
                  <ul className="interval-mt12">
                    {/* 검색창 */}
                    <li>
                      <div className="search-result__search">
                        <FormInputSearch placeholder={'검색'} />
                        <Button
                          label={'정렬'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'transparent'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                    </li>

                    {/* 검색 리스트 나열 */}
                    <li>
                      <div className="search-result__list">
                        <div className="list-type5__section">
                          <ul className="list-type5__group">
                            <li>
                              {/* 선택했을 때 is-selected */}
                              <div className="list-type5-item__section is-selected">
                                <ul className="list-type5-item__list">
                                  <li className="list-type5-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck500"
                                      id="ck500"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type5-item__ico">
                                    <IcoSvg data={icoSvgData.telephone} />
                                  </li>
                                  <li className="list-type5-item__contents type-flex-grow">
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={'중앙일보 서정민 전화 통화'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <div className="list-type5-contents__flex">
                                      <div className="list-type5-contents__comment">
                                        <p className="list-type5-contents__text">댓글 2</p>
                                      </div>
                                      <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type5-item__section">
                                <ul className="list-type5-item__list">
                                  <li className="list-type5-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck501"
                                      id="ck501"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type5-item__ico">
                                    <IcoSvg data={icoSvgData.envelope} />
                                  </li>
                                  <li className="list-type5-item__contents type-flex-grow">
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={'서정민 기자님, 기획 기사 관련 내용 취합해 공유 드립니다.'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <div className="list-type5-contents__flex">
                                      <div className="list-type5-contents__comment">
                                        <p className="list-type5-contents__text">댓글 20000</p>
                                      </div>
                                      <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type5-item__section">
                                <ul className="list-type5-item__list">
                                  <li className="list-type5-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck502"
                                      id="ck502"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type5-item__ico">
                                    <IcoSvg data={icoSvgData.clock} />
                                  </li>
                                  <li className="list-type5-item__contents type-flex-grow">
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={
                                        '중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문'
                                      }
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <div className="list-type5-contents__flex">
                                      <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type5-item__section">
                                <ul className="list-type5-item__list">
                                  <li className="list-type5-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck503"
                                      id="ck503"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type5-item__ico">
                                    <IcoSvg data={icoSvgData.chatLeftText} />
                                  </li>
                                  <li className="list-type5-item__contents type-flex-grow">
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={'중앙일보 패션/뷰티 담당기자 순화동 본사 방문'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <div className="list-type5-contents__flex">
                                      <div className="list-type5-contents__comment">
                                        <p className="list-type5-contents__text">댓글 20000</p>
                                      </div>
                                      <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-contents-layout__footer">
                <div className="search-result__footer">
                  <Pagination cate={'n3'} />
                  <Pagination cate={'n4'} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-aside__section type-w3">
            <div className="aside-activity__section">
              <ul className="interval-mt28">
                <li>
                  <div className="aside-activity__header">
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'자세히보기'}
                      cate={'link-text-arrow'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronRight}
                    />
                  </div>
                </li>
                <li>
                  <h6 className="activity-detail__title">중앙일보 서정민 전화 통화</h6>
                </li>
                <li>
                  <div className="activity-detail__section">
                    <ul className="interval-mt28">
                      <li>
                        <ul className="grid-col2 type-interval20">
                          <li>
                            <dl className="dl-table-type1__section">
                              <dt>
                                <p className="dl-table-type1__text">활동 유형</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">약속</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">상태</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">진행 중</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">날짜</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">2022-02-17 14:00</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">소유자</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">
                                  <Button
                                    label={'홍길동'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">소유자</p>
                              </dt>
                              <dd>
                                <div className="d-select-type1__section">
                                  <div className="select__section select-type2-primary">
                                    <button className="select__label">
                                      <span className="select__label-text">홍길동</span>
                                      <IcoSvg data={icoSvgData.chevronDown} />
                                    </button>

                                    <div className="select-option__section">
                                      <div className="select-option-search__section">
                                        <FormInputSearch placeholder={'검색'} />
                                      </div>

                                      <div className="select-option__area">
                                        <ul className="select-option__group">
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">김세연</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">이동욱</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item is-selected">
                                              <span className="select-option__item-text">홍길동</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button className="select-option__item">
                                              <span className="select-option__item-text">최진욱</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">수정자</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">
                                  <Button
                                    elem="a"
                                    url="#!"
                                    label={'차예린'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">언론인</p>
                              </dt>
                              <dd>
                                <ul className="d-link__list">
                                  <li>
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'서정민'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                  <li>
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'김민석'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                  <li>
                                    {/* 툴팁일 때 */}
                                    <Tooltips
                                      tooltipId={'tt1'}
                                      tooltipPlace={'top'}
                                      tooltipHtml={'중앙일보 사회부 기자'}
                                      tooltipContents={'최서원'}
                                      url="#!"
                                    />
                                  </li>
                                </ul>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">미디어</p>
                              </dt>
                              <dd>
                                <ul className="d-link__list">
                                  <li>
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'중앙일보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                  <li>
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'정보보안 전문 미디어'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                </ul>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">첨부</p>
                              </dt>
                              <dd>
                                <ul className="d-link__list">
                                  <li>
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'신제품 기획기사 관렴 미팅 어젠다.doc'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                </ul>
                              </dd>
                            </dl>
                          </li>
                          <li>
                            <dl className="dl-table-type1__section">
                              <dt>
                                <p className="dl-table-type1__text">생성일</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">2021-11-30 09:45</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">수정일</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">2022-02-16 12:05</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">공유</p>
                              </dt>
                              <dd>
                                <p className="dl-table-type1__text">수정</p>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">프로젝트</p>
                              </dt>
                              <dd>
                                <ul className="d-link__list">
                                  <li>
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={'3분기 신제품 홍보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                </ul>
                              </dd>
                              <dt>
                                <p className="dl-table-type1__text">태그</p>
                              </dt>
                              <dd>
                                <ul className="d-link__list">
                                  <li>
                                    <Button
                                      elem="a"
                                      url={'#!'}
                                      label={'신제품'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </li>
                                </ul>
                              </dd>
                            </dl>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="import-info__group">
                          <h6 className="import-info__title">본문</h6>
                          <div className="import-info__contents">컨텐츠 영역</div>
                        </div>
                      </li>

                      {/* 댓글 없을 때 + 댓글 버튼이 있을 때 */}
                      <li>
                        <div className="d-tabs__group">
                          <div className="tabs__section type1-small">
                            <div className="tabs-menu__group">
                              <ul className="tabs-menu__list">
                                <li className="is-active">
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">댓글</span>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">이력</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="tabs-panel__section">
                              <div className="tabs-panel__group">
                                <div className="d-tabs__nodata">이 활동에 작성된 댓글이 없습니다.</div>

                                {/* 댓글 버튼이 있을 때 */}
                                <div className="d-tabs-comment__button">
                                  <Button
                                    label={'댓글'}
                                    cate={'default'}
                                    size={'s'}
                                    color={'outline-secondary'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* 댓글 없을 때 + 댓글 쓸 때 */}
                      <li>
                        <div className="d-tabs__group">
                          <div className="tabs__section type1-small">
                            <div className="tabs-menu__group">
                              <ul className="tabs-menu__list">
                                <li className="is-active">
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">댓글</span>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">이력</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="tabs-panel__section">
                              <div className="tabs-panel__group">
                                <div className="d-tabs__nodata">이 활동에 작성된 댓글이 없습니다.</div>

                                {/* 댓글 쓸 때 */}
                                <div className="d-tabs-comment__write">
                                  <div className="textarea__area">
                                    <FormTitle title="댓글" />
                                    <div className="textarea__group">
                                      <textarea rows={6} />
                                    </div>
                                  </div>
                                  <div className="buttons__group type-right">
                                    <Button
                                      label={'취소'}
                                      cate={'default'}
                                      size={'s'}
                                      color={'link-dark'}
                                    />
                                    <Button
                                      label={'저장'}
                                      cate={'default'}
                                      size={'s'}
                                      color={'primary'}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* 댓글 있을 때 */}
                      <li>
                        <div className="d-tabs__group">
                          <div className="tabs__section type1-small">
                            <div className="tabs-menu__group">
                              <ul className="tabs-menu__list">
                                <li className="is-active">
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">댓글</span>
                                    <span className="tabs-menu__number">2 </span>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">이력</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="tabs-panel__section">
                              <div className="tabs-panel__group">
                                <div className="list-type6__section">
                                  <ul className="list-type6__group">
                                    <li>
                                      <div className="list-type6-item__section">
                                        <p className="list-type6-item__text">
                                          기자 3명을 초대해 미팅하는 것으로 결정했습니다.
                                        </p>
                                        <p className="list-type6-item__info">
                                          <Button
                                            elem="a"
                                            url="#!"
                                            label={'홍길동'}
                                            cate={'link-text'}
                                            size={'m'}
                                            color={'body-link'}
                                          />{' '}
                                          <span>2022-02-17 10:38</span>
                                        </p>
                                        <div className="list-type6-item__control">
                                          <Button
                                            label={'수정'}
                                            cate={'ico-only'}
                                            size={'s'}
                                            color={'secondary'}
                                            icoLeft={true}
                                            icoLeftData={icoSvgData.pencil}
                                            icoSize={16}
                                            title="수정"
                                          />
                                          <Button
                                            label={'삭제'}
                                            cate={'ico-only'}
                                            size={'s'}
                                            color={'secondary'}
                                            icoLeft={true}
                                            icoLeftData={icoSvgData.trash}
                                            icoSize={16}
                                            title="삭제"
                                          />
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="list-type6-item__section">
                                        <p className="list-type6-item__text">
                                          기자 3명을 초대해 미팅하는 것으로 결정했습니다.
                                        </p>
                                        <p className="list-type6-item__info">
                                          <Button
                                            elem="a"
                                            url="#!"
                                            label={'홍길동'}
                                            cate={'link-text'}
                                            size={'m'}
                                            color={'body-link'}
                                          />{' '}
                                          <span>2022-02-17 10:38</span>
                                        </p>
                                        <div className="list-type6-item__control">
                                          <Button
                                            label={'수정'}
                                            cate={'ico-only'}
                                            size={'s'}
                                            color={'secondary'}
                                            icoLeft={true}
                                            icoLeftData={icoSvgData.pencil}
                                            icoSize={16}
                                            title="수정"
                                          />
                                          <Button
                                            label={'삭제'}
                                            cate={'ico-only'}
                                            size={'s'}
                                            color={'secondary'}
                                            icoLeft={true}
                                            icoLeftData={icoSvgData.trash}
                                            icoSize={16}
                                            title="삭제"
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>

                                {/* 댓글 버튼이 있을 때 */}
                                <div className="d-tabs-comment__button">
                                  <Button
                                    label={'댓글'}
                                    cate={'default'}
                                    size={'s'}
                                    color={'outline-secondary'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* 이력 없을 때 */}
                      <li>
                        <div className="d-tabs__group">
                          <div className="tabs__section type1-small">
                            <div className="tabs-menu__group">
                              <ul className="tabs-menu__list">
                                <li>
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">댓글</span>
                                    <span className="tabs-menu__number">2 </span>
                                  </button>
                                </li>
                                <li className="is-active">
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">이력</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="tabs-panel__section">
                              <div className="tabs-panel__group">
                                <div className="tabs-panel__group">
                                  <div className="d-tabs__nodata">이 활동에 이력이 없습니다.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* 이력 있을 때 */}
                      <li>
                        <div className="d-tabs__group">
                          <div className="tabs__section type1-small">
                            <div className="tabs-menu__group">
                              <ul className="tabs-menu__list">
                                <li>
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">댓글</span>
                                    <span className="tabs-menu__number">2 </span>
                                  </button>
                                </li>
                                <li className="is-active">
                                  <button
                                    type="button"
                                    className="tabs-menu__btn"
                                  >
                                    <span className="tabs-menu__name">이력</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <div className="tabs-panel__section">
                              <div className="tabs-panel__group">
                                <div className="list-type7__section">
                                  <ul className="interval-mt14">
                                    <li>
                                      <div className="list-type7-item__section">
                                        <p className="list-type7-item__text">
                                          <span className="date">2021-11-30 09:45</span>
                                          <span className="name">
                                            <Button
                                              elem="a"
                                              url="#!"
                                              label={'홍길동'}
                                              cate={'link-text'}
                                              size={'m'}
                                              color={'body-link'}
                                            />
                                          </span>
                                          <span className="history">활동작성</span>
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="list-type7-item__section">
                                        <p className="list-type7-item__text">
                                          <span className="date">2021-11-30 09:45</span>
                                          <span className="name">
                                            <Button
                                              elem="a"
                                              url="#!"
                                              label={'홍길동'}
                                              cate={'link-text'}
                                              size={'m'}
                                              color={'body-link'}
                                            />
                                          </span>
                                          <span className="history">활동 소유자 수정</span>
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="list-type7-item__section">
                                        <p className="list-type7-item__text">
                                          <span className="date">2021-11-30 09:45</span>
                                          <span className="name">
                                            <Button
                                              elem="a"
                                              url="#!"
                                              label={'홍길동'}
                                              cate={'link-text'}
                                              size={'m'}
                                              color={'body-link'}
                                            />
                                          </span>
                                          <span className="history">활동작성</span>
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT2'
