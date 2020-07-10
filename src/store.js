import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// ストアを作成
const store = new Vuex.Store({
  state: {
    stories: {},
  },
  getters: {
    stories(state) {
      return state.stories;
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
  },
});
export default store;