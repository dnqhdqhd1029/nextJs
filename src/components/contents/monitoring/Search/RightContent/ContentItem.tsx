import cn from 'classnames'
import { useRouter } from 'next/router'

import type { NewsSrchDto } from '~/types/api/service'

const ContentItem = (props: NewsSrchDto) => {
  const router = useRouter()

  return (
    <li
      className={cn({
        'is-selected': false,
      })}
    >
      <button
        className="accordion-type1-panel__option-item"
        onClick={() => router.push(`/news/monitoring?monitoring_id=${props.newsSrchId}`)}
      >
        <span>{props.title}</span>
      </button>
    </li>
  )
}

export default ContentItem
