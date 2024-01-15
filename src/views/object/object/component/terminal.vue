<template>
    <div class="mix-detail-container p-[12px] bg-white">
        <div class="flex">
            <mix-top-operation ref="mix_top_operation" @search="getList" @reload="reload" :searchField="search_field" />
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            height="240"
            :columWithStorageName="`object_object_terminal_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
        />
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const route = useRoute()
const mix_top_operation = ref()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive({ ...proxy.config.pagination })
const search_field = ref([
    {
        label: proxy.$t('objects.terminal.uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('objects.terminal.name'),
        value: 'name',
        type: 'input'
    }
])
const columns = ref([
    {
        field: 'uid',
        headerName: proxy.$t('terminal.terminal.uid'),
        width: 180,
        pinned: 'left',
        lockPinned: true
    },
    {
        field: 'name',
        headerName: proxy.$t('terminal.terminal.name'),
        width: 180
    },
    {
        field: 'type',
        headerName: proxy.$t('terminal.terminal.type'),
        width: 180,
        cellRenderer: 'ag-text-tag'
    },
    {
        field: 'online',
        headerName: proxy.$t('terminal.terminal.online'),
        width: 140,
        cellRenderer: 'ag-text-status',
        cellRendererParams: {
            statusMapping: {
                0: { label: proxy.$t('terminal.terminal.offline_status'), color: 'red' },
                1: { label: proxy.$t('terminal.terminal.online_status'), color: 'green' }
            }
        }
    },
    {
        field: 'csq',
        headerName: proxy.$t('terminal.terminal.csq'),
        width: 140
    },
    {
        field: 'last_online_time',
        headerName: proxy.$t('terminal.terminal.last_online_time'),
        width: 160
    },
    {
        field: 'nominal.ICCID',
        headerName: proxy.$t('terminal.terminal.iccid'),
        width: 180
    },
    {
        field: 'created',
        headerName: proxy.$t('terminal.terminal.created'),
        width: 180
    },
    {
        field: 'col_status',
        headerName: proxy.$t('terminal.terminal.col_status'),
        width: 140
    },
    {
        field: 'dev_model',
        headerName: proxy.$t('terminal.terminal.dev_model'),
        width: 140
    },
    {
        field: 'status_4g_signal',
        headerName: proxy.$t('terminal.terminal.status_4g_signal'),
        width: 140
    },
    {
        field: 'cup_temperature',
        headerName: proxy.$t('terminal.terminal.cup_temperature'),
        width: 140
    },
    {
        field: 'mqtt_info_ip',
        headerName: proxy.$t('terminal.terminal.mqtt_info_ip'),
        width: 160
    },
    {
        field: 'mqtt_status_connection',
        headerName: proxy.$t('terminal.terminal.mqtt_status_connection'),
        width: 160
    },
    {
        field: 'col_status_runtime',
        headerName: proxy.$t('terminal.terminal.col_status_runtime'),
        width: 160
    },
    {
        field: 'softinfo',
        headerName: proxy.$t('terminal.terminal.softinfo'),
        width: 160
    },
    {
        field: 'luainfo',
        headerName: proxy.$t('terminal.terminal.luainfo'),
        width: 160
    },
    {
        field: 'status_4g',
        headerName: proxy.$t('terminal.terminal.status_4g'),
        width: 160
    },
    {
        field: 'info_4g',
        headerName: proxy.$t('terminal.terminal.info_4g'),
        width: 140
    },
    {
        field: 'status_wifi',
        headerName: proxy.$t('terminal.terminal.status_wifi'),
        width: 140
    },
    {
        field: 'info_wifi',
        headerName: proxy.$t('terminal.terminal.info_wifi'),
        width: 140
    },
    {
        field: 'status_eth',
        headerName: proxy.$t('terminal.terminal.status_eth'),
        width: 140
    },
    {
        field: 'info_eth',
        headerName: proxy.$t('terminal.terminal.info_eth'),
        width: 140
    },
    {
        field: 'info_mqtt',
        headerName: proxy.$t('terminal.terminal.info_mqtt'),
        width: 140
    },
    {
        field: 'sys_status',
        headerName: proxy.$t('terminal.terminal.sys_status'),
        width: 140
    },
    {
        field: 'gps',
        headerName: proxy.$t('terminal.terminal.gps'),
        width: 140
    },
    {
        field: 'vnp_status',
        headerName: proxy.$t('terminal.terminal.vnp_status'),
        width: 140
    },
    {
        field: 'is_mqtt5',
        headerName: proxy.$t('terminal.terminal.mqtt5'),
        width: 140,
        cellRenderer: 'text_status_tag',
        cellRendererParams: {
            statusMapping: {
                0: { label: '不启用', color: 'grey' },
                1: { label: '启用', color: 'green' }
            },
            status: 'is_mqtt5'
        }
    },
    {
        field: 'session_expiry',
        headerName: proxy.$t('terminal.terminal.session_expiry'),
        width: 140
    },
    {
        field: 'encryption',
        headerName: proxy.$t('terminal.terminal.encryption'),
        width: 140
    },
    {
        field: 'dixie',
        headerName: proxy.$t('terminal.terminal.dixie'),
        width: 140,
        cellRenderer: 'text_status_tag',
        cellRendererParams: {
            statusMapping: {
                0: { label: '不启用', color: 'grey' },
                1: { label: '启用', color: 'green' }
            },
            status: 'dixie'
        }
    },
    {
        field: 'description',
        headerName: proxy.$t('description'),
        width: 180
    }
])
const dataSource = ref([])
const reload = () => {
    pager.current = 1
    getList()
}

const getList = () => {
    if (!props.object.terminal_list?.length) return
    let data = {
        page_size: pager.pageSize,
        page_index: pager.current,
        where_in: JSON.stringify([['uid', props.object.terminal_list.join(',')]])
    }
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        data.where_and = [
            [search.searchKey, search.searchOption, search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue]
        ]
    }
    proxy.api.post('terminal_list', data).then((result) => {
        dataSource.value = result.result.data
        pager.total = result.result.total_records
    })
}

const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}

onMounted(() => {
    getList()
})
onActivated(() => {
    getList()
})
watch(
    () => props.object,
    () => {
        getList()
    }
)
defineExpose({ reload })
</script>
