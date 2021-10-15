let echarts = require('echarts/lib/echarts');
require("echarts/lib/chart/pie");
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
import 'echarts/lib/component/tooltip';
let option = {
    title: [
        {
            show: true,
            text: '库存统计',
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
            left: 96,
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
        data: ['在售中', '寄存中']
    },
    color: ['#3270F5', '#44CD5A'],
    grid: {
        top: 64,
        bottom: 52,
        left: 0,
        right: 24,
        containLabel: true
    },
    series: [
        {
            name: '在售中',
            type: 'pie',
            // radius: '65%',
            center: ['50%', '50%'],
            radius: ['35%', '48%'],
            avoidLabelOverlap: false,
            // 关闭放大效果
            hoverAnimation: false,
            startAngle: 45,
            position: 'outer',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 13,
                        lineHeight: 20,
                        color: 'rgba(0,0,0,0.7)',
                    },
                    // formatter: function (obj) {
                    //     return `${obj.name}${obj.percent.toFixed(0)}%\n共${obj.value || 0}件\n现货 ${obj.data.stokcount} 件\n瑕疵 ${obj.data.nostokcount} 件`
                    // },
                }
            },
            labelLine: {
                normal: {
                    length: 6,
                    length2: 6,
                    show: true,
                    lineStyle: {
                        width: 0.7,
                        type: 'dashed',
                        opacity: 0.7
                    }
                }
            },
            data: [{
                value: 0,
                name: '在售中'
            },
            {
                value: 0,
                name: '寄存中'
            }
            ]
        }
    ]
};

export default option;
