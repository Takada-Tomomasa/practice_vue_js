<template>
  <div id="app">
    <!-- <router-link to="/">ログイン</router-link>|
    <router-link to="/register">登録</router-link> -->
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  background-color: #ffcc99;
}
p {
  line-height: 1px;
}
</style>