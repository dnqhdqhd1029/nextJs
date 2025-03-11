/**
 * @file table.tsx
 * @description table 페이지
 */

import Image from 'next/image'
import Link from 'next/link'

import tempImg from '/public/assets/png/temp.jpg'
import temp2Img from '/public/assets/png/temp2.jpg'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">list</h1>
        <code className="guide__code">
          list-type2, list-type4, list-type5, list-type8, list-type11에서 내부 클릭 요소 "클릭 시",
          <br />
          is-not-active 클래스 추가 <br /> <br />
          list-type2-item__group is-not-active <br />
          list-type4-item__section is-not-active <br />
          list-type5-item__section is-not-active <br />
          list-type8-item__section is-not-active <br />
          list-type11-item__section is-not-active <br />
        </code>

        <h2 className="guide__title">list-type1</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
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
          </div>
        </div>

        <h2 className="guide__title">list-type2</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type2__section">
              <ul className="list-type2__group">
                <li>
                  {/* 선택했을 때 is-selected */}
                  <div className="list-type2-item__group is-selected">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-01"
                          id="ck-list2-01"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 이미지 없을 때 */}
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.personFill}
                              size={'s48'}
                              icoSize={'s24'}
                            />
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">
                                <span className="media-index">
                                  <IcoSvg data={icoSvgData.barChart} />
                                </span>
                                621,510
                              </p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'is-selected 클래스 추가'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 내부 클릭 요소 "클릭 시", is-not-active 클래스 추가 */}
                  <div className="list-type2-item__group is-not-active">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-02"
                          id="ck-list2-02"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 개인 추가 언론인 */}
                            <Tooltips
                              tooltipId={'tt10-1'}
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
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">
                                <span className="media-index">
                                  <IcoSvg data={icoSvgData.barChart} />
                                </span>
                                621,510
                              </p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'내부 클릭 요소 "클릭 시", is-not-active 클래스 추가 '}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type2-item__group">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-03"
                          id="ck-list2-03"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 이미지 있을 때 */}
                            <Image
                              src={tempImg}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                            />
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">미디어 가치 621,510</p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'장지승'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type2-item__group">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-04"
                          id="ck-list2-04"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 이미지 없을 때 */}
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.personFill}
                              size={'s48'}
                              icoSize={'s24'}
                            />
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">미디어 가치 621,510</p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'장지승'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                        <div className="list-type2-item__news">
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
                  <div className="list-type2-item__group">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-05"
                          id="ck-list2-05"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 이미지 없을 때 */}
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.personFill}
                              size={'s48'}
                              icoSize={'s24'}
                            />
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">미디어 가치 621,510</p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'장지승'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                        <div className="list-type2-item__news">
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
                  <div className="list-type2-item__group">
                    <ul className="list-type2-item__list">
                      <li className="list-type2-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck-list2-06"
                          id="ck-list2-06"
                          label=""
                        />
                      </li>
                      <li className="list-type2-item__contents">
                        <div className="list-type2-item__header">
                          <div className="list-type2-item__thumb">
                            {/* 이미지 없을 때 */}
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.personFill}
                              size={'s48'}
                              icoSize={'s24'}
                            />
                          </div>
                          <div className="list-type2-item__info">
                            <div className="list-type2-item-header__float">
                              <p className="list-type2-item-header__text">미디어 가치 621,510</p>
                              <p className="list-type2-item-header__text">서울 종로구</p>
                            </div>
                            <p className="list-type2-item-header__name">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'장지승'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                            </p>
                            <p className="list-type2-item-header__text">
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'서울경제신문'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-text'}
                              />
                              <span>편집국 정치부 울산 주재기자</span>
                            </p>
                            <p className="list-type2-item-header__text">
                              에너지 전반, 건축, 도로, ESG, 석유화학, 신재생 에너지
                            </p>
                          </div>
                        </div>
                        <div className="list-type2-item__news">
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
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type3</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type3__section">
              <ul className="list-type3__group">
                <li>
                  <div className="list-type3__item">
                    <ul className="list-type3__item-list">
                      <li className="list-type3__item-img">
                        {/* 이미지 없을 때 */}
                        <IcoAvatar
                          label={'이미지없음'}
                          icoData={icoSvgData.personFill}
                          size={'s48'}
                          icoSize={'s24'}
                        />
                      </li>
                      <li className="list-type3__item-contents">
                        <p className="list-type3-contents__text-name">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'서정민'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
                        <p className="list-type3-contents__text">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'중앙일보'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                          <span>문화부 기자</span>
                        </p>
                        <p className="list-type3-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type3__item">
                    <ul className="list-type3__item-list">
                      <li className="list-type3__item-img">
                        {/* 이미지 있을 때 */}
                        <div className="list-type3__img">
                          <Image
                            src={tempImg}
                            width={500}
                            height={500}
                            alt="temp 프로필 이미지"
                          />
                        </div>
                      </li>
                      <li className="list-type3__item-contents">
                        <p className="list-type3-contents__text-name">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'서정민'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
                        <p className="list-type3-contents__text">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'중앙일보'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                          <span>문화부 기자</span>
                        </p>
                        <p className="list-type3-contents__text">IT/전자, 소프트웨어, 인터넷</p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type3__item">
                    <ul className="list-type3__item-list">
                      <li className="list-type3__item-img">
                        {/* 이미지 있을 때 */}
                        <div className="list-type3__img">
                          <Image
                            src={tempImg}
                            width={500}
                            height={500}
                            alt="temp 프로필 이미지"
                          />
                        </div>
                      </li>
                      <li className="list-type3__item-contents">
                        <p className="list-type3-contents__text-name">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'중앙일보'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
                        <p className="list-type3-contents__text">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'종합일간신문'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </p>
                        <p className="list-type3-contents__text">전분야</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type4</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type4__section">
              <ul className="list-type4__group">
                <li>
                  {/* 클릭 시 이동 */}
                  <div className="list-type4-item__section is-not-active">
                    <ul className="list-type4-item__list">
                      <li className="list-type4-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck100"
                          id="ck100"
                          label=""
                        />
                      </li>
                      <li className="list-type4-item__title type-flex-grow">
                        <p className="list-type4-item__text">
                          <span>is-not-active</span>
                          <IcoSvg data={icoSvgData.personLineBroken} />
                          <IcoSvg data={icoSvgData.bell} />
                        </p>
                      </li>

                      {/* 태그 태깅 수 */}
                      <li className="list-type4-item__tagging">
                        <p className="list-type4-item__text">활동 68,000</p>
                      </li>

                      {/* 커버리지 */}
                      <li className="list-type4-item__coverage">
                        <p className="list-type4-item__text">커버리지</p>
                      </li>

                      {/* 갯수 체크 */}
                      <li className="list-type4-item__counter">
                        <p className="list-type4-item__text">125명</p>
                      </li>

                      {/* 그룹 */}
                      <li className="list-type4-item__group">
                        <p className="list-type4-item__text">전체 그룹</p>
                      </li>

                      {/* 카테고리 */}
                      <li className="list-type4-item__category">
                        <p className="list-type4-item__text">캠페인</p>
                      </li>

                      {/* 공유 설정 */}
                      <li className="list-type4-item__share-filter">
                        <div className="select__section select-type1-small">
                          <button className="select__label">
                            <span className="select__label-text">구분</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item is-selected">
                                    <span className="select-option__item-text">전체</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">비공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">수정</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* 공유 대상  */}
                      <li className="list-type4-item__share-group">
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
                      </li>

                      {/* 생성/수정 이력 */}
                      <li className="list-type4-item__history">
                        <div className="list-type4-item__history-user">
                          <p className="list-type4-item__text">홍길동 수정</p>
                        </div>
                        <div className="list-type4-item__history-date">
                          <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                        </div>
                      </li>

                      <li className="list-type4-item__more">
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
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 클릭 시 이동 */}
                  <div className="list-type4-item__section">
                    <ul className="list-type4-item__list">
                      <li className="list-type4-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck101"
                          id="ck101"
                          label=""
                        />
                      </li>
                      <li className="list-type4-item__title type-flex-grow">
                        <p className="list-type4-item__text">
                          <span>삼성전자</span>
                          <IcoSvg data={icoSvgData.personLineBroken} />
                          <IcoSvg data={icoSvgData.bell} />
                        </p>
                      </li>
                      <li className="list-type4-item__tagging">
                        <p className="list-type4-item__text">활동 68,000</p>
                      </li>
                      <li className="list-type4-item__coverage">
                        <p className="list-type4-item__text">커버리지</p>
                      </li>
                      <li className="list-type4-item__counter">
                        <p className="list-type4-item__text">125명</p>
                      </li>
                      <li className="list-type4-item__group">
                        <p className="list-type4-item__text">전체 그룹</p>
                      </li>
                      <li className="list-type4-item__category">
                        <p className="list-type4-item__text">캠페인</p>
                      </li>
                      <li className="list-type4-item__share-filter">
                        <div className="select__section select-type1-small">
                          <button className="select__label">
                            <span className="select__label-text">구분</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item is-selected">
                                    <span className="select-option__item-text">전체</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">비공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">수정</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-type4-item__share-group">
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
                      </li>
                      <li className="list-type4-item__history">
                        <div className="list-type4-item__history-user">
                          <p className="list-type4-item__text">홍길동 수정</p>
                        </div>
                        <div className="list-type4-item__history-date">
                          <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                        </div>
                      </li>
                      <li className="list-type4-item__more">
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
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 클릭 시 이동 */}
                  <div className="list-type4-item__section">
                    <ul className="list-type4-item__list">
                      <li className="list-type4-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck102"
                          id="ck102"
                          label=""
                        />
                      </li>
                      <li className="list-type4-item__title type-flex-grow">
                        <p className="list-type4-item__text">
                          <span>삼성전자</span>
                          <IcoSvg data={icoSvgData.personLineBroken} />
                          <IcoSvg data={icoSvgData.bell} />
                        </p>
                      </li>
                      <li className="list-type4-item__tagging">
                        <p className="list-type4-item__text">활동 68,000</p>
                      </li>
                      <li className="list-type4-item__coverage">
                        <p className="list-type4-item__text">커버리지</p>
                      </li>
                      <li className="list-type4-item__counter">
                        <p className="list-type4-item__text">125명</p>
                      </li>
                      <li className="list-type4-item__group">
                        <p className="list-type4-item__text">전체 그룹</p>
                      </li>
                      <li className="list-type4-item__category">
                        <p className="list-type4-item__text">캠페인</p>
                      </li>
                      <li className="list-type4-item__share-filter">
                        <div className="select__section select-type1-small">
                          <button className="select__label">
                            <span className="select__label-text">구분</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item is-selected">
                                    <span className="select-option__item-text">전체</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">비공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">공개</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">수정</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-type4-item__share-group">
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
                      </li>
                      <li className="list-type4-item__history">
                        <div className="list-type4-item__history-user">
                          <p className="list-type4-item__text">홍길동 수정</p>
                        </div>
                        <div className="list-type4-item__history-date">
                          <p className="list-type4-item__text color-gray--600">2022-02-18</p>
                        </div>
                      </li>
                      <li className="list-type4-item__more">
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
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type5</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type5__section">
              <ul className="list-type5__group">
                <li>
                  {/* 선택했을 때 is-selected */}
                  <div className="list-type5-item__section is-selected">
                    <ul className="list-type5-item__list">
                      <li className="list-type5-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck500"
                          id="ck500"
                          label=""
                        />
                      </li>
                      <li className="list-type5-item__ico">
                        <IcoSvg data={icoSvgData.telephone} />
                      </li>
                      <li className="list-type5-item__contents">
                        <Button
                          elem="a"
                          url={'#!'}
                          label={'중앙일보 서정민 전화 통화'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                        />
                        <div className="list-type5-contents__flex">
                          <div className="list-type5-contents__comment">
                            <p className="list-type5-contents__text">댓글 2</p>
                          </div>
                          <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 내부 클릭 요소 "클릭 시", is-not-active 클래스 추가 */}
                  <div className="list-type5-item__section is-not-active">
                    <ul className="list-type5-item__list">
                      <li className="list-type5-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck501"
                          id="ck501"
                          label=""
                        />
                      </li>
                      <li className="list-type5-item__ico">
                        <IcoSvg data={icoSvgData.envelope} />
                      </li>
                      <li className="list-type5-item__contents">
                        <Button
                          elem="a"
                          url={'#!'}
                          label={'서정민 기자님, 기획 기사 관련 내용 취합해 공유 드립니다.'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                        />
                        <div className="list-type5-contents__flex">
                          <div className="list-type5-contents__comment">
                            <p className="list-type5-contents__text">댓글 20000</p>
                          </div>
                          <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type5-item__section">
                    <ul className="list-type5-item__list">
                      <li className="list-type5-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck502"
                          id="ck502"
                          label=""
                        />
                      </li>
                      <li className="list-type5-item__ico">
                        <IcoSvg data={icoSvgData.clock} />
                      </li>
                      <li className="list-type5-item__contents">
                        <Button
                          elem="a"
                          url={'#!'}
                          label={
                            '중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문 중앙일보 패션/뷰티 담당기자 순화동 본사 방문'
                          }
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                        />
                        <div className="list-type5-contents__flex">
                          <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type5-item__section">
                    <ul className="list-type5-item__list">
                      <li className="list-type5-item__check">
                        <FormInputBtn
                          type="checkbox"
                          name="ck503"
                          id="ck503"
                          label=""
                        />
                      </li>
                      <li className="list-type5-item__ico">
                        <IcoSvg data={icoSvgData.chatLeftText} />
                      </li>
                      <li className="list-type5-item__contents">
                        <Button
                          elem="a"
                          url={'#!'}
                          label={'중앙일보 패션/뷰티 담당기자 순화동 본사 방문'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                        />
                        <div className="list-type5-contents__flex">
                          <div className="list-type5-contents__comment">
                            <p className="list-type5-contents__text">댓글 20000</p>
                          </div>
                          <p className="list-type5-contents__text">전화 진행중 홍길동 03-15</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type6</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type6__section">
              <ul className="list-type6__group">
                <li>
                  <div className="list-type6-item__section">
                    <p className="list-type6-item__text">기자 3명을 초대해 미팅하는 것으로 결정했습니다.</p>
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
                    <p className="list-type6-item__text">기자 3명을 초대해 미팅하는 것으로 결정했습니다.</p>
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

        <h2 className="guide__title">list-type7</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
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

        <h2 className="guide__title">list-type8</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type8__section">
              <ul className="list-type8__group">
                <li>
                  {/* 선택 시, is-selected 클래스 추가 */}
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
                                  <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어
                                  개발
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
                              <b className="print">삼성</b>전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터
                              생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경 노력을 전시장 전면에
                              소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다. <b className="print">삼성</b>
                              전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화 대응과 자원 순환
                              제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트 사이니지 Q 시리즈
                              △원격관리(Remote Management) 기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 내부 클릭 요소 "클릭 시", is-not-active 클래스 추가 */}
                  <div className="list-type8-item__section is-not-active">
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
                                  기아자동차, ‘2021 베이징 국제모터쇼’ 참가해 전동화 사업 체제 전환과 Z세대 공략 중국 내
                                  중장기 전략과 비전 발표
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
                              <b className="print">삼성</b>전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터
                              생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경 노력을 전시장 전면에
                              소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다. <b className="print">삼성</b>
                              전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화 대응과 자원 순환
                              제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트 사이니지 Q 시리즈
                              △원격관리(Remote Management) 기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
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
                              삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터 생산·포장·사용·폐기까지
                              제품 생애주기(Product Life Cycle)별 친환경 노력을 전시장 전면에 소개하며, 지속 가능한
                              미래를 위한 비전을 다시 한번 강조한다. 삼성전자의 친환경 상업용 디스플레이 제품을
                              사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해
                              △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
                              ‘매직인포(MagicINFO)' 솔루션을 소개한다. 삼성전자는 지난해 9월 발표한 신 환경경영전략을
                              바탕으로 소재부터 생산·포장·사용·폐기까지 제품 생애주기(Product Life Cycle)별 친환경
                              노력을 전시장 전면에 소개하며, 지속 가능한 미래를 위한 비전을 다시 한번 강조한다.
                              삼성전자의 친환경 상업용 디스플레이 제품을 사용함으로써 고객들이 기후 변화 대응과 자원
                              순환 제고에 동참할 수 있도록 했다. 이를 위해 △2023년형 스마트 사이니지 Q 시리즈
                              △원격관리(Remote Management) 기능을 강화한 ‘매직인포(MagicINFO)' 솔루션을 소개한다.
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
                                  <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어
                                  개발
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
                              삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터 생산·포장·사용·폐기까지
                              제품 생애주기(Product Life Cycle)별 친환경 노력을 전시장 전면에 소개하며, 지속 가능한
                              미래를 위한 비전을 다시 한번 강조한다. 삼성전자의 친환경 상업용 디스플레이 제품을
                              사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해
                              △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
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
                                  <b className="print">삼성</b>전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어
                                  개발
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
                              삼성전자는 지난해 9월 발표한 신 환경경영전략을 바탕으로 소재부터 생산·포장·사용·폐기까지
                              제품 생애주기(Product Life Cycle)별 친환경 노력을 전시장 전면에 소개하며, 지속 가능한
                              미래를 위한 비전을 다시 한번 강조한다. 삼성전자의 친환경 상업용 디스플레이 제품을
                              사용함으로써 고객들이 기후 변화 대응과 자원 순환 제고에 동참할 수 있도록 했다. 이를 위해
                              △2023년형 스마트 사이니지 Q 시리즈 △원격관리(Remote Management) 기능을 강화한
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
        </div>

        <h2 className="guide__title">list-type9</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type9__section">
              <div className="list-type9__header">
                <ul className="interval-mt12">
                  <li>
                    <div className="list-type9-header__title">뉴스24개</div>
                  </li>
                  <li>
                    <div className="list-type9-header__sub-title">
                      <div className="list-type9-header__title">
                        종합일간 신문 <span className="count">3</span>
                      </div>

                      <div className="list-type9-header__buttons">
                        <Button
                          label={'위'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.chevronThickLeft}
                          icoSize={16}
                        />
                        <Button
                          label={'아래'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.chevronThickLeft}
                          icoSize={16}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <ul className="list-type9__group">
                <li>
                  {/* 
                    드래그 영역 => search-type9-item__section
                      ㄴ 드래그 시 is-dragged 클래스 추가
                      ㄴ cursor 적용 (잡을 수 있는 상태, 잡고 있는 상태 2종류)
                    */}
                  <div className="list-type9-item__section is-dragged">
                    <ul className="list-type9-item__list">
                      <li className="button drag">
                        <IcoSvg data={icoSvgData.gripVertical} />
                      </li>
                      <li>
                        <p className="list-type9-item__title">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </p>
                        <p className="list-type9-item__info">
                          <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                        </p>
                      </li>
                      <li className="button close">
                        <Button
                          label={'닫기'}
                          cate={'ico-only'}
                          size={'s24'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="list-type9-item__section">
                    <ul className="list-type9-item__list">
                      <li className="button drag">
                        <IcoSvg data={icoSvgData.gripVertical} />
                      </li>
                      <li>
                        <p className="list-type9-item__title">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </p>
                        <p className="list-type9-item__info">
                          <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                        </p>
                      </li>
                      <li className="button close">
                        <Button
                          label={'닫기'}
                          cate={'ico-only'}
                          size={'s24'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 드래그가 되지 않을 때 => is-not-dragged 클래스 추가 */}
                  <div className="list-type9-item__section is-not-dragged">
                    <ul className="list-type9-item__list">
                      <li>
                        <p className="list-type9-item__title">
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'LG전자, 에어수비드 기능 갖춘 ‘인스타뷰 씽큐 오븐’ 공개'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </p>
                        <p className="list-type9-item__info">
                          <span>2021년 4월 12일 14:30</span> <span>중앙일보</span> <span>서정민</span>
                        </p>
                      </li>
                      <li className="button close">
                        <Button
                          label={'닫기'}
                          cate={'ico-only'}
                          size={'s24'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type10</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type10__section">
              <ul className="list-type10__group">
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck01"
                      id="ck01"
                      label="내가 소유한 콘텐츠를 누군가가 수정했을 때"
                    />
                  </div>
                </li>
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck02"
                      id="ck02"
                      label="내가 소유한 콘텐츠에 누군가가 댓글을 달았을 때"
                    />
                  </div>
                </li>
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck03"
                      id="ck03"
                      label="내가 생성하거나 수정한 콘텐츠를 누군가가 수정했을 때"
                    />
                  </div>
                </li>
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck04"
                      id="ck04"
                      label="내가 댓글을 단 콘텐츠를 누군가가 수정했을 때"
                    />
                  </div>
                </li>
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck05"
                      id="ck05"
                      label="내가 댓글을 단 콘텐츠에 누군가가 댓글을 달았을 때"
                    />
                  </div>
                </li>
                <li>
                  <div className="list-type10__item">
                    <FormInputBtn
                      type="checkbox"
                      name="ck06"
                      id="ck06"
                      label="내 회원 회원정보나 권한, 그룹이 변경되었을 때"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="guide__title">list-type11</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="list-type11__section">
              <ul className="list-type11__group">
                <li>
                  {/* 클릭 시 페이지 이동 */}
                  <div className="list-type11-item__section is-not-active">
                    <div className="list-type11-item__group">
                      <div className="list-type11-item__thumb">
                        {/* 프로필 이미지 없을 때 */}
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a target="_blank">
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.personFill}
                              size={'s100'}
                              icoSize={'s50'}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="list-type11-item__contents">
                        <h4 className="list-type11-item__title">매일경제 편집국 개편 is-not-active 추가</h4>
                        <p className="list-type11-item__desc">
                          회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                          있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                          웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성 회사의 홍보
                          채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고 있습니다.
                          보도자료부터 시작해
                        </p>
                        <p className="list-type11-item__text">2020-09-09</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="list-type11-item__section">
                    <div className="list-type11-item__group">
                      <div className="list-type11-item__thumb">
                        {/* 기업 로고 이미지 없을 때 */}
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a target="_blank">
                            <IcoAvatar
                              label={'이미지없음'}
                              icoData={icoSvgData.company}
                              size={'s100'}
                              icoSize={'s50'}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="list-type11-item__contents">
                        <h4 className="list-type11-item__title">조선일보 홍길동 기자 편집국장 임명</h4>
                        <p className="list-type11-item__desc">
                          회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                          있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                          웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 만듬.
                        </p>
                        <p className="list-type11-item__text">2020-09-09</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="list-type11-item__section">
                    <div className="list-type11-item__group">
                      <div className="list-type11-item__thumb">
                        {/* 이미지 있을 때 - 정사각형 기준 */}
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a target="_blank">
                            <Image
                              src={tempImg}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="list-type11-item__contents">
                        <h4 className="list-type11-item__title">한겨레 편집국 개편</h4>
                        <p className="list-type11-item__desc">
                          회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                          있습니다. 보도자료부터 시작해 제품.
                        </p>
                        <p className="list-type11-item__text">2020-09-09</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="list-type11-item__section">
                    <div className="list-type11-item__group">
                      <div className="list-type11-item__thumb">
                        {/* 이미지 있을 때 - 직사각형 기준 */}
                        <Link
                          href="#!"
                          legacyBehavior
                        >
                          <a target="_blank">
                            <Image
                              src={temp2Img}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                              objectFit="contain"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="list-type11-item__contents">
                        <h4 className="list-type11-item__title">중앙일보 김길동 기자 편집국장 임명</h4>
                        <p className="list-type11-item__desc">
                          회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                          있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                          웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성회사의 홍보 채널이
                          다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고 있습니다.
                          보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글, 웹사이트
                          공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성회사의 홍보 채널이
                          다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고 있습니다.
                          보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글, 웹사이트
                          공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성
                        </p>
                        <p className="list-type11-item__text">2020-09-09</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
