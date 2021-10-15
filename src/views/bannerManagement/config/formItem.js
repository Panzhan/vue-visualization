const searchKeys = [
    {
        key: "name",
        label: "banner名称",
        placeholder: "请输入",
        required: false,
        rules: [],
        input: true
    },
    {
        key: 'dates',
        label: '开始时间',
        format: "YYYY-MM-DD",
        placeholder: ["开始时间", "结束时间"],
        dates: true,
        rules: [{
            type: 'array',
            required: false,
            message: '请选择时间段!'
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