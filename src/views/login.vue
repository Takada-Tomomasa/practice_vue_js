<template>
  <div>
    <div id="content">
      <a class="here">ログイン</a>
      <span style="margin-right: 1em;"></span>
      <a @click="toRegister">登録</a>

      <p>ID:</p>
      <input type="text" v-model="id" />
      <p>Password:</p>
      <input type="text" v-model="Password" />
      <p>
      <button @click="toKanban">ログイン</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toKanban: function () {
      this.$router.push({ path: "/mainpage" });
    },
    toRegister: function() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>
<style>
@import "../style/Modal.css";
#content {
  align-items: center; /*縦中央*/
  justify-content: center; /*横中央*/
  margin-left: auto;
  margin-right: auto;
  border: 0.25em solid;
  border-color: rgb(170, 196, 24);
}

.here {
  text-decoration: underline;
  font-size: 120%;
}
</style>