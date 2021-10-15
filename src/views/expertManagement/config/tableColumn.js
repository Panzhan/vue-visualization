const columns = [
    {
        title: '账单时间',
        dataIndex: 'checktime',
        key: 'checktime',
        // width: '15%',
        scopedSlots: {
            customRender: 'checktime'
        }
    },
    {
        title: '鉴定师',
        dataIndex: 'nickname',
        key: 'nickname',
        // width: '15%',
        scopedSlots: {
            customRender: 'nickname'
        }
    },
    {
        title: '鉴定数量',
        dataIndex: 'num',
        key: 'num',
        // width: '15%',
        scopedSlots: {
            customRender: 'num'
        }
    },
    {
        title: '鉴定收入',
        dataIndex: 'checkerincome',
        key: 'checkerincome',
        // width: '15%',
        scopedSlots: {
            customRender: 'checkerincome'
        }
    },
    {
        title: '超时扣除',
        dataIndex: 'deductincome',
        key: 'deductincome',
        // width: '15%',
        scopedSlots: {
            customRender: 'deductincome'
        }
    },
    {
        title: '最终收入',
        dataIndex: 'finalincome',
        key: 'finalincome',
        // width: '15%',
        scopedSlots: {
            customRender: 'finalincome'
        }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        // fixed: "right",
        // width: 200,
        scopedSlots: {
            customRender: 'action'
        }
    }
]
export {
    columns
} 
