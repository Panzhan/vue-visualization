<template>
    <div style="text-align: center">
        <span class="text">确认删除菜单</span>
        <div class="constainer">
            <a-button
                style="background: #F5F5F5;border: 0"
                class="btn btn_l"
                size="large"
                @click="cancle"
            >{{"取消"}}</a-button>
            <a-button 
                style="margin-left: 10px"
                class="btn btn_r del" 
                size="large" 
                type="primary"
                @click="submit"
            >{{"确定"}}</a-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { MenuApi } from '@/api'

export default {
    name: "UpdateStatus",
    components: {
    },
    props: {
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
            MenuApi
                .updatestatus({id: this.editId})
                .then((res)=>{
                    this.toast("操作成功", "success");
                    this.$emit('handleAddSubmit')
                })
                .catch((err)=>{
                    
                })
        },
    },
};
</script>

<style lang="scss" scoped>
.text{
    display: block;
    margin: 0 0 20px 0;
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
