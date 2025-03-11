/**
 * @file ApexChartsPie.tsx
 * @description ApexChartsPie 컴포넌트
 */

import { ApexChartsOptionsProps } from '~/publishing/components/common/ui/common-ui'

interface Props extends ApexChartsOptionsProps {
  height?: number
  series: number[]
}

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ApexChartsPie = ({ height, options, series }: Props) => {
  return (
    <div className="charts__group type-pie">
      <Chart
        type="donut"
        // width={440}
        height={height ? height : 250}
        options={options}
        series={series}
      />
    </div>
  )
}

export default ApexChartsPie
