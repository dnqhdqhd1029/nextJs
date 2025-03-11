/**
 * @file NW04.tsx
 * @description NW04 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp.jpg'
import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner distribute">
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="distribute-steps__header">
                <h2 className="distribute-steps-header__title">보도자료 배포: 확인</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">설정</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">내용</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">확인</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__contents">
              <div className="distribute-steps__section">
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">기본정보</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <ul>
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">배포명</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            클라우드 기반 통합 회사 홍보 서비스 ‘미디어비’ 출시, 언론 배포 보도자료
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">프로젝트</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'3분기 신제품 홍보'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">태그</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'미디어비'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'회사 홍보'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'클라우드'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">보도자료</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <ul>
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">언어</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">국문</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">제목</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            뉴스와이어, 클라우드 기반 통합 회사 홍보 서비스 '미디어비' 출시
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">내용</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            온라인 보도자료 배포 서비스의 선두 주자인 뉴스와이어는 웹사이트를 전면적으로 리뉴얼해 회사와
                            언론인이 쉽게 쓸 수 있게 했다고 19일 밝혔다.
                            <br />
                            <br />
                            이번 사이트 개편은 이용자의 사용성과 가독성을 강화하고, ‘최고의 회사 홍보 서비스’라는 브랜드
                            이미지를 강화하는 데에 초점을 두었다.
                            <br />
                            <br />- 중략 -
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">언론연락처</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            삼성전자
                            <br />
                            커뮤니케이션팀
                            <br />
                            02-123-4567
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">회사 개요</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">-</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">관련 링크</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            삼성전자:{' '}
                            <Button
                              elem="a"
                              url={'http://Samsung.com/sec'}
                              label={'http://Samsung.com/sec'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">사진과 동영상</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <ul className="distribute-media__list">
                    <li>
                      <div className="distribute-media__item">
                        <h6 className="distribute-media-item__cate">사진</h6>
                        <div className="distribute-media-item__thumb">
                          <Image
                            src={tempImg}
                            width={640}
                            height={458}
                            alt="temp 이미지"
                          />
                        </div>
                        <p className="distribute-media-item__desc">
                          삼성전자가 2021 에코패키지 챌린지 공모전을 소개하고 있다.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="distribute-media__item">
                        <h6 className="distribute-media-item__cate">동영상</h6>
                        <div className="distribute-media-item__thumb type-movie">동영상 영역</div>
                        <p className="distribute-media-item__desc">
                          “My Time at Portia”의 모바일 버전이 App Store와 Google Play에서 사전 예약을 진행하고 있습니다!
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">뉴스와이어 정보</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <ul>
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">뉴스 발표지</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">서울</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">발송 시간</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">예약(2021-06-12 10:00)</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">산업분야</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">가전, 소프트웨어</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">주제</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">신상품</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">게재 알림</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            나
                            <Button
                              elem="a"
                              url={'mailto:gildong.hong@naver.com'}
                              label={'(gildong.hong@naver.com)'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                            ,{' '}
                            <Button
                              elem="a"
                              url={'mailto:abc12345@gmail.com'}
                              label={'abc12345@gmail.com'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">요청사항</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">보도자료 내용의 오탈자 검토 및 문장 편집 요청합니다.</p>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__footer">
              <div className="distribute-steps__footer">
                <FooterButton left={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
