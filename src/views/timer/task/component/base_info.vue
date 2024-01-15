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
                <a-descriptions-item :label="$t('timer.task.cycle_type')" v-if="cycleTypeList" :span="1">
                    {{ cycleTypeList[object.cycle_type] || $t('timer.task.unknown_type') }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.statistics_id')" :span="1">
                    {{ object.statistics_id }}
                </a-descriptions-item>
                <a-descriptions-item :span="2" :label="$t('last_modified')">
                    {{ object.last_modified }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.notice')" :span="1">
                    {{ object.notice }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.period')" :span="1">
                    {{ object.period }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('timer.task.first_handle_time')" :span="1">
                    {{ object.first_handle_time }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('timer.task.object_id')">
                    {{ object.object_id }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('description')">
                    {{ object.description }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps(['object', 'getItem'])

const cycleTypeList = {
    NaturalTime: proxy.$t('timer.rule.NaturalTime'),
    RunTime: proxy.$t('timer.rule.RunTime'),
    Times: proxy.$t('timer.task.Times')
}
</script>

<style lang="scss" scoped>
.mix-detail-content {
    padding: 12px 0 0 0;
}
</style>
