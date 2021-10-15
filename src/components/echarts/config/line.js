let echarts = require('echarts/lib/echarts');
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
require('echarts/lib/component/legend')
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import { color } from 'echarts/lib/theme/light';

const option = {
    title: [
        {
            show: true,
            text: '订单量',
            left: -5,
            textStyle: {
                color: '#232323',
                fontWeight: 'bold',
                fontSize: 24
            }
        },
        {
            show: true,
            text: '(单位/双)',
            left: 72,
            top: 8,
            textStyle: {
                color: '#646464',
                fontSize: 12
            }
        }
    ],
    legend: {
        top: 0,
        right: 0,
        itemWidth: 12,
        itemHeight: 12,
        icon: 'rectangle',
        borderRadius: 5,
        selectedMode: false,
        textStyle: {
            fontSize: 12,
            lineHeight: 17,
            color: '#646464',
            fontWeight: 400,
        },
        data: ['本周订单量', '上周订单量']
    },
    grid: {
        top: 64,
        bottom: 52,
        left: 0,
        right: 24,
        containLabel: true
    },
    color: [
        new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: '#4A99EE'
            },
            {
                offset: 1,
                color: '#3270F5'
            }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: 'rgba(228, 231, 237, 0.5)'
            },
            {
                offset: 1,
                color: '#E4E7ED'
            }
            ]
        ),
    ],
    tooltip: {
        // backgroundColor: 'rgba(83,33,202,1)', // 弹窗
        // borderColor: 'rgba(44,14,221,1)', // 弹窗
        // borderWidth: 0,
        height: 80,
        padding: [20, 34, 20, 24],
        confine: true, // 是否限制在图表内
        show: true,
        trigger: 'axis',
        backgroundColor: "#FFFFFF",
        borderColor: 'rgba(50, 112, 245, 0.5)',
        borderWidth: 2,
        borderRadius: 8,
        textStyle: {
            color: '#646464',
            fontSize: 16,
            lineHeight: 24
        },
        axisPointer: {
            type: 'line',
            lineStyle: {
                width: 3,
                color: "rgba(52, 114, 247, 0.3)",
                type: 'dashed'
            }
        },
        formatter: function (obj) {
            let arr0 = obj[0], arr1 = obj[1]
            let style = {
                'fontWeight': 900,
                color: '#232323'
            }
            let val = JSON.parse(arr0.name), date = val.nextTime,
                xTitle = `日期：<span style=${style}>${date}</span></br>`,
                yTitle = `${arr0.seriesName}: <span style=${style}>${arr0.value}件</span></br>${arr1.seriesName}: <span style=${style}>${arr1.value}件</span>`
            return xTitle + yTitle;
        },
        // formatter: function (obj) {
        //     const { preTime, nextTime } = JSON.parse(obj) || {};
        //     const xTitle = `日期：${obj.seriesIndex === 1 ? preTime : nextTime}<br/>`;
        //     const yTitle = `订单量：${obj.value || 0}件`;

        //     return xTitle + yTitle;
        // },
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
            textStyle: {
                color: '#969696',
                fontSize: 12,
                fontFamily: 'OswaldBold'
            },
            formatter: function (obj) {
                const {
                    index
                } = JSON.parse(obj || {});
                return index
            },
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#F5F5F5'
            },
        }
    },
    yAxis: {
        type: 'value',
        //  第一根Y轴线
        splitNumber: 3,
        axisLine: {
            show: false,
        },
        splitLine: {
            show: true, // x轴线的网格,
            lineStyle: {
                color: '#F5F5F5',
            },
        },
        axisTick: {
            show: false
        },
        margin: 12,
        axisLabel: {
            color: '#969696',
            fontWeight: 500,
            lineHeight: 17,
            fontSize: 14,
            fontFamily: 'OswaldBold'
        }
    },
    series: [
        {
            type: 'line',
            name: '本周订单量',
            smooth: true,
            data: [],
            z: 2,
            lineStyle: {
                width: 5
            },
            symbolSize: 6,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(50,112,245,0.1)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(50,112,245,0.04)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        {
            type: 'line',
            name: '上周订单量',
            smooth: true,
            z: 1,
            lineStyle: {
                width: 5
            },
            symbolSize: 6,
            data: [],
            lineStyle: {
                width: 3
            },
        }
    ]
};
export default option;
