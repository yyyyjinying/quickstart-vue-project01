import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from "vue-router"
import TeacherList from "../pages/teacher-list/index.vue";
const routerConfig = [
    {
        path: "/",
        component: TeacherList
    }
];

// const pages = import.meta.glob("../pages/*.vue");
// const routes = Object.keys(pages).map(path => {
//     const name = path.match(/\.\.\/pages(.*)\.vue$/)[1].toLowerCase();
//     return {
//         path: name === "/home" ? "/" : name,
//         component: pages[path],
//     }
// })

export function createRouter() {
    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes: routerConfig,
    })
}