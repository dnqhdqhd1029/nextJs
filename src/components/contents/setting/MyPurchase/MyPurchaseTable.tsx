/**
 * @file MYLicenseTable
 * @description 설정 - 내구매
 */
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import Skeleton from '~/components/common/ui/Skeleton'
import { useMyPurchase } from '~/utils/hooks/contents/setting/useMyPurchase'

const NullPage = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <tr key={index}>
          <td>
            <Skeleton
              key={index}
              width={'100%'}
              height="25px"
            />
          </td>
          <td>
            <Skeleton
              key={index}
              width={'100%'}
              height="25px"
            />
          </td>
          <td>
            <Skeleton
              key={index}
              width={'100%'}
              height="25px"
            />
          </td>
          <td>
            <Skeleton
              key={index}
              width={'100%'}
              height="25px"
            />
          </td>
        </tr>
      ))}
    </>
  )
}

const MyPurchaseTable = () => {
  const { isLoading, payList, moveToDetail } = useMyPurchase()

  return (
    <div className="table-type4__section">
      <table>
        <caption>caption</caption>
        <thead>
          <tr>
            <th scope="col">상품</th>
            <th scope="col">사용권</th>
            <th scope="col">유효기간</th>
            <th scope="col">결제일</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            <>
              {payList.length > 0 ? (
                <>
                  {payList.map((e, index) => (
                    <tr key={index}>
                      <td>
                        <Button
                          label={e.productNameList?.toString() || ''}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => e.payRequestId && moveToDetail(e.payRequestId)}
                        />
                      </td>
                      <td>{e.licenseName}</td>
                      <td>
                        {moment(e.startAt).format('YYYY-MM-DD')} ~ {moment(e.expireAt).format('YYYY-MM-DD')}
                      </td>
                      <td>{moment(e.depositedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{ borderBottom: 'none' }}
                  >
                    <div className="search-result__nodata">
                      <p className="font-body__regular">결과가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ) : (
            <NullPage />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyPurchaseTable
