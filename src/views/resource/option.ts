const initSource: any[] = [];
export const option = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: false,
  },
  dataset: {
    source: initSource,
  },
  xAxis: { type: 'category' },
  yAxis: { gridIndex: 0 },
  grid: { top: '55%' },
  series: [
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
    },
    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      emphasis: {
        focus: 'self',
      },
      label: {
        formatter: function (params) {
          console.log(params);
          if (params === 0) {
            return '{b}: {@resource} (0%)';
          } else {
            return '{b}: {@resource} ({d}%)';
          }
        },
      },
      encode: {
        itemName: 'resource',
        value: '1',
        tooltip: '1',
      },
    },
  ],
};
