import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'
import store from '@/store'
import 'mdb-vue-ui-kit/css/mdb.min.css';

import './assets/main.css'

const app = createApp(App)


app.use(router)
app.use(CKEditor)
app.use(store)
app.mount('#app')
