const columns = [
    {
        title: '对应端',
        dataIndex: 'type',
        key: 'type',
        width: '9%',
        scopedSlots: {
            customRender: 'type'
        }
    },
    {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
        width: '11%',
        scopedSlots: {
            customRender: 'version'
        }
    },
    {
        title: '发布时间',
        dataIndex: 'createtime',
        key: 'createtime',
        width: '15%',
        scopedSlots: {
            customRender: 'createtime'
        }
    },
    {
        title: '更新内容',
        dataIndex: 'copywriting',
        key: 'copywriting',
        width: '11%',
        scopedSlots: {
            customRender: 'copywriting'
        }
    },
    {
        title: '下载地址',
        dataIndex: 'linkurl',
        key: 'linkurl',
        width: '15%',
        scopedSlots: {
            customRender: 'linkurl'
        }
    },
    {
        title: '是否强制更新',
        dataIndex: 'forceupdate',
        key: 'forceupdate',
        width: '7%',
        scopedSlots: {
            customRender: 'forceupdate'
        }
    },
    {
        title: '创建人',
        dataIndex: 'username',
        key: 'username',
        width: '7%',
        scopedSlots: {
            customRender: 'username'
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
