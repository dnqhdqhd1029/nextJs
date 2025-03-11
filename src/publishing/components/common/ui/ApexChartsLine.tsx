/**
 * @file ApexChartsLine.tsx
 * @description ApexChartsLine 컴포넌트
 */

import { ApexChartsOptionsProps } from '~/publishing/components/common/ui/common-ui'

interface Props extends ApexChartsOptionsProps {
  height?: number
  series: { name: string; data: number[] }[]
}

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ApexChartsLine = ({ height, options, series }: Props) => {
  return (
    <div className="charts__group type-line">
      <Chart
        type="line"
        height={height ? height : 250}
        options={options}
        series={series}
      />
    </div>
  )
}

export default ApexChartsLine
