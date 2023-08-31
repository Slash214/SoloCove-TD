import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Test: Array<RouteRecordRaw> = [
	{
		path: '/test',
		component: layout,
		meta: { title: '测试', icon: 'system-code', expanded: true },
		redirect: '/test/test1',
		children: [
			{
				path: '/test1',
				name: 'test1',
				meta: { title: '测试1', keepAlive: false, icon: 'object-storage' },
				component: () => import('@/views/test/test1.vue')
			},
			{
				path: '/test2',
				name: 'test2',
				meta: { title: '测试2', keepAlive: false, icon: 'chart-stacked' },
				component: () => import('@/views/test/test2.vue')
			},
			{
				path: '/test3',
				name: 'test3',
				meta: { title: '测试3', keepAlive: false, icon: 'chart-stacked' },
				component: () => import('@/views/test/test2.vue')
			}
		],
	},
	{
		path: '/code',
		component: layout,
		meta: { title: '封面', icon: 'system-sum', },
		redirect: '/code/test1',
		children: [
			{
				path: '/code1',
				name: 'code',
				meta: { title: '代码', keepAlive: false, icon: 'object-storage' },
				component: () => import('@/views/test/test1.vue')
			},
		]
	}
]

export default Test