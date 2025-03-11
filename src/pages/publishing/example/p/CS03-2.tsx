/**
 * @file CS03-2.tsx
 * @description CS03-2 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 customer-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-detail__section max-w960">
                <div className="customer-detail__header type-qna">
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
                      <h2 className="common-title__title">내 문의</h2>
                    </div>
                  </div>
                </div>

                <div className="customer-detail__group type-qna">
                  <div className="customer-detail-contents__qna">
                    <div className="customer-detail-qna__inquiry">
                      <div className="customer-detail-qna__group">
                        <h2 className="customer-detail-qna__title">문의</h2>
                        <div className="customer-detail-qna__table">
                          <dl className="dl-table-type1__section">
                            <dt>
                              <p className="dl-table-type1__text">제목</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">쿠폰 추가 문의 드립니다.</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">날짜</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">2020-09-09 12:00</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">분류</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">결제와 견적</p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">내용</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">
                                뉴스와이어 쿠폰 4개 추가 구매 요청을 드립니다. 연락 부탁드립니다.
                              </p>
                            </dd>
                            <dt>
                              <p className="dl-table-type1__text">첨부</p>
                            </dt>
                            <dd>
                              <p className="dl-table-type1__text">
                                <Button
                                  label={'견적서.pdf'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                />
                              </p>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>

                    <div className="customer-detail-qna__answer">
                      <ul className="customer-detail-qna-answer__list">
                        <li>
                          <div className="customer-detail-qna__group">
                            <h2 className="customer-detail-qna__title">답변</h2>
                            <div className="customer-detail-qna__table">
                              <dl className="dl-table-type1__section">
                                <dt>
                                  <p className="dl-table-type1__text">제목</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">Re: 문의 드립니다.</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">날짜</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">2020-09-09 12:00</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">내용</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    결제 링크를 보내드립니다. 여기에서 결제를 하시면 됩니다.
                                  </p>
                                  <p className="dl-table-type1__text">
                                    결제하기:{' '}
                                    <Button
                                      elem="a"
                                      url="http://www.newswire.co.kr"
                                      label={'http://www.newswire.co.kr'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </p>
                                  <p className="dl-table-type1__text">미디어비 000 드림</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">첨부</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    <Button
                                      label={'견적서.pdf'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </p>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="customer-detail-qna__group">
                            <h2 className="customer-detail-qna__title">답변</h2>
                            <div className="customer-detail-qna__table">
                              <dl className="dl-table-type1__section">
                                <dt>
                                  <p className="dl-table-type1__text">제목</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">Re: 문의 드립니다.</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">날짜</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">2020-09-09 12:00</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">내용</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    결제 링크를 보내드립니다. 여기에서 결제를 하시면 됩니다.
                                  </p>
                                  <p className="dl-table-type1__text">
                                    결제하기:{' '}
                                    <Button
                                      elem="a"
                                      url="http://www.newswire.co.kr"
                                      label={'http://www.newswire.co.kr'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </p>
                                  <p className="dl-table-type1__text">미디어비 000 드림</p>
                                </dd>
                                <dt>
                                  <p className="dl-table-type1__text">첨부</p>
                                </dt>
                                <dd>
                                  <p className="dl-table-type1__text">
                                    <Button
                                      label={'견적서.pdf'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />
                                  </p>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </li>
                      </ul>
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
Sample.PublishingLayout = 'LAYOUT6'
