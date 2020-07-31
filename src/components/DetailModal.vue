<template>
  <div id="overlay" @click="$emit('closeDetailModal')">
    <div id="content" @click="$emit('preventCloseModal')">
      <h2>ストーリー詳細</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="storyName" />
      <p>作業項目</p>
      <select v-model="storyStatus">
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
    statuses: Array,
    passStoryName: String,
    passStoryContents: String,
    passStoryID: Number,
    passStoryStatus: Number,
  },
  computed: {
    storyName: {
      get() {
        return this.passStoryName;
      },
      set(value) {
        this.$emit("update:passStoryName", value);
      },
    },
    storyContents: {
      get() {
        return this.passStoryContents;
      },
      set(value) {
        this.$emit("update:passStoryContents", value);
      },
    },
    storyID: {
      get() {
        return this.passStoryID;
      },
      set(value) {
        this.$emit("update:passStoryID", value);
      },
    },
    storyStatus: {
      get() {
        return this.passStoryStatus;
      },
      set(value) {
        this.$emit("update:passStoryStatus", value);
      },
    },
  },
  methods: {
    changeItem: function () {
      var index = this.$store.getters.stories.findIndex(
        (story) => story.id === this.storyID
      );
      var story = {
        id: this.storyID,
        name: this.storyName,
        contents: this.storyContents,
        status: this.storyStatus,
      };
           if (!story.name.match(/\S/g)) {
        alert("名前を入力してください！");
      } else {
      this.$store.commit("changeStory", { changedStory: story, index: index });
      this.$emit("closeDetailModal");
      }
    },
    removeItem: function () {
      var result = confirm("削除しますか？");
      if (result) {
        var index = this.$store.getters.stories.findIndex(
          (story) => story.id === this.storyID
        );
        this.$store.commit("removeStory", index);
        this.$emit("closeDetailModal");
      }
    },
  },
};
</script>

<style>
@import "../style/Modal.css";
</style>