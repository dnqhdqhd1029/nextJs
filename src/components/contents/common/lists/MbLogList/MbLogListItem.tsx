/**
 * @file MbLogList.tsx
 * @description 로그형 목록
 */

import Button from '~/components/common/ui/Button'
import type { LogListItem } from '~/types/contents/Common'

interface Props {
  item: LogListItem
}

const MbLogList = ({ item }: Props) => {
  return (
    <li>
      <div className="list-type7-item__section">
        <p className="list-type7-item__text">
          <span className="date">{item.date}</span>
          <span className="name">
            <Button
              elem="a"
              url={item.nameLink ?? '#!'}
              label={item.name}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
            />
          </span>
          <span className="history">{item.activity}</span>
        </p>
      </div>
    </li>
  )
}

export default MbLogList
