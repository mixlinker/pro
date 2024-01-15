<template>
    <div class="mix-detail-container p-[12px] bg-white">
        <div class="flex">
            <mix-top-operation
                ref="mix_top_operation"
                @search="getList"
                :condition_option="conditionOption"
                @reload="reload"
                :searchField="search_field"
            />
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            height="240"
            :columWithStorageName="`object_object_fv_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
        />
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, onActivated } from 'vue'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const mix_top_operation = ref()
const ag_grid = ref()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive({ ...proxy.config.pagination })
const search_field = ref([
    {
        label: proxy.$t('objects.object.fv'),
        value: 'fv',
        type: 'input'
    },
    {
        label: proxy.$t('objects.object.label_local'),
        value: 'label_local',
        type: 'input'
    },
    {
        label: proxy.$t('objects.object.label_en'),
        value: 'label_en',
        type: 'input'
    }
])
const conditionOption = ref([
    { label: 'contain', value: 'like' },
    { label: 'equal', value: '=' },
    { label: 'not_equal', value: '<>' }
])
const columns = ref([
    { field: 'fv', headerName: proxy.$t('objects.object.fv'), flex: 1 },
    { field: 'label_local', headerName: proxy.$t('objects.object.label_local'), flex: 1 },
    { field: 'label_en', headerName: proxy.$t('objects.object.label_en'), flex: 1 },
    {
        field: 'value',
        headerName: proxy.$t('objects.object.param_value'),
        flex: 1,
        valueFormatter: (param) => {
            if (typeof param.value === 'boolean') {
                param.value = String(param.value)
            }
            return param.value
        }
    }
])
const dataSource = ref([])
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
    if (props.object.object_fv_map && props.object.object_fv_map[props.object.uid]) {
        let listData = props.object.object_fv_map[props.object.uid].filter((ele) => {
            return ['STA', 'AGT'].includes(ele.category)
        })
        listData = listData.filter((item) => {
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
        dataSource.value = listData
        pager.total = dataSource.value.length
        setCurrentPage(dataSource.value)
    }
}
const setCurrentPage = (listData) => {
    let start = pager.current === 1 ? 0 : (pager.current - 1) * pager.pageSize
    let end = pager.total < pager.pageSize * pager.current ? pager.total : pager.pageSize * pager.current
    dataSource.value = listData.slice(start, end)
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const getData = async () => {
    const { result } = await proxy.api.post('get_snapshot_dashbos', { object_id: props.object.uid }, true)
    if (result.mosaic) {
        resolve(result)
    }
}

const resolve = (data) => {
    let fvData = data.mosaic.data.data
    for (let i = 0; i < Object.keys(fvData).length; i++) {
        let rowNode = ag_grid.value.gridApi.getDisplayedRowAtIndex(i)
        rowNode.setDataValue('value', fvData[dataSource.value[i].fv])
    }
}

onMounted(() => {
    getList()
    getData()
})

onActivated(() => {
    getList()
})
defineExpose({ reload })
</script>

<style scoped></style>
