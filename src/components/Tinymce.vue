<template>
    <Editor id="tinymce" v-model="editorContent" :init="editorInit"></Editor>
</template>

<script setup lang="ts">
import tinymce from 'tinymce/tinymce'
import 'tinymce/models/dom' // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'

// 富文本插件
import 'tinymce/icons/default'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
    content: {
        type: String,
        default: '',
    },
})

const editorContent = ref(props.content);

const editorInit = {
  language_url: '/tinymce/lang/zh-Hans.js',
  language: 'zh-Hans',
  skin_url: '/tinymce/skins/ui/oxide',
  height: 600,
  plugins: 'link lists image code table wordcount',
  toolbar:
    'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
  branding: false,
  menubar: true,
  content_css: '/tinymce/skins/content/default/content.css',
  images_upload_handler: (
    blobInfo: { blob: () => string | Blob },
    success: any,
    failure: any
  ) => {
    const formDataUp = new FormData();
      formDataUp.append('img', blobInfo.blob());
    console.log(success, failure)
    // axios.post('xxxx', formDataUp).then(res => {
    //     success('返回的上传图片后的地址')
    // })
  },
};

onMounted(() => {
    tinymce.init({})
})

onBeforeUnmount(() => {
  tinymce.remove();
});
</script>

<style>
.tox-promotion {
    display: none !important;
}
</style>
<style scoped></style>
