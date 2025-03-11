import DOMPurify from 'dompurify'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { downloadCompanyFile } from '~/utils/common/file'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const MyInquiryDetailResponse = () => {
  const { detailData, userSelectGroup } = useCustomerCenter()
  return (
    <div className="customer-detail-qna__answer">
      <ul className="customer-detail-qna-answer__list">
        {detailData?.inquiryResponseList && detailData?.inquiryResponseList.length > 0 && (
          <>
            {detailData.inquiryResponseList.map((items, index) => (
              <li key={'customer-detail-qna-answer__list' + index.toString() + items.regisAt}>
                <div className="customer-detail-qna__group">
                  <h2 className="customer-detail-qna__title">{index === 0 ? '답변' : '재답변'}</h2>
                  <div className="customer-detail-qna__table">
                    <dl className="dl-table-type1__section">
                      <dt>
                        <p className="dl-table-type1__text">제목</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{items.title}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">날짜</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{moment(items.regisAt).format('YYYY-MM-DD HH:mm')}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">내용</p>
                      </dt>
                      <dd>
                        <p
                          className="dl-table-type1__text"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize((items.content ?? '')?.replaceAll('ruby-text', 'block'), {
                              ADD_ATTR: ['target', 'rel'],
                            }),
                          }}
                        ></p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">첨부</p>
                      </dt>
                      <dd>
                        {items?.attachedList && items?.attachedList.length > 0 && (
                          <>
                            {items.attachedList.map(e => (
                              <p
                                className="dl-table-type1__text"
                                key={'answer__list_dl-table-type1__text' + e.attachedId + e.objectId}
                              >
                                <Button
                                  label={e?.name || ''}
                                  cate={'link-ico-text'}
                                  size={''}
                                  color={'body-link'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.download}
                                  download={true}
                                  onClick={() => downloadCompanyFile(e, userSelectGroup)}
                                />
                              </p>
                            ))}
                          </>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

export default MyInquiryDetailResponse
