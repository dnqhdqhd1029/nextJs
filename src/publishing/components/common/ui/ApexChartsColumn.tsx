/**
 * @file ApexChartsColumn.tsx
 * @description ApexChartsColumn 컴포넌트
 */

import dynamic from 'next/dynamic'

import { ApexChartsOptionsProps } from '~/publishing/components/common/ui/common-ui'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props extends ApexChartsOptionsProps {
  height?: number
  series: { name: string; data: number[] }[]
  options: ApexCharts.ApexOptions
}

const ApexChartsColumn = ({ height, options, series }: Props) => {
  return (
    <div className="charts__group type-column">
      <Chart
        type="bar"
        height={height ? height : 250}
        options={options}
        series={series}
      />
    </div>
  )
}

export default ApexChartsColumn
