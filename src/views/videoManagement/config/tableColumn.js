const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: '9%',
        scopedSlots: {
            customRender: 'id'
        }
    },
    // title 不能用于遍历的key，传给slot。。。。。。。。否则页面渲染会出问题
    {
        title: '标题',
        dataIndex: "vtitle",
        key: "vtitle",
        width: '9%',
        scopedSlots: {
            customRender: "vtitle"
        }
    },
    {
        title: '封面',
        dataIndex: 'picurl',
        key: 'picurl',
        width: '13%',
        scopedSlots: {
            customRender: 'picurl'
        }
    },
    {
        title: '链接',
        dataIndex: 'linkurl',
        key: 'linkurl',
        width: '20%',
        scopedSlots: {
            customRender: 'linkurl'
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
        title: '创建人',
        dataIndex: 'username',
        key: 'username',
        width: '11%',
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
