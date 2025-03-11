/**
 * @file MB01.tsx
 * @description MB01 페이지
 */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import tempImg from '/public/assets/png/temp.jpg'
import temp2Img from '/public/assets/png/temp2.jpg'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const [search, setSearch] = useState(false)
  return (
    <>
      <div className="mb-container responsive-type1 bg-body type-pb24">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="service-search__header">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">회원 정보</h2>
                  <div className="common-title__buttons type-search">
                    {search ? (
                      <>
                        <FormInputSearch />
                        <Button
                          label={'정렬'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'transparent'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                          onClick={() => setSearch(false)}
                        />
                      </>
                    ) : (
                      <Button
                        label={'검색'}
                        cate={'ico-only'}
                        size={'s'}
                        color={'body-text'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.search}
                        icoSize={18}
                        onClick={() => setSearch(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-search-contents__section">
              <p className="service-search-result__msg">검색 결과 120개</p>
              <div className="service-search-contents__list">
                <div className="list-type11__section">
                  <ul className="list-type11__group">
                    <li>
                      {/* 클릭 시 페이지 이동 */}
                      <div className="list-type11-item__section is-not-active">
                        <div className="list-type11-item__group">
                          {/* [D] 이미지 없을 때, type-bd-none 클래스 추가 */}
                          <div className="list-type11-item__thumb type-bd-none">
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
                              회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그,
                              SNS 게시글, 웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성
                              회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해
                            </p>
                            <p className="list-type11-item__text">2020-09-09</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="list-type11-item__section">
                        <div className="list-type11-item__group">
                          <div className="list-type11-item__thumb type-bd-none">
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
                              회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그,
                              SNS 게시글, 웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 만듬.
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
                              회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품.
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
                              회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그,
                              SNS 게시글, 웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를
                              작성회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그,
                              SNS 게시글, 웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를
                              작성회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이
                              요구되고 있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그,
                              SNS 게시글, 웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성
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
            <div className="mb-contents-footer__section type-pagination">
              <Pagination cate={'n3'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
