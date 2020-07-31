<template>
  <div id="overlay" @click="$emit('closeAddModal')">
    <div id="content" @click="$emit('preventCloseModal')">
      <h2>ストーリーを追加</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="addStoryName" />
      <p>内容</p>
      <textarea
        v-model="addStoryContents"
        placeholder="内容を入力してください。"
        onfocus="this.placeholder = ''"
      ></textarea>
      <button @click="$emit('closeAddModal')">キャンセル</button>
      <span style="margin-right: 1em;"></span>
      <button @click="addItem">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stories: Array,
  },
  data() {
    return {
      storyCount: 100,
      addStoryName: "",
      addStoryContents: "",
    };
  },
  methods: {
    addItem: function () {
      var story = {
        id: this.storyCount,
        name: this.addStoryName,
        contents: this.addStoryContents,
        status: 1,
      };
      if (!story.name.match(/\S/g)) {
        alert("名前を入力してください！");
      } else {
        this.$store.commit("addStory", story);
        this.$emit("closeAddModal");
        this.storyCount = this.storyCount + 1;
      }
      this.addStoryName = "";
      this.addStoryContents = "";
    },
  },
};
</script>

<style>
@import "../style/Modal.css";
</style>