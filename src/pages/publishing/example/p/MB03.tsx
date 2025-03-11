/**
 * @file MB03.tsx
 * @description MB03 페이지
 */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import temp600x400 from '/public/assets/png/temp_600x400.png'
import temp2Img from '/public/assets/png/temp2.jpg'
import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
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
              <div className="service-search-contents__detail">
                <div className="service-search-detail__section">
                  <div className="service-search-detail__header">
                    <div className="detail-header__thumb">
                      {/* 이미지 있을 떄, 없을 때 => MB01, search-type11-item__thumb 참고  */}

                      {/* 로그인 전 */}
                      {/* <Image
                        src={temp2Img}
                        width={500}
                        height={500}
                        alt="temp 프로필 이미지"
                        objectFit="contain"
                      /> */}

                      {/* 로그인 후 */}
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
                    <div className="detail-header__contents">
                      <h4 className="detail-header__title">
                        삼성전자, 업계 최초 HKMG 공정 적용 고용량 DDR5 소프트웨어 개발 전략과 비전 발표
                      </h4>
                      <p className="detail-header__date">2020-09-09 09:09</p>
                    </div>
                  </div>
                  <div className="service-search-detail__contents">
                    <p>
                      회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                      있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                      웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성합니다.
                    </p>
                    <p>
                      회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                      있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                      웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성합니다.
                    </p>
                    <figure>
                      <Image
                        src={temp600x400}
                        width={600}
                        height={400}
                        alt="temp 프로필 이미지"
                      />
                      <figcaption>조선일보 사옥</figcaption>
                    </figure>
                    <p>
                      회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                      있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                      웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성합니다.
                    </p>
                    <p>
                      회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                      있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                      웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성합니다.
                    </p>
                    <p>
                      회사의 홍보 채널이 다양해지면서 그 어느 때보다 홍보 담당자에게 다양한 글쓰기 능력이 요구되고
                      있습니다. 보도자료부터 시작해 제품 및 서비스 소개 자료, 광고메일, 보고서, 블로그, SNS 게시글,
                      웹사이트 공지사항, 유튜브 영상 자막 등 경쟁력 있고 완성도 높은 콘텐츠를 작성합니다.
                    </p>
                  </div>
                </div>
                <div className="service-search-detail__aside">
                  <h3 className="service-search-aside__title">최신 브리핑</h3>
                  <ul className="service-search-aside__list">
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="service-search-aside__link">매일경제 편집국 개편</a>
                      </Link>
                      <p className="service-search-aside__date">2020-09-09</p>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="service-search-aside__link">
                          매일경제 편집국 개편 매일경제 편집국 개편 매일경제 편집국 개편매일경제 편집국 개편매일경제
                          편집국 개편매일경제 편집국 개편매일경제 편집국 개편매일경제 편집국 개편
                        </a>
                      </Link>
                      <p className="service-search-aside__date">2020-09-09</p>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="service-search-aside__link">매일경제 편집국 개편</a>
                      </Link>
                      <p className="service-search-aside__date">2020-09-09</p>
                    </li>
                    <li>
                      <Link
                        href="#!"
                        legacyBehavior
                      >
                        <a className="service-search-aside__link">매일경제 편집국 개편</a>
                      </Link>
                      <p className="service-search-aside__date">2020-09-09</p>
                    </li>
                  </ul>
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
