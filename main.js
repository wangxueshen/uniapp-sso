import Vue from 'vue'
import App from './App'

import {uniRequest} from './http/request.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$uniRequest = uniRequest

const app = new Vue({
	...App
})
app.$mount()
