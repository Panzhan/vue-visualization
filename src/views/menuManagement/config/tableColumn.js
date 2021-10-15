const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '11%',
        scopedSlots: {
            customRender: 'id'
        }
    },
    {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
        width: '17%',
        scopedSlots: {
            customRender: 'name'
        }
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '11%',
        scopedSlots: {
            customRender: 'type'
        }
    },
    {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
        width: '11%',
        scopedSlots: {
            customRender: 'sort'
        }
    },
    {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
        width: '17%',
        scopedSlots: {
            customRender: 'path'
        }
    },
    {
        title: '重定向路径',
        dataIndex: 'redirect',
        key: 'redirect',
        width: '17%',
        scopedSlots: {
            customRender: 'redirect'
        }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        fixed: "right",
        width: 300,
        scopedSlots: {
            customRender: 'action'
        }
    }
]
export {
    columns
} 
