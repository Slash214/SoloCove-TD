/**
 * 组件展示路由
 */

import { RouteRecordRaw } from "vue-router";
import layout from '@/layout/index.vue'

const Element: Array<RouteRecordRaw> = [
	{
		path: '/element',
		component: layout,
		meta: { title: '组件模块', icon: 'system-setting', expanded: true },
		redirect: '/element/text',
		children: [
			{
				path: 'text',
				name: 'text',
				meta: { title: '富文本', keepAlive: false, icon: 'catalog' },
				component: () => import('@/views/element/RichText.vue')
			},
			{
				path: 'table',
				name: 'table',
				meta: { title: '表格', keepAlive: false, icon: 'frame' },
				component: () => import('@/views/element/Table.vue')
			},
			{
				path: 'upload',
				name: 'upload',
				meta: { title: '文件上传', keepAlive: false, icon: 'upload' },
				component: () => import('@/views/element/Upload.vue')
			},
		],
	},
]

export default Element