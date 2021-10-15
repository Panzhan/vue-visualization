// createtime: "2021-08-05 13:42:28.0"
// fastcheck: 1
// id: 1
// onlinetimebegin: "2021-08-05 13:42:17"
// onlinetimeend: "2021-08-05 13:42:20"
// paynumber: "123123123"
// paytype: "支付宝"
// username: "meisuteng"
const columns = [
    {
        title: '鉴定师昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: '11%',
        scopedSlots: {
            customRender: 'nickname'
        }
    },
    {
        title: '可鉴定品牌数量',
        dataIndex: 'brandcount',
        key: 'brandcount',
        width: '11%',
        scopedSlots: {
            customRender: 'brandcount'
        }
    },
    {
        title: '可鉴定品类数量',
        dataIndex: 'categorycount',
        key: 'categorycount',
        width: '11%',
        scopedSlots: {
            customRender: 'categorycount'
        }
    },
    {
        title: '支持快速鉴定',
        dataIndex: 'fastcheck',
        key: 'fastcheck',
        width: '9%',
        scopedSlots: {
            customRender: 'fastcheck'
        }
    },
    {
        title: '在线时间',
        dataIndex: 'onlinetimebegin',
        key: 'onlinetimebegin',
        width: '15%',
        scopedSlots: {
            customRender: 'onlinetimebegin'
        }
    },
    {
        title: '结算方式',
        dataIndex: 'paytype',
        key: 'paytype',
        width: '9%',
        scopedSlots: {
            customRender: 'paytype'
        }
    },
    {
        title: '结算账户',
        dataIndex: 'paynumber',
        key: 'paynumber',
        width: '11%',
        scopedSlots: {
            customRender: 'paynumber'
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
        width: '15%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        fixed: "right",
        width: 200,
        scopedSlots: {
            customRender: 'action'
        }
    }
]
export {
    columns
} 
