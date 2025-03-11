import moment from 'moment'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { downloadCompanyFile } from '~/utils/common/file'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const MyInquiryDetailContent = () => {
  const { detailData, userSelectGroup } = useCustomerCenter()
  return (
    <>
      {detailData && (
        <div className="customer-detail-qna__inquiry">
          <div className="customer-detail-qna__group">
            <h2 className="customer-detail-qna__title">문의</h2>
            <div className="customer-detail-qna__table">
              <dl className="dl-table-type1__section">
                <dt>
                  <p className="dl-table-type1__text">제목</p>
                </dt>
                <dd>
                  <p className="dl-table-type1__text">{detailData.title}</p>
                </dd>
                <dt>
                  <p className="dl-table-type1__text">날짜</p>
                </dt>
                <dd>
                  <p className="dl-table-type1__text">{moment(detailData.regisAt).format('YYYY-MM-DD HH:mm')}</p>
                </dd>
                <dt>
                  <p className="dl-table-type1__text">분류</p>
                </dt>
                <dd>
                  <p className="dl-table-type1__text">{detailData.whyCode}</p>
                </dd>
                <dt>
                  <p className="dl-table-type1__text">내용</p>
                </dt>
                <dd>
                  <p className="dl-table-type1__text">{detailData.content}</p>
                </dd>
                <dt>
                  <p className="dl-table-type1__text">첨부</p>
                </dt>
                <dd>
                  {detailData?.attachedList && detailData?.attachedList.length > 0 && (
                    <>
                      {detailData.attachedList.map(e => (
                        <p
                          className="dl-table-type1__text"
                          key={'dl-table-type1__text' + e.objectId}
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
        </div>
      )}
    </>
  )
}

export default MyInquiryDetailContent
