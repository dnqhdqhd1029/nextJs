/**
 * @file M20.tsx
 * @description M20 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp.jpg'
import LnbCustomSearch1 from '~/publishing/components/common/layouts/LnbCustomSearch1'
import Button from '~/publishing/components/common/ui/Button'
import Flag from '~/publishing/components/common/ui/Flag'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import Tag from '~/publishing/components/common/ui/Tag'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const tabs = [{ name: '프로필' }, { name: '뉴스' }, { name: '기록' }]

  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1 overflow-y">
          <LnbCustomSearch1 />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="search-result__header">
                <ul className="interval-mt10">
                  <li>
                    <div className="search-result__header-title">
                      <h2 className="font-heading--h6">인공지능/자율주행 관련 미디어</h2>
                      <Button
                        label={'검색 수정'}
                        cate={'link-text-arrow'}
                        size={'m'}
                        color={'primary'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.chevronLeft}
                      />

                      <div className="search-result__header-buttons">
                        <Button
                          label={'필터'}
                          cate={'default-ico-text'}
                          size={'s'}
                          color={'outline-secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.funnelFill}
                        />

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
                          <span className="select__label-text">검색 저장</span>
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
                          label={'목록에 저장'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'이메일 보내기'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'보도자료 배포'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'활동 추가'}
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
                  {/* 검색 리스트 나열 */}
                  <li>
                    <div className="search-result__list">
                      <div className="list-type2__section">
                        <ul className="list-type2__group">
                          <li>
                            {/* 선택했을 때 is-selected */}
                            <div className="list-type2__item is-selected">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck1"
                                    id="ck1"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 이미지 없을 때 */}
                                  <IcoAvatar
                                    label={'이미지없음'}
                                    icoData={icoSvgData.personFill}
                                    size={'s48'}
                                    icoSize={'s24'}
                                  />
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 62,510</p>
                                    <p className="list-type2-contents__text">서울 중구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서정민'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'중앙일보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>문화부 기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <div className="list-type2__item">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck2"
                                    id="ck2"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 개인 추가 언론인 */}
                                  <Tooltips
                                    tooltipId={'person'}
                                    tooltipPlace={'top'}
                                    tooltipHtml={'개인 추가 언론인'}
                                    tooltipComponent={
                                      <IcoAvatar
                                        label={'이미지없음'}
                                        icoData={icoSvgData.lockFill}
                                        size={'s48'}
                                        icoSize={'s24'}
                                      />
                                    }
                                  />
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 62,510</p>
                                    <p className="list-type2-contents__text">서울 중구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서정민'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'중앙일보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>문화부 기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <div className="list-type2__item">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck3"
                                    id="ck3"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 이미지 있을 때 */}
                                  <div className="list-type2__img">
                                    <Image
                                      src={tempImg}
                                      width={500}
                                      height={500}
                                      alt="temp 프로필 이미지"
                                    />
                                  </div>
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 62,510</p>
                                    <p className="list-type2-contents__text">서울 중구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서정민'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'중앙일보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>문화부 기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li>
                            <div className="list-type2__item">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck4"
                                    id="ck4"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 이미지 없을 때 */}
                                  <IcoAvatar
                                    label={'이미지없음'}
                                    icoData={icoSvgData.personFill}
                                    size={'s48'}
                                    icoSize={'s24'}
                                  />
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 62,510</p>
                                    <p className="list-type2-contents__text">서울 중구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서정민'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'중앙일보'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>문화부 기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                                </li>
                              </ul>
                              <div className="list-type2-contents__footer">
                                <div className="accordion-type2__group">
                                  <button className="accordion-type2__btn">
                                    <span className="accordion-type2__btn-txt">검색된 뉴스 3개</span>
                                    <span className="accordion-type2__btn-ico">
                                      <IcoSvg data={icoSvgData.chevronDown} />
                                    </span>
                                  </button>
                                  <div className="accordion-type2-panel__group">
                                    <div className="list-type1__section">
                                      <ul className="list-type1__group before-none">
                                        <li>
                                          <div className="list-type1__item">
                                            <div className="list-type1__text">
                                              <Button
                                                elem="a"
                                                url={'#!'}
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
                                                cate={'link-text'}
                                                size={'m'}
                                                color={'body-link'}
                                              />
                                              <p>보도자료 초안 홍길동 06-24</p>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <div className="list-type1__more">
                                        <Button
                                          label={'더보기'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="list-type2__item">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck5"
                                    id="ck5"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 이미지 없을 때 */}
                                  <IcoAvatar
                                    label={'이미지없음'}
                                    icoData={icoSvgData.personFill}
                                    size={'s48'}
                                    icoSize={'s24'}
                                  />
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 621,510</p>
                                    <p className="list-type2-contents__text">서울 종로구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'장지승'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서울경제신문'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>편집국 정치부 울산 주재기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">
                                    에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                                  </p>
                                </li>
                              </ul>
                              <div className="list-type2-contents__footer">
                                <div className="accordion-type2__group is-opened">
                                  <button className="accordion-type2__btn">
                                    <span className="accordion-type2__btn-txt">검색된 뉴스 3개</span>
                                    <span className="accordion-type2__btn-ico">
                                      <IcoSvg data={icoSvgData.chevronDown} />
                                    </span>
                                  </button>
                                  <div className="accordion-type2-panel__group">
                                    <div className="list-type1__section">
                                      <ul className="list-type1__group before-none">
                                        <li>
                                          <div className="list-type1__item">
                                            <div className="list-type1__text">
                                              <Button
                                                elem="a"
                                                url={'#!'}
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="list-type2__item">
                              <ul className="list-type2__item-list">
                                <li className="list-type2__item-check">
                                  <FormInputBtn
                                    type="checkbox"
                                    name="ck6"
                                    id="ck6"
                                    label=""
                                  />
                                </li>
                                <li className="list-type2__item-img">
                                  {/* 이미지 없을 때 */}
                                  <IcoAvatar
                                    label={'이미지없음'}
                                    icoData={icoSvgData.personFill}
                                    size={'s48'}
                                    icoSize={'s24'}
                                  />
                                </li>
                                <li className="list-type2__item-contents">
                                  <div className="list-type2-contents__float">
                                    <p className="list-type2-contents__text">미디어 가치 621,510</p>
                                    <p className="list-type2-contents__text">서울 종로구</p>
                                  </div>
                                  <p className="list-type2-contents__text-name">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'장지승'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                  </p>
                                  <p className="list-type2-contents__text">
                                    <Button
                                      elem="a"
                                      url={'https://www.naver.com/'}
                                      label={'서울경제신문'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-text'}
                                    />
                                    <span>편집국 정치부 울산 주재기자</span>
                                  </p>
                                  <p className="list-type2-contents__text">
                                    에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                                  </p>
                                </li>
                              </ul>
                              <div className="list-type2-contents__footer">
                                <div className="accordion-type2__group is-opened">
                                  <button className="accordion-type2__btn">
                                    <span className="accordion-type2__btn-txt">검색된 뉴스 100개</span>
                                    <span className="accordion-type2__btn-ico">
                                      <IcoSvg data={icoSvgData.chevronDown} />
                                    </span>
                                  </button>
                                  <div className="accordion-type2-panel__group">
                                    <div className="list-type1__section">
                                      <ul className="list-type1__group before-none">
                                        <li>
                                          <div className="list-type1__item">
                                            <div className="list-type1__text">
                                              <Button
                                                elem="a"
                                                url={'#!'}
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
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
                                                label={
                                                  'LG생활건강, ‘CNP Rx 스킨 레쥬버네이팅 미라클 앰플 인 쿠션’ 출시'
                                                }
                                                cate={'link-text'}
                                                size={'m'}
                                                color={'body-link'}
                                              />
                                              <p>보도자료 초안 홍길동 06-24</p>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <div className="list-type1__more">
                                        <Button
                                          label={'더보기'}
                                          cate={'link-text'}
                                          size={'m'}
                                          color={'body-link'}
                                        />
                                      </div>
                                    </div>
                                  </div>
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
            <div className="mb-contents-layout__footer">
              <div className="search-result__footer">
                <Pagination cate={'n3'} />
                <Pagination cate={'n4'} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-aside__section type-w2">
          <div className="aside-profile__section">
            <ul className="interval-mt20">
              <li>
                <div className="aside-profile__header">
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
                <div className="profile__section">
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
                      <p className="profile__btn">
                        {/* <Button
                          label={'목록에 저장'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                        /> */}
                        <Button
                          label={'저장됨'}
                          cate={'check-number'}
                          size={'m'}
                          color={'primary'}
                          count={10}
                          icoLeft={true}
                          icoLeftData={icoSvgData.checkThick}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="aside-profile__tabs">
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
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* panel 프로필 */}
                    <div className="tabs-panel__section">
                      <div className="tabs-panel__group">
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
                                      tooltipId={'email'}
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
                      </div>
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
                          <li>
                            <p className="profile__footer-writer">
                              <Button
                                label={'홍길동'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                              <span>작성(또는 수정) 2021-10-27</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* J12 - panel 뉴스, 기록 참고 */}
                  </div>
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
