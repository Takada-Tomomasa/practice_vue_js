import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stories: {},
    users: {},
  },
  getters: {
    stories(state) {
      return state.stories;
    },
    users(state) {
      return state.users;
    },
  },
  mutations: {
    setStories(state, newStories) {
      state.stories = newStories;
    },
    addStory(state, newStory) {
      state.stories.push(newStory);
    },
    changeStory(state, { changedStory, index }) {
      state.stories.splice(index, 1, changedStory);
    },
    removeStory(state, index) {
      state.stories.splice(index, 1);
    },
    setUsers(state, newUsers) {
      state.users = newUsers;
    },
    addUser(state, newUser) {
      state.users.push(newUser);
    },
  },
  actions: {
  },
  modules: {
  }
})
