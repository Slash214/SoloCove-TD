<template>
    <div class="container">
        <img class="not_found" src="@/assets/images/404.png" alt="" />
        <p class="title">当前页面不存在</p>
        <t-button theme="primary" @click="goback">
            <span style="padding-right: 4px">{{ countdown }}秒后自动</span>
            返回首页
        </t-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
const countdownInterval = ref<any>(null)


const goback = () => {
	router.push({ path: '/' })
	clearInterval(countdownInterval.value)
}

onMounted(() => {
    onStart()
})

const onStart = () => {
    countdownInterval.value = setInterval(() => {
        countdown.value--
		if (countdown.value === 0) {
			goback()
            clearInterval(countdownInterval.value)
        }
    }, 1000)
}

onUnmounted(() => {
	clearInterval(countdownInterval.value)
})
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    background-color: #f1f1f1;
    .title {
        padding: 20px 0;
        font-size: 14px;
        color: #666;
    }
}
</style>
