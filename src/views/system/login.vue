<template>
    <div class="container">
        <div class="login-box">
            <div class="left">
                <img src="@/assets/light-photo.png" alt="" />
            </div>
            <div class="right">
                <h4 class="title">欢迎登陆</h4>
                <div class="login-container mt40">
                    <input
                        type="text"
                        class="login-input"
                        v-model="userinfo.username"
                        placeholder="请输入用户名"
                    />
                    <t-icon class="user-icon" name="user"></t-icon>
                </div>
                <div class="login-container mt40">
                    <input
                        v-model="userinfo.password"
                        type="password"
                        class="login-input"
                        placeholder="请输入密码"
                    />
                    <t-icon class="user-icon" name="lock-on"></t-icon>
                </div>
                <button class="custom-button" @click="onSubmit">登陆</button>
            </div>
        </div>
        <div class="copyright">© 爱呵呵开发支持</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { Storage } from '@/utils/cache'
import { user } from 'tdesign-icons-vue-next'

const userinfo = reactive({
    username: '',
    password: '',
})

let handleKeyup = ref<any>(null)

onMounted(() => {
    handleKeyup.value = (event: { key: string }) => {
        if (event.key === 'Enter') {
            onSubmit() // 当按下回车键时触发登录函数
        }
    }

    window.addEventListener('keyup', handleKeyup.value)
})

const onSubmit = () => {
    if (!userinfo.username || !userinfo.password) {
        MessagePlugin.error('登陆账号密码不能为空')
        return
    }

    if (!(userinfo.username === 'admin' && userinfo.password === 'lovehehe')) {
        MessagePlugin.warning('账号密码登陆错误')
        return
    }

    let params = {
        username: '爱呵呵',
        level: 'admin',
        avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    }
    Storage.setItem('userinfo', params)
    Storage.setItem('token', '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    location.reload()
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #6ea6fe;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .login-box {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        width: 900px;
        height: 500px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        .left {
            width: 55%;
            background-color: #f2f7fc;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .right {
            width: 45%;
            display: flex;
            flex-direction: column;
            padding: 40px;
            .title {
                font-size: 24px;
                padding-top: 80px;
                color: #333;
            }
            .mt40 {
                margin-top: 40px;
            }
            .login-container {
                width: 300px;
                position: relative;
                .login-input {
                    width: 100%;
                    border: none;
                    border-bottom: 2px solid #ddd;
                    padding: 10px 0;
                    outline: none;
                    font-size: 16px;
                }

                .login-input:focus {
                    border-bottom-color: #6ea6fe;
                }

                .user-icon {
                    position: absolute;
                    right: 0;
                    bottom: 8px;
                    color: #aaa;
                    font-size: 24px;
                }
            }
            .custom-button {
                margin-top: 60px;
                display: inline-block;
                padding: 10px 20px;
                background-color: #498dfe;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
                &:hover {
                    background-color: #3771e3;
                    transform: translateY(-2px);
                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
    .copyright {
        position: absolute;
        bottom: 10px;
        left: 50%;
        color: #fff;
        transform: translate(-50%, -50%);
    }
}
</style>
