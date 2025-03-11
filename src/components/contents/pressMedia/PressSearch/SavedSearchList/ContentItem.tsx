import cn from 'classnames'
import { useRouter } from 'next/router'

import { pressMediaContentListProps } from '~/stores/modules/contents/pressMedia/pressSearch'

interface Props {
  item: pressMediaContentListProps
  type: string
}
const ContentItem = (props: Props) => {
  const router = useRouter()
  return (
    <li
      className={cn({
        'is-selected': false,
      })}
    >
      <button
        className="accordion-type1-panel__option-item"
        onClick={() =>
          router.push(
            props.type === 'media'
              ? `/media/saved-search?media_contact_id=${props.item.contact_id}`
              : `/contacts/saved-search?journal_contact_id=${props.item.contact_id}`
          )
        }
      >
        <span>{props.item.title}</span>
      </button>
    </li>
  )
}

export default ContentItem
