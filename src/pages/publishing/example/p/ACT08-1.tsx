/**
 * @file ACT06-1.tsx
 * @description ACT06-1 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import { IcoClipboard2Data02, IcoFileEarmarkText02, IcoSendCheck02 } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">배포 절차</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="tabs-panel__section">
                                <div className="tabs-panel__group">
                                  <div className="import-info__group">
                                    <div className="import-info__contents">
                                      <div className="import-info__contents-title">
                                        LS일렉트릭, 스마트 솔루션 앞세워 ‘전력 슈퍼사이클’ 주도권 고삐
                                      </div>
                                      <div className="activity-contents__group">
                                        <div className="activity-contents__subtitle">
                                          <p>12일부터 사흘간 코엑스서 국내 최대 전력·에너지 전시회 ‘ELECS 2025’ 참가</p>
                                          <p> 국내 유일UL 전력기기·직류 전력솔루션·차세대 ESS 등 전략 제품 대거 공개</p>
                                        </div>
                                        <div className="activity-contents__contents">
                                          <p>
                                            안양--(뉴스와이어)--LS ELECTRIC (일렉트릭)이 AI데이터센터 맞춤형 패키지
                                            솔루션 등 차세대 전력 제품을 대거 공개하고 전력 슈퍼사이클 시대 주도권
                                            잡기에 나섰다.
                                          </p>
                                          <p>
                                            LS일렉트릭은 12일부터 14일까지 3일 간 서울 삼성동 코엑스에서 열리는 국내
                                            최대 규모 스마트 전력·에너지 전시회 ‘일렉스 코리아 2025’(Electric Energy
                                            Conference & Show)와 ‘코리아스마트그리드엑스포 2025’에 동시 참가한다고
                                            밝혔다.
                                          </p>
                                          <p>
                                            LS일렉트릭은 참가 기업 중 최대 규모인 50부스(450㎡) 전시 공간에 ‘고객을 향한
                                            무한 혁신과 지속가능한 미래’(To Infinity and Beyond)를 주제로
                                            △AI데이터센터솔루션 △탄소제로에너지 △스마트팩토리 등 5개 존(ZONE)을
                                            구성하고, 차세대 스마트 전력 사업을 이끌어 갈 전략 솔루션과 글로벌 사업
                                            전략을 대거 선보인다.
                                          </p>
                                          <p>
                                            구자균 LS일렉트릭 회장은 “그간 해외 시장을 겨냥한 차세대 스마트 솔루션
                                            개발과 시장 개척에 선도적으로 나선 결과 미국을 중심으로 글로벌 사업에서
                                            가시적 성과가 창출되고 있다”며 “세계 최고 수준의 제품에 AI·디지털 기술을
                                            더해 K-일렉트릭 대표 기업으로서 세계적 전력 슈퍼사이클 시대에 확실히
                                            주도권을 잡을 것”이라고 말했다.
                                          </p>
                                          <p>웹사이트: http://www.ls-electric.com</p>
                                          <div className="activity-contents__picture">
                                            <img
                                              src="\assets\png\temp3.jpg"
                                              alt=""
                                            />
                                            <div className="activity-contents__picture--desc">
                                              삼성 갤럭시 언팩 2025 전시 컨벤션 전경
                                            </div>
                                          </div>
                                          <div className="activity-contents__youtube">
                                            <p className="youtube-play__ico">
                                              {/* <span className="hidden">Play</span> */}
                                              <IcoSvg data={icoSvgData.playCircleFill} />
                                            </p>
                                            <img
                                              src="https://i.ytimg.com/vi/TDNeWMHUZo4/maxresdefault.jpg"
                                              alt=""
                                            />
                                            <div className="activity-contents__youtube--desc">
                                              신형 싼타페 월드 프리미어 영상
                                            </div>
                                          </div>
                                          <div className="activity-contents__contacts">
                                            <div className="activity-contents__contacts--title">연락처</div>
                                            <p>문의</p>
                                            <p>삼성전자</p>
                                            <p>브랜드 전략팀</p>
                                            <p>02-3096-2098</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">배포 절차</span>
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
                                  <li>
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">배포 절차</span>
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

                        {/* 배포 절차 */}
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
                                  <li className="is-active">
                                    <button
                                      type="button"
                                      className="tabs-menu__btn"
                                    >
                                      <span className="tabs-menu__name">배포 절차</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="tabs-panel__section">
                                <div className="tabs-panel__group">
                                  <ul className="interval-mt20">
                                    <li>
                                      <p className="font-body__regular">
                                        등록한 보도자료의 배포는 뉴스와이어에서 다음과 같은 절차로 진행됩니다.
                                      </p>
                                    </li>
                                    <li>
                                      <div className="activity-distribute__group">
                                        <ul className="activity-distribute__steps">
                                          <li>
                                            <div className="activity-distribute__item">
                                              <div className="distribute-item__ico">
                                                <IcoFileEarmarkText02 />
                                              </div>
                                              <div className="distribute-item__name">검수</div>
                                              <div className="distribute-item__desc">
                                                <p>
                                                  등록한 보도자료가 뉴스 가치 있고 오류가 없으면 뉴스와이어에 게재하고
                                                  메시지로 알려드립니다.
                                                </p>
                                                <p>
                                                  문법이나 문맥에 오류가 있는 경우, 수정합니다. 사소한 수정은 회원님과
                                                  상의하지 않지만, 중요한 내용에 손을 대야 하는 경우 사전 협의를 하거나
                                                  수정 후 컨펌을 요청합니다.
                                                </p>
                                                <p>
                                                  등록한 보도자료가 편집 가이드라인에 부합하지 않으면 반려합니다.
                                                  반려하면 쿠폰은 차감하지 않습니다.
                                                </p>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="activity-distribute__item">
                                              <div className="distribute-item__ico">
                                                <IcoSendCheck02 />
                                              </div>
                                              <div className="distribute-item__name">배포</div>
                                              <div className="distribute-item__desc">
                                                <p>
                                                  스탠다드, 프리미엄 서비스를 이용하는 보도자료는 기자와 편집국에
                                                  보도자료를 직접 메일로 전송합니다. 따라서 기자가 근무하는 평일에
                                                  배포하며, 휴일에는 배포할 수 없습니다.
                                                </p>
                                                <p>
                                                  뉴스와이어에 게재된 보도자료는 매일 09:30 11:30 14:30 16:00에 언론인
                                                  등 회원에게 이메일로 발송하는 MY뉴스에 노출됩니다.
                                                </p>
                                                <p>16:00 이후 게재된 보도자료는 다음날 MY뉴스에 노출됩니다.</p>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="activity-distribute__item">
                                              <div className="distribute-item__ico">
                                                <IcoClipboard2Data02 />
                                              </div>
                                              <div className="distribute-item__name">결과 보고서</div>
                                              <div className="distribute-item__desc">
                                                <p>
                                                  스탠다드 이상 서비스는 [no19]개 매체를 모니터링해 기사화된 뉴스와 소셜
                                                  공유 현황을 결과 보고서로 제공합니다.
                                                </p>
                                                <p>
                                                  보고서가 완성되면 48시간(휴일 제외) 뒤 보고서가 완성됐다고 회원님에게
                                                  메일로 알려드립니다. 회원님은 보도자료 관리 페이지에서 보고서를
                                                  다운로드 할 수 있습니다.
                                                </p>
                                                <p>
                                                  베이직 보고서는 제휴 미디어에 노출된 전문만 제공되며, 자동 생성되므로
                                                  게재 직후 볼 수 있습니다.
                                                </p>
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
