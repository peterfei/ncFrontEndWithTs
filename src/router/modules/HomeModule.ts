import Layout from "@/views/layout/LayoutPage.vue";
import Home from "@/views/home/HomePage.vue";

const HomeModule = {
  path: "/home",
  name: "",
  component: Layout,
  children: [
    {
      path: "",
      name: "",
      component: Home
    }
  ]
};
export default { HomeModule };
