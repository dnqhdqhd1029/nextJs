import { forwardRef, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import { IcoArrowMove } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Loader from '~/components/common/ui/Loader'
import ContentItem from '~/components/contents/dashboard/GridItem/ContentItem'
import KeywordItem from '~/components/contents/dashboard/GridItem/KeywordItem'
import ApexChartsColumn from '~/publishing/components/common/ui/ApexChartsColumn'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import { columnOptions, columnSeries, lineOptions } from '~/publishing/components/common/ui/json/chartsData'
import { dashboardContentType, GadgetItem, GridItemOption } from '~/stores/modules/contents/dashboard/dashboardSlice'
import { useDashboardAction } from '~/utils/hooks/contents/dashboard/useDashboardAction'

interface Props {
  gadgetItem: GridItemOption
  gadgetKey: string
}
const GadgetContent = (props: Props) => {
  const {
    settingsRefinedValue,
    gridState,
    keywordMonitoring,
    setGadgetLeftSettingAction,
    setGadgetRightSettingAction,
    setItemList,
    setsetMoreAmount,
    setChartData,
    getChartList,
    setGadgetDeleteAction,
    moveToUrl,
    getGadgetItem,
  } = useDashboardAction()
  const settingContainerRef = useRef<HTMLDivElement>(null)
  const [isSettingShow, setIsSettingShow] = useState<boolean>(false)
  const [chartMaxCount, setChartMaxCount] = useState<number>(0)
  const [newsCount, setNewsCount] = useState<number[]>([])
  const [newsDate, setNewsDate] = useState<string[]>([])
  const [itemData, setItemData] = useState<dashboardContentType[]>([])
  const [limitList, setLimitList] = useState<dashboardContentType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMoreLoading, setIsMoreLoading] = useState(false)
  const [zNumber, setZNumber] = useState<number>(1)

  const getMoreData = async () => {
    setIsMoreLoading(() => true)
    const getList = await getGadgetItem(props.gadgetItem, zNumber + 1)
    await setItemList(gridState, getList, props.gadgetItem.id, props.gadgetKey)
    setZNumber(prev => prev + 1)
    setItemData(() => getList)
    setIsMoreLoading(() => false)
  }

  const getChangeItemList = async () => {
    let getList = itemData
    if (props.gadgetItem.isData && props.gadgetItem.isData.length < 1) {
      await setItemList(gridState, getList, props.gadgetItem.id, props.gadgetKey)
    }
    await setsetMoreAmount(
      gridState,
      limitList.length + parseInt(settingsRefinedValue['mour_ui_number']),
      props.gadgetItem.id,
      props.gadgetKey
    )
    if (
      getList.length - parseInt(settingsRefinedValue['mour_ui_number']) <=
      limitList.length + parseInt(settingsRefinedValue['mour_ui_number'])
    ) {
      if (props?.gadgetItem.status !== '') getMoreData()
    }
    setLimitList(() => getList.slice(0, limitList.length + parseInt(settingsRefinedValue['mour_ui_number'])))
  }

  const setOriginItemList = async () => {
    if (props.gadgetItem.isData && props.gadgetItem.isData.length > 0) {
      setItemData(() => props.gadgetItem.isData)
      setLimitList(() =>
        props.gadgetItem.isData.slice(
          0,
          props.gadgetItem.moreAmount > 0 ? props.gadgetItem.moreAmount : props.gadgetItem.count
        )
      )
    }
  }

  const setOriginChartItem = async () => {
    if (props.gadgetItem.chartData !== null) {
      setNewsCount(() => props.gadgetItem?.chartData?.newDailyNewsDataSeries || [])
      setChartMaxCount(() => props.gadgetItem?.chartData?.maxCount || 0)
      setNewsDate(() => props.gadgetItem?.chartData?.categories || [])
    }
  }

  const getItemList = async () => {
    setIsLoading(() => true)
    if (props?.gadgetItem.status !== '') {
      const getList = await getGadgetItem(props.gadgetItem, zNumber)
      await setItemList(gridState, getList, props.gadgetItem.id, props.gadgetKey)
      setItemData(() => getList)
      setLimitList(() =>
        getList.slice(0, props.gadgetItem.moreAmount > 0 ? props.gadgetItem.moreAmount : props.gadgetItem.count)
      )
    }
    setIsLoading(() => false)
  }

  const getChartItemList = async () => {
    setIsLoading(() => true)
    if (props?.gadgetItem.status !== '') {
      const getList = await getChartList(props.gadgetItem)
      await setChartData(gridState, getList, props.gadgetItem.id, props.gadgetKey)
      setNewsCount(() => getList.newDailyNewsDataSeries)
      setChartMaxCount(() => getList.maxCount)
      setNewsDate(() => getList.categories)
    }
    setIsLoading(() => false)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (settingContainerRef.current && !settingContainerRef.current.contains(e.target as Node)) {
        setIsSettingShow(() => false)
      }
    },
    [isSettingShow]
  )

  useEffect(() => {
    if (props.gadgetItem.chartData === null && props.gadgetItem.type === 'graph') {
      getChartItemList()
    } else if (props.gadgetItem.chartData && props.gadgetItem.type === 'graph') {
      setOriginChartItem()
    } else if (props.gadgetItem.isData && props.gadgetItem.isData.length > 0) {
      setOriginItemList()
    } else if (itemData.length < 1) {
      getItemList()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className="draggable__container"
      style={{
        height: props.gadgetItem.type === 'graph' ? 340 : 47 * Number(limitList.length) + 90,
        minHeight: 80,
        margin: '14px 0 44px 0',
      }}
    >
      <div className="draggable__header">
        <div className="draggable__header-mover"></div>
        <h2 className="draggable-header__title">{props.gadgetItem?.title}</h2>
        <div className="draggable-header__buttons">
          <IcoArrowMove />
          <div
            className="select__section select-type1-small select-ico-only select-align-right"
            ref={settingContainerRef}
          >
            <button
              className="select__label ico-size16"
              disabled={isLoading}
              onClick={() => !isLoading && setIsSettingShow(!isSettingShow)}
            >
              <span className="select__label-text">설정</span>
              <IcoSvg data={icoSvgData.threeDotsVertical} />
            </button>

            <div className={cn('select-option__section', { 'display-block': isSettingShow })}>
              <div className="select-option__area">
                <ul className="select-option__group">
                  {props?.gadgetItem.status !== '' && (
                    <li>
                      <button
                        className="select-option__item"
                        onClick={() =>
                          props.gadgetKey === 'left'
                            ? setGadgetLeftSettingAction(
                                gridState,
                                props.gadgetItem,
                                limitList.length > 0 ? limitList.length : 0
                              )
                            : setGadgetRightSettingAction(
                                gridState,
                                props.gadgetItem,
                                limitList.length > 0 ? limitList.length : 0
                              )
                        }
                      >
                        <span className="select-option__item-text">설정하기</span>
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="select-option__item"
                      onClick={() =>
                        setGadgetDeleteAction(gridState, props.gadgetItem, keywordMonitoring, props.gadgetKey)
                      }
                    >
                      <span className="select-option__item-text">삭제하기</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="draggable__contents">
        {isLoading && (
          <div className="draggable__contents-dimm">
            <Backdrop style={{ background: '#fff', position: 'absolute', zIndex: 1 }} />
            <Loader
              screen={'absolute'}
              zIndex={2}
            />
          </div>
        )}
        {!isLoading && props.gadgetItem.type === 'graph' && (
          <div className="draggable-table__section">
            <div className="table-type5__section">
              {props.gadgetItem.subType === 'line' ? (
                <ApexChartsLine
                  height={Number(lineOptions?.chart?.height) || 250}
                  options={{
                    ...lineOptions,
                    yaxis: {
                      min: 0,
                      max: chartMaxCount,
                      tickAmount: 5,
                    },
                    xaxis: {
                      categories: newsDate,
                    },
                  }}
                  series={[
                    {
                      name: '뉴스 건수',
                      data: newsCount,
                    },
                  ]}
                />
              ) : (
                <ApexChartsColumn
                  height={Number(columnOptions.chart?.height) || 250}
                  options={{
                    ...columnOptions,
                    yaxis: {
                      min: 0,
                      max: chartMaxCount,
                      tickAmount: 5,
                    },
                    xaxis: {
                      categories: newsDate,
                    },
                  }}
                  series={[
                    {
                      name: '뉴스 건수',
                      data: newsCount,
                    },
                  ]}
                />
              )}
              <div className="table-type5__tfoot">
                <div className="tfoot-right">
                  <Button
                    label={'전체'}
                    cate={'default'}
                    size={'m'}
                    color={'link-dark'}
                    onClick={() => moveToUrl(props.gadgetItem.id, props.gadgetItem?.keyId)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && props.gadgetItem.type !== 'graph' && (
          <div className="draggable-table__section">
            <div className="table-type5__section">
              {limitList && limitList.length > 0 && (
                <table>
                  <tbody>
                    {limitList.map((e, index) => {
                      if (e.type === 'keyword') {
                        return (
                          <KeywordItem
                            key={`${e.idKey}-${index}`}
                            {...e}
                          />
                        )
                      } else {
                        return (
                          <ContentItem
                            key={`${e.idKey}-${index}`}
                            {...e}
                          />
                        )
                      }
                    })}
                  </tbody>
                </table>
              )}
              <div className="table-type5__tfoot">
                <div className="tfoot-center">
                  {limitList && limitList.length > 0 && itemData.length > limitList.length && (
                    <Button
                      label={'더보기'}
                      cate={'default'}
                      size={'m'}
                      color={'link-dark'}
                      isLoading={isMoreLoading}
                      onClick={() => getChangeItemList()}
                    />
                  )}
                </div>
                {props.gadgetItem.id.length > 0 &&
                  props.gadgetItem.id.split.length > 0 &&
                  props.gadgetItem.id.split('-')[0] !== '' &&
                  props.gadgetItem.id.split('-')[0] !== 'pressBriefing' &&
                  props.gadgetItem.id.split('-')[0] !== 'group' && (
                    <div className="tfoot-right">
                      <Button
                        label={'전체'}
                        cate={'default'}
                        size={'m'}
                        color={'link-dark'}
                        onClick={() => moveToUrl(props.gadgetItem.id, props.gadgetItem?.keyId)}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default GadgetContent
