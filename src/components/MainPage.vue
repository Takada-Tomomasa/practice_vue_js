<template>
  <div id="mainpage">
    <h2>かんばんボード</h2>
    <p>とれぷろ！ 作</p>

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
  text-align: center;
}
</style>