const columns = [
    {
        title: '品类名称',
        dataIndex: 'categoryname',
        key: 'categoryname',
        width: '11%',
        scopedSlots: {
            customRender: 'categoryname'
        }
    },
    {
        title: '品类logo',
        dataIndex: 'categoryimgurl',
        key: 'categoryimgurl',
        width: '11%',
        scopedSlots: {
            customRender: 'categoryimgurl'
        }
    },
    {
        title: '品牌名称',
        dataIndex: 'brandname',
        key: 'brandname',
        width: '11%',
        scopedSlots: {
            customRender: 'brandname'
        }
    },
    {
        title: '品牌logo',
        dataIndex: 'brandimgurl',
        key: 'brandimgurl',
        width: '11%',
        scopedSlots: {
            customRender: 'brandimgurl'
        }
    },
    {
        title: '普通鉴定/币',
        dataIndex: 'checkmoney',
        key: 'checkmoney',
        width: '11%',
        scopedSlots: {
            customRender: 'checkmoney'
        }
    },
    {
        title: '快速鉴定/币',
        dataIndex: 'fastcheckmoney',
        key: 'fastcheckmoney',
        width: '11%',
        scopedSlots: {
            customRender: 'fastcheckmoney'
        }
    },
    {
        title: 'AI鉴定/币',
        dataIndex: 'aicheckmoney',
        key: 'aicheckmoney',
        width: '11%',
        scopedSlots: {
            customRender: 'aicheckmoney'
        }
    },
    {
        title: '普通鉴定结算/RMB',
        dataIndex: 'settlement',
        key: 'settlement',
        width: '11%',
        scopedSlots: {
            customRender: 'settlement'
        }
    },
    {
        title: '快速鉴定结算/RMB',
        dataIndex: 'fastsettlement',
        key: 'fastsettlement',
        width: '11%',
        scopedSlots: {
            customRender: 'fastsettlement'
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
