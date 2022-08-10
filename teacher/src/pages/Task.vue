<script setup>
import { ref, reactive } from 'vue'
let count = ref(1);
const obj = reactive({ count });

const onClick = () => {
  // count.value++;
  obj.count++;
}
</script>

<template>
  <div>
    <span class="c-task">task</span>
    <button @click="onClick">taskwqwqw-{{ count }}</button>
  </div>
</template>

<style scoped>
.c-task{
  color: 1px solid red;
}
</style>