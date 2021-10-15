const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        scopedSlots: {
            customRender: 'name'
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
        width: '25%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '25%',
        scopedSlots: {
            customRender: 'status'
        }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: "25%",
        scopedSlots: {
            customRender: 'action'
        }
    }
]
export {
    columns
} 
