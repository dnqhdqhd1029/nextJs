/**
 * @file J01.tsx
 * @description J01 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp.jpg'
import temp2Img from '/public/assets/png/temp2.jpg'
import Button from '~/publishing/components/common/ui/Button'
import Flag from '~/publishing/components/common/ui/Flag'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const tabs = [
    { name: '전체', count: 20 },
    { name: '보도자료', count: 4 },
    { name: '이메일', count: 20 },
    { name: '노트', count: 20 },
    { name: '약속', count: 20 },
    { name: '전화', count: 20 },
    { name: '문의', count: 20 },
    { name: '커버리지', count: 20 },
    { name: '클립북', count: 5 },
  ]

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner type-w1">
          {/* top, height 값은 header 값에 따라 적용 개발 필요 */}
          <div
            className="mb-lnb__section"
            style={{
              top: '52px',
              height: `calc(100% - ${52}px)`,
            }}
          >
            <ul className="interval-mt20">
              <li>
                <div className="mb-lnb-control__group">
                  <div className="mb-lnb-control__arrow">
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

                  <div className="mb-lnb-control__select">
                    <div className="select__section select-type1-small select-ico-only select-align-right">
                      <button className="select__label ico-size16">
                        <span className="select__label-text">설정</span>
                        <IcoSvg data={icoSvgData.threeDotsVertical} />
                      </button>

                      <div className="select-option__section">
                        <div className="select-option__area">
                          <ul className="select-option__group">
                            <li>
                              <button className="select-option__item is-selected">
                                <span className="select-option__item-text">공유하기</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <span className="select-option__item-text">이메일 발송 차단</span>
                              </button>
                            </li>
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
                  </div>
                </div>
              </li>
              <li>
                <div className="profile__section">
                  <div className="profile__area">
                    {/* 사람 프로필 */}
                    <div className="profile-img__group type-person">
                      <div className="profile__img">
                        <Image
                          src={tempImg}
                          width={500}
                          height={500}
                          alt="temp 프로필 이미지"
                        />
                      </div>

                      <p className="profile-img__ico">
                        <span className="hidden">잠금</span>
                      </p>

                      <div className="select__section select-type1-small select-ico-only is-show">
                        <Button
                          label={'에디터'}
                          cate={'ico-only'}
                          size={'s32'}
                          color={'white'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.pencilFill2}
                          icoSize={32}
                        />

                        <div className="select-option__section">
                          <div className="select-option__area">
                            <ul className="select-option__group">
                              <li>
                                <button className="select-option__item is-selected">
                                  <span className="select-option__item-text">사진 등록</span>
                                </button>
                              </li>
                              <li>
                                <button className="select-option__item">
                                  <span className="select-option__item-text">사진 삭제</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile__group">
                      <h3 className="profile__name">
                        <strong>서정민</strong>
                        <IcoSvg data={icoSvgData.patchCheckFill} />
                      </h3>

                      <div className="profile__team">
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'중앙일보'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        <span>미디어</span>
                        <Button
                          label={'1개 +'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                      </div>

                      {/* <!-- 1개 + 영역 클릭 후 */}
                      <p className="profile__team">
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'중앙일보'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        <span>종합일간신문</span>
                      </p>
                      <p className="profile__team">
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'중앙일보'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        <span>업계잡지</span>
                      </p>
                      {/* 클릭 후 --> */}

                      <p className="profile__team">
                        <span>문화부 기자 겸 부데스크</span>
                      </p>
                      <p className="profile__btn">
                        <Button
                          label={'목록에 저장'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="profile__section">
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
                      <p className="dl-table-type2__title">저서</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type2__text">2018 한국의 미 꽃문, 신아출판사</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type2__title">수상</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type2__text">2018 장한 고대언론인상, 고려대학교 언론인 교우회</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type2__title">학교</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type2__text">1995 서울대 대학원 독문과 졸업</p>
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
                          <p className="dl-table-type2__text">휴대전화</p>
                        </div>
                        <div className="dl-table-type2__flex-txt">
                          <p className="dl-table-type2__text">010-1234-5678</p>
                        </div>
                      </div>
                      <div className="dl-table-type2__flex">
                        <div className="dl-table-type2__flex-tit">
                          <p className="dl-table-type2__text">팩스</p>
                        </div>
                        <div className="dl-table-type2__flex-txt">
                          <p className="dl-table-type2__text">02-432-6459</p>
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
                              tooltipHtml={'조직 내에서 여러 명이 공용<br />으로 사용하는 메일'}
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
                                label={'개인 페이지'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.home}
                              />
                            </li>
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
                                url={'https://kr.linkedin.com/'}
                                target={'_blank'}
                                label={'링크드인'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.linkedin}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://kr.linkedin.com/'}
                                target={'_blank'}
                                label={'인스타그램'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.instagram}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://ko-kr.facebook.com/'}
                                target={'_blank'}
                                label={'페이스북'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.facebook}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'유튜브'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.youtube}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'블로그'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.blog}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://twitter.com/?lang=ko'}
                                target={'_blank'}
                                label={'엑스'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.twitter}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'카카오스토리'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.kakaostory}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'기타'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.others}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </dd>
                    <dt>
                      <div className="dl-table-type2__title-group">
                        <p className="dl-table-type2__title">개인적 연락처</p>
                        <div className="dl-table-type2__title-edit">
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                          />
                        </div>
                        <p className="dl-table-type2__title-date">홍길동 2022-09-24</p>
                      </div>
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
                          <p className="dl-table-type2__text">휴대전화</p>
                        </div>
                        <div className="dl-table-type2__flex-txt">
                          <p className="dl-table-type2__text">010-1234-5678</p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div className="profile__footer">
                  <ul className="interval-mt14">
                    <li>
                      <Button
                        label={'정보 업데이트 요청'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-contents">
            <div className="flexible__section type-n1">
              <div className="flexible__group">
                <div className="flexible-item__group">
                  <div className="flexible-item__header">
                    <h4 className="font-heading--h5">기록</h4>
                    <div className="select__section select-type1-small select-line">
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
                  <div className="flexible-item__contents">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          {tabs.map((tab, i) => {
                            return (
                              <li
                                className={`${i === 0 ? 'is-active' : ''}`}
                                key={i}
                              >
                                <button
                                  type="button"
                                  className="tabs-menu__btn"
                                >
                                  <span className="tabs-menu__name">{tab.name}</span>
                                  <span className="tabs-menu__number">{tab.count}</span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <FormInputSearch placeholder={'검색'} />

                        {/* <!-- 커버리지 탭 목록 상단 표시 문구 */}
                        <p className="font-body__regular">클립북에 보도자료를 연결하면 여기에 노출됩니다</p>
                        {/* 커버리지 탭 목록 상단 표시 문구 --> */}

                        <div className="tabs-panel__group">
                          <div className="list-type1__section">
                            <ul className="list-type1__group">
                              <li>
                                <div className="list-type1__item">
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                              {/* 해당 년도 data-year에 표시. css에 해당 값 불러옴 */}
                              <li data-year="2022">
                                <div className="list-type1__item">
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.envelope} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.pencil} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                                  <div className="list-type1__ico">
                                    <IcoSvg data={icoSvgData.fileEarmarkText} />
                                  </div>
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
                          <div className="flexible-item__pagination">
                            <Pagination cate={'n2'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flexible-item__group">
                  <div className="flexible-item__header">
                    <h4 className="font-heading--h5">뉴스</h4>
                  </div>
                  <div className="flexible-item__contents">
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
                    <div className="flexible-item__pagination">
                      <Pagination cate={'n2'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexible__group">
                <div className="flexible-item__group">
                  <div className="profile__section">
                    <ul className="interval-mt20">
                      <li>
                        <div className="profile__area">
                          {/* 기업 프로필 */}
                          <div className="profile-img__group type-corp">
                            <div className="profile__img">
                              <Image
                                src={temp2Img}
                                width={500}
                                height={500}
                                alt="temp 프로필 이미지"
                              />
                            </div>

                            <p className="profile-img__ico">
                              <span className="hidden">잠금</span>
                            </p>

                            <div className="select__section select-type1-small select-ico-only is-show">
                              <Button
                                label={'에디터'}
                                cate={'ico-only'}
                                size={'s32'}
                                color={'white'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.pencilFill2}
                                icoSize={32}
                              />

                              <div className="select-option__section">
                                <div className="select-option__area">
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item is-selected">
                                        <span className="select-option__item-text">사진 등록</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">사진 삭제</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="profile__group">
                            <h3 className="profile__name type-arrow">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'중앙일보'}
                                cate={'link-ico-text'}
                                size={'es'}
                                color={'body-text'}
                                icoRight={true}
                                icoRightData={icoSvgData.chevronThickRight}
                                icoSize={14}
                              />
                            </h3>
                            <p className="profile__team">
                              <span>미디어 가치</span>
                              <span>62,510</span>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <dl className="dl-table-type2__section">
                          <dt className="hidden">
                            <p className="dl-table-type2__title">정보</p>
                          </dt>
                          <dd>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">분야</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">전분야</p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">유형</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">종합일간신문</p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">발행주기</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">일간</p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">언어</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">영어</p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">발행처</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">
                                  <span className="mr8">중앙일보</span>
                                  <span className="color-gray--600">주식회사</span>
                                </p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">웹사이트</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">
                                  <Button
                                    elem="a"
                                    url={'http://joongang.joins.com'}
                                    label={'http://joongang.joins.com'}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </p>
                              </div>
                            </div>
                            <div className="dl-table-type2__flex">
                              <div className="dl-table-type2__flex-tit">
                                <p className="dl-table-type2__text">포털제휴</p>
                              </div>
                              <div className="dl-table-type2__flex-txt">
                                <p className="dl-table-type2__text">NAVER 뉴스스탠드 제휴</p>
                              </div>
                            </div>
                          </dd>
                          <dt>
                            <p className="dl-table-type2__title">소개</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type2__text">
                              대한민국의 조간 종합 일간 신문. 삼성그룹의 계열사로 출범하였으며, 1999년에
                              삼성그룹으로부터 계열 분리되었다. 현재는 중앙그룹 계열 중앙일보(주)에서 발행하며, 본사는
                              서울특별시 중구 서소문로 100 (순화동)에 입주해 있다. 사명은 '중앙일보(주)'. 원래는
                              '(주)중앙일보'였으나 사명을 2018년 3월에 변경하였다. 원래는 석간 신문이였으나, 1995년
                              4월부터 조간 신문으로 전환하였다.
                            </p>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flexible-item__group">
                  <div className="flexible-item__header">
                    <h4 className="font-heading--h5">자주 쓰는 단어</h4>
                    <div className="select__section select-type1-medium select-align-right">
                      <button className="select__label">
                        <span className="select__label-text">전체 </span>
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
                  <div className="flexible-item__contents">
                    <div className="flexible-item__keywords">
                      <p className="flexible-item__keyword-s1">프랑크프루트</p>
                      <p className="flexible-item__keyword-s2">카셰어링</p>
                      <p className="flexible-item__keyword-s1">카지노</p>
                      <p className="flexible-item__keyword-s3">로봇</p>
                      <p className="flexible-item__keyword-s2">크루즈</p>
                      <p className="flexible-item__keyword-s4">스마트 TV</p>
                      <p className="flexible-item__keyword-s5">CEO</p>
                      <p className="flexible-item__keyword-s2">전시회</p>
                      <p className="flexible-item__keyword-s6">반려동물</p>
                      <p className="flexible-item__keyword-s1">자동화</p>
                      <p className="flexible-item__keyword-s4">비트코인</p>
                      <p className="flexible-item__keyword-s2">미술</p>
                      <p className="flexible-item__keyword-s3">유튜브</p>
                      <p className="flexible-item__keyword-s1">생명과학</p>
                      <p className="flexible-item__keyword-s1">리조트</p>
                      <p className="flexible-item__keyword-s3">이탈리아</p>
                      <p className="flexible-item__keyword-s1">브랜딩</p>
                      <p className="flexible-item__keyword-s1">2차전지</p>
                      <p className="flexible-item__keyword-s3">패션</p>
                      <p className="flexible-item__keyword-s1">소고기</p>
                      <p className="flexible-item__keyword-s1">아웃도어</p>
                      <p className="flexible-item__keyword-s2">벤처</p>
                    </div>
                  </div>
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
