export const lineSeries = [
  {
    name: 'Desktops',
    data: [600, 400, 410, 500, 350, 640, 800, 700, 820, 1000, 830, 840],
  },
]

export const lineOptions: ApexCharts.ApexOptions = {
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

export const barSeries = [
  {
    data: [74, 52, 41, 28, 22, 17, 15],
  },
]

export const barOptions: ApexCharts.ApexOptions = {
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
  colors: ['#198754'],
}

export const columnSeries = [
  {
    name: 'Net Profit',
    data: [16, 18, 30, 82, 150, 17, 25],
  },
]

export const columnOptions: ApexCharts.ApexOptions = {
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

export const pieSeries1 = [50.1, 30.9, 19]
export const pieSeries2 = [38, 30, 15, 10, 7]

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

export const pieOptions1: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['긍정', '부정', '중립'],
}

export const pieOptions2: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  labels: ['소비자 온라인', '업계 온라인', '잡지', '인쇄 매체', '공중파 TV'],
}
