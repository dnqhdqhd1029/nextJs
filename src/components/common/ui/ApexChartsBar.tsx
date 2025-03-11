/**
 * @file ApexChartsBar.tsx
 * @description ApexChartsBar 컴포넌트
 */

import { ApexChartsOptionsProps } from '~/types/common'

interface Props extends ApexChartsOptionsProps {
  series: ApexAxisChartSeries
}

import { Fragment, useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import Loader from '~/components/common/ui/Loader'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const defaultBarOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 250,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff'],
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff'],
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  grid: {
    show: true,
    borderColor: '#e1e3e3',
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: ['조선일보', '동아일보', '중앙일보', '매일경제', '한국경제', '머니투데이', '이데일리'],
  },
  fill: {
    opacity: 1,
  },
  colors: ['#00bf8c'],
}
const ApexChartsBar = ({ options, series }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chartOptions, setChartOptions] = useState<ApexOptions>(defaultBarOptions)
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([])

  useEffect(() => {
    setIsLoading(() => true)
    setChartOptions(() => defaultBarOptions)
    setChartSeries(() => [])
    if (options && series) {
      setChartOptions(() => options)
      setChartSeries(() => series)
      setIsLoading(() => false)
    }
  }, [options, series])

  return (
    <div className="charts__group type-bar">
      {isLoading ? (
        <div style={{ width: 827, height: 282 }}>
          <Loader
            screen={'adaptive'}
            zIndex={2}
          />
        </div>
      ) : (
        <Fragment>
          {chartOptions && chartSeries && (
            <Chart
              type="bar"
              height={options.chart?.height ?? 300}
              options={options}
              series={series}
            />
          )}
        </Fragment>
      )}
    </div>
  )
}

export default ApexChartsBar
