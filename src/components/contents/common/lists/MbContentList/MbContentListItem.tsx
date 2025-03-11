/**
 * @file MbContentListItem.tsx
 * @description search-type1
 */
import { MouseEvent } from 'react'

import IcoSvg from '~/components/common/ui/IcoSvg'
import type { ContentListItem } from '~/types/contents/Common'

interface Props {
  item: ContentListItem
  index: number
}

const MbContentListItem = ({ item, index }: Props) => {
  const handleLinkClick = (e: MouseEvent<HTMLParagraphElement>) => {
    console.log('>> handleLinkClick: ', item.titleLink)
    e.preventDefault()
    e.stopPropagation()

    window.open(item.titleLink, '_blank')
  }
  return (
    <li
      data-year={item.firstOfYearItem ? item.year : undefined}
      key={index}
    >
      <div className="list-type1__item">
        {item.icon && (
          <div className="list-type1__ico">
            <IcoSvg data={item.icon} />
          </div>
        )}

        <div className="list-type1__text">
          {item.titleLink ? (
            <p
              className="point link-text"
              onClick={handleLinkClick}
            >
              {item.title}
            </p>
          ) : (
            <p className="point">{item.title}</p>
          )}

          <p>
            {item.status} {item.author} {item.date}
          </p>
        </div>
      </div>
    </li>
  )
}

export default MbContentListItem
