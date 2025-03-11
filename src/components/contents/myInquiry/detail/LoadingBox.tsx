import Skeleton from '~/components/common/ui/Skeleton'

const MyInquiryDetailLoading = () => {
  return (
    <div className="customer-detail-qna__inquiry">
      <div className="customer-detail-qna__group">
        <h2 className="customer-detail-qna__title">문의</h2>
        <div className="customer-detail-qna__table">
          <dl className="dl-table-type1__section">
            <dt>
              <p className="dl-table-type1__text">제목</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                <Skeleton
                  width={'860px'}
                  height={'21px'}
                />
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">날짜</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                <Skeleton
                  width={'860px'}
                  height={'21px'}
                />
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">분류</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                <Skeleton
                  width={'860px'}
                  height={'21px'}
                />
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">내용</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                <Skeleton
                  width={'860px'}
                  height={'21px'}
                />
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">첨부</p>
            </dt>
            <dd>
              {Array.from({ length: 10 }).map((_, index) => (
                <p
                  className="dl-table-type1__text"
                  key={'dl-table-type1__text' + index}
                >
                  <Skeleton
                    width={'860px'}
                    height={'21px'}
                  />
                </p>
              ))}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default MyInquiryDetailLoading
