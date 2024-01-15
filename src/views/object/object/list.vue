<template>
    <div class="mix-content" v-if="authStatus">
        <div class="flex">
            <mix-top-operation
                ref="mix_top_operation"
                @search="search"
                @reload="reload"
                :searchField="search_field"
                :condition_field="search_field"
            />
            <mix-auth-button :command-buttons="commandButtons"></mix-auth-button>
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            :columWithStorageName="`object_object_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
            @sortChanged="sortChange"
        />
        <mix-right-menu ref="rightMenu" block="object" :localButtons="localButtons" />
        <modal ref="edit_modal"></modal>
        <tpl-modal ref="tpl_modal"></tpl-modal>
    </div>
    <div v-else class="no-permissions">
        <span>{{ $t('no_permissions') }}</span>
    </div>
</template>

<script setup>
import { getCurrentInstance, computed, reactive, ref, onMounted } from 'vue'
import { usePermissionStore } from '@/pinia/modules/menu'
import { useRouter } from 'vue-router'
import { useFormatScript, useInitParams } from '@/hook/analy_script.js'
import modal from './component/modal.vue'
import tplModal from './component/tpl-modal.vue'
import script from './script'
const props = defineProps({
    permission: {
        type: Object,
        default: null
    }
})
onMounted(() => {
    getList()
})
const router = new useRouter()
const ag_grid = ref()
const edit_modal = ref(null)
const { proxy } = getCurrentInstance()
const mix_top_operation = ref()
const pager = reactive({ ...proxy.config.pagination })
/* 获取当前视图权限 */
const activeKey = computed(() => usePermissionStore().activeKey)

/* 获取工具栏按钮，操作栏按钮，列表显示字段 */
const base_search_field = [
    {
        value: 'name',
        label: proxy.$t('objects.object.name'),
        type: 'input'
    },
    {
        value: 'uid',
        label: proxy.$t('objects.object.uid'),
        type: 'input'
    },
    {
        value: 'alias',
        label: proxy.$t('objects.object.alias'),
        type: 'input'
    },

    {
        value: 'create_by_tpl',
        label: proxy.$t('create_mode'),
        type: 'select',
        option: {
            0: proxy.$t('no_template'),
            1: proxy.$t('template')
        }
    },
    {
        value: 'customer_name',
        label: proxy.$t('objects.object.customer_name'),
        type: 'input'
    },
    {
        value: 'terminal_list',
        label: proxy.$t('objects.object.terminal_list'),
        type: 'input'
    },
    {
        value: 'mapping_id',
        label: proxy.$t('objects.object.mapping_name'),
        type: 'input'
    },
    {
        value: 'tag',
        label: proxy.$t('objects.object.tag'),
        type: 'input'
    },
    {
        value: 'province',
        label: proxy.$t('objects.object.province'),
        type: 'input'
    },
    {
        value: 'city',
        label: proxy.$t('objects.object.city'),
        type: 'input'
    },
    {
        value: 'created',
        label: proxy.$t('created'),
        type: 'timePicker'
    }
]
const baseColumns = [
    { field: 'uid', headerName: proxy.$t('objects.object.uid'), width: 180 },
    { field: 'name', headerName: proxy.$t('objects.object.name'), width: 180 },
    { field: 'alias', headerName: proxy.$t('objects.object.alias'), width: 180 },
    {
        field: 'create_by_tpl',
        headerName: proxy.$t('create_mode'),
        width: 160,
        valueFormatter: (param) => {
            return param.value ? proxy.$t('template') : proxy.$t('no_template')
        }
    },
    { field: 'customer_id', headerName: proxy.$t('customer.uid'), width: 180 },
    { field: 'customer_alias', headerName: proxy.$t('customer.alias'), width: 180 },
    { field: 'terminal_list', headerName: proxy.$t('objects.object.terminal_list'), width: 180, cellRenderer: 'ag-text-tag' },
    { field: 'mapping_name', headerName: proxy.$t('objects.object.mapping_name'), width: 180 },
    { field: 'tag', headerName: proxy.$t('objects.object.tag'), width: 160, cellRenderer: 'ag-text-tag' },
    { field: 'province', headerName: proxy.$t('objects.object.province'), width: 180 },
    { field: 'city', headerName: proxy.$t('objects.object.city'), width: 180 },
    { field: 'created', headerName: proxy.$t('created'), width: 200 },
    { field: 'last_modified', headerName: proxy.$t('last_modified'), width: 200 }
]

const { commandButtons, localButtons, title_field, condition, columns, search_field, authStatus } = useFormatScript(
    script,
    baseColumns,
    base_search_field
)
const order = {
    order_by: 'id',
    order_type: 'desc'
}
const dataSource = ref([])
const getList = (param) => {
    let data = useInitParams(pager, mix_top_operation, condition, order)
    data.need_mosaic = true
    let hideLoading = param === 'interval'
    proxy.api.post('object_list', data, hideLoading).then((res) => {
        pager.total = res.result.length
        dataSource.value = res.result
    })
}
const pageChange = (current, size) => {
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
    edit_modal.value.modal.title = proxy.$t('objects.object.edit_title')
    edit_modal.value.modal.show = true
    edit_modal.value.modal.id = record.uid
}

const createModal = () => {
    edit_modal.value.modal.title = proxy.$t('objects.object.add_title')
    edit_modal.value.modal.id = ''
    edit_modal.value.modal.show = true
}

const tpl_modal = ref()
const openTplModal = () => {
    tpl_modal.value.modal.title = proxy.$t('objects.object.add_title')
    tpl_modal.value.modal.id = ''
    tpl_modal.value.modal.show = true
}

const detail = (record) => {
    router.push({
        path: '/object/object/detail/' + record.uid,
        query: {
            active_name: record[title_field.value] + `(${record.uid})`
        }
    })
}
const handleDelete = (record) => {
    proxy.api.post('object_delete', { uid: record.uid }).then(() => {
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        proxy.$message.success(proxy.$t('delete_success'))
        getList()
    })
}
defineExpose({ detail, updateModal, createModal, openTplModal, handleDelete, reload, getList })
</script>

<style lang="scss" scoped></style>
