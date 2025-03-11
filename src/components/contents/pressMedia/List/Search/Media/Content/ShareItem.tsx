import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { DefaultShareFilterOptionList } from '~/components/contents/pressMedia/List/Search/defaultData'
import { mediaContentListProps } from '~/stores/modules/contents/pressMedia/mediaListManagement'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const ShareItem = (props: mediaContentListProps) => {
  const { shareCodeChangeAction } = useMediaListManagement()

  const [isOpen, setIsOpen] = useState(false)
  const shareOpenRef = useRef<HTMLLIElement>(null)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareOpenRef.current && !shareOpenRef.current.contains(e.target as Node)) setIsOpen(() => false)
    },
    [isOpen]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <li
      className="list-type4-item__share-filter"
      id={'list-type4-item__share-filter' + props.mediaListId}
      ref={shareOpenRef}
    >
      <div className="select__section select-type1-small">
        <button
          className="select__label"
          onClick={() => setIsOpen(() => !isOpen)}
        >
          <span className="select__label-text">{props?.shareCodeNm}</span>
          <IcoSvg data={icoSvgData.chevronDown} />
        </button>
        <div
          className={cn('select-option__section', {
            'display-block': isOpen,
          })}
          style={{ background: '#fff' }}
        >
          <div className="select-option__area">
            <ul className="select-option__group">
              {DefaultShareFilterOptionList.map(e => (
                <li key={'DefaultShareFilterOptionList' + e.id + e.name}>
                  <button
                    className={cn('select-option__item', {
                      'is-selected': props?.shareCode === e.id,
                    })}
                    onClick={() => shareCodeChangeAction(Number(props.mediaListId), e.id, props.title)}
                  >
                    <span className="select-option__item-text">{e.name}</span>
                    <span className="select-option__item-ico">
                      <IcoSvg data={icoSvgData.checkThick} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ShareItem
