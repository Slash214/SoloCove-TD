<template>
    <t-layout class="layout">
        <t-aside :style="genWidth">
            <t-menu :collapsed="collapsed" default-value="首页">
                <template #logo>
                    <div class="logo-text">
                        {{ collapsed ? 'SC' : 'SOLOCOVE' }}
                    </div>
                </template>
                <MenuContent
                    v-for="(items, idx) in menuRoutes"
                    :key="idx"
                    :route-menu="items"
                ></MenuContent>
                <template #operations>
                    <t-button
                        class="t-demo-collapse-btn"
                        variant="text"
                        shape="square"
                        @click="changeCollapsed"
                    >
                        <template #icon><t-icon :name="iconName" /></template>
                    </t-button>
                </template>
            </t-menu>
        </t-aside>

        <t-layout>
            <t-header>
                <t-head-menu class="head-menu" height="120px">
                    <template #operations>
                        <a class="finger"
                            ><t-icon class="t-menu__operations-icon" name="search"
                        /></a>
                        <a @click="backHomePage" class="finger"
                            ><t-icon class="t-menu__operations-icon" name="home"
                        /></a>
                        <a @click="logout" class="finger"
                            ><t-icon class="t-menu__operations-icon" name="logout"
                        /></a>
                        <t-avatar size="medium" image="https://tdesign.gtimg.com/site/avatar.jpg" />
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

    <t-dialog
        v-model:visible="visible"
        header="退出登陆"
        body="你确认要退出登陆吗？"
        attach="body"
        :confirm-on-enter="true"
        :on-confirm="onConfirmAnother"
    />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MenuContent from './module/MenuContent.vue'
import { Storage } from '@/utils/cache'

import { MenuRoute } from '@/typings/menu'

const router = useRouter()
let menuRoutes = ref<any>()
let visible = ref(false)

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

const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'))
const genWidth = computed(() => (collapsed.value ? 'width: 70px' : 'width: 232px'))

const changeCollapsed = () => {
    collapsed.value = !collapsed.value
}

const logout = () => {
    visible.value = !visible.value
}

const backHomePage = () => {
    router.push({ path: '/' })
}

const onConfirmAnother = () => {
    Storage.clearAll()
    location.reload()
}
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
.head-menu {
    padding: 0 20px;
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
