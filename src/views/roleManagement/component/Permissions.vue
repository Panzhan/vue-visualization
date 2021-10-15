<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="角色名称">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-decorator="[
                            'name',
                            {
                                rules: [
                                    { required: true, message: '请输入角色名称!' },
                                ],
                            },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="权限选择">
                    <a-directory-tree 
                        checkable 
                        :treeData="menuList" 
                        @expand="onExpand" 
                        @select="onSelect" 
                        @check="onCheck" 
                        :selectedKeys="selectedKeys" 
                        :expandedKeys="expandedKeys" 
                        v-model="checkedKeys" 
                        :autoExpandParent="autoExpandParent" 
                        :replaceFields="{ children: 'children', title: 'name', key: 'id' }"
                    >
                    </a-directory-tree>
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
import { SysAccountApi } from '@/api'

export default {
    name: "Permissions",
    components: {},
    props: {
        editId: String | Number,
        roleName: String
    },
    data() {
        return {
            editorForm: this.$form.createForm(this),
            checkedKeys: {},
            selectedKeys: [],
            expandedKeys: [],
            autoExpandParent: true,
            checked: [],
            halfChecked: [],
            // checked: [ 7, 1, 11, 19, 20, 21, 22, 23, 24 ],
            // halfChecked: [ 8, 2, 3 ],
        };
    },
    computed: {
        ...mapState('base', ['userInfo', 'menuList']),
    },
    created() {
        if(this.editId){
            this.getPermissionsDetail()
        }
        if(this.roleName){
            this.$nextTick(()=>{
                this.editorForm.setFieldsValue({
                    name: this.roleName
                });
            })
        }
        // this.getMenuList()
    },
    methods:{
        // ...mapActions('base', ['getMenuList']),
        cancle(){
            this.$emit('handleAddCancle')
        },
        getPermissionsDetail(){
            SysAccountApi
                .permissionsDetail({id: this.editId})
                .then((res)=>{
                    if(res.length){
                        this.reSetData(res)
                        this.checkedKeys = {
                            checked: this.checked,
                            halfChecked: this.halfChecked
                        }
                    }
                })
        },
        reSetData(treeData){
            return treeData.map(faItem=>{
                let { id, list=[], status } = faItem
                if(status){
                    list && list.length>0 && this.halfChecked.push(id);
                    list.length === 0 && this.checked.push(id);
                }
                list.length > 0 && (list = this.reSetData(list));
            })
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if (!err) {
                    let params = {
                        name: values.name,
                        menuids: ''
                    }
                    if(Object.keys(this.checkedKeys).length){
                        const { checked = [], halfChecked = [] } = this.checkedKeys;
                        params.menuids = [...new Set([...checked, ...halfChecked])].join(',')
                    }
                    if(!this.editId){
                        SysAccountApi
                            .roleSave(params)
                            .then(()=>{
                                this.toast("操作成功", "success");
                                this.$emit('handleAddSubmit')
                            }) 
                    }else{
                        SysAccountApi
                            .permissionsUpdate({...params, id: this.editId})
                            .then(()=>{
                                this.toast("操作成功", "success");
                                this.$emit('handleAddSubmit')
                            }) 
                    }
                }
            });
           
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onCheck(checkedKeys = [], info) {
            const { halfCheckedKeys = [] } = info;
            // 选中
            this.checked = checkedKeys;
            this.halfChecked = halfCheckedKeys;
            this.checkedKeys = { checked: checkedKeys, halfChecked: halfCheckedKeys };
        },
        onSelect(selectedKeys) {
            this.selectedKeys = selectedKeys;
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
