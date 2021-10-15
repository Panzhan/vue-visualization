const columns = [
    {
        title: '订单编号',
        dataIndex: 'orderno',
        key: 'orderno',
        // width: '7%',
        scopedSlots: {
            customRender: 'orderno'
        }
    },
    {
        title: '品类',
        dataIndex: 'categoryname',
        key: 'categoryname',
        // width: '11%',
        scopedSlots: {
            customRender: 'categoryname'
        }
    },
    {
        title: '品牌',
        dataIndex: 'brandname',
        key: 'brandname',
        // width: '7%',
        scopedSlots: {
            customRender: 'brandname'
        }
    },
    {
        title: '图片',
        dataIndex: 'checkimg',
        key: 'checkimg',
        // width: '7%',
        scopedSlots: {
            customRender: 'checkimg'
        }
    },
    {
        title: '鉴定类型',
        dataIndex: 'type',
        key: 'type',
        // width: '7%',
        scopedSlots: {
            customRender: 'type'
        }
    },
    {
        title: '鉴定师',
        dataIndex: 'nickname',
        key: 'nickname',
        // width: '9%',
        scopedSlots: {
            customRender: 'nickname'
        }
    },
    {
        title: '提交时间',
        dataIndex: 'createtime',
        key: 'createtime',
        // width: '15%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        // width: '9%',
        scopedSlots: {
            customRender: 'status'
        }
    },
    {
        title: '结束时间',
        dataIndex: 'completetime',
        key: 'completetime',
        // width: '15%',
        scopedSlots: {
            customRender: 'completetime'
        }
    },
    {
        title: '鉴定结果',
        dataIndex: 'result',
        key: 'result',
        // width: '8%',
        scopedSlots: {
            customRender: 'result'
        }
    },
    // {
    //     title: '操作',
    //     key: 'action',
    //     dataIndex: 'action',
    //     fixed: "right",
    //     width: 200,
    //     scopedSlots: {
    //         customRender: 'action'
    //     }
    // }
]
export {
    columns
} 
