<template>
    <div class="comment">
        <Tag :text="text" />
        <div class="main">
            <el-table :data="tableData" style="width: 100%" class="custom__table">
                <el-table-column label="Name" prop="name"></el-table-column>
                <el-table-column
                    label="Comment"
                    width="400px"
                    prop="comment"
                    class-name="text-ellipsis"
                ></el-table-column>
                <el-table-column
                    label="Date"
                    prop="date"
                    width="170p"
                ></el-table-column>
                <el-table-column label="Options" width="140px" align="right">
                    <el-button
                        @click="handleClick(scope.row)"
                        type="text"
                        size="small"
                        >查看</el-button
                    >
                    <el-button type="text" size="small">回复</el-button>
                    <el-button type="text" size="small" class="danger"
                        >删除</el-button
                    >
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    hide-on-single-page
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Comment',
    data() {
        return {
            text: '都是风景，幸会',
            tableData: [
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
                {
                    name: '李大锤',
                    comment: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
                    date: '2021-12/1-2',
                },
            ],
            total: 50
        }
    },
    methods: {
        handleClick() {},
    },
}
</script>
<style lang="scss" scoped>
    @import './scss/comment.scss';
</style>
