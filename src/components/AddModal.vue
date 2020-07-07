<template>
  <div id="overlay" v-show="showContent" v-on:click="$emit('closeAddModal')">
    <div id="content"  @click="$emit('stopModal')">
      <h2>ストーリーを追加</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="addStoryName" />
      <p>内容</p>
      <textarea
        v-model="addStoryContents"
        placeholder="内容を入力してください。"
        onfocus="this.placeholder = ''"
      ></textarea>
      <button v-on:click="$emit('closeAddModal')">キャンセル</button>
      <span style="margin-right: 1em;"></span>
      <button v-on:click="addItem">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showContent: Boolean,
    todos: Array
  },
  data() {
    return {
      storyCount: 100
    };
  },
  methods: {
    addItem: function() {
      // this.todos.push({
      //   id: this.storyCount,
      //   name: this.addStoryName,
      //   contents: this.addStoryContents,
      //   status: 1
      // });
      var todo = {
        id: this.storyCount,
        name: this.addStoryName,
        contents: this.addStoryContents,
        status: 1
      }
      this.$store.commit("addTodo",todo);
      this.$emit("closeAddModal");
      this.addStoryName = "";
      this.addStoryContents = "";
      this.storyCount = this.storyCount + 1;
    }

  }
};
</script>

<style>
#overlay {
  /* 要素を重ねた時の順番 */
  z-index: 1;

  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center; /*縦中央*/
  justify-content: center; /*横中央*/
}
#content {
  z-index: 2;
  width: 30%;
  padding: 1em;
  padding-left: 10%;
  background-color: #ffffcc;
}
textarea {
  resize: none;
  width: 80%;
  height: 4em;
}
input {
  width: 60%;
}
</style>