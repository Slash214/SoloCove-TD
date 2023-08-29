import { RouteRecordRaw } from "vue-router";

const System: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/system/login.vue'),
		meta: { title: '登陆', hidden: true },
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/system/404.vue'),
		meta: { title: '没有找到当前页面', hidden: true },
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404'
	}
]

export default System