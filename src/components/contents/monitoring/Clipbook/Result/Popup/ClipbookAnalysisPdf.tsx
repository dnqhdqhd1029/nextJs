import { Fragment, useEffect, useState } from 'react'
import JsPdf from 'jspdf'

import ApexChartsBar from '~/publishing/components/common/ui/ApexChartsBar'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import { barOptions, lineOptions, pieOptions1, pieOptions2 } from '~/publishing/components/common/ui/json/chartsData'
import { ChartLineProps, ChartProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { openToast } from '~/utils/common/toast'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

interface Props {
  isPdfShare?: boolean
  isPdfDownload?: boolean
  newsCountListByUpperMedia: ChartLineProps
  dailyNewsCountListChart: ChartLineProps
  tonePieChart: ChartProps
  mediaTypePieChart: ChartProps
  makePdfDone: (e: JsPdf | null) => void
}
const ClipbookAnalysisPdf = (props: Props) => {
  const { monitoringAnalysisPopup, createPdfFile } = useClipbookDetail()

  const actionButton = async () => {
    let pdf: JsPdf | null = null
    try {
      const element = document.getElementById('graph__list_pdf_download')
      if (!element) return
      pdf = await createPdfFile(element, !!props?.isPdfShare)
      if (pdf && props?.isPdfDownload) {
        pdf.save(`${monitoringAnalysisPopup.title}_모니터링_분석.pdf`)
      }
    } catch (error) {
      openToast('PDF 생성 중 오류 발생', 'error')
    }
    props.makePdfDone(pdf)
  }

  useEffect(() => {
    if (props?.isPdfShare) {
      actionButton()
    }
  }, [props?.isPdfShare])

  useEffect(() => {
    if (props?.isPdfDownload) {
      actionButton()
    }
  }, [props?.isPdfDownload])

  return (
    <div id="graph__list_pdf_download">
      <h2
        id="disable_popup_data"
        className="mb-20"
      >
        {monitoringAnalysisPopup.title} 뉴스 맞춤 검색 분석
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div
          className="graph__group"
          style={{ width: 210 * 3.5, marginRight: 20 }}
        >
          <h3 className="graph__title">날짜별 뉴스 건수</h3>
          <ApexChartsLine
            height={280}
            options={{
              ...lineOptions,
              xaxis: {
                categories: props.dailyNewsCountListChart.categories,
              },
              yaxis: {
                min: 0,
                max: props.dailyNewsCountListChart.max,
                tickAmount: 5,
              },
            }}
            series={[
              {
                name: '뉴스 건수',
                data: props.dailyNewsCountListChart.data,
              },
            ]}
          />
        </div>
        <div
          className="graph__group"
          style={{ width: 210 * 3 }}
        >
          <h3 className="graph__title">논조 분석</h3>
          <ApexChartsPie
            height={290}
            options={{
              ...pieOptions1,
              labels: props.tonePieChart.labels,
            }}
            series={props.tonePieChart.series}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div
          className="graph__group"
          style={{ width: 210 * 3.5, marginRight: 20 }}
        >
          <h3 className="graph__title">상위 미디어별 뉴스 건수</h3>
          <ApexChartsBar
            height={280}
            options={{
              ...barOptions,
              xaxis: {
                tickAmount: 5,
                categories: props.newsCountListByUpperMedia.categories,
              },
              yaxis: {
                min: 0,
                max: props.newsCountListByUpperMedia.max,
                //tickAmount: 4,
              },
            }}
            series={[
              {
                // @ts-ignore
                name: '뉴스 건수',
                data: props.newsCountListByUpperMedia.data,
              },
            ]}
          />
        </div>
        <div
          className="graph__group"
          style={{ width: 210 * 3 }}
        >
          <h3 className="graph__title">매체 유형</h3>
          <ApexChartsPie
            height={290}
            options={{
              ...pieOptions2,
              labels: props.mediaTypePieChart.labels,
            }}
            series={props.mediaTypePieChart.series}
          />
        </div>
      </div>
      <div
        id="disable_popup_data"
        style={{
          width: 210 * 3.779528,
          height: 100, // 동적으로 계산된 높이 적용
          overflow: 'hidden',
        }}
      />
    </div>
  )
}

export default ClipbookAnalysisPdf
