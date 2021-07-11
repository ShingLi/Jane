<template>
    <div class="list">
        <Tag :text="text" />
        <div class="main">
            <el-table :data="tableData" class="custom__table"
                v-loading="loading"
            >
                <el-table-column
                    label="日期"
                    prop="createTime"
                    width="150px"
                    :formatter="formatterDate"
                ></el-table-column>
                <el-table-column
                    label="标题"
                    width="170px"
                    prop="title"
                    class-name="text-ellipsis"
                ></el-table-column>
                <el-table-column
                    label="SEO"
                    width="150px"
                    prop="seo"
                    class-name="text-ellipsis"
                ></el-table-column>
                <el-table-column
                    label="简述"
                    prop="content"
                    width="300px"
                ></el-table-column>
                <el-table-column label="Options" width="140px" align="right">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row)"
                            type="text"
                            size="small"
                            >修改</el-button
                        >
                        <el-button type="text" size="small">评论</el-button>
                        <el-button
                            type="text"
                            size="small"
                            class="danger"
                            @click="deleteArticle(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    hide-on-single-page
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'List',
    data() {
        return {
            text: '爱意随风起',
            tableData: [],
            total: 0,
            loading: false
        }
    },
    created() {
        this.findArticle()
    },
    methods: {
        async findArticle() {
            this.loading = true
            const data = await this.$http.post('findArticle')
            this.loading = false
            this.total = data.totalCount
            this.tableData = data.articleList
        },
        handleClick(row) {
            this.$router.push({
                name: 'Article',
                params: row
            })
        },
        deleteArticle({ _id }) {
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.loading = true
                    this.$http.post('deleteArticle', {
                        id: _id
                    }).then(({ isOk }) => {
                        if (isOk) {
                            this.findArticle()
                        }
                    }).finally(() => {
                        this.loading = false
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        formatterDate(row, column, timestamp) {
            timestamp = timestamp - 0
            const hours =
                    new Date(timestamp).getHours() - 0 < 10
                        ? '0' + new Date(timestamp).getHours()
                        : new Date(timestamp).getHours(),
                minutes =
                    new Date(timestamp).getMinutes() - 0 < 10
                        ? '0' + new Date(timestamp).getMinutes()
                        : new Date(timestamp).getMinutes(),
                toDateString = new Date(timestamp)
                    .toDateString()
                    .split(' ')
                    .splice(1)
                    .join(' ')
            return `${hours}:${minutes} ${toDateString}`
        },
    },
}
</script>
<style lang="scss" scoped>
    @import './scss/list.scss';
</style>
