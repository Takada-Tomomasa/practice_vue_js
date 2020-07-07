<template>
  <div id="mainpage">
    <h2>かんばんボード</h2>
    <p>このボードは、テクコン部新人3名によるVue.jsの演習成果物である。</p>
    <!-- <input type="text" v-model="keyWord" placeholder="検索" onfocus="this.placeholder = ''"> -->
    <Kanban />
  </div>
</template>
<script>
import Kanban from "./Kanban";
export default {
  name: "MainPage",
  components: {
    Kanban
  }
};
</script>
<style scoped>
#mainpage {
  text-align: left;
}
</style>