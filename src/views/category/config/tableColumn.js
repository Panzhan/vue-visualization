const columns = [
    {
        title: '中文名称',
        dataIndex: 'id',
        key: 'id',
        // width: '4%',
        scopedSlots: {
            customRender: 'id'
        }
    },
    {
        title: '英文名称',
        dataIndex: 'title',
        key: 'title',
        // width: '7%',
        scopedSlots: {
            customRender: 'title'
        }
    },
    {
        title: '类目图标',
        dataIndex: 'picurl',
        key: 'picurl',
        // width: '7%',
        scopedSlots: {
            customRender: 'picurl'
        }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        // fixed: "right",
        width: 200,
        scopedSlots: {
            customRender: 'action'
        }
    }
]
export {
    columns
} 
