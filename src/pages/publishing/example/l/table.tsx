/**
 * @file table.tsx
 * @description table 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import Flag from '~/publishing/components/common/ui/Flag'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section type-table-not">
        <h1 className="guide__title">Table</h1>

        <code className="guide__code">
          table 내 'caption' 태그 안에 각각의 테이블 이름 명시.
          <br />
          table col width 값은 상황에 따라 값 적용
        </code>

        <h2 className="guide__title">table-type1</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="table-type1__section">
              <table>
                <caption>caption</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <FormInputBtn
                        type="checkbox"
                        name="ck-total"
                        id="ck-total"
                      />
                    </th>
                    <th scope="col">이름</th>
                    <th scope="col">표시 이름</th>
                    <th scope="col">이메일</th>
                    <th scope="col">권한</th>
                    <th scope="col">그룹</th>
                    <th scope="col">마지막 접속</th>
                    <th scope="col">등록일</th>
                    <th scope="col">관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <FormInputBtn
                        type="checkbox"
                        name="ck-td-1"
                        id="ck-td-1"
                      />
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
                    <td>홍길동</td>
                    <td>
                      <Button
                        elem="a"
                        url={'mailto:jeongmin.seo@joongang.co.kr'}
                        label={'jeongmin.seo@joongang.co.kr'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>관리자</td>
                    <td>
                      <IcoSvg data={icoSvgData.checkThick} />
                    </td>
                    <td>2023-06-18 12:00</td>
                    <td>2023-04-25</td>
                    <td>
                      <Button
                        label={'threeDotsVertical'}
                        cate={'ico-only'}
                        size={'s'}
                        color={'body-text'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.threeDotsVertical}
                        icoSize={16}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormInputBtn
                        type="checkbox"
                        name="ck-td-2"
                        id="ck-td-2"
                      />
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
                    <td>홍길동</td>
                    <td>
                      <Button
                        elem="a"
                        url={'mailto:jeongmin.seo@joongang.co.kr'}
                        label={'jeongmin.seo@joongang.co.kr'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>관리자</td>
                    <td>
                      <IcoSvg data={icoSvgData.checkThick} />
                    </td>
                    <td>2023-06-18 12:00</td>
                    <td>2023-04-25</td>
                    <td>
                      <Button
                        label={'threeDotsVertical'}
                        cate={'ico-only'}
                        size={'s'}
                        color={'body-text'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.threeDotsVertical}
                        icoSize={16}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h2 className="guide__title">table-type2</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
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
          </div>
        </div>

        <h2 className="guide__title">table-type3</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
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
                        <a className="table-type3__text color-primary">LS전선아시아, 베트남에 해저 케이블 첫 공급</a>
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
                          호텔 서울드래곤시티, 신선한 봄기운 가득 담아낸 특선 메뉴 ‘셰프 테이스팅 에피소호텔
                          서울드래곤시티, 신선한 봄기운 가득 담아낸 특선 메뉴 ‘셰프 테이스팅 에피소
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
          <div
            className="guide__box g--type2"
            style={{ marginTop: '50px' }}
          >
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
                          <a className="table-type3__text color-primary">주요 일간지 정보보안 업계 동향</a>
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
                          <a className="table-type3__text color-primary">스마트폰 보도자료 배포 결과 보고서</a>
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

        <h2 className="guide__title">table-type4</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="table-type4__section">
              <table>
                <caption>caption</caption>
                <thead>
                  <tr>
                    <th scope="col">모니터링 이름</th>
                    <th scope="col">내 수신 시간</th>
                    <th scope="col">종료일</th>
                    <th scope="col">설정일</th>
                    <th scope="col">소유자</th>
                    <th scope="col">수신자</th>
                    <th scope="col">관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Button
                        label={'휴대폰 브랜드'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>
                      월: 09:00
                      <br />
                      수: 09:00
                      <br />
                      금: 09:00
                    </td>
                    <td>
                      <div className="table-flex-align-c">2023-09-30</div>
                    </td>
                    <td>03-22 </td>
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
                    <td>1</td>
                    <td>
                      <div className="select__section select-type1-small select-ico-only select-align-right">
                        <button className="select__label ico-size16">
                          <span className="select__label-text">설정</span>
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
                        label={'노트북 브랜드'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>
                      월: 09:00, 12:00, 16:00, 20:00
                      <br />
                      화: 09:00, 12:00, 16:00, 20:00
                      <br />
                      수: 09:00, 12:00, 16:00, 20:00
                      <br />
                      목: 09:00, 12:00, 16:00, 20:00
                      <br />
                      금: 09:00, 12:00, 16:00
                      <br />
                      토: 09:00, 12:00
                      <br />
                      일: 09:00
                    </td>
                    <td>
                      <div className="table-flex-align-c">-</div>
                    </td>
                    <td>03-03</td>
                    <td>
                      <Button
                        elem="a"
                        url="#!"
                        label={'김철수'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>4</td>
                    <td>
                      <div className="select__section select-type1-small select-ico-only select-align-right">
                        <button className="select__label ico-size16">
                          <span className="select__label-text">설정</span>
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
                        label={'자율 주행'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </td>
                    <td>월: 12:00</td>
                    <td>
                      <div className="table-flex-align-c">
                        2023-10-30
                        <Flag
                          label={'종료'}
                          color={'gray-500'}
                          size={'es'}
                        />
                      </div>
                    </td>
                    <td>03-22</td>
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
                    <td>1</td>
                    <td>
                      <div className="select__section select-type1-small select-ico-only select-align-right">
                        <button className="select__label ico-size16">
                          <span className="select__label-text">설정</span>
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
          </div>
        </div>

        <h2 className="guide__title">table-type5</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="table-type5__section">
              <table>
                <caption>caption</caption>

                <colgroup>
                  <col width="15%" />
                  <col width="*" />
                  <col width="10%" />
                </colgroup>

                <tbody>
                  <tr>
                    <th scope="row">
                      <p className="table-type5__text">중앙일보</p>
                    </th>
                    <td>
                      <div className="table-type5__flex">
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="table-type5__text color-primary">편집국장단 인사</a>
                        </Link>
                        <p className="table-type5__text color-secondary">100</p>
                      </div>
                    </td>
                    <td>
                      <p className="table-type5__text color-secondary">05-24</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <p className="table-type5__text">한국일보</p>
                    </th>
                    <td>
                      <div className="table-type5__flex">
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="table-type5__text color-primary">이훈성 한국일보 편집국장 임명 </a>
                        </Link>
                        <p className="table-type5__text color-secondary">40</p>
                      </div>
                    </td>
                    <td>
                      <p className="table-type5__text color-secondary">04-20</p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <p className="table-type5__text">동아일보</p>
                    </th>
                    <td>
                      <div className="table-type5__flex">
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a className="table-type5__text color-primary">김예윤 동아일보 산업부장 임명</a>
                        </Link>
                        <p className="table-type5__text color-secondary">240</p>
                      </div>
                    </td>
                    <td>
                      <p className="table-type5__text color-secondary">03-09</p>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    {/* tbody cols에 맞춰 숫자 변동 */}
                    <td colSpan={3}>
                      <div className="table-type5__tfoot">
                        <div className="tfoot-center">
                          <Button
                            label={'더보기'}
                            cate={'default'}
                            size={'m'}
                            color={'link-dark'}
                          />
                        </div>
                        <div className="tfoot-right">
                          <Button
                            label={'전체'}
                            cate={'default'}
                            size={'m'}
                            color={'link-dark'}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <h2 className="guide__title">dl-table-type1</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <dl className="dl-table-type1__section">
              <dt>
                <p className="dl-table-type1__text">이름</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">홍길동</p>
              </dd>
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
                <p className="dl-table-type1__text">비밀번호</p>
              </dt>
              <dd>
                <div className="dl-table-type1__flex">
                  <Button
                    label={'비밀번호 수정'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-secondary'}
                  />
                  <p className="dl-table-type1__text">마지막 수정 2022년 6월 16일</p>
                </div>
              </dd>
              <dt>
                <p className="dl-table-type1__text">전화</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">-</p>
              </dd>
              <dt>
                <p className="dl-table-type1__text">휴대전화</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">010-1234-5678</p>
              </dd>
              <dt>
                <p className="dl-table-type1__text">뉴스레터 수신</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text">수신함</p>
              </dd>
            </dl>
          </div>
        </div>
        <h2 className="guide__title">dl-table-type2</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <dl className="dl-table-type2__section">
              <dt>
                <p className="dl-table-type2__title">분야</p>
              </dt>
              <dd>
                <p className="dl-table-type2__text">IT/전자, 소프트웨어, 인터넷</p>
              </dd>
              <dt>
                <p className="dl-table-type2__title">프로그램</p>
              </dt>
              <dd>
                <p className="dl-table-type2__text">다큐멘터리 24</p>
              </dd>
              <dt>
                <p className="dl-table-type2__title">경력</p>
              </dt>
              <dd>
                <p className="dl-table-type2__text">
                  2018 중앙일보 보도국 문화부 기자
                  <br />
                  2016 중앙일보 편집국 IT과학부 기자
                </p>
              </dd>
              <dt>
                <p className="dl-table-type2__title">연락처</p>
              </dt>
              <dd>
                <div className="dl-table-type2__flex">
                  <div className="dl-table-type2__flex-tit">
                    <p className="dl-table-type2__text">전화</p>
                  </div>
                  <div className="dl-table-type2__flex-txt">
                    <p className="dl-table-type2__text">02-737-3600</p>
                  </div>
                </div>
                <div className="dl-table-type2__flex">
                  <div className="dl-table-type2__flex-tit">
                    <p className="dl-table-type2__text">이메일</p>
                  </div>
                  <div className="dl-table-type2__flex-txt">
                    <div className="type-email">
                      <div className="select__section select-type1-small">
                        <button className="select__label">
                          <span className="select__label-text">jeongmin.seo@joongang.co.kr</span>
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

                    <div className="type-btn">
                      <Tooltips
                        tooltipId={'tt10-1'}
                        tooltipPlace={'top'}
                        tooltipHtml={
                          '이 이메일은 언론사 내에서 동료 <br />언론인이 함께 쓰는 메일이므로, <br />사용에 주의하시기 바랍니다.'
                        }
                        tooltipComponent={
                          <Flag
                            label={'공용'}
                            color={'gray-500'}
                            size={'es'}
                          />
                        }
                      />

                      <Button
                        label={'수신거부'}
                        cate={'gray'}
                        size={'es'}
                        color={'gray'}
                      />
                    </div>
                  </div>
                </div>
                <div className="dl-table-type2__flex">
                  <div className="dl-table-type2__flex-tit">
                    <p className="dl-table-type2__text">소셜</p>
                  </div>
                  <div className="dl-table-type2__flex-txt">
                    <ul className="type-social">
                      <li>
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          target={'_blank'}
                          label={'네이버 언론인'}
                          cate={'link-ico-text-sns'}
                          size={''}
                          color={'body-link'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.naver}
                        />
                      </li>
                      <li>
                        <Button
                          elem="a"
                          url={'https://twitter.com/?lang=ko'}
                          target={'_blank'}
                          label={'트위터'}
                          cate={'link-ico-text-sns'}
                          size={''}
                          color={'body-link'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.twitter}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>

        <h2 className="guide__title">ul-table-type1</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
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
                  <p className="ul-table-type1__info-time">2023-06-12 09:30</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
