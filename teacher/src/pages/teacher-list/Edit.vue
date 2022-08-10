<template>
    <el-dialog v-model="visible" :title="title" width="30%" :before-close="close">
        <el-form :inline="true" :model="data.params" size="large" class="t-form">
            <el-form-item label="用户名">
                <el-input v-model="data.params.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="data.params.pwd" placeholder="请输入密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// const props = defineProps({
//     params: {
//         type: Object,
//         required: false
//     }
// })

const visible = ref(false);
const title = ref("新增数据");

// 响应式的
let data = reactive({
    params: {
        id: null,
        username: "",
        pwd: "",
    }
});
const emit = defineEmits(["refresh"])


const setEdit = (values) => {
    visible.value = values.visible;
    title.value = values.params ? "修改数据" : "新增数据";
    if (values.params) data.params = values.params;
}



defineExpose({ setEdit })

const close = () => {
    visible.value = false;
}

const save = async () => {
    const res = await axios.post(`/api/zjy/teacher/save`, {
        id: data.params.id,
        username: data.params.username,
        pwd: data.params.pwd,
    })
    if (res.data.flag) {
        ElMessage(res.data.message)
        close();
        emit("refresh");
    } else {
        console.log(res.data.message);
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>