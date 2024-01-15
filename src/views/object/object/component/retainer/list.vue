<template>
    <div class="flex-column" style="height: 100%">
        <div class="flex-wrap">
            <a-tabs v-model:value="activeKey" @change="changeTab" style="width: 100%">
                <a-tab-pane key="EVENT" :tab="$t('objects.retainer.event_list')"></a-tab-pane>
                <a-tab-pane key="ALERT" :tab="$t('objects.retainer.alert_list')"></a-tab-pane>
                <a-tab-pane key="FAULT" :tab="$t('objects.retainer.fault_list')"></a-tab-pane>
                <a-tab-pane key="OTHER" :tab="$t('objects.retainer.other_list')"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="flex" style="margin-top: 12px">
            <div class="search-item mr-[12px]">
                <a-radio-group v-model:value="retainerState" @change="changeState" button-style="solid">
                    <a-radio-button value="1">{{ $t('objects.retainer.open_state') }}</a-radio-button>
                    <a-radio-button value="0">{{ $t('objects.retainer.close_state') }}</a-radio-button>
                </a-radio-group>
            </div>
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="search_field" />
            <div class="absolute right-0">
                <a-range-picker style="width: 300px" show-time @change="confirmRange" />
            </div>
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            height="260"
            :columWithStorageName="`object_object_retainer`"
            :pager="pager"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted, nextTick, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const pager = reactive({ ...proxy.config.pagination })
const activeKey = sessionStorage.getItem('active_key')
const currentTab = ref('EVENT')
const retainerState = ref('1')
const mix_top_operation = ref()
const ag_grid = ref()
const localButtons = ref([
    {
        type: 'item',
        role_checked: true
    }
])
const search_field = ref([])
const columns = ref([])
let startTime = ''
let endTime = ''
const dataSource = ref([])
/* 切换顶部tab，动态修改历程类型名称 */
const init = () => {
    search_field.value = [
        {
            label:
                currentTab.value == 'OTHER'
                    ? proxy.$t('retainer.result.label_cn')
                    : proxy.$t(`retainer.${currentTab.value}`) + proxy.$t(`retainer.name_cn`),
            value: 'label_cn',
            type: 'input'
        },
        {
            label:
                currentTab.value == 'OTHER'
                    ? proxy.$t('retainer.result.label_en')
                    : proxy.$t(`retainer.${currentTab.value}`) + proxy.$t(`retainer.name_en`),
            value: 'label_en',
            type: 'input'
        },

        {
            label: proxy.$t('retainer.result.mode'),
            value: 'model',
            type: 'input'
        },
        {
            label: proxy.$t('retainer.result.custom'),
            value: 'customer_name',
            type: 'input'
        }
    ]
    columns.value = [
        {
            field: 'code',
            headerName:
                currentTab.value == 'OTHER'
                    ? proxy.$t('retainer.code')
                    : proxy.$t(`retainer.${currentTab.value}`) + proxy.$t(`retainer.code_name`),
            width: 180
        },
        {
            field: 'label_cn',
            headerName:
                currentTab.value == 'OTHER'
                    ? proxy.$t('retainer.result.label_cn')
                    : proxy.$t(`retainer.${currentTab.value}`) + proxy.$t(`retainer.name_cn`),
            width: 160
        },
        {
            field: 'label_en',
            headerName:
                currentTab.value == 'OTHER'
                    ? proxy.$t('retainer.result.label_en')
                    : proxy.$t(`retainer.${currentTab.value}`) + proxy.$t(`retainer.name_en`),
            width: 160
        },
        {
            field: 'category',
            headerName: proxy.$t('category'),
            width: 120,
            valueFormatter: (params) => {
                return proxy.$t(`retainer.${params.value}`)
            }
        },
        {
            field: 'object_id',
            headerName: proxy.$t('retainer.result.object_id'),
            width: 180
        },
        {
            field: 'object_name',
            headerName: proxy.$t('retainer.result.object_name'),
            width: 180
        },
        {
            field: 'model',
            headerName: proxy.$t('retainer.result.model'),
            width: 180
        },
        {
            field: 'customer_name',
            headerName: proxy.$t('retainer.result.customer_name'),
            width: 180
        },
        {
            field: 'opened_at',
            headerName: proxy.$t('retainer.result.opened_at'),
            width: 180
        },
        {
            field: 'elapsed',
            headerName: proxy.$t('retainer.result.elapsed'),
            width: 180
        },
        {
            field: 'statis_result',
            headerName: proxy.$t('retainer.result.statis_result'),
            width: 180
        },
        {
            field: 'service_description',
            headerName: proxy.$t('retainer.result.description'),
            width: 180
        }
    ]
}
const getList = () => {
    let data = {
        page_index: pager.current,
        page_size: pager.pageSize
    }
    let object_uid = props.object.uid ? props.object.uid : route.params.id
    let condition = [
        ['object_id', '=', object_uid],
        ['category', '=', currentTab.value],
        ['retained', '=', parseInt(retainerState.value)]
    ]
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        condition.push([
            search.searchKey,
            search.searchOption,
            search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue
        ])
    }
    if (startTime && endTime) {
        condition.push(['created', '>=', startTime])
        condition.push(['created', '<=', endTime])
    }
    data.where_and = JSON.stringify(condition)
    nextTick(() => {
        ag_grid.value.initColWithAndsite()
    })
    proxy.api.post('retainer_result_list', data).then((res) => {
        if (res.code === 200) {
            pager.current = parseInt(res.result.page_index)
            pager.total = parseInt(res.result.total_records)
            dataSource.value = res.result.data
        }
    })
}
const rightMenu = ref()
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}
const changeTab = (val) => {
    currentTab.value = val
    init()
    getList()
}
const search = () => {
    getList()
}
const reload = () => {
    pager.current = 1
    getList()
}
const changeState = () => {
    pager.current = 1
    getList()
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const confirmRange = (val, str) => {
    startTime = str[0]
    endTime = str[1]
    getList()
}
const detail = (record) => {
    let active_key = sessionStorage.getItem('active_key')
    router.push({
        path: '/object/retainer/detail/' + record.uid,
        query: {
            active_key: active_key,
            active_name: record.label_cn,
            category: record.category
        }
    })
}

onMounted(() => {
    init()
    getList()
})
onActivated(() => {
    init()
    getList()
})
defineExpose({ reload, detail })
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav .ant-tabs-tab) {
    margin-right: 24px;
    padding: 12px 0;
    background-color: transparent !important;
}
</style>
