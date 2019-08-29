import Home from "../pages/Home.jsx"
import About from "../pages/About.jsx"
import Detail from "../pages/Detail.jsx"
export default [
    {
        path: "/",
        name: "首页",
        key: "home",
        exact: true,
        component: Home,
        children: [
            {
                path: "/detail",
                name: "详情页",
                key: "detail",
                component: Detail,
                children: [
                    {
                        path: "/deep",
                        name: "深入",
                        key: "detail",
                        component: Detail,
                    }
                ]
            }
        ]
    },
    {
        path: "/about",
        name: "关于",
        key: "about",
        component: About
    },
]