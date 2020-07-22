import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("test App-3 Mainpage exist", () => {
    const wrapper = shallowMount(App);
    const MainPage = wrapper.find("MainPage-stub");
    expect(MainPage.exists()).toBeTruthy();
  });
});
