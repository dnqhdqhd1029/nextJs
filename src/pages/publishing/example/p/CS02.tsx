/**
 * @file CS02.tsx
 * @description CS02 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 customer-type1">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-center__header">
                <div className="customer-center-header__group type-result">
                  <h2 className="customer-center__title">무엇을 도와드릴까요?</h2>
                  <div className="customer-center__search">
                    <FormInputSearch
                      placeholder="궁금한 것을 검색해 보세요"
                      value="검색어"
                    />
                  </div>
                </div>
              </div>

              <div className="customer-center__contents max-w960">
                <div className="customer-center__group">
                  <h3 className="customer-center__subtitle">도움말 검색</h3>
                  <div className="customer-center__list">
                    <ul className="customer-center-list__group">
                      <li>
                        <div className="customer-center-list__item">
                          <Button
                            elem="a"
                            url="#!"
                            label={'언론인 목록 만들기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__item">
                          <Button
                            elem="a"
                            url="#!"
                            label={'미디어 목록 만들기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__item">
                          <Button
                            elem="a"
                            url="#!"
                            label={'모니터링 설정하기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__item">
                          <Button
                            elem="a"
                            url="#!"
                            label={'활동 삭제하기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="customer-center-list__item">
                          <Button
                            elem="a"
                            url="#!"
                            label={'보도자료 배포 템플릿 복사하기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                          />
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
