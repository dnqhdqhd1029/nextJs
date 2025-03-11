/**
 * @file ApexChartsPie.tsx
 * @description ApexChartsPie 컴포넌트
 */

import { Fragment, useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import Loader from '~/components/common/ui/Loader'
import { ApexChartsOptionsProps } from '~/types/common'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props extends ApexChartsOptionsProps {
  series: number[]
}

const defaultPieOptions: ApexOptions = {
  chart: {
    type: 'donut',
  },
  stroke: {
    width: 0,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  plotOptions: {
    pie: {
      expandOnClick: false,
      // customScale: 0.5,
      donut: {
        size: '50%',
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      colors: ['#fff'],
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      color: '#000',
      opacity: 0.25,
    },
  },
  colors: ['#00bf8c', '#0e9ce8', '#f8ad19', '#e6506c', '#7e65c7', '#a6cc0c', '#c75ba2', '#abbab6'],
}
const ApexChartsPie = ({ options, series }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chartOptions, setChartOptions] = useState<ApexOptions>(defaultPieOptions)
  const [chartSeries, setChartSeries] = useState<number[]>([])

  useEffect(() => {
    setIsLoading(() => true)
    setChartOptions(() => defaultPieOptions)
    setChartSeries(() => [])
    if (options && series) {
      setChartOptions(() => options)
      setChartSeries(() => series)
      setIsLoading(() => false)
    }
  }, [options, series])

  return (
    <div className="charts__group type-pie">
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
              type="donut"
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

export default ApexChartsPie
