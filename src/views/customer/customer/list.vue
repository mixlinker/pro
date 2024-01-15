<template>
    <div class="mix-content">
        <div class="flex">
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="base_search_field" />
        </div>
        <mix-agrid
            v-model:columnDefs="baseColumns"
            :rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            columWithStorageName="customer_customer_lis`"
            :pager="pager"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
            @sortChanged="sortChange"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
        <modal ref="edit_modal"></modal>
        <export-modal ref="export_modal"></export-modal>
    </div>
</template>

<script setup>
import { getCurrentInstance, computed, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInitParams } from '@/hook/analy_script.js'
import modal from './component/modal.vue'
import exportModal from './component/export_modal.vue'
const router = new useRouter()
const props = defineProps({
    permission: {
        type: Object,
        default: null
    }
})
onMounted(() => {
    getList()
})
const ag_grid = ref()
const edit_modal = ref(null)
const export_modal = ref(null)
const { proxy } = getCurrentInstance()
const mix_top_operation = ref()
const pager = reactive({ ...proxy.config.pagination })
const base_search_field = [
    {
        value: 'name',
        label: proxy.$t('customer.name'),
        type: 'input'
    },
    {
        value: 'uid',
        label: proxy.$t('customer.uid'),
        type: 'input'
    },
    {
        value: 'alias',
        label: proxy.$t('customer.alias'),
        type: 'input'
    },
    {
        value: 'email',
        label: proxy.$t('customer.email'),
        type: 'input'
    },
    {
        value: 'mobile',
        label: proxy.$t('customer.mobile'),
        type: 'input'
    },
    {
        value: 'phone',
        label: proxy.$t('customer.phone'),
        type: 'input'
    },
    {
        value: 'region',
        label: proxy.$t('customer.region'),
        type: 'input'
    },
    {
        value: 'created',
        label: proxy.$t('created'),
        type: 'timePicker'
    }
]
const baseColumns = ref([
    { field: 'uid', headerName: proxy.$t('customer.uid'), width: 180 },
    { field: 'name', headerName: proxy.$t('customer.name'), width: 180 },
    { field: 'alias', headerName: proxy.$t('customer.alias'), width: 180 },
    { field: 'contact', headerName: proxy.$t('customer.contact'), width: 180 },
    { field: 'email', headerName: proxy.$t('customer.email'), width: 180 },
    { field: 'mobile', headerName: proxy.$t('customer.mobile'), width: 180 },
    { field: 'phone', headerName: proxy.$t('customer.phone'), width: 180 },
    {
        field: 'region',
        headerName: proxy.$t('customer.region'),
        width: 180,
        cellRenderer: 'ag-text-tag'
    },
    { field: 'province', headerName: proxy.$t('customer.province'), width: 180 },
    { field: 'city', headerName: proxy.$t('customer.city'), width: 180 },
    { field: 'created', headerName: proxy.$t('created'), width: 200 }
])
const order = {
    order_by: 'id',
    order_type: 'desc'
}
const localButtons = [
    {
        type: 'item',
        role_checked: true
    }
]
const dataSource = ref([])
const getList = () => {
    let data = useInitParams(pager, mix_top_operation, null, order)
    proxy.api.post('customer_list', data).then((res) => {
        dataSource.value = res.result.data
        pager.total = res.result.total_records
    })
}
const pageChange = () => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const search = (val) => {
    getList()
}
const reload = () => {
    pager.current = 1
    getList()
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
const updateModal = (record) => {
    edit_modal.value.modal.title = proxy.$t('customer.edit')
    edit_modal.value.modal.show = true
    edit_modal.value.modal.id = record.id
}

const createModal = () => {
    edit_modal.value.modal.title = proxy.$t('customer.add')
    edit_modal.value.modal.id = ''
    edit_modal.value.modal.show = true
}

const detail = (record) => {
    router.push({
        path: '/customer/customer/detail/' + record.uid,
        query: {
            active_name: record.name + `(${record.uid})`
        }
    })
}
const handleDelete = (record) => {
    proxy.api.post('customer_delete', { id: record.id }).then(() => {
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        proxy.$message.success(proxy.$t('delete_success'))
        getList()
    })
}

const handleExport = () => {
    export_modal.value.modal.visible = true
}

defineExpose({ detail, updateModal, handleExport, createModal, handleDelete, reload, getList })
</script>

<style lang="scss" scoped></style>
