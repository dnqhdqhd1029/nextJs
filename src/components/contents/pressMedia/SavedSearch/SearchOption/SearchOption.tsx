import { useRef } from 'react'

import MediaLeftOption from '~/components/contents/pressMedia/SavedSearch/SearchOption/Media/MediaLeftOption'
import MediaRightOption from '~/components/contents/pressMedia/SavedSearch/SearchOption/Media/MediaRightOption'
import PressLeftOption from '~/components/contents/pressMedia/SavedSearch/SearchOption/Press/PressLeftOption'
import PressRightOption from '~/components/contents/pressMedia/SavedSearch/SearchOption/Press/PressRightOption'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const SearchOption = () => {
  const { listDefine } = useSavedSearch()
  const getOpenRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="mb-contents conditions overflow-y"
      ref={getOpenRef}
      // style={{ maxHeight: 810 }}
    >
      {listDefine === 'press' ? (
        <div className="flexible__section type-n2">
          <PressLeftOption ref={getOpenRef} />
          <PressRightOption ref={getOpenRef} />
        </div>
      ) : (
        <div className="flexible__section type-n2">
          <MediaLeftOption ref={getOpenRef} />
          <MediaRightOption ref={getOpenRef} />
        </div>
      )}
    </div>
  )
}

export default SearchOption
