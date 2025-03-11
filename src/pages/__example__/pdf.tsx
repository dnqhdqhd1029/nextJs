import dynamic from 'next/dynamic'

import ApexChartsColumn from '~/components/common/ui/ApexChartsColumn'
import ApexChartsLine from '~/components/common/ui/ApexChartsLine'
import ApexChartsPie from '~/components/common/ui/ApexChartsPie'
import Button from '~/components/common/ui/Button'
import { makePdf } from '~/utils/common/pdf'

const lineOptions: ApexCharts.ApexOptions = {
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
    width: 2,
    curve: 'smooth',
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
    categories: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'],
  },
  yaxis: {
    min: 0,
    max: 1000,
    tickAmount: 5,
  },
  markers: {
    size: 4,
  },
  colors: ['#18b7cc'],
}

const lineSeries = [
  {
    name: 'Desktops',
    data: [600, 400, 410, 500, 350, 640, 800, 700, 820, 1000, 830, 840],
  },
]

const pieOptionsCommon: ApexCharts.ApexOptions = {
  chart: {
    type: 'donut',
  },
  stroke: {
    width: 0,
  },
  colors: ['#198754', '#0094a8', '#ffca08', '#0dcaf0', '#dc3545'],
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
    },
  },
}

const pieSeries1 = [50.1, 30.9, 19]
const pieSeries2 = [38, 30, 15, 10, 7]

const pieOptions1: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['긍정', '부정', '중립'],
}

const pieOptions2: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['소비자 온라인', '업계 온라인', '잡지', '인쇄 매체', '공중파 TV'],
}

const columnOptions: ApexCharts.ApexOptions = {
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
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['5/1', '5/2', '5/3', '5/4', '5/5', '5/6', '5/7'],
  },
  fill: {
    opacity: 1,
  },
  colors: ['#198754'],
}

const columnSeries = [
  {
    name: 'Net Profit',
    data: [16, 18, 30, 82, 150, 17, 25],
  },
]

const HtmlToPdfExample = () => {
  const { viewWithPdf } = makePdf()
  const onClick = async () => {
    const result = await viewWithPdf({
      selector: '.div_paper',
      fileName: 'test',
      linkText: '삼성전자 모니터링 바로가기',
      linkUrl: 'https://svc.d.mediabee.kr/monitoring/monitoring/e30=',
    })
  }
  return (
    <>
      <div
        className="div_container"
        style={{
          margin: '50px',
        }}
      >
        <div
          className="div_paper"
          style={{ padding: '25px 50px 50px' }}
        >
          <h2>삼성전자 모니터링 분석</h2>
          <ul className="graph__list mt-20">
            <li>
              <div className="graph__group">
                <h3 className="graph__title">날짜별 뉴스 건수</h3>
                <ApexChartsLine
                  options={lineOptions}
                  series={lineSeries}
                />
              </div>
            </li>
            <li>
              <div className="graph__group">
                <h3 className="graph__title">논조 분석</h3>
                <ApexChartsPie
                  options={pieOptions1}
                  series={pieSeries1}
                />
              </div>
            </li>
            <li>
              <div className="graph__group">
                <h3 className="graph__title">상위 미디어별 뉴스 건수</h3>
                <ApexChartsColumn
                  options={columnOptions}
                  series={columnSeries}
                />
              </div>
            </li>
            <li>
              <div className="graph__group">
                <h3 className="graph__title">매체 유형</h3>
                <ApexChartsPie
                  options={pieOptions2}
                  series={pieSeries2}
                />
              </div>
            </li>
          </ul>
          <h3 className="mt-20">검색 조건</h3>
          <div
            className="search-result__header-tags mt-12 display-flex"
            style={{ background: '#fff', border: '0 none', padding: '12px 4px' }}
          >
            <div
              className="header-tags__group"
              style={{ background: '#fff' }}
            >
              <div className="header-tags__tit">모두 포함</div>
              <div className="header-tags__tag">
                <div className="tag__group cate-n2 shape-round">
                  <span className="tag__label">애플 </span>
                </div>
              </div>

              <div className="header-tags__tit">하나라도 포함</div>
              <div className="header-tags__tag">
                <div className="tag__group cate-n2 shape-round">
                  <span className="tag__label">샤오미</span>
                </div>
              </div>
              <div className="header-tags__tag">
                <div className="tag__group cate-n2 shape-round">
                  <span className="tag__label">화웨이</span>
                </div>
              </div>

              <div className="header-tags__tit">제외</div>
              <div className="header-tags__tag">
                <div className="tag__group cate-n2 shape-round">
                  <span className="tag__label">모토로라</span>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="mt-20">*/}
          {/*  <a*/}
          {/*    href="https://local.svc.d.mediabee.kr:4189/monitoring/monitoring/e30="*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener"*/}
          {/*    className="font-body__regular--underline color-primary"*/}
          {/*  >*/}
          {/*    삼성전자 모니터링 바로가기*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
        <button
          onClick={onClick}
          style={{ border: '1px solid', margin: '50px', padding: '10px' }}
        >
          pdf로 보기
        </button>
      </div>
    </>
  )
}

export default HtmlToPdfExample
HtmlToPdfExample.Layout = 'LAYOUT3'
