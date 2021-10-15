const searchKeys = [
    {
        key: "username",
        label: "账户名称",
        placeholder: "请输入",
        required: false,
        rules: [],
        input: true
    },
    {
        key: "realname",
        label: "员工姓名",
        placeholder: "请输入",
        required: false,
        rules: [],
        input: true
    },
    {
        key: "roleid",
        label: "角色类型",
        placeholder: "请选择",
        required: false,
        rules: [],
        select: true,
    },
    {
        key: "status",
        label: "状态",
        placeholder: "请选择",
        required: false,
        rules: [],
        select: true,
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