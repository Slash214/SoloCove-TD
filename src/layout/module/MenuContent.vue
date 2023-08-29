<template>
    <div>
        <t-menu-item v-if="!props.routeMenu.haveSon" :value="routeMenu.title" :to="routeMenu.path">
            <template #icon>
                <t-icon name="dashboard" />
            </template>
            <span>
                {{ routeMenu.title }}
            </span>
        </t-menu-item>
        <t-submenu v-else :value="routeMenu.title" :to="routeMenu.path">
            <template #icon>
                <t-icon name="mail" />
            </template>
            <template #title>
                <span>{{ routeMenu.title }}</span>
            </template>
            <MenuContent
                v-for="(item, key) in routeMenu.children"
                :key="key"
                :route-menu="item"
            ></MenuContent>
        </t-submenu>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    routeMenu: {
        type: Object,
        default: () => {},
    },
})
</script>

<style scoped></style>
