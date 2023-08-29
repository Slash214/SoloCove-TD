import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue"
import { Test, System } from './models'
import { Storage } from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		meta: { title: '首页', icon: 'add' },
		component: Layout,
		redirect: '/index',
		children: [{
			path: 'index',
			component: () => import('@/views/main/index.vue'),
		}]
	},
	...System,
	...Test
]

const router: Router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
})

const whiteList = ['/login']

// 获取token
const token = Storage.getItem('token')
console.log('token', token)

router.beforeEach((to, __from, next) => {
	// NProgress.start()
	document.title = (to.meta.title as string) || import.meta.env.BASE_URL
	if (token) {
		if (to.path === '/login') {
			next('/')
			return
		}
		next()
	} else if (whiteList.includes(to.path)) next()
	else next('/login')
})

router.afterEach((to, __from) => {
	// NProgress.done()
})

export default router