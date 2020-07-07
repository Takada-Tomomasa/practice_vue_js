<template>
  <div>
    <p class="rightLength">達成度 {{ doneLength }} /{{ $store.getters.todos.length }}</p>
    <table class="kanban">
      <tr>
        <td v-for="status in statuses" v-bind:key="status.id">
          <thead>
            <tr>
              <th>{{status.name}}</th>
            </tr>
          </thead>
          <tbody>
            <div v-for="todo in $store.getters.todos" v-bind:key="todo.id" class="story">
              <tr v-if="todo.status==status.id">
                <td @click="openModalDetails(todo)">
                  <Story :todo="todo" />
                </td>
              </tr>
            </div>
          </tbody>
          <tfoot v-if="status.id==1">
            <button v-on:click="openModal">＋</button>
          </tfoot>
        </td>
      </tr>
    </table>
    <AddModal
      :showContent="showContent"
      v-on:closeAddModal="closeModal"
      v-on:stopModal="stopModal"
    />
    <DetailsModal
      :showDetails="showDetails"
      :statuses="statuses"
      :storyName="storyName"
      :storyContents="storyContents"
      :changeID="changeID"
      :selected="selected"
      v-on:closeModalDetails="closeModalDetails"
      v-on:stopModal="stopModal"
    ></DetailsModal>
  </div>
</template>

<script>
import Story from "./Story";
import AddModal from "./AddModal";
import DetailsModal from "./DetailsModal";

export default {
  name: "Kanban",
  components: {
    Story,
    AddModal,
    DetailsModal
  },
  created() {
    const todos = [
      {
        id: 1,
        name: "画期的なデザインに変更",
        contents: "背景色を青に変える",
        status: 1
      },
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 3 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
      { id: 5, name: "Story5", contents: "contents5", status: 3 },
      { id: 6, name: "Story6", contents: "contents6", status: 2 },
      { id: 7, name: "ストーリー2", contents: "内容2", status: 3 },
      { id: 8, name: "ストーリー3", contents: "内容3", status: 1 },
      { id: 9, name: "ストーリー4", contents: "内容4", status: 4 },
      { id: 10, name: "ストーリー5", contents: "内容5", status: 2 },
      { id: 11, name: "ストーリー6", contents: "内容6", status: 4 },
      { id: 12, name: "ストーリー7", contents: "内容7", status: 2 }
    ];
    this.$store.commit("setTodos", todos);
  },
  data() {
    return {
      showContent: false,
      showDetails: false,
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
      return this.$store.getters.todos.filter(function(val) {
        return val.status == 4;
      }).length;
    }
  },
  methods: {
    openModal: function() {
      this.showContent = true;
    },
    closeModal: function() {
      this.showContent = false;
    },
    stopModal: function() {
      event.stopPropagation();
    },
    openModalDetails: function(todo) {
      this.storyName = todo.name;
      this.storyContents = todo.contents;
      this.changeID = todo.id;
      this.selected = todo.status;
      this.showDetails = true;
    },
    closeModalDetails: function() {
      this.showDetails = false;
    }
  }
};
</script>

<style scoped>
.rightLength {
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
.todo tfoot td {
  text-align: left;
  border: none;
}
.story td {
  width: 200px;
  background-color: #ffffb2;
}
tfoot {
  text-align: left;
}
th {
  font-size: 120%;
}
</style>