import {
    FORM_LENGHT_WRAPPER,
    FORM_LENGHT_NOMAL_LABEL,
} from "@/config/interceptors/constant";

const searchKeys = [{
        key: "username",
        label: "账户名称",
        placeholder: "请填写账户名称",
        disabled: true,
        required: true,
        rules: [{
            required: false,
            message: '请填写账户名称'
        }],
        input: true
    },
    {
        key: "realname",
        label: "真实姓名",
        placeholder: "请填写真实姓名",
        disabled: true,
        required: true,
        rules: [{
            required: false,
            message: '请填写真实姓名'
        }],
        input: true
    },
    {
        key: "password",
        label: "新密码",
        placeholder: "需同时包含大小写字母、数字(8-16位)",
        required: true,
        rules: [{
                required: true,
                message: '请填写新密码'
            },
            {
                pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$', 'g'),
                message: '需同时包含大小写字母、数字(8-16位)'
            }
        ],
        password: true,
    },
    {
        key: "checkpassword",
        label: "确认新密码",
        placeholder: "需同时包含大小写字母、数字(8-16位)",
        required: true,
        rules: [{
                required: true,
                message: '请确认新密码'
            },
            {
                pattern: new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$', 'g'),
                message: '需同时包含大小写字母、数字(8-16位)'
            }
        ],

        password: true,
    },
    {
        key: "usertype",
        label: "用户类型",
        placeholder: "请填写用户类型",
        disabled: true,
        required: true,
        rules: [{
            required: false,
            message: '请填写角色'
        }],
        input: true
    },
    {
        key: "supplyname",
        label: "关联供应商",
        placeholder: "请填写供应商",
        disabled: true,
        required: true,
        rules: [{
            required: false,
            message: '请填写供应商'
        }],
        input: true
    },
];
const formItemLayout = {
    labelCol: {
        span: FORM_LENGHT_NOMAL_LABEL + 1,
    },
    wrapperCol: {
        span: FORM_LENGHT_WRAPPER - 1,
    }
};

export {
    formItemLayout,
    searchKeys
}
