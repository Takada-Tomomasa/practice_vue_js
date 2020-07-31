<template>
  <div id="mainpage">
    <h2>かんばんボード</h2>
    <p>とれぷろ！ 作</p>
    <!-- <input type="text" v-model="keyWord" placeholder="検索" onfocus="this.placeholder = ''"> -->
    <Kanban />
    <div display:inline-block>
      <!-- <img class="pic1" src="../assets/pic1.png" /> -->
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic2" src="../assets/pic2.png" />
      <img class="pic1" src="../assets/pic1.png" />
    </div>
  </div>
</template>
<script>
import Kanban from "./Kanban";
export default {
  name: "MainPage",
  components: {
    Kanban,
  },
};
</script>
<style scoped>
#mainpage {
  text-align: center;
}
.pic1 {
  width: 30%;
  height: auto;
}
.pic2 {
  width: 15%;
  height: auto;
}
</style>