/**
 * @file myinquiry.tsx
 * @description 내문의 리스트
 */

import moment from 'moment'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Pagination from '~/components/common/ui/Pagination'
import Skeleton from '~/components/common/ui/Skeleton'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const MyInquiry = () => {
  const router = useRouter()
  const { isRefetching, isLoading, inquiryList, size, page, totalPageCount, setMediaPopupSizeAction } =
    useCustomerCenter()
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
                      {isRefetching || isLoading ? (
                        <>
                          {Array.from({ length: 10 }).map((_, index) => (
                            <li key={'qna__title_customer-center-list__group' + index.toString()}>
                              <div className="customer-center-list__qna">
                                <div className="qna__title">
                                  <Skeleton
                                    width={'638px'}
                                    height={'21px'}
                                  />
                                </div>
                                <div className="qna__answer">
                                  <Skeleton
                                    width={'79px'}
                                    height={'21px'}
                                  />
                                </div>
                                <div className="qna__date">
                                  <Skeleton
                                    width={'119px'}
                                    height={'21px'}
                                  />
                                </div>
                              </div>
                            </li>
                          ))}
                        </>
                      ) : (
                        <>
                          {inquiryList.map(e => (
                            <li key={'qna__title_customer-center-list__group' + e.inquiryId}>
                              <div className="customer-center-list__qna">
                                <div className="qna__title">
                                  <Button
                                    label={e?.title || ''}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-text'}
                                    onClick={() => e.inquiryId && router.push(`/help/my-inquiry/${e.inquiryId}`)}
                                  />
                                </div>
                                <div className="qna__answer">
                                  <p>{e.responseCount && e.responseCount > 0 ? `답변 ${e.responseCount}` : ''}</p>
                                </div>
                                <div className="qna__date">
                                  <p>{moment(e.regisAt).format('YYYY-MM-DD')}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="customer-center__pagination">
                    <Pagination
                      type={'n1'}
                      viewCount={size}
                      page={page}
                      count={totalPageCount}
                      onPageChange={e => setMediaPopupSizeAction(e)}
                    />
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

export default MyInquiry
