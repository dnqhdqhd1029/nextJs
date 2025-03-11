/**
 * @file ApexChartsBar.tsx
 * @description ApexChartsBar 컴포넌트
 */

import { ApexChartsOptionsProps } from '~/publishing/components/common/ui/common-ui'

interface Props extends ApexChartsOptionsProps {
  height?: number
  series: { data: number[] }[]
}

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ApexChartsBar = ({ height, options, series }: Props) => {
  return (
    <div className="charts__group type-bar">
      <Chart
        type="bar"
        height={height ? height : 250}
        options={options}
        series={series}
      />
    </div>
  )
}

export default ApexChartsBar
