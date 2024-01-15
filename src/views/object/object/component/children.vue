<template>
    <div class="mix-detail-container p-[12px] bg-white">
        <div class="flex">
            <mix-top-operation
                ref="mix_top_operation"
                :condition_option="conditionOption"
                @search="getList"
                @reload="reload"
                :searchField="search_field"
            />
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            :columWithStorageName="`object_object_children_list_${activeKey}`"
            :pager="pager"
            height="230"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" />
    </div>
</template>

<script setup>
import { getCurrentInstance, computed, reactive, ref, onMounted, watch, onActivated } from 'vue'
import { usePermissionStore } from '@/pinia/modules/menu'
import { useRouter } from 'vue-router'
import { useFormatScript, useAddLikeMark } from '@/hook/analy_script.js'
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const { proxy } = getCurrentInstance()
const conditionOption = ref([
    { label: 'contain', value: 'like' },
    { label: 'equal', value: '=' }
])
const router = new useRouter()
const ag_grid = ref()
const edit_modal = ref(null)
const mix_top_operation = ref()
const pager = reactive({ ...proxy.config.pagination })
/* 获取当前视图权限 */
const activeKey = computed(() => usePermissionStore().activeKey)

/* 获取工具栏按钮，操作栏按钮，列表显示字段 */
const search_field = [
    {
        value: 'uid',
        label: proxy.$t('objects.object.uid'),
        type: 'input'
    },
    {
        value: 'name',
        label: proxy.$t('objects.object.name'),
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
        value: 'mapping_name',
        label: proxy.$t('objects.object.mapping_name'),
        type: 'input'
    },
    {
        value: 'tag',
        label: proxy.$t('objects.object.tag'),
        type: 'input'
    },
    {
        value: 'area',
        label: proxy.$t('objects.object.area'),
        type: 'input'
    },
    {
        value: 'created',
        label: proxy.$t('created'),
        type: 'timePicker'
    }
]
const columns = ref([
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
    { field: 'tpl_uid', headerName: proxy.$t('tpl_uid'), width: 180 },
    { field: 'tpl_name', headerName: proxy.$t('tpl_name'), width: 180 },
    { field: 'tpl_alias', headerName: proxy.$t('tpl_alias'), width: 180 },
    { field: 'customer_name', headerName: proxy.$t('objects.object.customer_name'), width: 180 },
    { field: 'terminal_list', headerName: proxy.$t('objects.object.terminal_list'), width: 180, cellRenderer: 'ag-text-tag' },
    { field: 'mapping_name', headerName: proxy.$t('objects.object.mapping_name'), width: 180 },
    { field: 'tag', headerName: proxy.$t('objects.object.tag'), width: 160, cellRenderer: 'ag-text-tag' },
    { field: 'area', headerName: proxy.$t('objects.object.area'), width: 180 },
    { field: 'created', headerName: proxy.$t('created'), width: 200 },
    { field: 'last_modified', headerName: proxy.$t('last_modified'), width: 200 }
])
const localButtons = ref([{ type: 'item', name: '详情', checked: true }])

const dataSource = ref([])
let baseData = []
const getBaseData = () => {
    if (!props.object.object_list) return
    let data = {
        uids: props.object.object_list
    }
    proxy.api.post('object_childs', data).then((res) => {
        baseData = res.result.data
        pager.total = baseData.length
        getList()
    })
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}

const reload = () => {
    pager.current = 1
    getList()
}

const getList = () => {
    let top_search = mix_top_operation.value.top_params
    let search = {
        searchOptionValue: top_search.searchKey,
        conditionOptionValue: top_search.searchOption,
        searchString: top_search.searchValue
    }
    let listData = baseData.filter((item) => {
        if (!search) {
            return true
        }
        if (!search.searchString) {
            return true
        }

        let compareValue = String(item[search.searchOptionValue])
        if (!compareValue) {
            return false
        }
        if (search.conditionOptionValue === 'like') {
            return compareValue.indexOf(search.searchString) > -1
        }
        let compareWay = search.conditionOptionValue
        if (compareWay === '=') {
            compareWay = '=='
        }
        let execute_string = '"' + compareValue + '"' + compareWay + '"' + search.searchString + '"'
        return eval(execute_string)
    })
    let start = pager.current === 1 ? 0 : (pager.current - 1) * pager.pageSize
    let end = pager.total < pager.pageSize * pager.current ? pager.total : pager.pageSize * pager.current
    dataSource.value = listData.slice(start, end)
}

const rightMenu = ref()
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}

const detail = (record) => {
    console.log(record, 'record')
    let active_key = sessionStorage.getItem('active_key')
    router.push({
        path: '/object/object/detail/' + record.uid,
        query: {
            active_key: active_key,
            active_name: record.name
        }
    })
}

//获取列表数据
onMounted(() => {
    getBaseData()
})

watch(
    () => props.object,
    () => {
        getBaseData()
    }
)

onActivated(() => {
    getList()
})

defineExpose({ detail, reload })
</script>

<style lang="scss" scoped></style>
