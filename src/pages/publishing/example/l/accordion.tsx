/**
 * @file accordion.tsx
 * @description accordion 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">accordion</h2>

        <code className="guide__code">1. 오픈 : is-opened</code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">accordion-type1 기본 - 닫힘</h2>
          <div className="guide__group">
            <div className="accordion-type1__group">
              <button className="accordion-type1__btn">
                <span className="accordion-type1__btn-txt">언론인</span>
                <span className="accordion-type1__btn-ico">
                  <IcoSvg data={icoSvgData.chevronDown} />
                </span>
              </button>
              <div className="accordion-type1-panel__group">
                <div className="accordion-type1-panel__search">
                  <FormInputSearch placeholder={'검색'} />
                </div>
                <ul className="accordion-type1-panel__option-list">
                  {/* 선택 시, is-selected */}
                  <li className="is-selected">
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>주요 일간지 정보보안 담당기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>국회 출입 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>경제/경영 잡지 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>영자지 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>인터넷/소셜미디어/쇼핑/인플루언서/블록체인/암호화폐/인공지능 분야 전체</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>패션/뷰티/푸드 잡지 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>주식/증권 전문 미디어</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>암호화폐 보도 전문</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>종합 일간지 주요 데스크</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>AI/딥러닝 전문 기자</span>
                    </button>
                  </li>
                  <li>
                    <button className="accordion-type1-panel__option-item">
                      <span>더보기</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h2
            className="guide__item--title"
            style={{ marginTop: '30px' }}
          >
            accordion-type1 기본 - 열림
          </h2>
          <div className="guide__group">
            <div className="accordion-type1__group is-opened">
              <button className="accordion-type1__btn">
                <span className="accordion-type1__btn-txt">언론인</span>
                <span className="accordion-type1__btn-ico">
                  <IcoSvg data={icoSvgData.chevronDown} />
                </span>
              </button>
              <div className="accordion-type1-panel__group">
                <div className="accordion-type1-panel__search">
                  <FormInputSearch placeholder={'검색'} />
                </div>
                <ul className="accordion-type1-panel__option-list">
                  {/* 선택 시, is-selected */}
                  <li className="is-selected">
                    <span className="accordion-type1-panel__option-bell">
                      <IcoSvg data={icoSvgData.bell} />
                    </span>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>주요 일간지 정보보안 담당기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>국회 출입 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>경제/경영 잡지 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>영자지 기자</span>
                    </button>
                  </li>
                  <li>
                    <span className="accordion-type1-panel__option-bell">
                      <IcoSvg data={icoSvgData.bell} />
                    </span>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>인터넷/소셜미디어/쇼핑/인플루언서/블록체인/암호화폐/인공지능 분야 전체</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>패션/뷰티/푸드 잡지 기자</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>주식/증권 전문 미디어</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>암호화폐 보도 전문</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>종합 일간지 주요 데스크</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="accordion-type1-panel__option-delete"
                      title="삭제"
                    >
                      <IcoSvg data={icoSvgData.trash} />
                    </button>
                    <button className="accordion-type1-panel__option-item">
                      <span>AI/딥러닝 전문 기자</span>
                    </button>
                  </li>
                  <li>
                    <button className="accordion-type1-panel__option-item">
                      <span>더보기</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">accordion-type2 기본 - 닫힘</h2>
          <div className="guide__group">
            <div className="accordion-type2__group">
              <button className="accordion-type2__btn">
                <span className="accordion-type2__btn-txt">검색된 뉴스 3개</span>
                <span className="accordion-type2__btn-ico">
                  <IcoSvg data={icoSvgData.chevronDown} />
                </span>
              </button>
              <div className="accordion-type2-panel__group">
                <ul className="interval-mt14">
                  <li>
                    <div className="list-type1__section">
                      <ul className="list-type1__group before-none">
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li data-year="2022">
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'메가존, 클라우드 MSP사업자로 성장…원스탑 토탈 서비스 제공'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>클립북 홍길동 05-18</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'중앙일보 서정민 전화 통화'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>전화 완료 홍길동 04-27</p>
                            </div>
                          </div>
                        </li>
                        <li data-year="2021">
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="list-type1__footer">
                      <Button
                        label={'더보기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h2
            className="guide__item--title"
            style={{ marginTop: '30px' }}
          >
            accordion-type2 기본 - 열림
          </h2>
          <div className="guide__group">
            <div className="accordion-type2__group is-opened">
              <button className="accordion-type2__btn">
                <span className="accordion-type2__btn-txt">검색된 뉴스 3개</span>
                <span className="accordion-type2__btn-ico">
                  <IcoSvg data={icoSvgData.chevronDown} />
                </span>
              </button>
              <div className="accordion-type2-panel__group">
                <ul className="interval-mt14">
                  <li>
                    <div className="list-type1__section">
                      <ul className="list-type1__group before-none">
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li data-year="2022">
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'메가존, 클라우드 MSP사업자로 성장…원스탑 토탈 서비스 제공'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>클립북 홍길동 05-18</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'중앙일보 서정민 전화 통화'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>전화 완료 홍길동 04-27</p>
                            </div>
                          </div>
                        </li>
                        <li data-year="2021">
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-type1__item">
                            <div className="list-type1__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <p>보도자료 초안 홍길동 06-24</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="list-type1__footer">
                      <Button
                        label={'더보기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">accordion-type3 기본 - 닫힘</h2>
          <div className="guide__group">
            <div className="accordion-type3__group">
              <div className="accordion-type3-button__group">
                <span className="accordion-type3__label">240명(중복 3명, 수신거부 2명, 발송차단 3명 제외)</span>
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
                      매체 목록: <Link href="#!">정보보안 매체</Link> 20개(이메일 5개)
                    </p>
                  </li>
                  <li>
                    <p className="font-body__regular">
                      언론인: <Link href="#!">서정민</Link> 중앙일보 외 1명
                    </p>
                  </li>
                  <li>
                    <p className="font-body__regular">
                      매체: <Link href="#!">여성중앙</Link>
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
          </div>
          <h2
            className="guide__item--title"
            style={{ marginTop: '30px' }}
          >
            accordion-type3 기본 - 열림
          </h2>
          <div className="guide__group">
            <div className="accordion-type3__group is-opened">
              <div className="accordion-type3-button__group">
                <span className="accordion-type3__label">240명(중복 3명, 수신거부 2명, 발송차단 3명 제외)</span>
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
                      매체 목록: <Link href="#!">정보보안 매체</Link> 20개(이메일 5개)
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
