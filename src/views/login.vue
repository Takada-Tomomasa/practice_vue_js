<template>
  <div>
    <div id="content">
      <a class="here">ログイン</a>
      <span style="margin-right: 1em;"></span>
      <a @click="toRegister">登録</a>

      <p>ID:</p>
      <input type="text" v-model="checkUserId"/>
      <p>Password:</p>
      <input type="text" v-model="checkPassword" />
      <p>
      <button @click="checkUser">ログイン</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
    created() {
    const users = [
      {userId: "yajima", password: "aaa"},
      { userId: "kato", password: "bbb" },
      { userId: "takada", password: "ccc" },
      { userId: "wang", password: "ddd" },
    ];
    this.$store.commit("setUsers", users);
  },
  data() {
    return {
      checkUserId: "",
      checkPassword: "",
    };
  },
  methods: {
    toKanban: function () {
      this.$router.push({ path: "/mainpage" });
    },
    toRegister: function() {
      this.$router.push({ path: "/register" });
    },
    checkUser:function(){
      if (!this.checkUserId.match(/\S/g) ||!this.checkPassword.match(/\S/g)) {
        alert("未入力項目があります！");
        return;
      }    
      var flag = false;
      for (var user of this.$store.getters.users){
        if (this.checkUserId==user.userId && this.checkPassword==user.password){
          this.$router.push({ path: "/mainpage" });
          flag = true;
        } 
      }
      if(flag==false){
        alert("idまたはpasswordが間違っています。");
      }

    }
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