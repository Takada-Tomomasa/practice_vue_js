<template>
  <div>
    <p class="storiesLength">達成度 {{ doneLength }} /{{ $store.getters.stories.length }}</p>
    <table class="kanban">
      <tr>
        <td v-for="status in statuses" v-bind:key="status.id">
          <thead>
            <tr>
              <th>{{status.name}}</th>
            </tr>
          </thead>
          <tbody>
            <div v-for="story in $store.getters.stories" v-bind:key="story.id" class="story">
              <tr v-if="story.status==status.id">
                <td @click="openDetailModal(story)">{{story.name}}</td>
              </tr>
            </div>
          </tbody>
          <tfoot v-if="status.id==1">
            <button @click="openAddModal">＋</button>
          </tfoot>
        </td>
      </tr>
    </table>
    <AddModal
      :addShowing="addShowing"
      v-on:closeAddModal="closeAddModal"
      v-on:preventCloseModal="preventCloseModal"
    />
    <DetailModal
      :detailShowing="detailShowing"
      :statuses="statuses"
      :storyName="storyName"
      :storyContents="storyContents"
      :storyID="storyID"
      :storyStatus="storyStatus"
      v-on:closeDetailModal="closeDetailModal"
      v-on:preventCloseModal="preventCloseModal"
    ></DetailModal>
  </div>
</template>

<script>
import AddModal from "./AddModal";
import DetailModal from "./DetailModal";

export default {
  name: "Kanban",
  components: {
    AddModal,
    DetailModal
  },
  created() {
    const stories = [
      {
        id: 1,
        name: "画期的なデザインに変更",
        contents: "背景色を青に変える",
        status: 1
      },
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 3 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
      { id: 5, name: "Story5", contents: "contents5", status: 4 },
      { id: 6, name: "Story6", contents: "contents6", status: 4 },
      { id: 7, name: "ストーリー2", contents: "内容2", status: 3 },
      { id: 8, name: "ストーリー3", contents: "内容3", status: 1 },
      { id: 9, name: "ストーリー4", contents: "内容4", status: 4 },
      { id: 10, name: "ストーリー5", contents: "内容5", status: 4 },
      { id: 11, name: "ストーリー6", contents: "内容6", status: 4 },
      { id: 12, name: "ストーリー7", contents: "内容7", status: 2 }
    ];
    this.$store.commit("setStories", stories);
  },
  data() {
    return {
      addShowing: false,
      detailShowing: false,
      statuses: [
        { id: 1, name: "Todo" },
        { id: 2, name: "Doing" },
        { id: 3, name: "Review" },
        { id: 4, name: "Done" }
      ]
    };
  },
  computed: {
    doneLength: function() {
      return this.$store.getters.stories.filter(function(val) {
        return val.status == 4;
      }).length;
    }
  },
  methods: {
    openAddModal: function() {
      this.addShowing = true;
    },
    closeAddModal: function() {
      this.addShowing = false;
    },
    preventCloseModal: function() {
      event.stopPropagation();
    },
    openDetailModal: function(story) {
      this.storyName = story.name;
      this.storyContents = story.contents;
      this.storyID = story.id;
      this.storyStatus = story.status;
      this.detailShowing = true;
    },
    closeDetailModal: function() {
      this.detailShowing = false;
    }
  }
};
</script>

<style scoped>
.storiesLength {
  padding-right: 20%;
  text-align: right;
}
.kanban {
  text-align: center;
  margin: auto;
  background-color: white;
  width: 800px;
}
.kanban td {
  border: 1px solid;
  vertical-align: top;
}
.story {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.story tfoot td {
  text-align: left;
  border: none;
}
.story td {
  width: 200px;
  height: 30px;
  background-color: #ffffb2;
  vertical-align: middle;
}
tfoot {
  text-align: left;
}
th {
  font-size: 120%;
}
</style>