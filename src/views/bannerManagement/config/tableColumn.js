const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: '7%',
        scopedSlots: {
            customRender: 'id'
        }
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '9%',
        scopedSlots: {
            customRender: 'name'
        }
    },
    {
        title: '图片',
        dataIndex: 'picurl',
        key: 'picurl',
        width: '9%',
        scopedSlots: {
            customRender: 'picurl'
        }
    },
    {
        title: '链接',
        dataIndex: 'linkurl',
        key: 'linkurl',
        width: '15%',
        scopedSlots: {
            customRender: 'linkurl'
        }
    },
    {
        title: '开始时间',
        dataIndex: 'begintime',
        key: 'begintime',
        width: '15%',
        scopedSlots: {
            customRender: 'begintime'
        }
    },
    {
        title: '结束时间',
        dataIndex: 'endtime',
        key: 'endtime',
        width: '15%',
        scopedSlots: {
            customRender: 'endtime'
        }
    },
    {
        title: '创建人',
        dataIndex: 'username',
        key: 'username',
        width: '8%',
        scopedSlots: {
            customRender: 'username'
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
