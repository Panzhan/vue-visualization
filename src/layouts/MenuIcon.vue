<template>
    <img class="menu_icon" :src="menuIcon" alt="">
</template>

<script>
import { ICONIDMAP } from './config'
export default {
    name: "MenuIcon",
    props:{
        menuPath: String | Number
    },
    data() {
        return {
            menuIcon: ICONIDMAP[this.menuPath]
        }
    },
    computed: {},
    methods: {},
};
</script>
<style lang="scss" scoped>
.menu_icon{
    width: 14px; 
    heigth: 14px; 
    margin: 0 13px
}
</style>