
<template>
    <div class="t-container">
        <!-- @onSubmit父组件接收子组件的触发器 -->
        <HForm :params="params" @onSubmit="onSubmit" @onReset="onReset" />
        <HTable ref="tableRef" />
    </div>
</template> 
<script>
import { reactive, watchEffect } from "vue";
import HForm from "./Form.vue";
import HTable from "./Table.vue";
export default {
    components: {
        HTable,
        HForm,
    },
    data() {
        return {
            switchFlag: 1,
        }
    },
    setup(props, context) {
        // const tableRef = ref();
        console.log("setup", props, context);
        const params = reactive({
            username: "",
            password: "",
        })

        watchEffect(() => {
            console.log("watch", params);
        })

        const reset = () => {
            params.username = "";
            params.password = "";
        }

        // 等同于mounted
        // onMounted(() => {
        //     tableRef.value.request(params);
        // })

        // 暴露到template中
        return {
            reset,
            params
        };
    },
    methods: {
        onSubmit(params) {
            this.$refs.tableRef.request(params);
        },
        onReset() {
            this.reset();
            this.$refs.tableRef.request({
                username: "",
                password: ""
            });
        }
    },
    mounted() {
        console.log(import.meta.env)
        this.$refs.tableRef.request(this.params);
    },
}

</script>
<style scoped>
.t-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
}
</style>

