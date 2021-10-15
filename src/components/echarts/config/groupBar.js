let echarts = require('echarts/lib/echarts');
require("echarts/lib/chart/bar");
require('echarts/lib/component/legend')
require("echarts/lib/component/tooltip");
require('echarts/lib/component/grid')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markArea')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
let option = {
    title: [
        {
            show: true,
            text: '销售额',
            left: -5,
            textStyle: {
                color: '#232323',
                fontWeight: 'bold',
                fontSize: 24
            }
        },
        {
            show: true,
            text: '(单位/元)',
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
        height: 17,
        selectedMode: false,
        textStyle: {
            fontSize: 12,
            lineHeight: 17,
            color: '#646464',
            fontWeight: 400,
        },
        data: ['上周销售额', '本周销售额',]
    },
    grid: {
        top: 64,
        bottom: 52,
        left: 0,
        right: 24,
        containLabel: true
    },
    tooltip: {
        padding: [20, 34, 20, 24],
        confine: true, // 是否限制在图表内
        backgroundColor: "#FFFFFF",
        borderColor: 'rgba(50, 112, 245, 0.5)',
        borderWidth: 2,
        borderRadius: 8,
        textStyle: {
            color: '#646464',
            fontSize: 16,
            lineHeight: 24
        },
        formatter: function (obj) {
            const {
                preTime,
                nextTime
            } = JSON.parse(obj.name || {});
            let style = {
                'fontWeight': 900,
                color: '#232323'
            }
            const xTitle = `日期：<span style=${style}>${obj.seriesIndex === 1 ? nextTime : preTime}</span><br/>`;
            const yTitle = `销售额：<span style=${style}>${obj.value || 0}元</span>`;
            return xTitle + yTitle;
        }
    },

    color: [
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

    ],
    xAxis: {
        show: true,
        type: 'category',
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
                color: '#F5F5F5',

            },
        },
        data: [],
    },
    yAxis: {
        type: 'value',
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
        axisLabel: {
            margin: 12,
            textStyle: {
                color: '#969696',
                fontWeight: 500,
                lineHeight: 17,
                fontSize: 14,
                fontFamily: 'OswaldBold'
            },
            formatter: function (value, index) {
                let val = value > 0 ? value / 1000 + 'W' : 0
                if(value>100000){
                    val =value / 10000 + 'W'
                }
                // let val = value > 0 ? value / 10000 + 'W' : 0
                return val
            },
        },

    },
    series: [{
        type: 'bar',
        name: '本周销售总额',
        barMaxWidth: 16,
        barGap: 0,
        data: [],
    },
    {
        type: 'bar',
        name: '上周销售总额',
        barMaxWidth: 16,
        barGap: 0,
        data: []
    }
    ]
};

export default option;
