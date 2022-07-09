import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Design Framework
import { Dialog, Notify, Quasar } from 'quasar'
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  // import Quasar plugins and add here
  plugins: {
    Dialog, // doesn't appear to support default settings
    Notify,
  },
  // default options for Quasar plugins
  config: {
    notify: {
      position: 'top',
      multiLine: true,
      timeout: 3500,
      // color: 'negative',
      // textColor: 'white',
      // icon: 'event',
      // message: 'You have confirmed the operation. Good job!',
      // caption: `${new Date()}`,
      // actions: [
      //   {
      //     label: 'Dismiss',
      //     color: 'white',
      //   },
      // ],
    },
    /*
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
    */
  },
})

app.mount('#app')
