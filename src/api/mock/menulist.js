const menuList = {
    "code": 1511200,
    "expiretime": 0,
    "data": [
        {
            "id": 54,
            "name": "订单管理",
            "type": 1,
            "sort": 1,
            "list": [
                {
                    "id": 56,
                    "name": "鉴定订单管理",
                    "type": 2,
                    "path": "/check/index",
                    "redirect": "/check/index",
                    "list": [
                        {
                            "id": 63,
                            "name": "鉴定订单详情页",
                            "type": 3,
                            "path": "/check/detail",
                            "redirect": "/check/detail"
                        },
                        {
                            "id": 86,
                            "name": "订单管理列表",
                            "type": 2,
                            "path": "/check/index",
                            "redirect": "/check/index"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "鉴定管理",
            "type": 1,
            "sort": 3,
            "list": [
                {
                    "id": 8,
                    "name": "鉴定师管理",
                    "type": 2,
                    "path": "/check/user",
                    "redirect": "/check/user",
                    "list": [
                        {
                            "id": 58,
                            "name": "编辑鉴定师信息（二级页面）",
                            "type": 3,
                            "path": "/check/user/edit",
                            "redirect": "/check/user/edit"
                        },
                        {
                            "id": 89,
                            "name": "鉴定师管理列表",
                            "type": 2,
                            "path": "/check/user",
                            "redirect": "/check/user"
                        },
                        {
                            "id": 9,
                            "name": "鉴定师添加",
                            "type": 4,
                            "path": "/check/user/add",
                            "redirect": "/check/user/add",
                            "permissionid": "check:adduser:add"
                        },
                        {
                            "id": 10,
                            "name": "鉴定师新增页面",
                            "type": 3,
                            "path": "/check/user/add",
                            "redirect": "/check/user/add"
                        },
                        {
                            "id": 11,
                            "name": "编辑鉴定师按钮",
                            "type": 4,
                            "path": "/check/updateuser",
                            "redirect": "/check/updateuser",
                            "permissionid": "check:checker:edit"
                        },
                        {
                            "id": 65,
                            "name": "删除鉴定师按钮",
                            "type": 4,
                            "path": "/check/delete",
                            "redirect": "/check/delete",
                            "permissionid": "check:checker:delete"
                        }
                    ]
                },
                {
                    "id": 13,
                    "name": "鉴定师结算",
                    "type": 2,
                    "path": "/check/settlement",
                    "redirect": "/check/settlement",
                    "list": [
                        {
                            "id": 90,
                            "name": "鉴定师结算列表页",
                            "type": 2,
                            "path": "/check/settlement",
                            "redirect": "/check/settlement",
                            "permissionid": ""
                        },
                        {
                            "id": 66,
                            "name": "鉴定师详情",
                            "type": 4,
                            "path": "/expert/detail",
                            "redirect": "/expert/detail",
                            "permissionid": "check:expert:detail"
                        },
                        {
                            "id": 14,
                            "name": "鉴定师结算详情（二级页面）",
                            "type": 3,
                            "path": "/check/settlement/detail",
                            "redirect": "/check/settlement/detail"
                        }
                    ]
                },
                {
                    "id": 15,
                    "name": "鉴定范围管理",
                    "type": 2,
                    "path": "/check/range",
                    "redirect": "/check/range",
                    "list": [
                        {
                            "id": 91,
                            "name": "鉴定范围列表页",
                            "type": 2,
                            "path": "/check/range",
                            "redirect": "/check/range"
                        },
                        {
                            "id": 17,
                            "name": "【新增】鉴定范围按钮",
                            "type": 4,
                            "path": "/check/addrange",
                            "redirect": "/check/addrange",
                            "permissionid": "check:addscope:add"
                        },
                        {
                            "id": 18,
                            "name": "【编辑】鉴定范围按钮",
                            "type": 4,
                            "path": "/check/updaterange",
                            "redirect": "/check/updaterange",
                            "permissionid": "check:addscope:edit"
                        }
                    ]
                }
            ]
        },
        {
            "id": 4,
            "name": "用户管理",
            "type": 1,
            "sort": 4,
            "list": [
                {
                    "id": 30,
                    "name": "用户管理",
                    "type": 2,
                    "path": "/user/index",
                    "redirect": "/user/index",
                    "list": [
                        {
                            "id": 92,
                            "name": "用户管理列表页",
                            "type": 2,
                            "path": "/user/index",
                            "redirect": "/user/index"
                        },
                        {
                            "id": 31,
                            "name": "【启用/停用】用户账号按钮",
                            "type": 4,
                            "path": "/user/update",
                            "redirect": "/user/update",
                            "permissionid": "check:user:update"
                        }
                    ]
                },
                {
                    "id": 38,
                    "name": "角色管理",
                    "type": 2,
                    "path": "/role/index",
                    "redirect": "/role/index",
                    "list": [
                        {
                            "id": 93,
                            "name": "角色管理列表页",
                            "type": 2,
                            "path": "/role/index",
                            "redirect": "/role/index"
                        },
                        {
                            "id": 67,
                            "name": "【权限编辑】按钮",
                            "type": 4,
                            "path": "/role/edit",
                            "redirect": "/role/edit",
                            "permissionid": "check:role:edit"
                        },
                        {
                            "id": 68,
                            "name": "【停用/启用】角色开关",
                            "type": 4,
                            "path": "/role/update",
                            "redirect": "/role/update",
                            "permissionid": "check:role:update"
                        },
                        {
                            "id": 40,
                            "name": "【新增】角色按钮",
                            "type": 4,
                            "path": "/role/add",
                            "redirect": "/role/add",
                            "permissionid": "check:role:add"
                        },
                        {
                            "id": 41,
                            "name": "【删除】角色按钮",
                            "type": 4,
                            "path": "/role/updatestatus",
                            "redirect": "/role/updatestatus",
                            "permissionid": "check:role:delete"
                        }
                    ]
                },
                {
                    "id": 42,
                    "name": "修改密码",
                    "type": 2,
                    "path": "/adminuser/userindex",
                    "redirect": "/adminuser/userindex",
                    "list": [
                        {
                            "id": 94,
                            "name": "修改密码页面",
                            "type": 2,
                            "path": "/adminuser/userindex",
                            "redirect": "/adminuser/userindex"
                        },
                        {
                            "id": 43,
                            "name": "更新系统账户密码",
                            "type": 4,
                            "path": "/adminuser/updatepwd",
                            "redirect": "/adminuser/updatepwd",
                            "permissionid": "check:pwd:edit"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "name": "运营管理",
            "type": 1,
            "sort": 8,
            "list": [
                {
                    "id": 19,
                    "name": "banner管理",
                    "type": 2,
                    "path": "/banner/index",
                    "redirect": "/banner/index",
                    "list": [
                        {
                            "id": 87,
                            "name": "banner管理列表页",
                            "type": 2,
                            "path": "/banner/index",
                            "redirect": "/banner/index"
                        },
                        {
                            "id": 20,
                            "name": "banner详情（二级页面）",
                            "type": 3,
                            "path": "/banner/details",
                            "redirect": "/banner/details"
                        },
                        {
                            "id": 21,
                            "name": "【新增】banner按钮",
                            "type": 4,
                            "path": "/banner/add",
                            "redirect": "/banner/add",
                            "permissionid": "check:banner:add"
                        },
                        {
                            "id": 22,
                            "name": "【编辑】banner按钮",
                            "type": 4,
                            "path": "/banner/update",
                            "redirect": "/banner/update",
                            "permissionid": "check:banner:edit"
                        },
                        {
                            "id": 23,
                            "name": "【删除】banner按钮",
                            "type": 4,
                            "path": "/banner/delete",
                            "redirect": "/banner/delete",
                            "permissionid": "check:banner:delete"
                        },
                        {
                            "id": 64,
                            "name": "【查看】banner按钮",
                            "type": 4,
                            "path": "/banner/detail",
                            "redirect": "/banner/detail",
                            "permissionid": "check:banner:detail"
                        },
                        {
                            "id": 24,
                            "name": "【结束】banner按钮",
                            "type": 4,
                            "path": "/banner/end",
                            "redirect": "/banner/end",
                            "permissionid": "check:banner:stop"
                        }
                    ]
                },
                {
                    "id": 25,
                    "name": "video管理",
                    "type": 2,
                    "path": "/video/index",
                    "redirect": "/video/index",
                    "list": [
                        {
                            "id": 88,
                            "name": "video管理列表页",
                            "type": 2,
                            "path": "/video/index",
                            "redirect": "/video/index",
                            "permissionid": ""
                        },
                        {
                            "id": 26,
                            "name": "video详情（弹窗）",
                            "type": 3,
                            "path": "/video/details",
                            "redirect": "/video/details"
                        },
                        {
                            "id": 27,
                            "name": "【新增】video按钮",
                            "type": 4,
                            "path": "/video/add",
                            "redirect": "/video/add",
                            "permissionid": "check:video:add"
                        },
                        {
                            "id": 28,
                            "name": "【编辑】video按钮",
                            "type": 4,
                            "path": "/video/update",
                            "redirect": "/video/update",
                            "permissionid": "check:video:edit"
                        },
                        {
                            "id": 29,
                            "name": "【删除】video按钮",
                            "type": 4,
                            "path": "/video/delete",
                            "redirect": "/video/delete",
                            "permissionid": "check:video:delete"
                        }
                    ]
                }
            ]
        },
        {
            "id": 6,
            "name": "系统管理",
            "type": 1,
            "sort": 9,
            "list": [
                {
                    "id": 52,
                    "name": "版本管理",
                    "type": 2,
                    "path": "/version/index",
                    "redirect": "/version/index",
                    "list": [
                        {
                            "id": 96,
                            "name": "版本管理列表页",
                            "type": 2,
                            "path": "/version/index",
                            "redirect": "/version/index"
                        },
                        {
                            "id": 69,
                            "name": "新增版本",
                            "type": 4,
                            "path": "/version/add",
                            "redirect": "/version/add",
                            "permissionid": "check:version:add"
                        },
                        {
                            "id": 70,
                            "name": "【停止】版本按钮",
                            "type": 4,
                            "path": "/version/stop",
                            "redirect": "/version/stop",
                            "permissionid": "check:version:stop"
                        },
                        {
                            "id": 71,
                            "name": "【查看】版本按钮",
                            "type": 4,
                            "path": "/version/detail",
                            "redirect": "/version/detail",
                            "permissionid": "check:version:detail"
                        },
                        {
                            "id": 72,
                            "name": "【编辑】版本按钮",
                            "type": 4,
                            "path": "/version/edit",
                            "redirect": "/version/edit",
                            "permissionid": "check:version:edit"
                        }
                    ]
                },
                {
                    "id": 53,
                    "name": "菜单管理",
                    "type": 2,
                    "path": "/menu/index",
                    "redirect": "/menu/index",
                    "list": [
                        {
                            "id": 97,
                            "name": "菜单管理列表页",
                            "type": 2,
                            "path": "/menu/index",
                            "redirect": "/menu/index"
                        },
                        {
                            "id": 73,
                            "name": "【编辑】菜单按钮",
                            "type": 4,
                            "path": "/menu/edit",
                            "redirect": "/menu/edit",
                            "permissionid": "check:menu:edit"
                        },
                        {
                            "id": 74,
                            "name": "【删除】菜单按钮",
                            "type": 4,
                            "path": "/version/delete",
                            "redirect": "/version/delete",
                            "permissionid": "check:version:delete"
                        },
                        {
                            "id": 75,
                            "name": "【新增】菜单按钮",
                            "type": 4,
                            "path": "/version/add",
                            "redirect": "/version/add",
                            "permissionid": "check:version:add"
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "name": "系统账户管理",
            "type": 1,
            "sort": 10,
            "list": [
                {
                    "id": 32,
                    "name": "后台账户管理",
                    "type": 2,
                    "path": "/adminuser/index",
                    "redirect": "/adminuser/index",
                    "list": [
                        {
                            "id": 95,
                            "name": "后台账户列表页",
                            "type": 2,
                            "path": "/adminuser/index",
                            "redirect": "/adminuser/index"
                        },
                        {
                            "id": 33,
                            "name": "系统账户详情",
                            "type": 3,
                            "path": "/adminuser/details",
                            "redirect": "/adminuser/details"
                        },
                        {
                            "id": 34,
                            "name": "【新增】系统账户",
                            "type": 4,
                            "path": "/adminuser/add",
                            "redirect": "/adminuser/add",
                            "permissionid": "check:sysuser:add"
                        },
                        {
                            "id": 35,
                            "name": "【编辑】系统账户",
                            "type": 4,
                            "path": "/adminuser/update",
                            "redirect": "/adminuser/update",
                            "permissionid": "check:sysuser:edit"
                        },
                        {
                            "id": 36,
                            "name": "【重置密码】系统账户",
                            "type": 4,
                            "path": "/adminuser/updatepwd",
                            "redirect": "/adminuser/updatepwd",
                            "permissionid": "check:sysuser:resetpwd"
                        },
                        {
                            "id": 37,
                            "name": "【停用/启用】系统账户",
                            "type": 4,
                            "path": "/adminuser/updatestatus",
                            "redirect": "/adminuser/updatestatus",
                            "permissionid": "check:sysuser:update"
                        }
                    ]
                }
            ]
        }
    ]
}