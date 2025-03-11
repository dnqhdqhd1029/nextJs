/**
 * @file myinquiry.tsx
 * @description 내문의 리스트 상세
 */
import { da } from 'date-fns/locale'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import MyInquiryDetailContent from '~/components/contents/myInquiry/detail/Contents'
import MyInquiryDetailLoading from '~/components/contents/myInquiry/detail/LoadingBox'
import MyInquiryDetailResponse from '~/components/contents/myInquiry/detail/Response'
import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const MyInquiryDetail = () => {
  const router = useRouter()
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const { isDetailLoading } = useCustomerCenter()
  return (
    <>
      <div className="mb-container responsive-type1 customer-type2">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-center__contents max-w960">
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
                          onClick={() => router.back()}
                        />
                      </div>
                      <h2 className="common-title__title">내 문의</h2>
                    </div>
                  </div>
                </div>

                {accessToken !== '' ? (
                  <div className="customer-detail__group type-qna">
                    <div className="customer-detail-contents__qna">
                      {isDetailLoading ? (
                        <MyInquiryDetailLoading />
                      ) : (
                        <>
                          <MyInquiryDetailContent />
                          <MyInquiryDetailResponse />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="customer-center__group">
                    <div className="customer-center-contents__log">
                      <p className="font-body__regular">로그인이 필요합니다.</p>
                      <p className="font-body__regular">
                        <Button
                          elem="a"
                          label={'로그인'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => router.push('/member/login')}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyInquiryDetail
