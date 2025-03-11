import { Fragment, useEffect, useState } from 'react'
import JsPdf from 'jspdf'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { DefaultChartData, DefaultLineChartData } from '~/components/contents/monitoring/MonitoringList/defaultData'
import MonitoringAnalysisPdf from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringAnalysisPdf'
import ApexChartsBar from '~/publishing/components/common/ui/ApexChartsBar'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import { barOptions, lineOptions, pieOptions1, pieOptions2 } from '~/publishing/components/common/ui/json/chartsData'
import {
  ChartLineProps,
  ChartProps,
  monitoringAnalysisPopupAction,
} from '~/stores/modules/contents/monitoring/monitoringSearch'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const MonitoringAnalysisPopup = () => {
  const dispatch = useAppDispatch()
  const {
    monitoringAnalysisPopup,
    initMonitoringAnalysisPopup,
    monitoringListParams,
    setIsNoticePopupPopup,
    sharePdfFile,
    monitoringDataToChart,
  } = useMonitoringSearch()
  const [isPdfShare, setPdfShare] = useState(false)
  const [newsCountListByUpperMedia, setNewsCountListByUpperMedia] = useState<ChartLineProps>({
    max: 0,
    categories: [],
    data: [],
  })
  const [dailyNewsCountListChart, setDailyNewsCountListChart] = useState<ChartLineProps>({
    max: 0,
    categories: [],
    data: [],
  })
  const [tonePieChart, setTonePieChart] = useState<ChartProps>({
    labels: [],
    series: [],
  })
  const [mediaTypePieChart, setMediaTypePieChart] = useState<ChartProps>({
    labels: [],
    series: [],
  })

  const shareAction = async (isPdf: JsPdf | null) => {
    if (isPdf) {
      await sharePdfFile(isPdf, monitoringAnalysisPopup)
      setPdfShare(() => false)
    } else {
      openToast('PDF 생성 중 오류 발생', 'error')
    }
  }

  const monitoringGraph = async () => {
    const res = await monitoringDataToChart(monitoringAnalysisPopup, monitoringListParams)
    setMediaTypePieChart(() => res.mediaTypePieChart)
    setTonePieChart(() => res.tonePieChart)
    setDailyNewsCountListChart(() => res.dailyNewsCountList)
    setNewsCountListByUpperMedia(() => res.newsCountListByUpperMedia)
    dispatch(
      monitoringAnalysisPopupAction({
        ...monitoringAnalysisPopup,
        isLoading: false,
      })
    )
  }

  useEffect(() => {
    setNewsCountListByUpperMedia(() => DefaultLineChartData)
    setDailyNewsCountListChart(() => DefaultLineChartData)
    setTonePieChart(() => DefaultChartData)
    setMediaTypePieChart(() => DefaultChartData)
    monitoringGraph()
  }, [monitoringAnalysisPopup.isOpen])

  return (
    <>
      <Popup
        isOpen={monitoringAnalysisPopup.isOpen}
        title={`${monitoringAnalysisPopup.title} 뉴스 맞춤 검색 분석`}
        onClose={() => initMonitoringAnalysisPopup()}
        width={'90vw'}
        maxWidth={'90vw'}
        height={'96vh'}
        hasCloseButton
        hasCloseButtonLoading={isPdfShare}
        buttons={<></>}
      >
        <ul className="interval-mt14">
          <li>
            <div className="buttons__group type-right">
              <Button
                label={'다운로드'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                disabled={isPdfShare}
                onClick={() =>
                  setIsNoticePopupPopup(
                    true,
                    newsCountListByUpperMedia,
                    dailyNewsCountListChart,
                    tonePieChart,
                    mediaTypePieChart
                  )
                }
              />
              <Button
                label={'공유하기'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                isLoading={isPdfShare}
                disabled={isPdfShare}
                onClick={() => setPdfShare(() => true)}
              />
            </div>
          </li>
          <li
            className="position-absolute"
            style={{ left: '-9999px', top: '-9999px', width: '100%' }}
          >
            <MonitoringAnalysisPdf
              isPdfShare={isPdfShare}
              makePdfDone={e => shareAction(e)}
              newsCountListByUpperMedia={newsCountListByUpperMedia}
              dailyNewsCountListChart={dailyNewsCountListChart}
              tonePieChart={tonePieChart}
              mediaTypePieChart={mediaTypePieChart}
            />
          </li>
          <li>
            <ul
              className="graph__list"
              style={{ marginBottom: 5 }}
            >
              <li>
                <div className="graph__group">
                  <h3 className="graph__title">날짜별 뉴스 건수</h3>
                  {!monitoringAnalysisPopup.isLoading ? (
                    <Fragment>
                      <ApexChartsLine
                        height={Number(lineOptions?.chart?.height) || 250}
                        options={{
                          ...lineOptions,
                          xaxis: {
                            categories: dailyNewsCountListChart.categories,
                          },
                          yaxis: {
                            min: 0,
                            max: dailyNewsCountListChart.max,
                            tickAmount: 5,
                          },
                        }}
                        series={[
                          {
                            name: '뉴스 건수',
                            data: dailyNewsCountListChart.data,
                          },
                        ]}
                      />
                    </Fragment>
                  ) : (
                    <div style={{ width: 827, height: 282 }} />
                  )}
                </div>
              </li>
              <li>
                <div className="graph__group">
                  <h3 className="graph__title">논조 분석</h3>
                  {!monitoringAnalysisPopup.isLoading ? (
                    <Fragment>
                      <ApexChartsPie
                        height={Number(pieOptions1?.chart?.height) || 250}
                        options={{
                          ...pieOptions1,
                          labels: tonePieChart.labels,
                        }}
                        series={tonePieChart.series}
                      />
                    </Fragment>
                  ) : (
                    <div style={{ width: 827, height: 282 }} />
                  )}
                </div>
              </li>
              <li>
                <div className="graph__group">
                  <h3 className="graph__title">상위 미디어별 뉴스 건수</h3>
                  {!monitoringAnalysisPopup.isLoading ? (
                    <>
                      <ApexChartsBar
                        height={Number(barOptions?.chart?.height) || 250}
                        options={{
                          ...barOptions,
                          xaxis: {
                            tickAmount: 5,
                            categories: newsCountListByUpperMedia.categories,
                          },
                          yaxis: {
                            min: 0,
                            max: newsCountListByUpperMedia.max,
                            //tickAmount: 4,
                          },
                        }}
                        series={[
                          {
                            // @ts-ignore
                            name: '뉴스 건수',
                            data: newsCountListByUpperMedia.data,
                          },
                        ]}
                      />
                    </>
                  ) : (
                    <div style={{ width: 827, height: 282 }} />
                  )}
                </div>
              </li>
              <li>
                <div className="graph__group">
                  <h3 className="graph__title">매체 유형</h3>
                  {!monitoringAnalysisPopup.isLoading ? (
                    <>
                      <ApexChartsPie
                        height={Number(pieOptions1?.chart?.height) || 250}
                        options={{
                          ...pieOptions2,
                          labels: mediaTypePieChart.labels,
                        }}
                        series={mediaTypePieChart.series}
                      />
                    </>
                  ) : (
                    <div style={{ width: 827, height: 282 }} />
                  )}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default MonitoringAnalysisPopup
