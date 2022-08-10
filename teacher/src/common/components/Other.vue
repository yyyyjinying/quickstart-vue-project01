<template>
  <div>
    <div>{{name}}{{parentCount}}</div>
    <div>{{ count }} {{ object.foo }}</div>
  </div>
</template>

<script>
  import { ref, reactive, watchEffect } from 'vue'

  export default {
    props: {
      name: String,
      parentCount: Number,
    },
    setup(props) {
      console.log("setup", props.parentCount);

      const count = ref(0)
      const object = reactive({ foo: 'bar' })

      watchEffect(() => {
        console.log(`parentCount is: ` + props.parentCount)
      })

      // 暴露到template中
      return {
        count,
        object
      }
    }
  }
</script>