const searchKeys = [
    {
        key: "orderno",
        label: "鉴定单号",
        placeholder: "请输入",
        required: false,
        rules: [],
        input: true
    },
    {
        key: "type",
        label: "鉴定类型",
        placeholder: "请选择",
        required: false,
        rules: [],
        select: true
    },
    {
        key: "checkerid",
        label: "鉴定师",
        placeholder: "请选择",
        required: false,
        rules: [],
        select: true,
    },
    {
        key: "checkresult",
        label: "鉴定结果",
        placeholder: "请选择",
        required: false,
        rules: [],
        select: true,
    },
    {
        key: 'dates',
        label: '提交时间',
        format: "YYYY-MM-DD HH:mm",
        placeholder: ["开始日期", "结束日期"],
        dates: true,
        required: false,
        rules: [{
            required: false,
        }]
    },
    {
        key: "button",
        label: "",
        placeholder: "",
        button: true
    }
]

export {
    searchKeys
}