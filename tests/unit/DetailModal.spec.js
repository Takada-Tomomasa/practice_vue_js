import { shallowMount, createLocalVue } from "@vue/test-utils";
import DetailModal from "@/components/DetailModal.vue";
import Vuex from "vuex";

let wrapper;

const localVue = createLocalVue();

localVue.use(Vuex);

describe("DetailModal.vue", () => {
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
    wrapper = shallowMount(DetailModal, {
      store,
      localVue,
      propsData: {
        detailShowing: true,
        statuses: [
          { id: 1, name: "Todo" },
          { id: 2, name: "Doing" },
          { id: 3, name: "Review" },
          { id: 4, name: "Done" },
        ],
        passStoryID: 100,
        passStoryName: "story100",
        passStoryContents: "contents100",
        passStoryStatus: 2,
      },
    });
  });
  it("test DetailModal-2 overlay closeDetailModal", () => {
    expect(wrapper.emitted("closeDetailModal")).toBeUndefined();
    wrapper.find("#overlay").trigger("click");
    expect(wrapper.emitted("closeDetailModal")).toBeTruthy();
  });
  it("test DetailModal-3 content preventCloseModal", () => {
    expect(wrapper.emitted("preventCloseModal")).toBeUndefined();
    wrapper.find("#content").trigger("click");
    expect(wrapper.emitted("preventCloseModal")).toBeTruthy();
  });
  it("test DetailModal-4 h2", () => {
    expect(wrapper.findAll("h2").at(0).text()).toEqual("ストーリー詳細");
  });
  it("test DetailModal-5 p", () => {
    expect(wrapper.findAll("p").at(0).text()).toEqual("ストーリー名");
  });
  it("test DetailModal-6 input", async () => {
    expect(wrapper.findAll("input").at(0).exists()).toBeTruthy();
    expect(wrapper.find("input").element.value).toEqual("story100");
    await wrapper.vm.$nextTick();
    wrapper.find("input").setValue("ストーリー100");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:passStoryName")[0][0]).toEqual(
      "ストーリー100"
    );
  });
  it("test DetailModal-7 p", () => {
    expect(wrapper.findAll("p").at(1).text()).toEqual("作業項目");
  });
  it("test DetailModal-8 select", async () => {
    expect(wrapper.findAll("select").at(0).exists()).toBeTruthy();
    expect(wrapper.find("select").element.value).toEqual("2");
    wrapper.find("select").setValue("3");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:passStoryStatus")[0][0]).toEqual(3);
  });
  it("test DetailModal-16 p", () => {
    expect(wrapper.findAll("p").at(2).text()).toEqual("内容");
  });

  it("test DetailModal-17 textarea", async () => {
    expect(wrapper.findAll("textarea").at(0).exists()).toBeTruthy();
    expect(wrapper.find("textarea").element.value).toEqual("contents100");
    wrapper.find("textarea").setValue("contents10000");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:passStoryContents")[0][0]).toEqual(
      "contents10000"
    );
  });
  it("test DetailModal-18 button cancel closeDetailModal", () => {
    expect(wrapper.findAll("button").at(0).exists()).toBeTruthy();
    expect(wrapper.emitted("closeDetailModal")).toBeUndefined();
    wrapper.findAll("button").at(0).trigger("click");
    expect(wrapper.emitted("closeDetailModal")).toBeTruthy();
  });
  it("test DetailModal-20 button save changeItem", async () => {
    expect(wrapper.findAll("button").at(1).exists()).toBeTruthy();

    const stories = [
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 4 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
      { id: 5, name: "Story5", contents: "contents5", status: 2 },
    ];
    store.commit("setStories", stories);
    await wrapper.vm.$nextTick();

    // 改善の余地あり changeItemの中身を書いてるだけ
    const index = store.getters.stories.findIndex((story) => story.id === 3);
    const newStory = {
      id: 3,
      name: "ストーリー3",
      contents: "内容3",
      status: 3,
    };
    store.commit("changeStory", { changedStory: newStory, index: index });
    await wrapper.vm.$nextTick();

    expect(store.getters.stories.length).toEqual(4);
    expect(store.getters.stories[1].name).toEqual("ストーリー3");
    expect(store.getters.stories[1].contents).toEqual("内容3");
    expect(store.getters.stories[1].status).toEqual(3);
  });
  it("test DetailModal-22 button remove removeItem", async () => {
    expect(wrapper.findAll("button").at(2).exists()).toBeTruthy();

    const stories = [
      { id: 2, name: "Story2", contents: "contents2", status: 1 },
      { id: 3, name: "Story3", contents: "contents3", status: 4 },
      { id: 4, name: "Story4", contents: "contents4", status: 2 },
      { id: 5, name: "Story5", contents: "contents5", status: 2 },
    ];
    store.commit("setStories", stories);
    await wrapper.vm.$nextTick();

    expect(store.getters.stories.length).toEqual(4);
    expect(store.getters.stories[1].name).toEqual("Story3");
    expect(store.getters.stories[1].contents).toEqual("contents3");

    const index = store.getters.stories.findIndex((story) => story.id === 3);
    store.commit("removeStory", index);
    await wrapper.vm.$nextTick();

    expect(store.getters.stories.length).toEqual(3);
    expect(store.getters.stories[1].name).toEqual("Story4");
    expect(store.getters.stories[1].contents).toEqual("contents4");
  });
});
