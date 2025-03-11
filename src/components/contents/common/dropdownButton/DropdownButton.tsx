import { CSSProperties, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import icoSvgDataCircle from '~/components/common/ui/icon/icoSvgDataCircle.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/components/common/ui/IcoSvgCircle'
import { SelectListOptionItem } from '~/types/common'

interface Props {
  mainText?: string
  mainButtonDisabled?: boolean
  icoSvgData?: string
  selectedValue?: string
  topLayerList?: SelectListOptionItem[]
  topLayerStyle?: CSSProperties
  listLayerStyle?: CSSProperties
  divListLayerStyle?: CSSProperties
  ulLayerStyle?: CSSProperties
  liLayerStyle?: CSSProperties
  liButtonLayerStyle?: CSSProperties
  spanLayerStyle?: CSSProperties
  direction?: string
  classNameTopLayerRef?: string
  classNameButtonLayerRef?: string
  buttonLayerListAction?: () => void
  topLayerListAction?: (e: SelectListOptionItem) => void
}
const DropDownButton = (props: Props) => {
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
        props.classNameTopLayerRef
          ? props.classNameTopLayerRef
          : `select__section select-type1-small select-ico-only select-align-right`,
        {
          'is-show': topLayer,
        }
      )}
      ref={topLayerRef}
      style={props.topLayerStyle}
    >
      <button
        className={props.classNameButtonLayerRef ? props.classNameButtonLayerRef : 'select__label'}
        disabled={props.mainButtonDisabled ? props.mainButtonDisabled : false}
        onClick={() =>
          props.buttonLayerListAction ? props?.buttonLayerListAction() : setTopLayer(prevState => !prevState)
        }
      >
        {props?.mainText && props?.mainText !== '' && <span className="select__label-text">{props?.mainText}</span>}
        {props.icoSvgData && props.icoSvgData === 'threeDotsVertical' && <IcoSvg data={icoSvgData.threeDotsVertical} />}
        {props.icoSvgData && props.icoSvgData === 'chevronDown' && <IcoSvg data={icoSvgData.chevronDown} />}
        {props.icoSvgData && props.icoSvgData === 'adjust' && <IcoSvgCircle data={icoSvgDataCircle.adjust} />}
      </button>
      {props.topLayerList && props.topLayerList.length > 0 && (
        <div
          className={cn(`select-option__section select-list__direction-${props.direction ? props.direction : 'down'}`, {
            'display-block': topLayer,
          })}
          style={props.listLayerStyle}
        >
          <div
            className="select-option__area"
            style={props.divListLayerStyle}
          >
            <ul
              className="select-option__group"
              style={props.ulLayerStyle}
            >
              {props.topLayerList &&
                props.topLayerList.length > 0 &&
                props.topLayerList.map(e => (
                  <li
                    key={'props_topLayerList' + e.id}
                    style={props.liLayerStyle}
                  >
                    <button
                      className={cn('select-option__item', {
                        'is-selected': props.selectedValue ? props.selectedValue === e.id.toString() : false,
                      })}
                      onClick={() => {
                        setTopLayer(() => {
                          props.topLayerListAction && props.topLayerListAction(e)
                          return false
                        })
                      }}
                      style={props.liButtonLayerStyle}
                    >
                      <span
                        className="select-option__item-text"
                        style={props.spanLayerStyle}
                      >
                        {e.name}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
export default DropDownButton
