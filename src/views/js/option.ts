export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      gridIndex: 0,
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
  ],
  series: [
    {
      name: '错误数量',
      type: 'bar',
      barWidth: '60%',
      data: [],
      itemStyle: {
        barBorderRadius: 5,
        borderWidth: 1,
        borderType: 'solid',
        borderColor: '#73c0de',
        shadowColor: '#5470c6',
        shadowBlur: 3,
      },
    },
  ],
};
