export const options = {
  title: {
    text: '页面请求趋势图',
    x: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: function (value) {
        const intValue = Math.floor(value);
        const decimal = value - intValue;
        if (decimal === 0) {
          return intValue;
        } else {
          return '';
        }
      },
    },
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
};
