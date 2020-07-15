<template>
  <div id="overlay" v-show="detailShowing" @click="$emit('closeDetailModal')">
    <div id="content" @click="$emit('preventCloseModal')">
      <h2>ストーリー詳細</h2>
      <p>ストーリー名</p>
      <input type="text" v-model="storyName" />
      <p>作業項目</p>
      <select v-model="storyStatus">
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
    storyID: Number,
    storyStatus: Number
  },
  methods: {
    changeItem: function() {
      var index = this.$store.getters.stories.findIndex(
        story => story.id === this.storyID
      );
      var story = {
        id: this.storyID,
        name: this.storyName,
        contents: this.storyContents,
        status: this.storyStatus
      };
      this.$store.commit("changeStory", { changedStory: story, index: index });
      this.$emit("closeDetailModal");
    },
    removeItem: function() {
      var index = this.$store.getters.stories.findIndex(
        story => story.id === this.storyID
      );
      this.$store.commit("removeStory", index);
      this.$emit("closeDetailModal");
    }
  }
};
</script>

<style>
@import '../style/Modal.css';
</style>