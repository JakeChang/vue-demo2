<template>
  <div class="my-8 container mx-auto px-40">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div class="mx-auto" v-for="(item, index) in items" :key="index">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <p>{{ getText(item.get('text')) }}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">
                <router-link :to="{ path: '/post', query: { id: item.id } }">
                  修改
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Parse } from 'parse/dist/parse.min.js';

export default {
  name: 'HomeView',
  setup() {
    const items = ref('');

    async function getData() {
      try {
        const query = new Parse.Query("Blog");
        items.value = await query.find();
      }
      catch (error) {
        console.log(error);
      }
    }

    function getText(text) {
      let temp = text.replace(/<\/?[^>]+>/ig, "");
      var trimmedString = temp.substring(0, 10) + " ...";

      return trimmedString;
    }

    onMounted(() => {
      getData();
    });

    return {
      items,
      getText
    }
  }
}
</script>
