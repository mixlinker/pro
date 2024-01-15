<template>
    <div class="mix-detail-container">
        <div class="flex relative">
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="base_search_field" />
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            v-model:rowData="dataSource"
            ref="ag_grid"
            :columWithStorageName="`timer_task_record_list`"
            :pager="pager"
            @pageChange="pageChange"
            :height="216"
            @cellContextMenu="onCellContextMenu"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
        <timerHandleModal ref="modalRef"></timerHandleModal>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue'
import timerHandleModal from '../timerHandleModal.vue'
const props = defineProps(['object'])

const { proxy } = getCurrentInstance()
const mix_top_operation = ref(null)
const ag_grid = ref(null)
const rightMenu = ref(null)
const pager = reactive({ ...proxy.config.pagination })
const base_search_field = [
    {
        label: proxy.$t('timer.task.handle_uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('timer.task.handle_id'),
        value: 'handler_name',
        type: 'input'
    }
]
const columns = ref([
    {
        field: 'uid',
        headerName: proxy.$t('timer.task.handle_uid')
    },
    {
        field: 'handler_name',
        headerName: proxy.$t('timer.task.handle_id')
    },
    {
        field: 'description',
        headerName: proxy.$t('description')
    },
    {
        field: 'fee',
        headerName: proxy.$t('timer.task.fee')
    },
    {
        field: 'images',
        headerName: proxy.$t('timer.task.picture'),
        cellRenderer: 'ag-image'
    },
    {
        field: 'created',
        headerName: proxy.$t('created')
    }
])
onMounted(() => {
    getList()
})
const dataSource = ref([])
const getList = () => {
    let data = {
        page_index: pager.current,
        page_size: pager.pageSize
    }
    let condition = [['timer_id', '=', props.object.uid]]
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        let searchValue = search.searchValue.trim()
        if (search.searchOption === 'like') {
            searchValue = '%' + searchValue + '%'
        }
        condition.push([search.searchKey, search.searchOption, searchValue])
    }
    data.where_and = JSON.stringify(condition)
    proxy.api.post('get_handle_record_list', data).then((res) => {
        pager.total = parseInt(res.result.total_records)
        dataSource.value = res.result.data
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
const localButtons = [
    { role_checked: true, name: proxy.$t('edit'), type: 'update' },
    { role_checked: true, name: proxy.$t('delete'), type: 'delete' }
]
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}
const modalRef = ref(null)
const updateModal = (record) => {
    modalRef.value.modal.title = proxy.$t('timer.task.edit_handle_record')
    modalRef.value.modal.record = record
    modalRef.value.modal.id = record.uid
    modalRef.value.modal.show = true
}
const handleDelete = (record) => {
    proxy.api.post('delete_timer_record', { uid: record.uid }).then((res) => {
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        proxy.$message.success(proxy.$t('delete_success'))
        getList()
    })
}
defineExpose({ reload, updateModal, handleDelete })
</script>

<style lang="scss" scoped></style>
