/**
 * @file PJ04.tsx
 * @description PJ04 페이지
 */

import Link from 'next/link'

import ApexChartsBar from '~/publishing/components/common/ui/ApexChartsBar'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import {
  barOptions,
  barSeries,
  lineOptions,
  lineSeries,
  pieOptions1,
  pieOptions2,
  pieSeries1,
  pieSeries2,
} from '~/publishing/components/common/ui/json/chartsData'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 type-project">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="project__section">
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
                            <li className="is-active">
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

              <div className="project__group">
                <ul className="interval-mt12">
                  <li>
                    <div className="project-item__section">
                      <div className="project-item__header">
                        <h5 className="project-item__subtitle">프로젝트 정보</h5>
                      </div>
                      <ul className="grid-col2 type-interval20">
                        <li>
                          <dl className="dl-table-type1__section">
                            <dt>
                              <p className="dl-table-type1__text">모니터링</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">2</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">클립북</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">3</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">보도자료</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">4</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">활동</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">24</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">목록</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">5</p>
                            </dd>
                          </dl>
                        </li>
                        <li>
                          <dl className="dl-table-type1__section">
                            <dt>
                              <p className="dl-table-type1__text">수정자</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">홍길동</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">최종 수정</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">2022-05-18</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">소유자</p>
                            </dt>
                            <dd>
                              <div className="project-item__select">
                                <div className="select__section select-type2-pd">
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
                                <IcoSvg data={icoSvgData.personLineBroken} />
                              </div>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">생성일</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">2021-05-18</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">구분</p>
                            </dt>
                            <dd>
                              <div className="project-item__select">
                                <div className="select__section select-type2-pd">
                                  <button className="select__label">
                                    <span className="select__label-text">비공개</span>
                                    <IcoSvg data={icoSvgData.chevronDown} />
                                  </button>

                                  <div className="select-option__section">
                                    <div className="select-option__area">
                                      <ul className="select-option__group">
                                        <li>
                                          <button className="select-option__item">
                                            <span className="select-option__item-text">비공개</span>
                                          </button>
                                        </li>
                                        <li>
                                          <button className="select-option__item">
                                            <span className="select-option__item-text">공개</span>
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <h4 className="project-item__title">뉴스</h4>
                    <ul className="grid-col2 type-interval12">
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">날짜별 뉴스 건수</h5>
                          </div>
                          <div className="project-item-graph__section">
                            <ApexChartsLine
                              options={lineOptions}
                              series={lineSeries}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">최신 뉴스</h5>
                            <Button
                              elem="a"
                              url={'#!'}
                              label={'전체'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </div>
                          <div className="project-item__table">
                            <div className="table-type3__section">
                              <table>
                                {/* 값에 따라 col width 적용 */}
                                <colgroup>
                                  <col width={'10%'} />
                                  <col width={'*'} />
                                  <col width={'20%'} />
                                </colgroup>

                                <caption>caption</caption>
                                <tbody>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">10-12</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          삼성전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 메모리 개발
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">중앙일보</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">10-12</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          LG생활건강, 숨37° 로시크숨마 엘릭서 트리트먼트·크림 뤼미에르 출시
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">한국인권신문</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">08-15</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          LS전선아시아, 베트남에 해저 케이블 첫 공급
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">주간조선</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">06-17</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          현대자동차 월드랠리팀, 2021 WRC 핀란드 북극 랠리 더블 포디움 달성
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">JTBC</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">04-05</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          무라타의 라이다 기반 시스템, 교통량 모니터링 서비스에 데이터 제공
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">한국경제신문</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p className="table-type3__text color-secondary">02-13</p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#!"
                                        legacyBehavior
                                      >
                                        <a className="table-type3__text color-primary">
                                          호텔 서울드래곤시티, 신선한 봄기운 가득 담아낸 특선 메뉴 ‘셰프 테이스팅
                                          에피소호텔 서울드래곤시티, 신선한 봄기운 가득 담아낸 특선 메뉴 ‘셰프 테이스팅
                                          에피소
                                        </a>
                                      </Link>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">에이블뉴스</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h4 className="project-item__title">뉴스</h4>
                    <div className="project-item__section type-add">
                      <h5 className="project-item__desc">이 프로젝트 관련 뉴스를 추적하려면 모니터링을 추가하세요.</h5>
                      <div className="project-item__button">
                        <Button
                          label={'모니터링 추가'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <h4 className="project-item__title">클립북</h4>
                    <ul className="grid-col2 type-interval12">
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">상위 미디어 뉴스 건수</h5>
                          </div>
                          <div className="project-item-graph__section">
                            <ApexChartsBar
                              options={barOptions}
                              series={barSeries}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">클립북 목록</h5>
                          </div>
                          <div className="project-item__table">
                            <div className="table-type3__section">
                              <table>
                                {/* 값에 따라 col width 적용 */}
                                <colgroup>
                                  <col width={'*'} />
                                  <col width={'20%'} />
                                  <col width={'20%'} />
                                </colgroup>

                                <caption>caption</caption>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">
                                            주요 일간지 정보보안 업계 동향
                                          </a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">240</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">홍길동</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">10-12</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">국회 동향</a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">120</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">황인인</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">10-12</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">정보보안 업계 동향 보고서</a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">120</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">신사동</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">08-15</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">대표이사 신문 보도 모음</a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">240</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">이봉원</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">06-17</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">중소회사 소식 클립북</a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">240</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">홍김전</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">04-05</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="table-type3__flex">
                                        <Link
                                          href="#!"
                                          legacyBehavior
                                        >
                                          <a className="table-type3__text color-primary">
                                            스마트폰 보도자료 배포 결과 보고서
                                          </a>
                                        </Link>
                                        <p className="table-type3__text color-secondary">240</p>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="table-type3__text">박혁거세</p>
                                    </td>
                                    <td>
                                      <p className="table-type3__text color-secondary">2021-02-13</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h4 className="project-item__title">클립북</h4>
                    <div className="project-item__section type-add">
                      <h5 className="project-item__desc">
                        이 프로젝트 관련 뉴스 클립을 관리하려면 클립북을 추가하세요.
                      </h5>
                      <div className="project-item__button">
                        <Button
                          label={'클립북 추가'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <h4 className="project-item__title">활동</h4>
                    <ul className="grid-col2 type-interval12">
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">활동 유형</h5>
                          </div>
                          <div className="project-item-graph__section">
                            <ApexChartsPie
                              options={pieOptions2}
                              series={pieSeries2}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="project-item__section">
                          <div className="project-item__header">
                            <h5 className="project-item__subtitle">활동 상태</h5>
                          </div>
                          <div className="project-item-graph__section">
                            <ApexChartsPie
                              options={pieOptions1}
                              series={pieSeries1}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h4 className="project-item__title">활동</h4>
                    <div className="project-item__section type-add">
                      <h5 className="project-item__desc">
                        이 프로젝트와 관련된 보도자료, 이메일, 약속, 문의, 전화 등을 통합해 관리하려면 활동을
                        추가하세요.
                      </h5>
                      <div className="project-item__button">
                        {/* 위로 펼쳐지게 할 경우, select-show-reverse 추가 */}
                        <div className="select__section select-type1-medium select-type1-button select-show-reverse">
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
                    </div>
                  </li>
                </ul>
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
