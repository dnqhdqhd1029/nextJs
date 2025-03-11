/**
 * @file ListTable.tsx
 * @description 목록 테이블
 */

import Skeleton from '~/components/common/ui/Skeleton'
import type { TableProps } from '~/types/contents/Common'

interface Props {
  tableData?: TableProps
  isPageLoadCompleted?: boolean
}

const TableBoardContent = ({ tableData, isPageLoadCompleted }: Props) => {
  const header = tableData?.header
  const rows = tableData?.rows

  if (!tableData) {
    return null
  }

  return (
    <>
      <div className="table-type4__section">
        <table>
          {header && (
            <thead>
              <tr>
                {header.map(item => (
                  <th
                    scope="col"
                    key={item.id}
                    style={{ width: item.width ?? 'auto' }}
                  >
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {isPageLoadCompleted ? (
            <>
              {rows && (
                <>
                  {rows.length > 0 ? (
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          {row.map((tData, tIndex) => (
                            <td key={tIndex}>
                              <div className="td-container">{tData.td && tData.td}</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={header?.length ?? 7}>
                          <div className="no-data__empty">데이터가 없습니다.</div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </>
              )}
            </>
          ) : (
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={`${_}${index}`}>
                  <>
                    {[...Array(header?.length)].map((_sub, index) => (
                      <td key={`${_sub}${index}`}>
                        <Skeleton
                          width={index === 5 || index === 2 ? '160px' : '100px'}
                          height="20px"
                          wrapperStyle={{
                            display: 'inline-flex',
                            minHeight: '30px',
                            alignItems: 'center',
                          }}
                        />
                      </td>
                    ))}
                  </>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  )
}

export default TableBoardContent
