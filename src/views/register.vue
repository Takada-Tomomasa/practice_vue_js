<template>
  <div>
    <div id="content">
      <a @click="toLogin">ログイン</a>
      <span style="margin-right: 1em;"></span>
      <a class="here">登録</a>

      <p>ID:</p>
      <input type="text" v-model="addUserId" />
      <p>Password:</p>
      <input type="text" v-model="addPassword" />
      <p>
        <button @click="addUser">登録</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUserId: "",
      addPassword: "",
    };
  },
  methods: {
    toLogin: function () {
      this.$router.push({ path: "/" });
    },
    addUser: function () {
      var user = {
        userId: this.addUserId,
        password: this.addPassword,
      };
      if (!user.userId.match(/\S/g) || !user.password.match(/\S/g)) {
        alert("未入力項目があります！");
        return;
      }
      for (var registeredUser of this.$store.getters.users) {
        if (user.userId == registeredUser.userId) {
          alert("このIdは登録されています！");
          return;
        }
      }
      console.log(user);
      this.$store.commit("addUser", user);
      this.$router.push({ path: "/mainpage" });
      console.log(this.$store.getters.users);
      this.addUserId = "";
      this.addPassword = "";
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
}
</style>