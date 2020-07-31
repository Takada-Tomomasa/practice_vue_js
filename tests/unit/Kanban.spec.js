import { shallowMount, createLocalVue } from "@vue/test-utils";
import Kanban from "@/components/Kanban.vue";
import Vuex from "vuex";

let wrapper;

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
    wrapper = shallowMount(Kanban, { store, localVue });
  });

  it("test Kanban-3 p", async () => {
    const stories = [
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 4 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
    ];
    store.commit("setStories", stories);
    await wrapper.vm.$nextTick();
    expect(wrapper.find("p").text()).toEqual("達成度 1 /3");
  }),
    it("test Kanban-4 table", () => {
      expect(wrapper.exists(".kanban")).toBeTruthy();
    }),
    it("test Kanban-9 thead status.name", () => {
      const statuses = ["Todo", "Doing", "Review", "Done"];
      statuses.forEach((status, index) => {
        expect(wrapper.findAll("th").at(index).text()).toEqual(status);
      });
    }),
    it("test Kanban-14 story", async () => {
      const stories = [
        { id: 2, name: "Story2", contents: "contents2", status: 1 },
        { id: 3, name: "Story3", contents: "contents3", status: 4 },
        { id: 4, name: "Story4", contents: "contents4", status: 2 },
        { id: 5, name: "Story5", contents: "contents5", status: 2 },
      ];
      store.commit("setStories", stories);
      await wrapper.vm.$nextTick();
      expect(wrapper.findAll("tbody").at(0).text()).toEqual("Story2");
      expect(wrapper.findAll("tbody").at(1).text()).toEqual(
        "Story4" + "Story5"
      );
      expect(wrapper.findAll("tbody").at(2).text()).toEqual("");
      expect(wrapper.findAll("tbody").at(3).text()).toEqual("Story3");
    }),
    it("test Kanban-15 storyclick", () => {
      wrapper.find(".story tr td").trigger("click");
      expect(wrapper.vm.$data.detailShowing).toBeTruthy();
    }),
    it("test Kanban-20 button", () => {
      wrapper.find("button").trigger("click");
      expect(wrapper.vm.$data.addShowing).toBeTruthy();
    }),
    it("test Kanban-25 AddModal exist", () => {
      const AddModal = wrapper.find("AddModal-stub");
      expect(AddModal.exists()).toBeTruthy();
    }),
    it("test Kanban-25 AddModal send", () => {
      wrapper.setData({ addShowing: true });
      wrapper.find("AddModal-stub").vm.$emit("closeAddModal");
      expect(wrapper.vm.$data.addShowing).toBeFalsy();
    }),
    it("test Kanban-30 DetailModal exist", () => {
      const DetailModal = wrapper.find("DetailModal-stub");
      expect(DetailModal.exists()).toBeTruthy();
    });
  it("test Kanban-30 DetailModal send", async () => {
    wrapper.setData({ detailShowing: true });
    wrapper.find("DetailModal-stub").vm.$emit("closeDetailModal");
    expect(wrapper.vm.$data.detailShowing).toBeFalsy();
    expect(wrapper.find("DetailModal-stub").props().statuses).toStrictEqual([
      { id: 1, name: "Todo" },
      { id: 2, name: "Doing" },
      { id: 3, name: "Review" },
      { id: 4, name: "Done" },
    ]);
    const story = { id: 2, name: "Story2", contents: "contents2", status: 1 };
    wrapper.vm.openDetailModal(story);
    await wrapper.vm.$nextTick;
    expect(wrapper.find("DetailModal-stub").props().passStoryID).toEqual(2);
    expect(wrapper.find("DetailModal-stub").props().passStoryStatus).toEqual(1);
    expect(wrapper.find("DetailModal-stub").props().passStoryName).toEqual(
      "Story2"
    );
    expect(wrapper.find("DetailModal-stub").props().passStoryContents).toEqual(
      "contents2"
    );
  });
});
