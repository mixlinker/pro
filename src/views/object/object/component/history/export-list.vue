<template>
    <mix-agrid
        v-model:columnDefs="columns"
        :rowData="dataSource"
        ref="ag_grid"
        :columWithStorageName="`object_object_history_export_list_${activeKey}`"
        :pager="pager"
        height="240"
        @pageChange="pageChange"
        @cellContextMenu="onCellContextMenu"
    />
    <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const route = useRoute()
const pager = reactive({ ...proxy.config.pagination })
const activeKey = sessionStorage.getItem('active_key')
const localButtons = ref([
    {
        name: '下载',
        type: 'download',
        role_checked: true
    },
    {
        name: '删除',
        type: 'delete',
        role_checked: true
    }
])
const columns = ref([
    {
        field: 'created',
        headerName: proxy.$t('objects.history.export_time'),
        width: 180
    },
    {
        field: 'uid',
        headerName: proxy.$t('objects.history.export_id'),
        width: 180
    },
    {
        field: 'file_name',
        headerName: proxy.$t('objects.history.file_name'),
        width: 180
    },
    {
        field: 'data_start',
        headerName: proxy.$t('objects.history.start_time'),
        width: 180
    },
    {
        field: 'data_end',
        headerName: proxy.$t('objects.history.end_time'),
        width: 180
    },
    {
        field: 'state',
        headerName: proxy.$t('objects.history.state'),
        width: 180,
        cellRenderer: 'ag-text-status',
        cellRendererParams: {
            statusMapping: {
                Success: { label: '成功', color: 'green' },
                Fail: { label: '失败', color: 'red' },
                Executing: { label: '执行中', color: 'blue' },
                Wait: { label: '等待中', color: 'orange' }
            }
        }
    }
])
const dataSource = ref([])
const getexportData = () => {
    let data = {
        where_and: [['object_id', '=', route.params.id]],
        page_index: pager.current,
        page_size: pager.pageSize
    }
    proxy.api.post('history_export_data', data).then((res) => {
        if (res.result.data) {
            dataSource.value = res.result.data
            pager.total = res.result.total_records
        } else {
            pager.total = 0
            pager.current = 1
        }
    })
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getexportData()
}
const handleDownload = (record) => {
    let file = record.file
    if (file) {
        let url = file.indexOf('http') === 0 ? file : '/mixservice/storage/' + file
        window.open(url)
    } else {
        proxy.$message.error(proxy.$t('undefined_file'))
    }
}
const handleDelete = (record) => {
    let data = {
        uid: record.uid
    }

    proxy.api.post('history_delete', data).then((res) => {
        //当列表数据只有一条，且分页大于1时，删除成功后需将当前页码-1
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        if (res.code === 200) {
            proxy.$message.success(this.$t('delete_success'))
            getexportData()
        }
    })
}
const rightMenu = ref()
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}

defineExpose({ getexportData, handleDownload, handleDelete })
</script>

<style lang="scss" scoped></style>
