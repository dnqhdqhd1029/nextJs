/**
 * @file header-search.tsx
 * @description header-search 페이지
 */

import Image from 'next/image'
import Link from 'next/link'

import tempImg from '/public/assets/png/temp.jpg'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">Header Search</h2>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">검색 결과 있을 때</h2>
          <div className="guide__group">
            <div className="header-search-result__section">
              <div className="header-search-result__input">
                <FormInputSearch placeholder="검색" />
                <div className="header-search-result__input-close">
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
              <div className="header-search-result__area">
                <div className="header-search-result__group">
                  <h6 className="header-search-result__title">언론인</h6>
                  <ul className="header-search-result__list">
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="header-search-result__item">
                          {/* 프로필 이미지 있을 때 */}
                          <div className="header-search-result__item-img">
                            <Image
                              src={tempImg}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                            />
                          </div>

                          <div className="header-search-result__item-txt">
                            <p className="name">서정민</p>
                            <p className="corp">중앙일보 문화부 기자</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="header-search-result__item">
                          {/* 프로필 이미지 없을 때 */}
                          <IcoAvatar
                            label={'아이콘이름'}
                            icoData={icoSvgData.personFill}
                          />

                          <div className="header-search-result__item-txt">
                            <p className="name">이훈성</p>
                            <p className="corp">한국일보 편집국 산업부 차장</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="header-search-result__item">
                          <div className="header-search-result__item-img">
                            <Image
                              src={tempImg}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                            />
                          </div>
                          <div className="header-search-result__item-txt">
                            <p className="name">서정민</p>
                            <p className="corp">중앙일보 문화부 기자</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="header-search-result__btn">
                    <Button
                      label={'전체 언론인 검색'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </div>
                </div>
                <div className="header-search-result__group">
                  <h6 className="header-search-result__title">매체</h6>
                  <ul className="header-search-result__list">
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="header-search-result__item">
                          <div className="header-search-result__item-img">
                            <Image
                              src={tempImg}
                              width={500}
                              height={500}
                              alt="temp 프로필 이미지"
                            />
                          </div>
                          <div className="header-search-result__item-txt">
                            <p className="name">서정민</p>
                            <p className="corp">
                              중앙일보 문화부 기자중앙일보 문화부 기자중앙일보 문화부 기자중앙일보 문화부 기자중앙일보
                              문화부 기자중앙일보 문화부 기자
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="header-search-result__item">
                          {/* 로고 이미지 없을 때, 아이콘 데이터값은 변경 예정 */}
                          <IcoAvatar
                            label={'아이콘이름'}
                            icoData={icoSvgData.lockFill}
                          />
                          <div className="header-search-result__item-txt">
                            <p className="name">중앙일보</p>
                            <p className="corp">종합일간신문</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="header-search-result__btn">
                    <Button
                      label={'전체 매체 검색'}
                      cate={'default'}
                      size={'m'}
                      color={'outline-secondary'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">검색 결과 없을 때</h2>
          <div className="guide__group">
            <div className="header-search-result__section">
              <div className="header-search-result__area">
                <div className="select-search-option__group">
                  <h6 className="select-search-option__title">언론인</h6>
                  <p className="select-search-option__none">검색 결과가 없습니다.</p>
                  <div className="select-search-option__btn">
                    <Button
                      elem="a"
                      url={'https://www.naver.com/'}
                      label={"'서정민' 언론인에 추가"}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                </div>
                <div className="select-search-option__group">
                  <h6 className="select-search-option__title">매체</h6>
                  <p className="select-search-option__none">검색 결과가 없습니다.</p>
                  <div className="select-search-option__btn">
                    <Button
                      elem="a"
                      url={'https://www.naver.com/'}
                      label={"'서정민' 매체에 추가"}
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
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
