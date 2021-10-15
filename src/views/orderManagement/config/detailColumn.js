const detailColumns = [
    {
        title: '时间',
        dataIndex: 'createtime',
        key: 'createtime',
        width: '15%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '角色',
        dataIndex: 'usertype',
        key: 'usertype',
        width: '13%',
        scopedSlots: {
            customRender: 'usertype'
        }
    },
    {
        title: '人',
        dataIndex: 'name',
        key: 'name',
        width: '13%',
        scopedSlots: {
            customRender: 'name'
        }
    },
    {
        title: '事件',
        dataIndex: 'desc',
        key: 'desc',
        width: '13%',
        scopedSlots: {
            customRender: 'desc'
        }
    },
    {
        title: '附件',
        dataIndex: 'items',
        key: 'items',
        width: '13%',
        scopedSlots: {
            customRender: 'items'
        }
    },
    {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
        width: '13%',
        scopedSlots: {
            customRender: 'memo'
        }
    },
]
export {
    detailColumns
} 
