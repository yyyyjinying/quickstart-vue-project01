<script setup>
import { watchEffect } from "vue"
const props = defineProps({
    params: {
        type: Object,
        required: true
    }
})

console.log("propsprops", props.params);

watchEffect(() => {
    console.log("child-watch", props.params);
})

// 1.子组件定义触发器
const emit = defineEmits(['onSubmit', 'onReset']);


const onSubmit = () => {
    console.log("child", props.params);
    // 2.发射触发器
    emit("onSubmit", props.params);
}

const onReset = () => {
    emit("onReset");
}

</script>
<template>
    <el-form :inline="true" :model="props.params" size="large" class="t-form">
        <el-form-item label="用户名">
            <el-input v-model="props.params.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="props.params.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<style lang="less" scoped>
.t-form {
    background-color: #fff;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .07);
    padding: 20px;

    ::deep(.el-form-item) {
        margin: 0;
        margin-right: 40px;
    }
}
</style>