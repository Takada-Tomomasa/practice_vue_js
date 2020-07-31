import { shallowMount } from "@vue/test-utils";
import MainPage from "@/components/MainPage.vue";

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(MainPage);
});
afterEach(() => {
  wrapper.destroy();
});

describe("MainPage.vue", () => {
  it("test Mainpage h2", () => {
    expect(wrapper.findAll("h2").at(0).text()).toEqual("かんばんボード");
  }),
    it("test Mainpage p", () => {
      expect(wrapper.find("p").text()).toEqual("とれぷろ！ 作");
    }),
    it("test Mainpage kanban", () => {
      const Kanban = wrapper.find("Kanban-stub");
      expect(Kanban.exists()).toBeTruthy();
    });
    it("test Mainpage img", () => {
      expect(wrapper.findAll("img").at(3).exists()).toBeTruthy();
    });
});
