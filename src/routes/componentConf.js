const allUserRutes = [
    {   
        path: '/check/index',
        name: '鉴定订单管理',
        type: 2,
        meta: {
            title: '鉴定订单管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/orderManagement/index.vue`)
    },
    {   
        path: '/check/detail',
        name: '鉴定订详情',
        type: 3,
        meta: {
            title: '鉴定订单详情',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/orderManagement/detail.vue`)
    },
    {
        path: '/check/user',
        name: '鉴定师管理',
        type: 2,
        meta: {
            title: '鉴定师管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/appraiserSettlement`),
    },
    {
        path: '/check/user/add',
        name: '鉴定师新增',
        type: 3,
        meta: {
            title: '鉴定师新增',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/appraiserSettlement/checkerAdd.vue`),
    },
    {
        path: '/check/user/edit',
        name: '编辑鉴定师信息',
        type: 3,
        meta: {
            title: '鉴定师新增',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/appraiserSettlement/checkerAdd.vue`),
    },
    {
        path: '/check/settlement',
        name: '鉴定师结算',
        type: 2,
        meta: {
            title: '鉴定师结算',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/expertManagement`)
    },
    {
        path: '/check/settlement/detail',
        name: '鉴定师结算详情',
        type: 2,
        meta: {
            title: '鉴定师结算详情',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/expertManagement/detail.vue`)
    },
    {
        path: '/check/range',
        name: '鉴定范围管理',
        type: 2,
        meta: {
            title: '鉴定范围管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/scopeAppraisalManagement`)
    },
    {
        path: '/banner/index',
        name: 'banner管理',
        type: 2,
        meta: {
            title: 'banner管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/bannerManagement`)
    },
    {
        path: '/video/index',
        name: 'video管理',
        type: 2,
        meta: {
            title: 'video管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/videoManagement`)
    },
    {
        path: '/brand/index',
        name: '品牌管理',
        type: 2,
        meta: {
            title: '品牌管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/brand`)
    },
    {
        path: '/category/index',
        name: '类目管理',
        type: 2,
        meta: {
            title: '类目管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/category`)
    },
    {
        path: '/user/index',
        name: '用户管理',
        type: 2,
        meta: {
            title: '用户管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/userManagement`)
    },
    {
        path: '/role/index',
        name: '角色管理',
        type: 2,
        meta: {
            title: '角色管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/roleManagement`)
    },
    {
        path: '/adminuser/userindex',
        name: '修改密码',
        type: 2,
        meta: {
            title: '修改密码',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/passwordManagement`)
    },
    {
        path: '/adminuser/index',
        name: '后台账户管理',
        type: 2,
        meta: {
            title: '后台账户管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/accountBackground`)
    },
    {
        path: '/version/index',
        name: '版本更新',
        type: 2,
        meta: {
            title: '版本更新',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/versionManagement`)
    },
    {
        path: '/menu/index',
        name: '菜单管理',
        type: 2,
        meta: {
            title: '菜单管理',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/menuManagement`)
    },
    {
        path: '/welcome/index',
        name: '欢迎页',
        type: 2,
        meta: {
            title: '欢迎页',
            breadcrumbHidden: true,
        },
        hidden: true,
        component: () => import(`@/views/welcomePage`)
    },
]
export {
    allUserRutes
} 