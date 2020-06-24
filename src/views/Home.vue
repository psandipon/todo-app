<template>
  <div class="home">
    <todo msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import todo from "@/components/todo.vue";

export default {
  name: "Home",
  components: {
    todo
  }
};
</script>
