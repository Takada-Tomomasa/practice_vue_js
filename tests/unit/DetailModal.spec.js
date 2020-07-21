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
      },
    });
      wrapper = shallowMount(DetailModal, {
          store, localVue,
          propsData: {
              detailShowing: true,
              statuses: [
                  { id: 1, name: "Todo" },
                  { id: 2, name: "Doing" },
                  { id: 3, name: "Review" },
                  { id: 4, name: "Done" }
              ],
              storyID: 100,
              storyName: "story100",
              storyContents: "contents100",
              storyStatus: 2
          }
      });
  });
  it("test DetailModal-2 overlay closeDetailModal", () => {
    expect(wrapper.emitted("closeDetailModal")).toBeUndefined();
    wrapper.find("#overlay").trigger("click");
    expect(wrapper.emitted("closeDetailModal")).toBeTruthy();
  }),
    it("test DetailModal-3 content preventCloseModal", () => {
      expect(wrapper.emitted("preventCloseModal")).toBeUndefined();
      wrapper.find("#content").trigger("click");
      expect(wrapper.emitted("preventCloseModal")).toBeTruthy();
    }),
    it("test DetailModal-4 h2", () => {
      expect(
        wrapper
          .findAll("h2")
          .at(0)
          .text()
      ).toEqual("ストーリー詳細");
    }),
    it("test DetailModal-5 p", () => {
      expect(
        wrapper
          .findAll("p")
          .at(0)
          .text()
        ).toEqual("ストーリー名");
        console.log(wrapper.props().storyID)
    }),
    //   テスト未完了↓↓
      it("test DetailModal-6 input", async () =>  {
      expect(
        wrapper
          .findAll("input")
          .at(0)
          .exists()
      ).toBeTruthy();
          expect(wrapper.find("input").element.value).toEqual("story100");
          await wrapper.vm.$nextTick();
          wrapper.find("input").setValue("ストーリー100");
          await wrapper.vm.$nextTick();
          expect(wrapper.vm.$data.storyName).toEqual("ストーリー100");
          
    });
});
