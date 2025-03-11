import { useRef } from 'react'

import LeftOption from '~/components/contents/monitoring/MonitoringList/SearchOption/LeftOption'
import RightOption from '~/components/contents/monitoring/MonitoringList/SearchOption/RightOption'

const SearchOption = () => {
  const getOpenRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="mb-contents conditions overflow-y"
      //style={{ maxHeight: 810 }}
    >
      <div
        className="flexible__section type-n2"
        ref={getOpenRef}
      >
        <LeftOption ref={getOpenRef} />
        <RightOption ref={getOpenRef} />
      </div>
    </div>
  )
}

export default SearchOption
