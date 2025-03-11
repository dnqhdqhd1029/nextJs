import { CSSProperties, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import icoSvgDataCircle from '~/components/common/ui/icon/icoSvgDataCircle.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/components/common/ui/IcoSvgCircle'
import { SelectListOptionItem } from '~/types/common'

interface Props {
  topLayerList?: SelectListOptionItem[]
  topLayerListAction?: (e: SelectListOptionItem) => void
}
const DropDownButtonNoList = (props: Props) => {
  const topLayerRef = useRef<HTMLDivElement>(null)

  const [topLayer, setTopLayer] = useState<boolean>(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (topLayerRef.current && !topLayerRef.current.contains(e.target as Node)) setTopLayer(() => false)
    },
    [topLayer]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className={cn(
        `aside-search-header__button-group`,
        'select__section',
        'select-type1-small',
        // 'positon-inherit',
        'select-align-left',
        {
          'is-show': topLayer,
        }
      )}
      ref={topLayerRef}
    >
      <button
        type="button"
        className={'aside-search-header__button'}
        onClick={() => setTopLayer(prevState => !prevState)}
      >
        <IcoSvgCircle data={icoSvgDataCircle.adjust} />
      </button>
      <div className={cn('select-option__section', { 'display-block': topLayer })}>
        <div className="select-option__area">
          <ul className="select-option__group">
            {props.topLayerList &&
              props.topLayerList.length > 0 &&
              props.topLayerList.map(e => (
                <li key={'props_topLayerList' + e.id}>
                  <button
                    className={cn('select-option__item')}
                    onClick={() =>
                      setTopLayer(() => {
                        props.topLayerListAction && props.topLayerListAction(e)
                        return false
                      })
                    }
                  >
                    <span className="select-option__item-text">{e.name}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default DropDownButtonNoList
