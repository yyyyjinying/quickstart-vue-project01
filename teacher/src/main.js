import { createSSRApp, createApp as cApp } from "vue"
import { createRouter } from "./router/routes"
import App from "./App.vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

if (!import.meta.env.SSR) {
    const vm = cApp(App)
    vm.use(ElementPlus, { size: 'middle', zIndex: 3000 })
    vm.use(createRouter()).mount('#app')
    console.log("vm", vm)
}

export function createApp() {
    const app = createSSRApp(App);
    App.use(ElementPlus, { size: 'small', zIndex: 3000 })
    const router = createRouter();
    app.use(router);
    return {
        app,
        router,
    }
}

