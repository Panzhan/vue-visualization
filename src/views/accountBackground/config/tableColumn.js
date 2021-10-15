const columns = [
    {
        title: '账户名称',
        dataIndex: 'username',
        key: 'username',
        width: '9%',
        scopedSlots: {
            customRender: 'username'
        }
    },
    {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
        width: '9%',
        scopedSlots: {
            customRender: 'name'
        }
    },
    {
        title: '员工姓名',
        dataIndex: 'realname',
        key: 'realname',
        width: '9%',
        scopedSlots: {
            customRender: 'realname'
        }
    },
    {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
        width: '9%',
        scopedSlots: {
            customRender: 'company'
        }
    },
    {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: '9%',
        scopedSlots: {
            customRender: 'department'
        }
    },
    {
        title: '联系方式',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '13%',
        scopedSlots: {
            customRender: 'mobile'
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '11%',
        scopedSlots: {
            customRender: 'status'
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
