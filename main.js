import Vue from 'vue'
import App from './App'

import {uniRequest} from './http/request.js'

import MescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue"
import MescrollUni from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$uniRequest = uniRequest

const app = new Vue({
	...App
})
app.$mount()
