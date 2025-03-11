import { Fragment, useEffect, useState } from 'react'
import JsPdf from 'jspdf'

import Tag from '~/components/common/ui/Tag'
import ApexChartsBar from '~/publishing/components/common/ui/ApexChartsBar'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import { barOptions, lineOptions, pieOptions1, pieOptions2 } from '~/publishing/components/common/ui/json/chartsData'
import { ChartLineProps, ChartProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { openToast } from '~/utils/common/toast'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

interface Props {
  isPdfShare?: boolean
  isPdfDownload?: boolean
  newsCountListByUpperMedia: ChartLineProps
  dailyNewsCountListChart: ChartLineProps
  tonePieChart: ChartProps
  mediaTypePieChart: ChartProps
  makePdfDone: (e: JsPdf | null) => void
}
const MonitoringAnalysisPdf = (props: Props) => {
  const { monitoringParams, monitoringAnalysisPopup, createPdfFile } = useMonitoringSearch()
  const [tagsHeight, setTagsHeight] = useState(400) // 기본값 400

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

  useEffect(() => {
    const tagsGroup = document.querySelector('.header-tags__group')
    if (tagsGroup) {
      const height = tagsGroup.getBoundingClientRect().height
      setTagsHeight(height + 80)
    }
  }, [monitoringAnalysisPopup.isOpen])

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
          height: tagsHeight + 100, // 동적으로 계산된 높이 적용
          overflow: 'hidden',
        }}
      >
        <h3 className="mt-20">검색 조건</h3>
        <div
          className="search-result__header-tags mt-12 display-flex"
          style={{ background: '#fff', border: '0 none', padding: '12px 4px' }}
        >
          <div className="header-tags__group">
            {monitoringParams.and && monitoringParams.and !== '' && (
              <>
                <div className="header-tags__tit">모두 포함</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.and}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.or && monitoringParams.or !== '' && (
              <>
                <div className="header-tags__tit">하나라도 포함</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.or}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.not && monitoringParams.not !== '' && (
              <>
                <div className="header-tags__tit">제외</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.not}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.mediaType && monitoringParams.mediaType.length > 0 && (
              <>
                <div className="header-tags__tit">매체 유형</div>
                {monitoringParams &&
                  monitoringParams.mediaType.length > 0 &&
                  monitoringParams.mediaType.map((e, index) => (
                    <div
                      className={`header-tags__tag ${index === monitoringParams.mediaType.length ? 'is-finished' : ''}`}
                      key={'monitoringParams.mediaType' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.mediaValue && monitoringParams.mediaValue.id !== '' && (
              <>
                <div className="header-tags__tit">매체 지수</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.mediaValue.name}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.mediaTagList && monitoringParams.mediaTagList.length > 0 && (
              <>
                <div className="header-tags__tit">매체명</div>
                {monitoringParams &&
                  monitoringParams.mediaTagList.length > 0 &&
                  monitoringParams.mediaTagList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === monitoringParams.mediaTagList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaTagList' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.journalistTagList && monitoringParams.journalistTagList.length > 0 && (
              <>
                <div className="header-tags__tit">저자</div>
                {monitoringParams &&
                  monitoringParams.journalistTagList.length > 0 &&
                  monitoringParams.journalistTagList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === monitoringParams.journalistTagList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.journalistTagList' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.tone && monitoringParams.tone.length > 0 && (
              <>
                <div className="header-tags__tit">논조</div>
                {monitoringParams &&
                  monitoringParams.tone.length > 0 &&
                  monitoringParams.tone.map((e, index) => (
                    <div
                      className={`header-tags__tag ${index === monitoringParams.tone.length ? 'is-finished' : ''}`}
                      key={'monitoringParams.tone' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.tag && monitoringParams.tag.length > 0 && (
              <>
                <div className="header-tags__tit">태그</div>
                {monitoringParams &&
                  monitoringParams.tag.length > 0 &&
                  monitoringParams.tag.map((e, index) => (
                    <div
                      className={`header-tags__tag ${index === monitoringParams.tag.length ? 'is-finished' : ''}`}
                      key={'monitoringParams.tag' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.url && monitoringParams.url !== '' && (
              <>
                <div className="header-tags__tit">URL</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.url}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.publishingPeriod && monitoringParams.publishingPeriod.length > 0 && (
              <>
                <div className="header-tags__tit">발행주기</div>
                {monitoringParams &&
                  monitoringParams.publishingPeriod.length > 0 &&
                  monitoringParams.publishingPeriod.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === monitoringParams.publishingPeriod.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.publishingPeriod' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.mediaBookList && monitoringParams.mediaBookList.length > 0 && (
              <>
                <div className="header-tags__tit">미디어 목록</div>
                {monitoringParams &&
                  monitoringParams.mediaBookList.length > 0 &&
                  monitoringParams.mediaBookList.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === monitoringParams.mediaBookList.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.mediaBookList' + e.id}
                    >
                      <Tag
                        label={e.subData}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.clipbook && monitoringParams.clipbook.id !== '' && (
              <>
                <div className="header-tags__tit">클립북</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.clipbook.name}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.clipbookValue && monitoringParams.clipbookValue.length > 0 && (
              <>
                <div className="header-tags__tit">클립북 목록</div>
                {monitoringParams &&
                  monitoringParams.clipbookValue.length > 0 &&
                  monitoringParams.clipbookValue.map((e, index) => (
                    <div
                      className={`header-tags__tag ${
                        index === monitoringParams.clipbookValue.length ? 'is-finished' : ''
                      }`}
                      key={'monitoringParams.clipbookValue' + e.id}
                    >
                      <Tag
                        label={e.label}
                        cate={'n2'}
                        shape={'round'}
                      />
                    </div>
                  ))}
              </>
            )}
            {monitoringParams.coverage && monitoringParams.coverage.id !== '' && (
              <>
                <div className="header-tags__tit">커버리지</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.coverage.name}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
            {monitoringParams.informationType && monitoringParams.informationType.id !== '' && (
              <>
                <div className="header-tags__tit">정보 유형</div>
                <div className="header-tags__tag">
                  <Tag
                    label={monitoringParams.informationType.name}
                    cate={'n2'}
                    shape={'round'}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringAnalysisPdf
