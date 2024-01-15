<template>
    <div class="mix-detail-container">
        <div class="mix-detail-title">
            <div>{{ $t('base_info') }}</div>
        </div>
        <div class="mix-detail-block">
            <a-descriptions bordered :column="3" v-if="object">
                <a-descriptions-item :label="$t('timer.task.uid')" :span="1">
                    {{ object.uid }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.name')" :span="1">
                    {{ object.name }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('created')" :span="1">
                    {{ object.created }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" :label="$t('last_modified')">
                    {{ object.last_modified }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.first_handle_time')" :span="1">
                    {{ object.first_handle_time }}
                </a-descriptions-item>
                <a-descriptions-item :span="1" :label="$t('timer.task.object_id')">
                    {{ object.object_id }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('description')">
                    {{ object.description }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <div class="mix-detail-title">
            <div>{{ $t('timer.task.conditions') }}</div>
        </div>
        <div class="mix-detail-block">
            <a-table :columns="columnsRule" :data-source="object.conditions" bordered="" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'cycle_type'">
                        {{ cycleTypeList[record.cycle_type] }}
                    </template>
                    <template v-if="column.key === 'period_num'">
                        {{ record.period_num + record.period_unit }}
                    </template>
                    <template v-if="column.key === 'notice_num'">
                        {{ record.notice_num + record.notice_unit }}
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps(['object'])

const cycleTypeList = {
    NaturalTime: proxy.$t('timer.rule.NaturalTime'),
    RunTime: proxy.$t('timer.rule.RunTime'),
    StatisticsTimes: proxy.$t('timer.rule.StatisticsTimes')
}
const columnsRule = [
    { title: '维保类型', key: 'cycle_type', dataIndex: 'cycle_type' },
    { title: '维保周期', key: 'period_num', dataIndex: 'period_num' },
    { title: '提醒周期', key: 'notice_num', dataIndex: 'period_num' }
]
</script>

<style lang="scss" scoped>
.mix-detail-content {
    padding: 12px 0 0 0;
}
</style>
