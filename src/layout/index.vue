<template>
    <t-layout class="layout">
        <t-aside style="height: 100vh">
            <t-aside>
                <t-menu theme="light" :collapsed="collapsed" default-value="2-1">
                    <template #logo>
                        <div class="logo-text">SOLOCOVE</div>
                    </template>
                    <MenuContent
                        v-for="(items, idx) in menuRoutes"
                        :key="idx"
                        :route-menu="items"
                    ></MenuContent>
                    <!-- <template #operations>
                        <t-button
                            class="t-demo-collapse-btn"
                            variant="text"
                            shape="square"
                            @click="changeCollapsed"
                        >
                            <span>收起</span>
                        </t-button>
                    </template> -->
                </t-menu>
            </t-aside>
        </t-aside>
        <t-layout>
            <t-header>
                <t-head-menu value="item1" height="120px">
                    <template #logo> </template>
                    <!-- <div>我是标题</div> -->
                    <template #operations>
                        <a href="javascript:;"
                            ><t-icon class="t-menu__operations-icon" name="search"
                        /></a>
                        <a href="javascript:;"
                            ><t-icon class="t-menu__operations-icon" name="notification-filled"
                        /></a>
                        <a href="javascript:;"
                            ><t-icon class="t-menu__operations-icon" name="home"
                        /></a>
                    </template>
                </t-head-menu>
            </t-header>
            <t-layout class="layout-content">
                <t-content class="bg-white">
                    <router-view></router-view>
                </t-content>
            </t-layout>
        </t-layout>
    </t-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MenuContent from './module/MenuContent.vue'

import { MenuRoute } from '@/typings/menu'

const router = useRouter()
let menuRoutes = ref<any>()

onMounted(() => {})

const collapsed = ref(false)

type ListItemType = MenuRoute & { icon?: string }

const getMenuList = (list: MenuRoute[], basePath?: string): ListItemType[] => {
    if (!list || list.length === 0) {
        return []
    }
    // 如果meta中有orderNo则按照从小到大排序
    list.sort((a, b) => {
        return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
    })

    return list
        .map((item) => {
            const path =
                basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path

            const len = getMenuList(item.children, path).length || 0
            return {
                path,
                title: item.meta?.title,
                icon: item.meta?.icon,
                children: getMenuList(item.children, path),
                meta: item.meta,
                redirect: item.redirect,
                haveSon: len ? true : false,
            }
        })
        .filter((item) => item.meta && item.meta.hidden !== true)
}

onMounted(() => {
    let list: any = router.options.routes
    console.log(list)
    menuRoutes.value = getMenuList(list)
    console.warn('格式了的路由表', menuRoutes.value)
})
// const changeCollapsed = () => {
//     collapsed.value = !collapsed.value
// }
</script>

<style lang="scss">
.logo-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    // background: linear-gradient(45deg, #ff6b6b, #2b8a3e);
    background: linear-gradient(45deg, #ff0000, #0000ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.layout {
    width: 100vw;
    height: 100vh;
    .layout-content {
        padding: 20px;
        .bg-white {
            background-color: #fff;
        }
    }
}
</style>
