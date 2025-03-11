export const lineSeries = [
  {
    name: '뉴스 건수',
    data: [600, 400, 500, 350, 640, 800, 950],
  },
]
export const lineOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'line',
    height: 280,
    width: '100%',
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
  // grid: {
  //   show: true,
  //   borderColor: '#e1e3e3',
  //   position: 'back',
  //   xaxis: {
  //     lines: {
  //       show: true,
  //     },
  //   },
  //   yaxis: {
  //     lines: {
  //       show: false,
  //     },
  //   },
  // },
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
  colors: ['#0e9ce8'],
}

export const barSeries = [
  {
    name: '뉴스 건수',
    data: [74, 52, 41, 28, 22, 17, 15, 40, 66, 13],
  },
]
export const barOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'bar',
    height: 280,
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
    categories: [
      '조선일보',
      '동아일보',
      '중앙일보',
      '매일경제',
      '한국경제',
      '머니투데이',
      '이데일리',
      '한겨레',
      '경향신문',
      '서울신문',
    ],
  },
  fill: {
    opacity: 1,
  },
  colors: ['#0e9ce8'],
}

export const columnSeries = [
  {
    name: '뉴스 건수',
    data: [94, 52, 37, 62, 18, 26, 22],
  },
]
export const columnOptions: ApexCharts.ApexOptions = {
  chart: {
    type: 'bar',
    height: 280,
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
    tickAmount: 5,
  },
  fill: {
    opacity: 1,
  },
  colors: ['#0e9ce8'],
}

export const pieSeries1 = [33.8, 16, 50.2]
export const pieSeries2 = [31.2, 20, 11, 9.8, 7, 6, 5, 10]

const pieOptionsCommon: ApexCharts.ApexOptions = {
  chart: {
    type: 'donut',
    height: 270,
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
}

export const pieOptions1: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  colors: ['#00bf8c', '#e6506c', '#0e9ce8'],
  labels: ['긍정', '부정', '중립'],
}

export const pieOptions2: ApexCharts.ApexOptions = {
  ...pieOptionsCommon,
  colors: ['#0e9ce8', '#00bf8c', '#f8ad19', '#e6506c', '#7e65c7', '#a6cc0c', '#c75ba2', '#abbab6'],
  labels: ['소비자 온라인', '업계 온라인', '종합일간신문', '종합TV', '라디오', '소비자잡지', '통신사', '기타'],
}
