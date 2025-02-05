const _ = require('lodash');

const baseTextStyle = {
  textStyle: {
    //  fontFamily: 'SimHei',
    fontWeight: 'bolder',
  },
};
const BASE_OPTION = {
  animation: false,
  animationDuration: 0,
  color: [
    'rgb(55,162,218)',
    'rgb(255,216,92)',
    'rgb(103,224,227)',
    'rgb(255,159,127)',
    'rgb(224,98,174)',
    'rgb(143,134,239)',
    'rgb(147,179,251)',
    'rgb(255,196,105)',
  ],
  legend: {
    show: true,
    orient: 'horizontal',
    ...baseTextStyle,
  },
};

const pieOptions1 = _.merge({}, BASE_OPTION, {
  series: [
    {
      radius: '55%',
      center: ['50%', '60%'],
      label: {
        formatter: '{b}: {c}%',
        ...baseTextStyle,
      },
    },
  ],
});
const pieOptions2 = _.merge({}, BASE_OPTION, {
  series: [
    {
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      label: {
        formatter: '{b}: {c}%',
        ...baseTextStyle,
      },
    },
  ],
});

const base_bar_series = {
  barCategoryGap: '60%',
  barGap: '30%',
  seriesLayoutBy: 'column',
  datasetIndex: 0,
  clip: true,
  label: {
    show: true,
    position: 'top',
    ...baseTextStyle,
  },
};
const barOptions1 = _.merge({}, BASE_OPTION, {
  xAxis: {
    type: 'category',
    show: true,
    scale: false,
    offset: 0,
    splitNumber: 5,
    minInterval: 0,
    splitLine: {
      show: true,
    },
    nameTextStyle: {
      ...baseTextStyle.textStyle,
    },
    axisLabel: {
      interval: 0,
      rotate: -30,
      ...baseTextStyle.textStyle,
    },
  },
  yAxis: {
    type: 'value',
    show: true,
    scale: false,
    nameLocation: 'end',
    nameGap: 15,
    gridIndex: 0,
    inverse: false,
    offset: 0,
    nameTextStyle: {
      ...baseTextStyle.textStyle,
    },
    axisLabel: {
      ...baseTextStyle.textStyle,
    },
  },
  series: [{ ...base_bar_series }, { ...base_bar_series }],
});
// 横向柱状图
const barOptions2 = _.merge({}, BASE_OPTION, {
  grid: {
    left: 120,
  },
  xAxis: {
    type: 'value',
    show: true,
    scale: false,
    offset: 0,
    splitNumber: 5,
    minInterval: 0,
    splitLine: {
      show: true,
    },
    axisLabel: {
      interval: 0,
    },
  },
  yAxis: {
    type: 'category',
    show: true,
    scale: false,
    nameLocation: 'end',
    nameGap: 15,
    gridIndex: 0,
    inverse: false,
    offset: 0,
    splitLine: {
      show: true,
    },
    axisLabel: {
      interval: 0,
      width: 110,
      overflow: 'break',
    },
  },
  series: [
    {
      barCategoryGap: '60%',
      barGap: '30%',
      seriesLayoutBy: 'column',
      datasetIndex: 0,
      clip: true,
      label: {
        show: true,
        position: 'right',
      },
    },
  ],
});

const lineOptions = _.merge({}, BASE_OPTION, {
  xAxis: {
    type: 'category',
    show: true,
    scale: false,
    nameLocation: 'end',
    nameGap: 15,
    gridIndex: 0,
    inverse: false,
    offset: 0,
    splitNumber: 5,
    boundaryGap: false,
    minInterval: 0,
    splitLine: {
      show: true,
    },
    axisLabel: {
      ...baseTextStyle.textStyle,
    },
  },
  yAxis: {
    show: true,
    scale: false,
    nameLocation: 'end',
    nameGap: 15,
    gridIndex: 0,
    inverse: false,
    offset: 0,
    splitNumber: 5,
    minInterval: 0,
    axisLabel: {
      ...baseTextStyle.textStyle,
    },
  },
  series: [
    {
      type: 'line',
      xAxisIndex: 0,
      showSymbol: true,
      smooth: false,
      clip: true,
      markPoint: {
        label: {
          color: '#fff',
          textBorderColor: 'rgb(55,162,218)',
          textBorderWidth: 2,
        },
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
  ],
});

// 桑基图
const sankeyOptions = _.merge({}, BASE_OPTION, {
  series: {
    label: {
      position: 'right',
      ...baseTextStyle,
    },
    lineStyle: {
      color: 'source',
      curveness: 0.5,
    },
  },
});
// 矩形树图
const treemapOptions = _.merge({}, BASE_OPTION, {
  color: [
    'rgb(83,175,223)',
    'rgb(83,220,223)',
    'rgb(71,203,235)',
    'rgb(93,213,135)',
    'rgb(255,210,51)',
  ],
  title: {
    left: 'center',
  },
  legend: {
    show: false,
  },
  series: {
    type: 'treemap',
    breadcrumb: {
      show: false,
    },
    label: {
      show: true,
      formatter: '{b}',
      overflow: 'break',
      ...baseTextStyle.textStyle,
    },
    upperLabel: {
      show: true,
      height: 30,
      color: '#fff',
      position: 'inside',
      ...baseTextStyle.textStyle,
    },
    itemStyle: {
      borderColor: '#fff',
    },
    levels: [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 2,
          gapWidth: 1,
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        upperLabel: {
          color: '#333',
        },
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ],
  },
});

// 地图
const chinaMap = {
  visualMap: {
    type: 'continuous',
    itemWidth: 16,
    itemHeight: 100,
    symbol: 'rect',
    min: 0,
    max: 10000,
    text: ['高', '低'],
    realtime: false,
    calculable: true,
    showLabel: false,
    textGap: 10,
    itemGap: 3,
    bottom: 15,
    precision: 0,
    inRange: {
      color: ['#f4dd4c', '#f99805', '#f90505'],
    },
  },
  series: [
    {
      type: 'map',
      map: 'china',
      select: {
        disabled: true,
      },
      label: {
        show: false,
      },
      itemStyle: {
        borderColor: '#000',
        borderWidth: 1,
        areaColor: '#ccc',
      },
    },
  ],
};

module.exports = {
  pie1: pieOptions1,
  pie2: pieOptions2,
  bar1: barOptions1,
  bar2: barOptions2,
  line: lineOptions,
  sankey: sankeyOptions,
  treemap: treemapOptions,
  map: chinaMap,
};
