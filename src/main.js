import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import "default-passive-events";



const app = createApp(App)
installElementPlus(app)
app.use(router).use(store).mount('#app')
