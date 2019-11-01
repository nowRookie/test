import Home from "../pages/Home.jsx";
import Lessons from "../pages/lessons/index.jsx";

export default [
  {
    path: "/",
    name: "首页",
    key: "home",
    exact: true,
    component: Home,
    children: []
  },
  {
    path: "/lessons",
    name: "学习",
    key: "lessons",
    exact: true,
    component: Lessons,
    children: []
  }
];
