<template>
    <div class="t-table">
        <Edit ref="editRef" @refresh="refresh" />
        <div>
            <el-button link type="primary" size="small" @click="addClick">新增</el-button>
        </div>
        <el-table class="con" :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="username" width="180" />
            <el-table-column prop="pwd" label="pwd" width="180" />
            <el-table-column prop="regTime" label="regTime" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
                    <el-button link type="primary" size="small" @click="editClick(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" v-model:currentPage="pageParams.currentPage"
            v-model:page-size="pageParams.pageSize" :page-sizes="[3, 5, 10, 20, 50]" :small="small" :disabled="disabled"
            :background="background" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import Edit from "./Edit.vue";
import axios from "axios";
const editRef = ref();
const tableData = ref([{}]);

const param = ref({});

const pageParams = reactive({
    currentPage: 1,
    pageSize: 5,
    small: false,
    disabled: false,
    background: true,


})
const handleCurrentChange = (currentPage) => {
    pageParams.currentPage = currentPage;
    request(param.value);
}
const handleSizeChange = (pageSize) => {
    pageParams.pageSize = pageSize;
    request(param.value);
}

const deleteClick = async (id) => {
    ElMessageBox.confirm('Are you sure to delete it?')
        .then(async () => {
            const { data } = await axios.delete(`/api/zjy/teacher/${id}`)
            if (data.flag) {
                ElMessage(data.message)
                // 刷新页面
                refresh();
            } else {
                console.log(data.message);
            }
        })
}

const editClick = (row) => {
    editRef.value.setEdit({
        visible: true,
        params: row.id ? {
            id: row.id,
            username: row.username,
            pwd: row.pwd,
        } : null,
    });
}

const addClick = () => {
    editRef.value.setEdit({
        visible: true,
        params: {
            id: null,
            username: "",
            pwd: "",
        },
    });
}

const request = async (params) => {
    param.value = {
        ...params,
        pwd: params.password || params.pwd
    }
    try {
        const { data } = await axios.post(`/api/zjy/teacher/search/page/${pageParams.currentPage}/${pageParams.pageSize}`, {
            ...params,
            pwd: params.password
        })
        if (data.flag) {
            tableData.value = data.data.records.length > 0 ? data.data.records : [{}];
            pageParams.currentPage = data.data.curPage;
            pageParams.pageSize = data.data.pageSize;
            pageParams.total = data.data.total;
        } else {
            console.log(data.message);
        }
    } catch (e) {
        console.error(e.message);
    }
}

const refresh = () => {
    request(param.value);
}

defineExpose({ request })

</script>

<style lang="less" scoped>
.t-table {
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .07);

    .con {
        padding: 20px 20px 0px 20px;
    }

    .pagination {
        height: 50px;
        padding: 0 30px;
    }
}
</style>
