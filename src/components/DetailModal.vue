<template>
  <div id="overlay" v-show="detailShowing" @click="$emit('closeDetailModal')">
    <div id="content" @click="$emit('preventCloseModal')">
      <h2>ストーリー詳細</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="storyName" />
      <p>作業項目</p>
      <select v-model="selected">
        <option disabled value>作業項目を選んでください</option>
        <option
          v-for="status in statuses"
          v-bind:key="status.id"
          v-bind:value="status.id"
        >{{ status.name }}</option>
      </select>

      <p>内容</p>
      <textarea v-model="storyContents" placeholder="内容を入力してください。" onfocus="this.placeholder = ''"></textarea>
      <button @click="$emit('closeDetailModal')">キャンセル</button>
      <span style="margin-right: 1em;"></span>
      <button @click="changeItem">保存</button>
      <span style="margin-right: 1em;"></span>
      <button @click="removeItem">削除</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailShowing: Boolean,
    statuses: Array,
    storyName: String,
    storyContents: String,
    changeID: Number,
    selected: Number
  },
  data() {
    return {
      storyCount: 100
    };
  },
  methods: {
    changeItem: function() {
      var index = this.$store.getters.stories.findIndex(
        story => story.id === this.changeID
      );
      var story = {
        id: this.changeID,
        name: this.storyName,
        contents: this.storyContents,
        status: this.selected
      };
      this.$store.commit("changeStory", { changedStory: story, index: index });
      this.$emit("closeDetailModal");
    },
    removeItem: function() {
      var index = this.$store.getters.stories.findIndex(
        story => story.id === this.changeID
      );
      this.$store.commit("removeStory", index);
      this.$emit("closeDetailModal");
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