export const option = {
  title: {
    text: '页面加载瀑布图',
    x: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params) {
      const tar = params[1];
      return tar?.name + '<br/>' + tar?.seriesName + ' : ' + tar?.value;
    },
  },
  xAxis: {
    name: '加载时间(ms)',
    type: 'value',
    splitLine: { show: false },
  },
  yAxis: {
    type: 'category',
    splitLine: { show: false },
    inverse: true, // 将 yAxis 反向
    data: ['DNS查询', 'TCP连接', '网络请求', '首字节', '网络响应', 'DOM解析', '资源加载'],
  },
  series: [
    {
      name: 'Placeholder',
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent',
      },
      emphasis: {
        // itemStyle: {
        //   borderColor: 'transparent',
        //   color: 'transparent',
        // },
      },
      data: [],
    },
    {
      name: '耗时',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside',
      },
      data: [],
    },
    // {
    //   data: [93, 43, 245, 18, 24, 796, 2366],
    //   type: 'bar',
    // },
  ],
};
