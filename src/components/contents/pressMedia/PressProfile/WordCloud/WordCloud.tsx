import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { SelectListOptionItem } from '~/types/common'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const WordCloud = () => {
  const { journalistTagTypeList, journalIdKey, wordCloudTagTypeList, wordCloudTagType, setWordCloudTagType } =
    usePressProfile()
  const updateButtonLayerRef = useRef<HTMLDivElement>(null)
  const [isSelected, setIsSelected] = useState(false)
  const [isWordCloudLoading, setIsWordCloudLoading] = useState(true)

  const getWordCloud = async (e: SelectListOptionItem) => {
    setIsWordCloudLoading(() => true)
    await setWordCloudTagType(e, journalIdKey)
    setIsSelected(() => false)
    setIsWordCloudLoading(() => false)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (updateButtonLayerRef.current && !updateButtonLayerRef.current.contains(e.target as Node))
        setIsSelected(() => false)
    },
    [isSelected]
  )

  useEffect(() => {
    setIsSelected(() => false)
  }, [wordCloudTagTypeList])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div className="flexible-item__group">
      <div className="flexible-item__header">
        <h4 className="font-heading--h5">자주 쓰는 단어</h4>
        <div
          className="select__section select-type1-medium select-align-right"
          ref={updateButtonLayerRef}
        >
          <button
            className="select__label"
            onClick={() => setIsSelected(!isSelected)}
          >
            <span className="select__label-text">{wordCloudTagType.name}</span>
            <IcoSvg data={icoSvgData.chevronDown} />
          </button>

          <div className={cn('select-option__section', { 'display-block': isSelected })}>
            <div className="select-option__area">
              <ul className="select-option__group">
                {journalistTagTypeList &&
                  journalistTagTypeList.length > 0 &&
                  journalistTagTypeList.map(e => (
                    <li key={'journalistTagTypeList_li' + e.id + e.name}>
                      <button
                        className="select-option__item"
                        onClick={() => getWordCloud(e)}
                      >
                        <span className="select-option__item-text">{e.name}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flexible-item__contents">
        <div className="flexible-item__keywords">
          {wordCloudTagTypeList &&
            wordCloudTagTypeList.length > 0 &&
            wordCloudTagTypeList.map(e => (
              <p
                key={'wordCloudTagTypeList_p' + e.name + e.value}
                className={`flexible-item__keyword-s${e.value.toString()}`}
              >
                {e.name}
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default WordCloud
