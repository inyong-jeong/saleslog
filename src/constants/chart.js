//영업일지 채널 관련

export const Baroption = {

  responsive: [
    {
      breakpoint: 1100,
      options: {
        style: {
          width: 600
        }
      }
    }
  ],
  tooltip: {
    theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return ''
        }
      }
    }
  },

  title: {
    text: '영업일지 ',
    align: 'center',
    floating: true
  },
  subtitle: {
    text: '영업일지 채널에 다른 영업일지 건수',
    align: 'center',
  },
  needslabel: {
    categories: ['발굴','접촉','제안','검증']
  },
  xaxis: {
    categories: ['전화', '이메일', '행사참여', '대면', '온라인리서치', '도서/전문정보', '소셜커뮤니티', '기타']
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
      rangeBarGroupRows: false,
      dataLabels: {
        position: 'bottom'
      },
    }
  },

  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff']
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
    },
    offsetX: 0,
    dropShadow: {
      enabled: true
    }
  },
};

export const barseries = [{
  data: [1200, 945, 600, 523, 458, 43, 78, 9]
}]

// 도넛 니즈 분석 관련
export const dountOption = {
  labels: ['전략니즈', '제품니즈', '운영니즈', '개인니즈']
}
export const dountseries = [1, 1, 1, 1]



//리드 관련
export const LeadOption = {

  tooltip: {
    theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function () {
          return ''
        }
      }
    }
  },

  title: {
    text: '영업일지 ',
    align: 'center',
    floating: true
  },
  subtitle: {
    text: '영업일지 채널에 다른 영업일지 건수',
    align: 'center',
  },
  xaxis: {
    categories: ['전화', '조사', '접촉', '검증']
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: false,
      dataLabels: {
        position: 'bottom'
      },
    }
  },

  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff']
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
    },
    offsetX: 0,
    dropShadow: {
      enabled: true
    }
  },
};

export const leadseries = [{
  data: [274, 40, 30, 100]
}]




