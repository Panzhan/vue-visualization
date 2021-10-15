<template>
    <div class="swiper_bar" id="swiperBar" v-if="titles.length > 0">
        <div class="cell-item" 
            :style="getCellStyle" 
            @click="handleClickTab(item, index)" 
            v-for="(item, index) in titles" 
            :key="(item.id || item.id == 0) ? item.id : item.name"
        >
            <span class="nomal-line" />
            <span class="title" :class="getTitleClass(index)">{{`${item.name}`}}{{ showNumb ? ` (${item.count || 0}) ` : '' }}</span>
            <span class="line" :class="getLineClass(index)" />
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomTab",
    data() {
        return {
        };
    },
    props: {
        // tab数组
        titles: {
            type: Array,
            default: () => [],
        },
        // 选中的元素，默认为:index=0
        defaultIndex: {
            type: Number,
            default: () => 0,
        },
        // 点击事件
        handleClick: {
            type: Function,
            default: () => {},
        },
        // 是否展示数量,加上属性 count
        showNumb: {
            type: Boolean,
            default: () => false,
        },
    },
    computed: {
        // 当前选中的tab
        activeIndex: {
            get() {
                return this.defaultIndex
            },
            set(){

            }
        },
        getCellStyle() {
            return { whiteSpace: "nowrap" };
        },
        getTitleClass(){
            return (index)=>{
                return index === this.activeIndex ? "active-title" : "nomal-title";
            }
        },
        getLineClass(val){
            return(index)=>{
                return index === this.activeIndex ? "active-line" : "nomal-line";
            }
        }
    },
    watch: {
        defaultIndex(newValue, oldValue){
        }
    },
    methods: {
        handleClickTab(item, index) {
            if (this.activeIndex != index) {
                this.activeIndex = index;
                this.handleClick(item, index);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.swiper_bar {
    margin: 8px 0 20px;
    flex: 1;
    border-bottom: 1px solid #dddddd;
    display: flex;
    .cell-item {
        width: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            display: inline-block;
            padding: 0 28px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            &.active-title {
                font-weight: 600;
                color: #3270f5;
            }
            &.nomal-title {
                font-size: 14px;
                font-weight: 500;
                color: #232323;
            }
        }
        .line {
            margin-top: 6px;
            &.active-line {
                height: 4px;
                width: 100%;
                border-radius: 2px;
                background-color: #3270f5;
            }
            &.nomal-line {
                height: 4px;
                width: 98px;
                opacity: 0;
                background-color: transparent;
            }
        }
    }
}
</style>