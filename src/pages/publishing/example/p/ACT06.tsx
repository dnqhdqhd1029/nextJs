/**
 * @file ACT06.tsx
 * @description ACT06 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp3.jpg'
import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import IcoSymbol from '~/publishing/components/common/ui/IcoSymbol'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1">
          <LnbFilter />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="search-result__header">
                <ul className="interval-mt10">
                  <li>
                    <div className="search-result-type2__header">
                      <h2 className="s-header__title">활동</h2>
                      <ul className="s-header__control">
                        <li className="button">
                          <div className="select__section select-type1-small select-line select-align-right">
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
                        </li>
                      </ul>
                    </div>
                  </li>
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
                          label={'프로젝트 수정'}
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
            <ul className="interval-mt20">
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
                <h6 className="activity-detail__title">
                  ‘삼성 갤럭시 언팩 2021’ 행사에 미디어와 파트너사 담당자분들을 초대합니다.
                </h6>
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
                              <p className="dl-table-type1__text">이메일</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">상태</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">발송 완료(01-20 10:30)</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">보낸 사람</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">홍길동</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">받는 사람</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">240명(중복 3명, 수신거부 2명 제외)</p>
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
                          </dl>
                        </li>
                        <li>
                          <dl className="dl-table-type1__section">
                            <dt>
                              <p className="dl-table-type1__text">발송일</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">01-20 10:30</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">생성일</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">01-20 10:30</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">수정일</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">01-17 16:50</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">공유</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">수정</p>
                            </dd>
                            {/* <dt>
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
                            </dd> */}
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
                    {/* <li>
                      <div className="import-info__group">
                        <h6 className="import-info__title">내용</h6>
                        <div className="import-info__contents">컨텐츠 영역</div>
                      </div>
                    </li> */}
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
                                  <span className="tabs-menu__name">내용</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="tabs-panel__section">
                            <div className="tabs-panel__group">
                              <dl className="dl-table-type1__section wide-gap">
                                <dt>
                                  <p className="dl-table-type1__text">본문</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    삼성전자가 ‘삼성 갤럭시 언팩 2021(Galaxy Unpacked: Welcome to the Everyday Epic)’
                                    행사를 개최합니다.
                                    <br />
                                    갤럭시 언팩을 통해 모바일이 중심이 된 세상에서 제품이 어떤 역량을 구현할 수 있을지에
                                    대해 삼성만의 기준을 제시하고자 합니다.
                                    <br />
                                    주요 미디어의 담당 기자님들과 파트너사 담당자분들은 언팩 행사에 참석해 자리를
                                    빛내주시기 바랍니다.
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">첨부</p>
                                </dt>
                                <dd>
                                  <ul>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

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
                                  <span className="tabs-menu__name">내용</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="tabs-panel__section">
                            <div className="tabs-panel__group">
                              <dl className="dl-table-type1__section wide-gap">
                                <dt>
                                  <p className="dl-table-type1__text">제목</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__title">
                                    [보도자료] 삼성 갤럭시 언팩 2025 행사에 미디어와 파트너사 담당자분들을 초대합니다.
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">본문</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    삼성전자가 ‘삼성 갤럭시 언팩 2021(Galaxy Unpacked: Welcome to the Everyday Epic)’
                                    행사를 개최합니다.
                                    <br />
                                    갤럭시 언팩을 통해 모바일이 중심이 된 세상에서 제품이 어떤 역량을 구현할 수 있을지에
                                    대해 삼성만의 기준을 제시하고자 합니다.
                                    <br />
                                    주요 미디어의 담당 기자님들과 파트너사 담당자분들은 언팩 행사에 참석해 자리를
                                    빛내주시기 바랍니다.
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">첨부</p>
                                </dt>
                                <dd>
                                  <ul>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

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
                                  <span className="tabs-menu__name">내용</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="tabs-panel__section">
                            <div className="tabs-panel__group">
                              <dl className="dl-table-type1__section wide-gap">
                                <dt>
                                  <p className="dl-table-type1__text">제목</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__title">
                                    [보도자료] 삼성 갤럭시 언팩 2025 행사에 미디어와 파트너사 담당자분들을 초대합니다.
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">부제목</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">삼성 브랜드 데이 '삼성 갤럭시 언팩 2025'</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">본문</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    삼성전자가 ‘삼성 갤럭시 언팩 2021(Galaxy Unpacked: Welcome to the Everyday Epic)’
                                    행사를 개최합니다.
                                    <br />
                                    갤럭시 언팩을 통해 모바일이 중심이 된 세상에서 제품이 어떤 역량을 구현할 수 있을지에
                                    대해 삼성만의 기준을 제시하고자 합니다.
                                    <br />
                                    주요 미디어의 담당 기자님들과 파트너사 담당자분들은 언팩 행사에 참석해 자리를
                                    빛내주시기 바랍니다.
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">언론 연락처</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    삼성전자자
                                    <br />
                                    브랜드 전략팀 드림림
                                    <br />
                                    02-3096-2098
                                  </p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">이미지</p>
                                </dt>
                                <dd>
                                  <ul className="distribute-media__list">
                                    <li>
                                      <div className="distribute-media__item">
                                        <div className="distribute-media-item__thumb">
                                          <Image
                                            src={tempImg}
                                            width={640}
                                            height={458}
                                            alt="temp 이미지"
                                          />
                                        </div>
                                        <p className="distribute-media-item__desc">
                                          삼성전자가 2021 에코패키지 챌린지 공모전을 소개하고 있다.
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="distribute-media__item">
                                        <div className="distribute-media-item__thumb">
                                          <Image
                                            src={tempImg}
                                            width={640}
                                            height={458}
                                            alt="temp 이미지"
                                          />
                                        </div>
                                        <p className="distribute-media-item__desc">
                                          삼성 갤럭시 언팩 2025 전시 컨벤션 전경
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">유튜브 URL</p>
                                </dt>
                                <dd>
                                  <ul>
                                    <li>
                                      <div className="distribute-media__item">
                                        <div className="distribute-media-item__thumb type-movie">
                                          {/* <IcoAvatar
                                            label={'유튜브 썸네일'}
                                            icoData={icoSvgData.playCircleFill}
                                            size={'s48'}
                                            icoSize={'s48'}
                                          /> */}
                                          <div className="distribute-media-item__ico">
                                            <IcoSvg data={icoSvgData.playCircleFill} />
                                          </div>
                                          <Image
                                            src={'/public/assets/png/temp4.jpg'}
                                            width={640}
                                            height={458}
                                            alt="temp 이미지"
                                          />
                                        </div>
                                        <p className="distribute-media-item__desc">
                                          삼성 갤럭시 언팩 2025 인트로 영상 50초
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                              </dl>
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
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
