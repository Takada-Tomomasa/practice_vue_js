import { shallowMount, createLocalVue } from "@vue/test-utils";
import AddModal from "@/components/AddModal.vue";
import Vuex from "vuex";

let wrapper;

const localVue = createLocalVue();

localVue.use(Vuex);

describe("AddModal.vue", () => {
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
        },
    });
    wrapper = shallowMount(AddModal, { store, localVue });
  });

  it("test AddModal-2 overlay closeAddModal", () => {
    expect(wrapper.emitted("closeAddModal")).toBeUndefined();
    wrapper.find("#overlay").trigger("click");
    expect(wrapper.emitted("closeAddModal")).toBeTruthy();
  }),
    it("test AddModal-3 content preventCloseModal", () => {
      expect(wrapper.emitted("preventCloseModal")).toBeUndefined();
      wrapper.find("#content").trigger("click");
      expect(wrapper.emitted("preventCloseModal")).toBeTruthy();
    }),
    it("test AddModal-4 h2", () => {
      expect(
        wrapper
          .findAll("h2")
          .at(0)
          .text()
      ).toEqual("ストーリーを追加");
    }),
    it("test AddModal-5 p", () => {
      expect(
        wrapper
          .findAll("p")
          .at(0)
          .text()
      ).toEqual("ストーリー名");
    }),
    it("test AddModal-6 input", () => {
      expect(
        wrapper
          .findAll("input")
          .at(0)
          .exists()
      ).toBeTruthy();
      wrapper.find("input").setValue("ストーリー100");
      expect(wrapper.vm.$data.addStoryName).toEqual("ストーリー100");
    }),
    it("test AddModal-7 p", () => {
      expect(
        wrapper
          .findAll("p")
          .at(1)
          .text()
      ).toEqual("内容");
    }),
    it("test AddModal-8 textarea", () => {
      expect(
        wrapper
          .findAll("textarea")
          .at(0)
          .exists()
      ).toBeTruthy();
      expect(wrapper.findAll("textarea").at(0).element.placeholder).toEqual(
        "内容を入力してください。"
      );
      wrapper.find("textarea").setValue("内容100");
      expect(wrapper.vm.$data.addStoryContents).toEqual("内容100");
    }),
    it("test AddModal-13 button cancel closeAddModal", () => {
        expect(wrapper.findAll("button").at(0).exists()).toBeTruthy();
        expect(wrapper.emitted("closeAddModal")).toBeUndefined();
        wrapper.findAll("button").at(0).trigger("click");
        expect(wrapper.emitted("closeAddModal")).toBeTruthy();
    }),
    it("test AddModal-15 button addItem", async () => {
        const stories = [
          { id: 2, name: "Story2", contents: "contents2", status: 1 },
          { id: 3, name: "Story3", contents: "contents3", status: 4 },
          { id: 4, name: "Story4", contents: "contents4", status: 2 },
          { id: 5, name: "Story5", contents: "contents5", status: 2 },
        ];
        store.commit("setStories", stories);
        await wrapper.vm.$nextTick();

        wrapper.setData({ addStoryName:"ストーリー1000" , addStoryContents:"内容1000" })
        await wrapper.vm.$nextTick();

        wrapper.findAll("button").at(1).trigger("click");
        await wrapper.vm.$nextTick();

        expect(store.getters.stories.length).toEqual(5);
        expect(store.getters.stories[4].name).toEqual("ストーリー1000")
        expect(store.getters.stories[4].contents).toEqual("内容1000")
    })
});
