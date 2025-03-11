/**
 * @file MbLogList.tsx
 * @description 로그형 목록
 */

import MbLogListItem from '~/components/contents/common/lists/MbLogList/MbLogListItem'
import type { LogListItem } from '~/types/contents/Common'

interface Props {
  data: LogListItem[]
}

const MbLogList = ({ data: dataProps }: Props) => {
  return (
    <div className="list-type7__section">
      <ul className="interval-mt14">
        {dataProps.map((item, index) => (
          <MbLogListItem
            key={index}
            item={item}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbLogList
