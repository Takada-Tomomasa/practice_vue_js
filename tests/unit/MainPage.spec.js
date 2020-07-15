import { shallowMount } from "@vue/test-utils";
import MainPage from "@/components/MainPage.vue";

describe("MainPage.vue", () => {
  it("test Mainpage h2", () => {
    const wrapper = shallowMount(MainPage);
    expect(wrapper.findAll("h2").at(0).text()).toEqual("かんばんボード");
  }),
    it("test Mainpage p", () => {
      const wrapper = shallowMount(MainPage);
      expect(wrapper.find("p").text()).toEqual("とれぷろ！ 作");
    }),
    it("test Mainpage kanban", () => {
      const wrapper = shallowMount(MainPage);
      const Kanban = wrapper.find("Kanban-stub");
      expect(Kanban.exists()).toBeTruthy();
    });
});
