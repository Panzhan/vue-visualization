<template>
    <div style="text-align: center">
        <span class="text" v-if="updateStatus==0">确认启用账号?</span>
        <span class="text" v-if="updateStatus==1">确认停用吗？停用后当前角色对应的用户将无法正常使用系统。</span>
        <span class="text" v-if="updateStatus==2">确认删除吗？删除后当前角色对应的用户将无法正常使用系统。</span>
        <div class="constainer">
            <a-button
                style="background: #F5F5F5;border: 0"
                class="btn btn_l"
                size="large"
                @click="cancle"
            >{{"取消"}}</a-button>
            <a-button 
                style="margin-left: 10px"
                class="btn btn_r" 
                :class="updateStatus == 2 ? 'del' : ''"
                size="large" 
                type="primary"
                @click="submit"
            >{{"确定"}}</a-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { SysAccountApi } from '@/api'

export default {
    name: "UpdateStatus",
    components: {
    },
    props: {
        updateStatus: String | Number,
        editId: String | Number,
    },
    data() {
        return {
        };
    },
    computed: {
    },
    created() {
    },
    methods: {
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            SysAccountApi
                .updatestatus({id: this.editId, status: this.updateStatus})
                .then((res)=>{
                    this.toast("操作成功", "success");
                    this.$emit('handleAddSubmit')
                })
                .catch((err)=>{
                    
                })
            // this.$emit('handleAddSubmit')
        },
    },
};
</script>

<style lang="scss" scoped>
.text{
    display: block;
    margin: 0 0 24px 0;
    font-size: 1px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #232323;
}
.constainer{
    margin: 0 auto;
    .del{
        border: 0;
        background: #FF6262;
    }
}
</style>
