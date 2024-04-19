import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import { Parse } from 'parse/dist/parse.min.js';
Parse.initialize('B6GAyDuk3cieupgKZNaHojMgDXJHHmdG6c9W4GsU', '1S3ycwCNRWHwHiLrhfR0GAU28jdSwjh3ZkJAQdgb');
Parse.serverURL = 'https://parseapi.back4app.com';

createApp(App).use(router).mount('#app')
