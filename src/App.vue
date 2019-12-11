<template>
  <div id="app">
    <app-header></app-header>
    <transition name="router-fade">
      <router-view></router-view>
    </transition>
    <back-to-top></back-to-top>
    <app-footer></app-footer>
  </div>
</template>
<script>
// @ is an alias to /src
import AppHeader from "@/components/header";
import AppFooter from "@/components/footer";
import BackToTop from '@/components/backToTop'

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    BackToTop

  }
};
</script>
<style lang="scss">
#app {
  padding: 0;
  margin: 0;
  overflow: visible;
  position:relative;
    min-height:100%;
}

/* 页面过渡动画 */
.router-fade-enter-active, .router-fade-leave-active
{
   transition: opacity 0.3s;
}
  
.router-fade-enter, .router-fade-leave-active
{
  opacity: 0
}
  
</style>
