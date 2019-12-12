<template>
  <div id="app">
        <app-header></app-header>
        <app-footer></app-footer>
    
    <router-view/>
  </div>
</template>
<script>
import AppHeader from "@/components/header/index.vue";
import AppFooter from "@/components/footer/index.vue";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
