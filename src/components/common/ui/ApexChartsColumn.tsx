/**
 * @file ApexChartsColumn.tsx
 * @description ApexChartsColumn 컴포넌트
 */

import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import { ApexChartsOptionsProps } from '~/types/common'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props extends ApexChartsOptionsProps {
  options: ApexOptions
  series: ApexAxisChartSeries
}

const ApexChartsColumn = ({ options, series }: Props) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>(options)
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>(series)

  useEffect(() => {
    if (options && series) {
      setChartOptions(options)
      setChartSeries(series)
    }
  }, [options, series])
  return (
    <div className="charts__group type-column">
      <Chart
        type="bar"
        height={options.chart?.height ?? 300}
        options={chartOptions}
        series={chartSeries}
      />
    </div>
  )
}

export default ApexChartsColumn
