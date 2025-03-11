/**
 * @file ApexChartsLine.tsx
 * @description ApexChartsLine 컴포넌트
 */

import { Fragment, useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import dynamic from 'next/dynamic'

import Loader from '~/components/common/ui/Loader'
import Skeleton from '~/components/common/ui/Skeleton'
import { ApexChartsOptionsProps } from '~/types/common'

interface Props extends ApexChartsOptionsProps {
  options: ApexOptions
  series: ApexAxisChartSeries
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const defaultLineOptions: ApexOptions = {
  chart: {
    height: 250,
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  grid: {
    row: {
      colors: ['#f7f7f7', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7'],
  },
  yaxis: {
    min: 0,
    max: 1000,
    tickAmount: 5,
  },
  markers: {
    size: 6,
  },
  fill: {
    opacity: 1,
  },
  colors: ['#00bf8c'],
}
const ApexChartsLine = ({ options, series }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chartOptions, setChartOptions] = useState<ApexOptions>(defaultLineOptions)
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([])

  useEffect(() => {
    setIsLoading(() => true)
    setChartOptions(() => defaultLineOptions)
    setChartSeries(() => [])
    if (options && series) {
      setChartOptions(() => options)
      setChartSeries(() => series)
      setIsLoading(() => false)
    }
  }, [options, series])

  return (
    <div className="charts__group type-line">
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
              type="line"
              height={options.chart?.height ?? 300}
              options={chartOptions}
              series={chartSeries}
            />
          )}
        </Fragment>
      )}
    </div>
  )
}

export default ApexChartsLine
