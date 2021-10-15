const detailColumn = [
    {
        title: '订单编号',
        dataIndex: 'orderno',
        key: 'orderno',
        // width: '4%',
        scopedSlots: {
            customRender: 'orderno'
        }
    },
    {
        title: '鉴定时间',
        dataIndex: 'createtime',
        key: 'createtime',
        // width: '7%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        // width: '7%',
        scopedSlots: {
            customRender: 'status'
        }
    },
    {
        title: '服务类型',
        dataIndex: 'type',
        key: 'type',
        // width: '7%',
        scopedSlots: {
            customRender: 'type'
        }
    },
    {
        title: '收入/扣除',
        dataIndex: 'amount',
        key: 'amount',
        // width: '7%',
        scopedSlots: {
            customRender: 'amount'
        }
    },
]
export {
    detailColumn
} 
