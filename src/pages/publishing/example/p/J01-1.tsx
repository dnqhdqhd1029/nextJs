/**
 * @file J01-1.tsx
 * @description J01-1 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import Flag from '~/publishing/components/common/ui/Flag'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const tabs = [
    { name: '전체', count: 20 },
    { name: '커버리지', count: 20 },
    { name: '클립북', count: 5 },
    { name: '보도자료', count: 4 },
    { name: '이메일', count: 20 },
    { name: '노트', count: 20 },
    { name: '약속', count: 20 },
    { name: '전화', count: 20 },
    { name: '문의', count: 20 },
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
                        <IcoAvatar
                          label={'아이콘이름'}
                          icoData={icoSvgData.personFill}
                          size={'s112'}
                          icoSize={'s64'}
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
                          <p className="dl-table-type2__text">메신저</p>
                        </div>
                        <div className="dl-table-type2__flex-txt">
                          <p className="dl-table-type2__text">카카오 kyumin2222</p>
                        </div>
                      </div>
                      <div className="dl-table-type2__flex">
                        <div className="dl-table-type2__flex-tit">
                          <p className="dl-table-type2__text">주소</p>
                        </div>
                        <div className="dl-table-type2__flex-txt">
                          <p className="dl-table-type2__text">서울 중구 서소문로 89-31 N빌딩 9층</p>
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
                          </ul>
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
                        label={'개인적 연락처 추가'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                      />
                    </li>
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
                        <div className="tabs-panel__group">
                          <div className="list-type1__result-none">기록이 없습니다.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flexible-item__group">
                  <h4 className="font-heading--h5">뉴스</h4>
                  <div className="flexible-item__contents">
                    <div className="list-type1__result-none">뉴스가 없습니다.</div>
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
                              <IcoAvatar
                                label={'기업 아이콘'}
                                icoData={icoSvgData.company}
                                size={'s112'}
                                icoSize={'s64'}
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
                        <span className="select__label-text">브랜드</span>
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
                    <div className="list-type1__result-none type-keyword">산출된 자주 쓰는 단어가 없습니다.</div>
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
