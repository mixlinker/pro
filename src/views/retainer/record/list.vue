<template>
    <div class="mix-content">
        <div class="flex">
            <div class="search-item mr-[10px]">
                <a-radio-group v-model:value="retainerStatus" style="width: 192px" @change="getList" button-style="solid">
                    <a-radio-button value="1">
                        {{ $t('objects.retainer.open_state') }}
                    </a-radio-button>
                    <a-radio-button value="0">
                        {{ $t('objects.retainer.close_state') }}
                    </a-radio-button>
                </a-radio-group>
            </div>
            <mix-top-operation
                ref="mix_top_operation"
                :initOneDateTime="true"
                :show-range="true"
                :searchField="base_search_field"
                @search="search"
                @reload="reload"
            />
        </div>
        <mix-agrid
            v-model:columnDefs="baseColumns"
            v-model:rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            :columWithStorageName="`retainer_record`"
            :pager="pager"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
            @sortChanged="sortChange"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
        <exportModal ref="export_modal"></exportModal>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useInitParams } from '@/hook/analy_script.js'
import exportModal from './component/export-modal.vue'
const router = useRouter()
const { proxy } = getCurrentInstance()
const pager = reactive({ ...proxy.config.pagination })
const mix_top_operation = ref()
const ag_grid = ref()
let base_search_field = [
    {
        label: proxy.$t('retainer.project.uid'),
        value: 'template_id',
        type: 'input'
    },
    {
        label: proxy.$t('retainer.code'),
        value: 'code',
        type: 'input'
    },
    {
        label: proxy.$t('retainer.name_cn'),
        value: 'label_cn',
        type: 'input'
    },
    {
        label: proxy.$t('retainer.name_en'),
        value: 'label_en',
        type: 'input'
    },
    {
        value: 'opened_at',
        label: proxy.$t('retainer.result.opened_at'),
        type: 'timePicker'
    }
]
let baseColumns = [
    {
        field: 'template_id',
        headerName: proxy.$t('retainer.project.uid'),
        width: 180
    },
    {
        field: 'label_cn',
        headerName: proxy.$t('retainer.name_cn'),
        width: 160
    },
    {
        field: 'label_en',
        headerName: proxy.$t('retainer.name_en'),
        width: 160
    },
    {
        field: 'code',
        headerName: proxy.$t('retainer.code'),
        width: 180
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
        field: 'retained',
        headerName: proxy.$t('status'),
        width: 180,
        cellRenderer: 'ag-text-status',
        cellRendererParams: {
            statusMapping: {
                0: { label: proxy.$t('close'), color: 'red' },
                1: { label: proxy.$t('open'), color: 'green' }
            }
        }
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
const order = {
    order_by: 'id',
    order_type: 'desc'
}
const localButtons = [
    {
        type: 'item',
        checked: true
    }
]
const retainerStatus = ref('1')
const dataSource = ref([])
const getList = () => {
    let data = useInitParams(pager, mix_top_operation, null, order)
    if (data.where_and && data.where_and.length) {
        let conditions = JSON.parse(data.where_and)
        conditions.push(['retained', '=', retainerStatus.value])
        data.where_and = JSON.stringify(conditions)
    }
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
const sortChange = (event) => {
    const columData = event.columnApi.getColumnState().find((item) => item.sort != null)
    if (columData?.colId) {
        order.order_by = columData?.colId
    }
    if (columData?.sort) {
        order.order_type = columData.sort
    }
    getList()
}
const search = () => {
    getList()
}
const reload = () => {
    pager.current = 1
    getList()
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const detail = (record) => {
    router.push({
        path: '/retainer/record/detail/' + record.uid,
        query: {
            active_name: record.label_cn + `(${record.uid})`,
            category: record.category
        }
    })
}
const export_modal = ref()
const handleExport = () => {
    export_modal.value.modal.category = 'EVENT'
    if (condition.value.length) {
        condition.value.forEach((ele) => {
            if (ele[0] === 'category') {
                export_modal.value.modal.category = ele[2] ?? 'EVENT'
            }
        })
    }
    export_modal.value.modal.show = true
}

defineExpose({ reload, detail, handleExport })
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav .ant-tabs-tab) {
    margin-right: 24px;
    padding: 12px 0;
    background-color: transparent !important;
}
</style>
