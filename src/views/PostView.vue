<template>
  <div class="my-8 container mx-auto px-40">
    <QuillEditor theme="snow" class="w-full" v-model:content="text" contentType="html" />

    <div class="flex justify-end">
      <button class="btn btn-wide" @click="save" :disabled="text === ''">儲存</button>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Parse } from 'parse/dist/parse.min.js';

export default {
  name: 'PostView',
  components: {
    QuillEditor,
  },
  setup() {
    const id = ref('');
    const text = ref('');
    const router = useRouter();

    watch(text, (newValue) => {
      let temp = newValue.replace(/<\/?[^>]+>/ig, "");
      if (temp == '') {
        text.value = '';
      }
    });

    async function save() {
      if (!id.value) {
        const toDoList = new Parse.Object("Blog");
        toDoList.set("text", text.value);
        try {
          let result = await toDoList.save()
          alert('上傳成功 ' + result.id);

          router.push("/");
        }
        catch (error) {
          alert('上傳失敗 ' + error.message);
        }
      }
      else {
        try {
          const query = new Parse.Query("Blog");
          query.equalTo("objectId", id.value);
          const blog = await query.first();
          blog.set('text', text.value);
          await blog.save()

          router.push("/");
        }
        catch (error) {
          alert('更新失敗 ' + error.message);
        }
      }
    }

    async function get() {
      const query = new Parse.Query("Blog");
      query.equalTo("objectId", id.value);
      const blog = await query.first();
      text.value = blog.get("text");
    }

    onMounted(() => {
      const instance = getCurrentInstance();
      id.value = instance.proxy.$route.query.id;
      if (id.value) {
        get();
      }
    });

    return {
      text,
      save,
    }
  }
}
</script>
