<template>
    <div class="mix-detail-container p-[12px] bg-white">
        <div class="flex mix-search">
            <div class="search-item">
                <a-date-picker
                    show-time
                    v-model:value="startTime"
                    @ok="(val) => changeTime(val, 'start')"
                    :valueFormat="format"
                    placeholder="开始时间"
                    :show-now="false"
                ></a-date-picker>
            </div>
            <div class="search-item">
                <a-date-picker
                    show-time
                    v-model:value="endTime"
                    @ok="(val) => changeTime(val, 'end')"
                    :valueFormat="format"
                    placeholder="结束时间"
                    :show-now="false"
                ></a-date-picker>
            </div>
            <div class="search-item">
                <a-button @click="showFvModal">
                    {{ $t('objects.history.select_param') }}
                </a-button>
            </div>
            <div class="search-item">
                <a-button @click="reload"> <reload-outlined />{{ $t('reset') }} </a-button>
            </div>
            <div class="search-item">
                <a-button @click="showLineModal" v-if="checkedType === 'record'">
                    <template #icon>
                        <line-chart-outlined />
                    </template>
                </a-button>
            </div>
            <div class="flex-wrap toggle-wrap">
                <a-radio-group v-model:value="checkedType" button-style="solid" @change="toggleType">
                    <a-radio-button value="record">
                        {{ $t('objects.history.record') }}
                    </a-radio-button>
                    <a-radio-button value="export">
                        {{ $t('objects.history.export') }}
                    </a-radio-button>
                </a-radio-group>
            </div>
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            height="240"
            v-if="checkedType === 'record'"
            :columWithStorageName="`object_object_history_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
        />
        <export-list v-if="checkedType === 'export'" ref="exportRef"></export-list>
        <fvModal ref="fv_modal" :fv-map="fvMap" @ok="confirmCheckFv" :checkedType="checkedType"></fvModal>
        <lineModal ref="line_modal" :fv-map="fvMap" :keys="selectedParams.keys" :titles="selectedParams.titles"></lineModal>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, watch, nextTick, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import fvModal from './fv-modal.vue'
import lineModal from './line-modal.vue'
import dayjs from 'dayjs'
import exportList from './export-list.vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const route = useRoute()
const mix_top_operation = ref()
const ag_grid = ref()
const exportRef = ref()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive({ ...proxy.config.pagination })
const columns = ref([])
const checkedType = ref('record')
const dataSource = ref([])
const format = ref('YYYY-MM-DD HH:mm:ss')
const startTime = ref(dayjs().startOf('day').format(format.value))
const endTime = ref(dayjs().endOf('day').format(format.value))
const changeTime = (val, param) => {
    /* 开始时间必须在结束时间之前，否则情空当前时间选择器内容 */
    compareTime(val, param).then((res) => {
        if (res) {
            startTime.value = param === 'start' ? val : startTime.value
            endTime.value = param === 'end' ? val : endTime.value
        } else {
            proxy.$message.error(proxy.$t('objects.object.range_time_error'))
            startTime.value = param === 'start' ? '' : startTime.value
            endTime.value = param === 'end' ? '' : endTime.value
        }
    })
}
const compareTime = (val, param) => {
    return new Promise((resolve, reject) => {
        let start = param === 'start' ? val : startTime.value
        let end = param === 'end' ? val : endTime.value
        if (new Date(start).getTime() > new Date(end).getTime()) {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}

/* fv选择相关 */
const fv_modal = ref()
const fvMap = ref([])
const showFvModal = (val) => {
    fv_modal.value.modal.show = true
}
const selectedParams = ref({})
const keyToValFv = ref({})
const confirmCheckFv = (params) => {
    selectedParams.value = params
    checkedType.value === 'record' && getrecordData()
    checkedType.value === 'export' && exportFile()
}
const reload = () => {
    pager.current = 1
    checkedType.value === 'record' && getrecordData()
    checkedType.value === 'export' && exportRef.value.getexportData()
}

/* 数据曲线 */
const line_modal = ref()
const showLineModal = (val) => {
    line_modal.value.modal.show = true
    line_modal.value.modal.start = startTime.value
    line_modal.value.modal.end = endTime.value
}

const toggleType = (val) => {
    nextTick(() => {
        checkedType.value === 'record' && getrecordData()
        checkedType.value === 'export' && exportRef.value.getexportData()
    })
}

const getrecordData = () => {
    columns.value = []
    if (!selectedParams.value.keys?.length) return
    columns.value.push({
        headerName: '时间',
        field: 'time',
        width: 180
    })
    selectedParams.value.keys.forEach((v, i) => {
        columns.value.push({
            headerName: keyToValFv.value[v].label_local,
            field: v,
            width: 150,
            valueFormatter: (h) => {
                if (typeof h.value === 'boolean') {
                    h.value = String(h.value)
                }
                return h.value
            }
        })
    })
    let data = {
        keys: selectedParams.value.keys,
        object_id: route.params.id,
        start_time: startTime.value,
        end_time: endTime.value,
        page_index: pager.current,
        page_size: pager.pageSize,
        resample: selectedParams.value.resample || 0
    }
    proxy.api.post('history_mosaic', data).then((res) => {
        if (res.code === 200) {
            dataSource.value = res.result.data ?? []
            pager.total = res.result.total_records
            fv_modal.value.modal.show = false
            nextTick(() => {
                ag_grid.value.initColWithAndsite()
            })
        } else {
            pager.total = 0
            pager.current = 1
        }
    })
}

const exportFile = () => {
    let data = {
        object_id: route.params.id,
        start_time: startTime.value,
        end_time: endTime.value,
        keys: selectedParams.value.keys,
        titles: selectedParams.value.titles,
        file_name: selectedParams.value.file_name ?? '',
        no_split: selectedParams.value.no_split === 'false' ? false : true,
        character: selectedParams.value.character ?? 'gb2312',
        resample: selectedParams.value.resample || 0
    }
    proxy.api.post('history_export', data).then((res) => {
        fv_modal.value.modal.show = false
        exportRef.value.getexportData()
        if (res.result) {
            proxy.$message.success(proxy.$t('export_tip'))
        } else {
            proxy.$message.error(res.msg)
        }
    })
}

const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    checkedType.value === 'record' && getrecordData()
}

onActivated(() => {
    if (props.object.object_fv_map[route.params.id]) {
        fvMap.value = props.object.object_fv_map[route.params.id].filter((ele) => {
            return ele.category !== 'EVNT'
        })
        fvMap.value.forEach((ele) => {
            keyToValFv.value[ele.fv] = ele
        })
    } else {
        fvMap.value = []
    }
})
defineExpose({ reload })
</script>
