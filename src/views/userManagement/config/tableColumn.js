const columns = [
    {
        title: 'uid',
        dataIndex: 'id',
        key: 'id',
        // width: '11%',
        scopedSlots: {
            customRender: 'id'
        }
    },
    {
        title: '用户昵称',
        dataIndex: 'username',
        key: 'username',
        // width: '11%',
        scopedSlots: {
            customRender: 'username'
        }
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        // width: '15%',
        scopedSlots: {
            customRender: 'email'
        }
    },
    {
        title: '邀请人',
        dataIndex: 'invitationname',
        key: 'invitationname',
        // width: '11%',
        scopedSlots: {
            customRender: 'invitationname'
        }
    },
    {
        title: '注册时间',
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
