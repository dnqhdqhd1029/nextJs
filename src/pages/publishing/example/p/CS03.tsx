/**
 * @file CS03.tsx
 * @description CS03 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 customer-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-center__contents max-w960">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <h2 className="common-title__title">내 문의</h2>
                  </div>
                </div>

                <div className="customer-center__group">
                  <div className="customer-center__list">
                    <ul className="customer-center-list__group">
                      <li>
                        <div className="customer-center-list__qna">
                          <div className="qna__title">
                            <Button
                              elem="a"
                              url="#!"
                              label={'사용자는 어떻게 초대하나요?'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-text'}
                            />
                          </div>
                          <div className="qna__date">
                            <p>09-24</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__qna">
                          <div className="qna__title">
                            <Button
                              elem="a"
                              url="#!"
                              label={'페이지가 작동하지 않습니다.'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-text'}
                            />
                          </div>
                          <div className="qna__answer">
                            <p>답변 1</p>
                          </div>
                          <div className="qna__date">
                            <p>07-19</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__qna">
                          <div className="qna__title">
                            <Button
                              elem="a"
                              url="#!"
                              label={'보도자료 배포가 안됩니다.'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-text'}
                            />
                          </div>
                          <div className="qna__answer">
                            <p>답변 2</p>
                          </div>
                          <div className="qna__date">
                            <p>05-24</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__qna">
                          <div className="qna__title">
                            <Button
                              elem="a"
                              url="#!"
                              label={'템플릿을 어떻게 복사하나요?'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-text'}
                            />
                          </div>

                          <div className="qna__date">
                            <p>02-24</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__qna">
                          <div className="qna__title">
                            <Button
                              elem="a"
                              url="#!"
                              label={'내가 추가한 언론인이 검색되지 않습니다.'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-text'}
                            />
                          </div>
                          <div className="qna__answer">
                            <p>답변 1</p>
                          </div>
                          <div className="qna__date">
                            <p>2021-09-24</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="customer-center__pagination">
                    <Pagination cate={'n1'} />
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
