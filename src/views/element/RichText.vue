<template>
    <div class="container">
        <div class="options">
            <t-button theme="primary" class="mr2" @click="getContent">保存内容</t-button>
            <t-button theme="success" @click="updateContent">更新内容</t-button>
        </div>
        <Tinymce v-model="content"></Tinymce>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let content = ref('')

const getContent = () => {
    console.log('内容是', content.value)
}

const updateContent = () => {
    console.log('更新')
}
</script>

<style scoped lang="scss">
.container {
    .options {
        margin-bottom: 20px;
    }
}
</style>
