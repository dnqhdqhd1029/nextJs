/**
 * @file Popup-type4.tsx
 * @description Popup-type4 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import FileUploaderThumb from '~/publishing/components/common/ui/FileUploaderThumb'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Popup type4</h2>

        <code className="guide__code">
          - max-width: 300px, 500px, 800px, 1140px
          <br />- popup__section에 w500 형태로 클래스 추가.
          <br />- input value 있을 때 x 버튼 출력, 미노출일 때 개발 필요 (디자인 참고)
          <br />- popup-footer__section은 popup-bottom 참고하여 적용
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 1</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회원 정보</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <dl className="dl-table-type1__section">
                  <dt>
                    <p className="dl-table-type1__text">표시 이름</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">홍부장</p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">이메일</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">
                      <Button
                        elem="a"
                        url={'mailto:jeongmin.seo@joongang.co.kr'}
                        label={'jeongmin.seo@joongang.co.kr'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">전화</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">02-1234-5678</p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">사용기간</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">
                      2022-05-16 ~ 2023-05-15 <span className="color-danger">만료</span>
                    </p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">휴대전화</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">010-1234-5678</p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">권한</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">관리자</p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">보도자료</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text">
                      <Button
                        elem="a"
                        url={'#!'}
                        label={'적십자 강동구후원회, 오미크론 위기 극복 희망'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </p>
                    <p className="dl-table-type1__text">
                      <Button
                        elem="a"
                        url={'#!'}
                        label={'기아, 2022년 1분기 45만 1,152대 판매'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </p>
                  </dd>
                </dl>
              </div>
              <div className="popup-footer__section type1">
                <Button
                  label={'확인'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 2</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">회사 선택</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <ul className="interval-mt20">
                  <li>
                    <p className="font-body__regular">
                      회원님은 여러 회사에 소속돼 있습니다. 어느 회사에 접속하겠습니까?
                    </p>
                  </li>
                  <li>
                    <ul className="ul-table-type1__section">
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'삼성전자'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p>최종 로그인</p>
                          <p className="ul-table-type1__info-time">2023-06-12 09:30</p>
                        </div>
                      </li>
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'삼성전자서비스'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p>최종 로그인</p>
                          <p className="ul-table-type1__info-time">2023-06-12 09:30</p>
                        </div>
                      </li>
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'삼성바이오로직스'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p>최종 로그인</p>
                          <p className="ul-table-type1__info-time">-</p>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 3</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">이메일 발송 차단</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">
                    차단하면 내 회사(또는 그룹)의 다른 회원이 이메일과 보도자료를 보내도 발송이 되지 않습니다.
                    <br />
                    이메일 발송을 차단하겠습니까?
                  </p>
                </div>
              </div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'차단'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 4</h2>
          <div className="guide__group">
            <div className="popup__section w500">
              <div className="popup-header__section">
                <h2 className="popup-header__title">개인 추가 언론인 사진 등록</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <FileUploaderThumb />
              </div>
              <div className="popup-footer__section">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'link-dark'}
                />
                <Button
                  label={'등록'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 5</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">뉴스와이어 배포 보도자료 초안</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <ul className="interval-mt20">
                  <li>
                    <p className="font-body__regular">배포하지 않은 초안을 이어서 작업할 수 있습니다.</p>
                  </li>
                  <li>
                    <ul className="ul-table-type1__section type-li0">
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p className="ul-table-type1__info-text">06-12 09:30 홍길동 수정</p>
                          <Button
                            label={'삭제'}
                            cate={'default'}
                            size={'m'}
                            color={'link'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'삼성전자서비스'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p className="ul-table-type1__info-text">2023-06-12 09:30 홍길동 수정</p>
                          <Button
                            label={'삭제'}
                            cate={'default'}
                            size={'m'}
                            color={'link'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="ul-table-type1__btn">
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'삼성바이오로직스'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </div>
                        <div className="ul-table-type1__info">
                          <p className="ul-table-type1__info-text">2023-06-12 09:30 홍길동 수정</p>
                          <Button
                            label={'삭제'}
                            cate={'default'}
                            size={'m'}
                            color={'link'}
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 6</h2>
          <div className="guide__group">
            <div className="popup__section w800">
              <div className="popup-header__section">
                <h2 className="popup-header__title">뉴스와이어, 클라우드 기반 통합 회사 홍보 서비스 '미디어비' 출시</h2>
                <div className="popup-header__close">
                  <Button
                    label={'닫기'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                </div>
              </div>
              <div className="popup-contents__section">
                <div className="popup-template__group">
                  <p>
                    보내는 사람: 홍길동
                    <br />
                    받는사람: 주요 일간지 기자목록 120명, IT/정보보안 기자 64명, test123@gmail.com
                  </p>
                  <p>
                    안녕하십니까? &#123;소속&#125; &#123;이름&#125; &#123;직책&#125;님,
                    <br />
                    고객의 성공을 돕는 홍보 솔루션 전문회사 뉴스와이어입니다.
                    <br />
                    뉴스와이어가 오랜 준비 끝에 국내 PR시장에 혁신을 불러일으킬 클라우드 기반 PR 통합관리 서비스를
                    선보입니다.
                    <br />
                    보도자료를 발송 드리오니 확인하시고, 유익한 기사 작성 기회로 활용해 주시기 바랍니다.
                    <br />
                    관련 문의는 아래 연락처로 해주시기 바랍니다.
                  </p>
                  <h2>뉴스와이어, 클라우드 기반 통합 회사 홍보 서비스 '미디어비' 출시</h2>
                  <p>
                    미디어비는 실제 비즈니스 결과를 이끌어내는 PR 프로젝트를 실행하고 이를 입증 할 수있는 지표를
                    제공합니다. 엄선된 데이터베이스에서 5만명 이상의 언론인과 인플루언서에게 필요한 정보를 정확하게
                    제공합니다.
                  </p>
                  <div className="media">
                    <img
                      src="/assets/png/temp.jpg"
                      alt="샘플이미지"
                      width="300"
                    />
                    <span className="media__name">인피니티(Infinity) 디자인 적용 2022년형 QLED 8K 신제품 Q950TS</span>
                    <button
                      type="button"
                      className="media__download"
                    >
                      원본 다운로드
                    </button>
                  </div>
                  <p>
                    온라인 보도자료 배포 서비스의 선두 주자인 뉴스와이어는 웹사이트를 전면적으로 리뉴얼해 회사와
                    언론인이 쉽게 쓸 수 있게 했다고 19일 밝혔다.
                    <br />
                    <br />
                    이번 사이트 개편은 이용자의 사용성과 가독성을 강화하고, ‘최고의 회사 홍보 서비스’라는 브랜드
                    이미지를 강화하는 데에 초점을 두었다.
                    <br />
                    <br />
                    뉴스와이어는 이번 개편에서 화면 가로 폭을 넓히고 메뉴 구조를 변경해 와이드 PC 및 태블릿 PC
                    화면에서도 편리하게 이용하도록 디자인을 개선했다. 보도자료에 첨부한 사진과 동영상의 크기도 키워
                    멀티미디어 콘텐츠에 대한 가시성을 높였다.
                    <br />
                    <br />
                    뉴스와이어 신동호 대표는 “최신 트렌드를 반영한 디자인과 사용자에게 최적화된 콘텐츠 제공에 중점을
                    두고 웹사이트를 개편했다”며 “개편된 홈페이지를 통해 회사를 위한 온라인 홍보 서비스를 더욱 강화해나갈
                    계획”이라고 말했다.
                  </p>
                  <h3>회사개요</h3>
                  <p>
                    코리아뉴스와이어는 회사가 발표하는 보도자료를 언론, 포털, 투자자에게 배포하는 온라인 회사 뉴스 배포
                    서비스의 리더이다. 회사는 작성한 보도자료를 온라인으로 등록하고, 뉴스와이어는 이를 언론인, 블로거,
                    포털, 투자자에게 배포한다. 코리아뉴스와이어는 2004년 국내 최초로 온라인 보도자료 배포 플랫폼인
                    뉴스와이어를 론칭한 이래 지금까지 2만 6000개 회사의 뉴스를 세상에 알렸다.
                  </p>
                  <h3>웹사이트</h3>
                  <p>
                    <Link
                      href="https://www.newswire.co.kr"
                      legacyBehavior
                    >
                      <a target="_blank">https://www.newswire.co.kr</a>
                    </Link>
                  </p>
                  <div className="media">
                    <div className="media__movie">영상영역 (w 100%, 16/9 비율)</div>
                    <span className="media__name">삼성전자 제트 청정스테이션 소개 영상</span>
                    <Link
                      href="https://youtu.be/aKrUzn5q8LQ"
                      legacyBehavior
                    >
                      <a
                        target="_blank"
                        className="media__download"
                      >
                        https://youtu.be/aKrUzn5q8LQ
                      </a>
                    </Link>
                  </div>

                  <h3>첨부파일</h3>
                  <p>
                    <Link
                      href="#!"
                      legacyBehavior
                    >
                      <a target="_self">2020년 QLED 8k 신제품 Q950TS 사용 가이드.PDF</a>
                    </Link>
                  </p>

                  <h3>언론 연락처</h3>
                  <p>코리아뉴스와이어 서비스팀 홍길동 과장(02-3232-1566)</p>
                </div>

                <div className="popup-template__footer">
                  귀하는 홍길동으로부터 미디어비 서비스를 이용해 이 메일을 받고 있습니다.
                  <br />
                  수신을 원치 않으면{' '}
                  <Link
                    href="#!"
                    legacyBehavior
                  >
                    <a target="_self">수신거부</a>
                  </Link>
                  를 클릭하여 주시기 바랍니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. </h2>
          <div className="guide__group"></div>
        </div> */}
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
