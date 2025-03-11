/**
 * @file PJ05.tsx
 * @description PJ05 페이지
 */

import Link from 'next/link'

import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import Tag from '~/publishing/components/common/ui/Tag'
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
                    <li className="is-active">
                      <button
                        type="button"
                        className="tabs-menu__btn"
                      >
                        <span className="tabs-menu__name">뉴스</span>
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
                    <li>
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
                      <div className="search-result__header-title">
                        <h2 className="font-heading--h6">뉴스 검색</h2>
                        <Button
                          label={'검색 수정'}
                          cate={'link-text-arrow'}
                          size={'m'}
                          color={'primary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.chevronLeft}
                        />

                        <div className="search-result__header-buttons">
                          {/* 버튼 검색 저장일 때 */}
                          <Button
                            label={'검색 저장'}
                            cate={'default'}
                            size={'s'}
                            color={'outline-secondary'}
                          />

                          {/* 드롭다운 형태 검색 저장일 때 */}
                          {/* <div className="select__section select-type1-small select-line select-align-right">
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
                      </div> */}
                        </div>
                      </div>
                    </li>
                    <li>
                      {/* 
                        [D] 
                          1. 키워드 마지막 영역에 is-finished 클래스 추가
                               ㄴ 단, 제일 마지막 키워드에선 제거 (ex. 프로젝트명 참고)
                          
                          2. 2줄 이상일 땐 is-only 클래스 삭제
                          3. 2줄 이상일 땐 on/off 버튼 보여지게 => header-tags__button
                      */}
                      <div className="search-result__header-tags">
                        <div className="header-tags__group">
                          <div className="header-tags__tit">분야</div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'반도체'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                          <div className="header-tags__tag is-finished">
                            <Tag
                              label={'디스플레이'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>

                          <div className="header-tags__tit">미디어 유형</div>
                          <div className="header-tags__tag is-finished">
                            <Tag
                              label={'업계신문'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>

                          <div className="header-tags__tit">지역</div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'서울 전체'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'경남 전체'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'전주시'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                          <div className="header-tags__tag is-finished">
                            <Tag
                              label={'부산광역시'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>

                          <div className="header-tags__tit">직종</div>
                          <div className="header-tags__tag is-finished">
                            <Tag
                              label={'기자'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>

                          <div className="header-tags__tit">발행 주기</div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'주간'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                          <div className="header-tags__tag is-finished">
                            <Tag
                              label={'월간'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>

                          <div className="header-tags__tit">프로젝트명</div>
                          <div className="header-tags__tag">
                            <Tag
                              label={'해외 바이어 보도자료 분석'}
                              cate={'n2'}
                              shape={'round'}
                              close={true}
                            />
                          </div>
                        </div>
                        <div className="header-tags__button">
                          <button type="button">
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="search-result__header-sort">
                        <FormInputBtn
                          type="checkbox"
                          name="total1"
                          id="total1"
                          label="2명 / 총 240명"
                        />
                        <div className="header-sort__action">
                          <Button
                            label={'클립북에 저장'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            disabled={true}
                          />
                          <div className="select__section select-type1-small">
                            <button
                              className="select__label"
                              disabled
                            >
                              <span className="select__label-text">수정하기</span>
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </button>

                            <div className="select-option__section">
                              <div className="select-option__area">
                                <ul className="select-option__group">
                                  <li>
                                    <button className="select-option__item">
                                      <span className="select-option__item-text">태그 수정</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button className="select-option__item">
                                      <span className="select-option__item-text">논조 수정</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <Button
                            label={'보고서 만들기'}
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
                        <div className="list-type8__section">
                          <ul className="list-type8__group">
                            {/* 선택 시, is-selected 클래스 추가 */}
                            <li>
                              <div className="list-type8-item__section is-selected">
                                <ul className="list-type8-item__list">
                                  <li className="list-type8-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck800"
                                      id="ck800"
                                      label=""
                                      checked={true}
                                    />
                                  </li>
                                  <li className="list-type8-item__contents">
                                    <ul className="interval-mt8">
                                      <li>
                                        <div className="list-type8-item__header">
                                          <div className="list-type8-item-header__ico">
                                            <IcoSvg data={icoSvgData.videoPlay} />
                                            <IcoSvg data={icoSvgData.image} />
                                          </div>
                                          <Link
                                            href="#!"
                                            legacyBehavior
                                          >
                                            <a
                                              target="_self"
                                              className="list-type8-item-header__title"
                                            >
                                              <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5
                                              소프트웨어 개발
                                            </a>
                                          </Link>
                                        </div>
                                      </li>
                                      <li>
                                        <ul className="list-type8-item__info">
                                          <li>
                                            <p className="font-body__regular">2021-10-12 14:30</p>
                                            <ul className="list-type8-item__links">
                                              <li>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'중앙일보'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                              <li>
                                                <span className="list-type8-item__text">저자</span>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'홍길동'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            <p className="font-body__regular">미디어 가치: 62,510</p>
                                            <p className="list-type8-item__text-group">
                                              <span className="list-type8-item__text">논조:</span>
                                              <span className="list-type8-item__text">중립</span>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="list-type8-item__desc">
                                          <b className="print">삼성</b>전자는 지난해 9월 발표한 신 환경경영전략을
                                          바탕으로 소재부터 생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별
                                          친환경 노력을 전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번
                                          강조한다. <b className="print">삼성</b>전자의 친환경 상업용 디스플레이 제품을
                                          사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다.
                                          이를 위해 △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management)
                                          기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type8-item__section">
                                <ul className="list-type8-item__list">
                                  <li className="list-type8-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck801"
                                      id="ck801"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type8-item__contents">
                                    <ul className="interval-mt8">
                                      <li>
                                        <div className="list-type8-item__header">
                                          <div className="list-type8-item-header__ico">
                                            {/* <IcoSvg data={icoSvgData.videoPlay} /> */}
                                            <IcoSvg data={icoSvgData.image} />
                                          </div>
                                          <Link
                                            href="#!"
                                            legacyBehavior
                                          >
                                            <a
                                              target="_self"
                                              className="list-type8-item-header__title"
                                            >
                                              기아자동차, ‘2021 베이징 국제모터쇼’ 참가해 전동화 사업 체제 전환과 Z세대
                                              공략 중국 내 중장기 전략과 비전 발표
                                            </a>
                                          </Link>
                                        </div>
                                      </li>
                                      <li>
                                        <ul className="list-type8-item__info">
                                          <li>
                                            <p className="font-body__regular">2021-10-12 14:30</p>
                                            <ul className="list-type8-item__links">
                                              <li>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'중앙일보'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                              <li>
                                                <span className="list-type8-item__text">저자</span>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'홍길동'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            <p className="font-body__regular">미디어 가치: 62,510</p>
                                            <p className="list-type8-item__text-group">
                                              <span className="list-type8-item__text">논조:</span>
                                              <span className="list-type8-item__text">중립</span>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="list-type8-item__desc">
                                          <b className="print">삼성</b>전자는 지난해 9월 발표한 신 환경경영전략을
                                          바탕으로 소재부터 생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별
                                          친환경 노력을 전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번
                                          강조한다. <b className="print">삼성</b>전자의 친환경 상업용 디스플레이 제품을
                                          사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다.
                                          이를 위해 △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management)
                                          기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type8-item__section">
                                <ul className="list-type8-item__list">
                                  <li className="list-type8-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck802"
                                      id="ck802"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type8-item__contents">
                                    <ul className="interval-mt8">
                                      <li>
                                        <div className="list-type8-item__header">
                                          {/* <div className="search-type8-item-header__ico">
                            <IcoSvg data={icoSvgData.videoPlay} />
                            <IcoSvg data={icoSvgData.image} />
                          </div> */}
                                          <Link
                                            href="#!"
                                            legacyBehavior
                                          >
                                            <a
                                              target="_self"
                                              className="list-type8-item-header__title"
                                            >
                                              LG화학, 국내 최대 규모 석유화학 전문 ‘오산 테크센터’ 신축
                                            </a>
                                          </Link>
                                        </div>
                                      </li>
                                      <li>
                                        <ul className="list-type8-item__info">
                                          <li>
                                            <p className="font-body__regular">2021-10-12 14:30</p>
                                            <ul className="list-type8-item__links">
                                              <li>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'중앙일보'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                              <li>
                                                <span className="list-type8-item__text">저자</span>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'홍길동'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            <p className="font-body__regular">미디어 가치: 62,510</p>
                                            <p className="list-type8-item__text-group">
                                              <span className="list-type8-item__text">논조:</span>
                                              <span className="list-type8-item__text">중립</span>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="list-type8-item__desc">
                                          삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터
                                          생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경 노력을
                                          전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다.
                                          삼성전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화
                                          대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트
                                          사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
                                          ‘매직인포(MagicINFO)' 솔루션을 소개한다. 삼성전자는 지난해 9월 발표한 신
                                          환경경영전략을 바탕으로 소재부터 생산·포장·사용·폐기까지 제품 생애주기(Product
                                          Life Cycle)별 친환경 노력을 전시장 전면에 소개하며, 지속 가능한 미래를 위한
                                          비전을 다시 한번 강조한다. 삼성전자의 친환경 상업용 디스플레이 제품을
                                          사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다.
                                          이를 위해 △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management)
                                          기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type8-item__section">
                                <ul className="list-type8-item__list">
                                  <li className="list-type8-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck803"
                                      id="ck803"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type8-item__contents">
                                    <ul className="interval-mt8">
                                      <li>
                                        <div className="list-type8-item__header">
                                          <div className="list-type8-item-header__ico">
                                            <IcoSvg data={icoSvgData.videoPlay} />
                                            <IcoSvg data={icoSvgData.image} />
                                          </div>
                                          <Link
                                            href="#!"
                                            legacyBehavior
                                          >
                                            <a
                                              target="_self"
                                              className="list-type8-item-header__title"
                                            >
                                              <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5
                                              소프트웨어 개발
                                            </a>
                                          </Link>
                                        </div>
                                      </li>
                                      <li>
                                        <ul className="list-type8-item__info">
                                          <li>
                                            <p className="font-body__regular">2021-10-12 14:30</p>
                                            <ul className="list-type8-item__links">
                                              <li>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'중앙일보'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                              <li>
                                                <span className="list-type8-item__text">저자</span>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'홍길동'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            <p className="font-body__regular">미디어 가치: 62,510</p>
                                            <p className="list-type8-item__text-group">
                                              <span className="list-type8-item__text">논조:</span>
                                              <span className="list-type8-item__text">중립</span>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="list-type8-item__desc">
                                          삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터
                                          생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경 노력을
                                          전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다.
                                          삼성전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화
                                          대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트
                                          사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
                                          ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="list-type8-item__section">
                                <ul className="list-type8-item__list">
                                  <li className="list-type8-item__check">
                                    <FormInputBtn
                                      type="checkbox"
                                      name="ck803"
                                      id="ck803"
                                      label=""
                                    />
                                  </li>
                                  <li className="list-type8-item__contents">
                                    <ul className="interval-mt8">
                                      <li>
                                        <div className="list-type8-item__header">
                                          <div className="list-type8-item-header__ico">
                                            <IcoSvg data={icoSvgData.videoPlay} />
                                            <IcoSvg data={icoSvgData.image} />
                                          </div>
                                          <Link
                                            href="#!"
                                            legacyBehavior
                                          >
                                            <a
                                              target="_self"
                                              className="list-type8-item-header__title"
                                            >
                                              <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5
                                              소프트웨어 개발
                                            </a>
                                          </Link>

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
                                        </div>
                                      </li>
                                      <li>
                                        <ul className="list-type8-item__info">
                                          <li>
                                            <p className="font-body__regular">2021-10-12 14:30</p>
                                            <ul className="list-type8-item__links">
                                              <li>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'중앙일보'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                              <li>
                                                <span className="list-type8-item__text">저자</span>
                                                <Button
                                                  elem="a"
                                                  url={'#!'}
                                                  label={'홍길동'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-text'}
                                                />
                                              </li>
                                            </ul>
                                          </li>
                                          <li>
                                            <p className="font-body__regular">미디어 가치: 62,510</p>
                                            <p className="list-type8-item__text-group">
                                              <span className="list-type8-item__text">논조:</span>
                                              <span className="list-type8-item__text">중립</span>
                                            </p>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="list-type8-item__desc">
                                          삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터
                                          생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경 노력을
                                          전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다.
                                          삼성전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화
                                          대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트
                                          사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
                                          ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                                        </div>
                                      </li>
                                    </ul>
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
          <div className="mb-aside__section type-w2">
            <div className="aside-monitoring__section">
              <ul className="interval-mt28">
                <li>
                  <ul className="interval-mt20">
                    <li>
                      <div className="aside-monitoring__header">
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
                      <ul className="interval-mt16">
                        <li>
                          <ul className="interval-mt8">
                            <li>
                              <p className="font-body__regular">2023년 03월 12일 14:30</p>
                            </li>
                            <li>
                              <h3 className="aside-monitoring__title">
                                <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어 개발
                                전략과 비전 발표
                              </h3>
                            </li>
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
                                label={'웹사이트'}
                                cate={'default'}
                                size={'m'}
                                color={'primary'}
                              />
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="aside-monitoring-table__title">분석</p>
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">미디어 가치</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">62,510</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">논조</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">중립</p>
                    </dd>
                    <dt>
                      <div className="dl-table-type1__tooltip">
                        <p className="dl-table-type1__text">연관도</p>
                        <Tooltips
                          tooltipId={'tt10-4'}
                          tooltipPlace={'top'}
                          tooltipHtml={
                            '정의한 키워드가 뉴스에서 언급된 <br />횟수를 기준으로 뉴스를 분류하는 <br />방법입니다. <br />키워드 검색 조건을 입력했을때만 <br />분석할 수 있습니다.'
                          }
                          tooltipComponent={<IcoTooltip />}
                        />
                      </div>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">높음</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">글자수</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">1,345</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">사진</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">1</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">영상</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text type-link">-</p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <p className="aside-monitoring-table__title">내용</p>
                  <div className="import-info__group">
                    <div className="import-info__contents">컨텐츠 내용</div>
                  </div>
                </li>
                <li>
                  <p className="aside-monitoring-table__title">태그</p>
                  <div className="tags__section">
                    <ul className="tags__list">
                      <li>
                        <Tag
                          label={'태그1'}
                          cate={'n2'}
                          shape={'round'}
                        />
                      </li>
                      <li>
                        <Tag
                          label={'태그2'}
                          cate={'n2'}
                          shape={'round'}
                        />
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
