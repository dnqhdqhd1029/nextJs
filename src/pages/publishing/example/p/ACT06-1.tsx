/**
 * @file ACT06-1.tsx
 * @description ACT06-1 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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

              <div className="aside-activity__section">
                <ul className="interval-mt20">
                  <li>
                    <h6 className="activity-detail__title">
                      {/* IcoSvg는 상황에 따라 아이콘 변경 */}
                      <IcoSvg data={icoSvgData.envelope} />
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
                                  <ul className="d-state__section">
                                    <li>
                                      <div className="d-state__group">
                                        <p className="dl-table-type1__text">예약(2022-06-24 10:30)</p>
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">상태</p>
                                </dt>
                                <dd>
                                  <ul className="d-state__section">
                                    <li>
                                      <div className="d-state__group type-complete">
                                        <p className="dl-table-type1__text">발송 완료</p>
                                      </div>
                                    </li>
                                  </ul>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">상태</p>
                                </dt>
                                <dd>
                                  <ul className="d-state__section">
                                    <li>
                                      <div className="d-state__group">
                                        <p className="dl-table-type1__text">발송대기</p>
                                      </div>
                                    </li>
                                    <li>
                                      <p className="dl-table-type1__text">발송 준비중입니다.</p>
                                    </li>
                                    <li>
                                      <Button
                                        label={'발송 취소'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </li>
                                  </ul>
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
                                  <div className="accordion-type3__group">
                                    <div className="accordion-type3-button__group">
                                      <span className="accordion-type3__label">
                                        240명(중복 3명, 수신거부 2명, 발송차단 3명 제외)
                                      </span>
                                      <button className="accordion-type3__button">
                                        <span className="accordion-type3__button-txt">자세히보기</span>
                                        <span className="accordion-type3__button-ico">
                                          <IcoSvg data={icoSvgData.chevronDown} />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="accordion-type3-panel__group">
                                      <ul className="accordion-type3-panel__list">
                                        <li>
                                          <p className="font-body__regular">
                                            언론인 목록: <Link href="#!">여성잡지 기자명단</Link>
                                            120명, <Link href="#!">10대 일간지 IT기자 명단</Link> 64명
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            미디어 목록: <Link href="#!">정보보안 미디어</Link> 20개(이메일 5개)
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            언론인: <Link href="#!">서정민</Link> 중앙일보 외 1명
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            미디어: <Link href="#!">여성중앙</Link>
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">메일 추가: abcd1234@gmail.com</p>
                                        </li>
                                      </ul>
                                      <div className="me-send-email__group">
                                        <IcoSvg data={icoSvgData.checkLg} />
                                        <p className="me-send-email__text">나에게도 보내기</p>
                                      </div>
                                    </div>
                                  </div>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">받는 사람</p>
                                </dt>
                                <dd>
                                  <div className="accordion-type3__group is-opened">
                                    <div className="accordion-type3-button__group">
                                      <span className="accordion-type3__label">
                                        240명(중복 3명, 수신거부 2명, 발송차단 3명 제외)
                                      </span>
                                      <button className="accordion-type3__button">
                                        <span className="accordion-type3__button-txt">자세히보기</span>
                                        <span className="accordion-type3__button-ico">
                                          <IcoSvg data={icoSvgData.chevronDown} />
                                        </span>
                                      </button>
                                    </div>
                                    <div className="accordion-type3-panel__group">
                                      <ul className="accordion-type3-panel__list">
                                        <li>
                                          <p className="font-body__regular">
                                            언론인 목록: <Link href="#!">여성잡지 기자명단</Link>
                                            120명, <Link href="#!">10대 일간지 IT기자 명단</Link> 64명
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            미디어 목록: <Link href="#!">정보보안 미디어</Link> 20개(이메일 5개)
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            언론인: <Link href="#!">서정민</Link> 중앙일보 외 1명
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">
                                            미디어: <Link href="#!">여성중앙</Link>
                                          </p>
                                        </li>
                                        <li>
                                          <p className="font-body__regular">메일 추가: abcd1234@gmail.com</p>
                                        </li>
                                      </ul>
                                      <div className="me-send-email__group">
                                        <IcoSvg data={icoSvgData.checkLg} />
                                        <p className="me-send-email__text">나에게도 보내기</p>
                                      </div>
                                    </div>
                                  </div>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">소유자</p>
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
                                  <p className="dl-table-type1__text">-</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">생성일</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">2022-02-16 12:05</p>
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

                        {/* 내용 */}
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
                                      <span className="tabs-menu__name">내용</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">발송 상태</span>
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">댓글</span>
                                      <span className="tabs-menu__number">2</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="tabs-panel__section">
                                <div className="tabs-panel__group">
                                  <div className="import-info__group">
                                    <div className="import-info__contents">컨텐츠 영역</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* 발송 상태 */}
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
                                  <li className="is-active">
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">발송 상태</span>
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">댓글</span>
                                      <span className="tabs-menu__number">2</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="tabs-panel__section">
                                <div className="tabs-panel__group">
                                  <ul className="interval-mt20">
                                    <li>
                                      <p className="check-text__group">
                                        <IcoSvg data={icoSvgData.checkLg} />
                                        <span className="check-text__text">통계 수집 완료 2021-03-26 10:50</span>
                                      </p>
                                    </li>
                                    <li>
                                      <div className="table-type2__section">
                                        <table>
                                          <caption>caption</caption>
                                          <thead>
                                            <tr>
                                              <th scope="col">총 발송</th>
                                              <th scope="col">성공</th>
                                              <th scope="col">오픈</th>
                                              <th scope="col">
                                                <FormTitle
                                                  title="클릭"
                                                  tooltip={true}
                                                >
                                                  <Tooltips
                                                    tooltipId={'tt1-1'}
                                                    tooltipPlace={'top'}
                                                    tooltipHtml={'클릭 툴팁 내용'}
                                                    tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                                                  />
                                                </FormTitle>
                                              </th>
                                              <th scope="col">
                                                <FormTitle
                                                  title="수신거부"
                                                  tooltip={true}
                                                >
                                                  <Tooltips
                                                    tooltipId={'tt1-1'}
                                                    tooltipPlace={'top'}
                                                    tooltipHtml={'수신거부 툴팁 내용'}
                                                    tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                                                  />
                                                </FormTitle>
                                              </th>
                                              <th scope="col">반송</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>425</td>
                                              <td>421</td>
                                              <td>120</td>
                                              <td>20</td>
                                              <td>20</td>
                                              <td>2</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="table-type1__section">
                                        <table>
                                          <caption>caption</caption>
                                          <thead>
                                            <tr>
                                              <th scope="col">받는사람</th>
                                              <th scope="col">보낸시간</th>
                                              <th scope="col">상태</th>
                                              <th scope="col">오픈</th>
                                              <th scope="col">클릭</th>
                                              <th scope="col">거부</th>
                                              <th scope="col">반송</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <Button
                                                  elem="a"
                                                  url="#!"
                                                  label={'한국경제 서정민'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-link'}
                                                />
                                              </td>
                                              <td>03-26 11:30</td>
                                              <td>성공</td>
                                              <td>
                                                <IcoSvg data={icoSvgData.checkThick} />
                                              </td>
                                              <td>
                                                <IcoSvg data={icoSvgData.checkThick} />
                                              </td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <Button
                                                  elem="a"
                                                  url="#!"
                                                  label={'한국경제 이훈성'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-link'}
                                                />
                                              </td>
                                              <td>03-26 11:30</td>
                                              <td>반송</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>
                                                <IcoSvg data={icoSvgData.checkThick} />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <Button
                                                  elem="a"
                                                  url="#!"
                                                  label={'hong@google.com'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-link'}
                                                />
                                              </td>
                                              <td>03-26 11:30</td>
                                              <td>거부</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>
                                                <IcoSvg data={icoSvgData.checkThick} />
                                              </td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                            </tr>
                                            <tr>
                                              <td>홍길동</td>
                                              <td>03-26 11:30</td>
                                              <td>-</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <Button
                                                  elem="a"
                                                  url="#!"
                                                  label={'장지승'}
                                                  cate={'link-text'}
                                                  size={'m'}
                                                  color={'body-link'}
                                                />
                                              </td>
                                              <td>03-26 11:30</td>
                                              <td>-</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                              <td>{/* <IcoSvg data={icoSvgData.checkThick} /> */}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* 이력 */}
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">발송 상태</span>
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">댓글</span>
                                      <span className="tabs-menu__number">2</span>
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

                        {/* 댓글 */}
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">발송 상태</span>
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
                                  <li className="is-active">
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">댓글</span>
                                      <span className="tabs-menu__number">2</span>
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
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
