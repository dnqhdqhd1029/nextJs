/**
 * @file apexcharts.tsx
 * @description apexcharts 그래프 라이브러리
 */

import Link from 'next/link'

import ApexChartsBar from '~/publishing/components/common/ui/ApexChartsBar'
import ApexChartsColumn from '~/publishing/components/common/ui/ApexChartsColumn'
import ApexChartsLine from '~/publishing/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/publishing/components/common/ui/ApexChartsPie'
import {
  barOptions,
  barSeries,
  columnOptions,
  columnSeries,
  lineOptions,
  lineSeries,
  pieOptions1,
  pieOptions2,
  pieSeries1,
  pieSeries2,
} from '~/publishing/components/common/ui/json/chartsData'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  // @ts-ignore
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">apexcharts</h2>
        <code className="guide__code">
          - 문서&nbsp;:&nbsp;
          <Link
            href="https://apexcharts.com/docs/installation/"
            legacyBehavior
          >
            <a
              target="_blank"
              style={{ color: 'currentcolor' }}
            >
              https://apexcharts.com/docs/installation/
            </a>
          </Link>
          <br />
          <br />- 옵션&nbsp;:&nbsp;
          <Link
            href="https://apexcharts.com/docs/options/annotations/"
            legacyBehavior
          >
            <a
              target="_blank"
              style={{ color: 'currentcolor' }}
            >
              https://apexcharts.com/docs/options/annotations/
            </a>
          </Link>
          <br />
          <br />- 샘플&nbsp;:&nbsp;
          <Link
            href="https://apexcharts.com/react-chart-demos/"
            legacyBehavior
          >
            <a
              target="_blank"
              style={{ color: 'currentcolor' }}
            >
              https://apexcharts.com/react-chart-demos/
            </a>
          </Link>
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">Line Charts</h2>
          <div className="guide__group">
            <ApexChartsLine
              height={Number(lineOptions.chart?.height) || 250}
              options={lineOptions}
              series={lineSeries}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">Bar Charts</h2>
          <div className="guide__group">
            <ApexChartsBar
              height={Number(barOptions.chart?.height) || 250}
              options={barOptions}
              series={barSeries}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">Column Charts</h2>
          <div className="guide__group">
            <ApexChartsColumn
              height={Number(columnOptions.chart?.height) || 250}
              options={columnOptions}
              series={columnSeries}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">Pie Charts</h2>
          <div className="guide__group">
            {/* <div style={{ width: '400px', height: '400px' }}> */}
            <ApexChartsPie
              height={Number(pieOptions1?.chart?.height) || 250}
              options={pieOptions1}
              series={pieSeries1}
            />
            {/* </div> */}
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">Pie Charts</h2>
          <div className="guide__group">
            {/* <div style={{ width: '400px', height: '400px' }}> */}
            <ApexChartsPie
              height={Number(pieOptions1?.chart?.height) || 250}
              options={pieOptions2}
              series={pieSeries2}
            />
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
