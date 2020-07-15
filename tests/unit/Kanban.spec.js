import { shallowMount, createLocalVue } from "@vue/test-utils";
import Kanban from "@/components/Kanban.vue";
import Vuex from "vuex";

let wrapper;

// afterEach(() => {
//   wrapper.destroy();
// });
const localVue = createLocalVue();

localVue.use(Vuex);

describe("Kanban.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
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
      },
    });
  });

  it("test Kanban doneLength", () => {
    wrapper = shallowMount(Kanban, { store, localVue });
    const stories = [
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 4 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
    ];
    store.commit("setStories", stories);
    expect(wrapper.vm.doneLength).toEqual(1);
  }),

  it("test Kanban table", () => {
    expect(wrapper.exists(".kanban")).toBeTruthy();
  }),

  it("test Kanban thead status.name", () => {
    const statuses = ["Todo","Doing","Review","Done"]
    statuses.forEach((status,index) => {
      expect(wrapper.findAll("th").at(index).text()).toEqual(status);
    });
  })

  

});
