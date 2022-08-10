<script setup>
import { ref, reactive } from 'vue'
import Other from "components/Other.vue";
let count = ref(1);
const obj = reactive({ count });

const onClick = () => {
  count.value++;
}

</script>

<template>
  <div>
    <Other v-bind:name="name" :parentCount="count" />

    <span class="c-about">about</span>
    <div>{{obj.count}}</div>
    <button @click="onClick">{{ count }}</button>
    <button @click="nameChange">{{ name }}</button>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      name: "zhao"
    }
  },
  methods:{
    nameChange(){
      this.name = "jinying";
    }
  }
}
</script>


<style scoped>
.c-about{
  border: 1px solid red;
}
</style>