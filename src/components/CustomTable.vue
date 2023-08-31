<template>
    <div class="container">
		<div>
			<t-button theme="primary">操作</t-button>
		</div>
        <t-table
            row-key="index"
            :data="data"
            :columns="columns"
            :stripe="stripe"
            :bordered="bordered"
            :hover="hover"
            :table-layout="tableLayout ? 'auto' : 'fixed'"
            :size="size"
            :pagination="pagination"
            :show-header="showHeader"
            cell-empty-content="-"
            resizable
            @row-click="handleRowClick"
        >
            <template #operation="{ row }">
                <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
                    {{ row.status === 0 ? '查看详情' : '再次申请' }}
                </t-link>
            </template>
        </t-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data: any = []
const stripe = ref(true)
const bordered = ref(true)
const hover = ref(false)
const tableLayout = ref(false)
const size = ref('medium')
const showHeader = ref(true)
const total = 28
for (let i = 0; i < total; i++) {
    data.push({
        index: i + 1,
        applicant: ['贾明', '张三', '王芳'][i % 3],
        status: i % 3,
        channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
        detail: {
            email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
        },
        matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][
            i % 4
        ],
        time: [2, 3, 1, 4][i % 4],
        createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    })
}

const columns = [
   { colKey: 'applicant', title: '申请人', width: '100' },
   { colKey: 'status', title: '申请状态', },
   { colKey: 'channel', title: '签署方式', },
   { colKey: 'detail.email', title: '邮箱地址', },
   { colKey: 'createTime', title: '申请时间',  },
]

const handleRowClick = (e) => {
  console.log(e);
};

const pagination = {
    defaultCurrent: 1,
    defaultPageSize: 15,
    total,
}
</script>

<style lang="scss" scoped>
.container {
	padding: 20px;
}
</style>
