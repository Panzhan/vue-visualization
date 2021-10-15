<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="父级菜单">
                    <a-select
                        size="large"
                        style="width: 262px"
                        v-if="editId"
                        v-decorator="[
                            'parentid',
                        ]"
                        disabled
                    >
                        <a-select-option v-for="item in menuNameList" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                    <a-directory-tree
                        v-else
                        :showLine="showLine"
                        :multiple="multiple"
                        v-model="checkedKeys"
                        :treeData="allMenuList"
                        @expand="onExpand"
                        @select="onSelect"
                        @check="onCheck"
                        :selectedKeys="selectedKeys"
                        :expandedKeys="expandedKeys"
                        :autoExpandParent="autoExpandParent"
                        :replaceFields="{ children: 'children', title: 'name', key: 'id' }"
                    >
                        <template slot="title" slot-scope="{ title }">
                        <span v-if="title.indexOf(searchValue) > -1">
                            {{ title.substr(0, title.indexOf(searchValue)) }}
                                <span style="color: #f50">{{ searchValue }}</span>
                            {{
                                title.substr(title.indexOf(searchValue) + searchValue.length)
                            }}
                        </span>
                        <span v-else>{{ title }}</span>
                        </template>
                    </a-directory-tree>
                </a-form-item>
                <a-form-item label="菜单类型">
                    <a-radio-group 
                        v-decorator="[
                            'type',
                        ]" 
                        name="radioGroup" 
                    >
                        <a-radio :value="1">
                            目录
                        </a-radio>
                        <a-radio :value="2">
                            页面
                        </a-radio>
                        <a-radio :value="3">
                            二级页面
                        </a-radio>
                        <a-radio :value="4">
                            按钮
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="菜单名称">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'name',
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="权限标识">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'permissionid',
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="路径">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'path',
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="重定向URL">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'redirect',
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="排序">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'sort',
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item style="display: flex; justify-content: space-between;">
                    <a-button
                        style="background: #F5F5F5;border: 0"
                        class="btn btn_l"
                        size="large"
                        @click="cancle"
                    >{{"取消"}}</a-button>
                    <a-button 
                        style="margin-left: 10px"
                        class="btn btn_r" 
                        size="large" 
                        type="primary"
                        @click="submit"
                    >{{editId ? '保存' : "创建"}}</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { MenuApi } from '@/api'

export default {
    name: "Menu",
    components: {},
    props: {
        editId: String | Number,
    },
    data() {
        return {
            parentid: '',
            editorForm: this.$form.createForm(this),
            checkedKeys: {},
            selectedKeys: [],
            expandedKeys: [],
            autoExpandParent: true,
            checked: [],
            halfChecked: [],
            showLine: true,
            multiple: false,
            treeData: [],
            menuNameList: [],
            createFormType: ''
        };
    },
    computed: {
        ...mapState('base', ['userInfo', 'allMenuList']),
    },
    created() {
        if(this.editId){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.getMenuDetail()
                })
            })
        }
    },
    methods:{
        cancle(){
            this.$emit('handleAddCancle')
        },
        getMenuDetail(){
            MenuApi
                .findone({id: this.editId})
                .then((res)=>{
                    this.editorForm.setFieldsValue({
                        type: res.type,
                        name: res.name,
                        path: res.path,
                        sort: res.sort,
                        redirect: res.redirect,
                        parentid: res.parentid,
                        parentname: res.parentname,
                        permissionid: res.permissionid,
                    });
                    this.menuNameList.push({
                        name: res.parentname || '',
                        id: res.parentid
                    })
                })
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if(!this.editId){
                    let params = {
                        ...values,
                        parentid: this.parentid
                    }
                    MenuApi
                        .sysmenuSave(params)
                        .then(()=>{ 
                            this.toast("操作成功", "success");
                            this.$emit('handleAddSubmit')
                        })
                }else{
                    let params = {
                        ...values,
                        id: this.editId
                    }
                    MenuApi
                        .update(params)
                        .then(()=>{
                            this.toast("操作成功", "success");
                            this.$emit('handleAddSubmit')
                        })
                }
            });
           
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys
            this.autoExpandParent = false
        },
        onSelect(selectedKeys, e) {
            this.parentid = e.node.eventKey
            const { title } = e.node || {}
            this.selectedTitles = [{ title, parentid: selectedKeys[0] }]
            this.selectedKeys = selectedKeys
        },
        onCheck(checkedKeys) {
            this.checkedKeys = checkedKeys
        },
    }
};
</script>

<style lang="scss" scoped>
:v-deep span.ant-radio{
    padding-right: 0px;
}
::v-deep .ant-form-item-required::before {
    display: none;
}
</style>
