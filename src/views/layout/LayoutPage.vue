<template>
    <div class="">
        <el-container class="wfuild">
            <el-header height="70px">
                <main-header></main-header>
            </el-header>
            <el-container class="h-auto-full cus-bg-color">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-container>
            <el-footer height="120px">
                <main-footer></main-footer>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'

export default {
    name: 'LayoutPage',
    metaInfo: {
        title: 'i博导',
        meta: [{ name: '博导在线' }],
    },
    components: {
        MainHeader,
        MainFooter,
    },
}
</script>
<style lang="scss" scoped>
.el-header,
.el-main,
.el-footer {
    padding: 0;
}
.cus-bg-color {
    background-color: #f4f4f4;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.fade-enter {
    transform: translateX(-100px);
}
.fade-leave-to {
    transform: translateX(100px);
}
</style>
