/**
 * 组件展示路由
 */

import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Element: Array<RouteRecordRaw> = [
	{
		path: '/element',
		component: layout,
		meta: { title: '组件模块', icon: 'system-setting', },
		redirect: '/element/text',
		children: [
			{
				path: 'text',
				name: 'text',
				meta: { title: '富文本', keepAlive: false, icon: 'object-storage' },
				component: () => import('@/views/element/RichText.vue')
			},
		],
	},
]

export default Element