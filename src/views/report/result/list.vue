<template>
    <div v-if="authStatus" class="mix-content">
        <div class="flex relative">
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="search_field" :showRange="true" />
            <mix-auth-button :command-buttons="commandButtons"></mix-auth-button>
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            v-model:rowData="dataSource"
            ref="ag_grid"
            :columWithStorageName="`report_result_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
            @sortChanged="sortChange"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
    </div>
    <div v-else class="no-permissions">
        <span>{{ $t('no_permissions') }}</span>
    </div>
</template>

<script setup>
import { getCurrentInstance, computed, reactive, ref, onMounted, watch } from 'vue'
import { usePermissionStore } from '@/pinia/modules/menu'
import { useFormatScript, useInitParams } from '@/hook/analy_script.js'
import script from './script'
const { proxy } = getCurrentInstance()
const props = defineProps({
    permission: {
        type: Object,
        default: null
    }
})
const mix_top_operation = ref(null)
const ag_grid = ref(null)
const rightMenu = ref(null)
const pager = reactive({ ...proxy.config.pagination })
const activeKey = computed(() => usePermissionStore().activeKey)
const reportType_map = {
    1: proxy.$t('report.project.year_report'),
    2: proxy.$t('report.project.month_report'),
    3: proxy.$t('report.project.date_report'),
    4: proxy.$t('report.project.classes_report'),
    5: proxy.$t('report.project.other_report')
}
const base_search_field = [
    {
        label: proxy.$t('report.result.uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('report.project.name'),
        value: 'project_name',
        type: 'input'
    }
]
const baseColumns = [
    {
        field: 'uid',
        headerName: proxy.$t('report.result.uid'),
        flex: 1
    },
    {
        field: 'project_name',
        headerName: proxy.$t('report.project.name'),
        flex: 1
    },
    {
        field: 'plan_type',
        headerName: proxy.$t('report.result.type'),
        flex: 1,
        valueFormatter: (params) => {
            return reportType_map[params.value]
        }
    },
    {
        field: 'plan_uid',
        headerName: proxy.$t('report.project.uid'),
        flex: 1
    },
    {
        field: 'status',
        headerName: proxy.$t('report.result.status'),
        flex: 1,
        cellRenderer: 'ag-text-status',
        cellRendererParams: {
            statusMapping: {
                0: { label: proxy.$t('in_execution'), color: 'orange' },
                1: { label: proxy.$t('successfully'), color: 'blue' },
                2: { label: proxy.$t('failing'), color: 'red' }
            }
        }
    },
    {
        field: 'created',
        headerName: proxy.$t('created'),
        flex: 1
    }
]
const dataSource = ref([])
const { commandButtons, condition, columns, localButtons, search_field, authStatus } = useFormatScript(
    script,
    baseColumns,
    base_search_field
)
const order = {
    order_by: 'id',
    order_type: 'desc'
}
const getList = () => {
    let data = useInitParams(pager, mix_top_operation, condition, order)
    data.block_id = 'index'
    proxy.api.post('report_result_list', data).then((res) => {
        dataSource.value = res.result.data
        pager.total = res.result.total_records
    })
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const search = () => {
    getList()
}
const reload = () => {
    pager.current = 1
    getList()
}
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
const handleDelete = (record) => {
    proxy.api.post('delete_report_task', { uid: record.uid }).then((res) => {
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        proxy.$message.success(proxy.$t('delete_success'))
        getList()
    })
}
const handleDownload = (record) => {
    if (record.file_path) {
        let url = location.origin + '/mixservice/storage/mixreport/' + record.file_path
        window.open(url)
    } else {
        proxy.$message.error(proxy.$t('undefined_file'))
    }
}
const handlePreview = (record) => {
    if (record.file_path) {
        let path = location.origin + '/mixservice/storage/mixreport/' + record.file_path
        let url = 'https://view.officeapps.live.com/op/view.aspx?src=' + path
        window.open(url)
    } else {
        proxy.$message.error(proxy.$t('undefined_file'))
    }
}
/* 暴露变量 */
defineExpose({ getList, reload, handleDelete, handleDownload, handlePreview })
</script>

<style lang="scss" scoped></style>
