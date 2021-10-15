<template>
    <div style="text-align: center">
        <span class="text" v-if="updateStatus==1">确认启用账号吗?</span>
        <span class="text" v-if="updateStatus==0">确认停用账号吗?</span>
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
                size="large" 
                type="primary"
                @click="submit"
            >{{"确定"}}</a-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: "RestStatus",
    components: {
    },
    props: {
        updateStatus: String | Number
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
            this.$emit('handleAddSubmit')
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
}
</style>
