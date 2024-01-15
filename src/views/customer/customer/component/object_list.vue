<template>
    <div class="mix-detail-container">
        <div class="flex">
            <mix-top-operation ref="mix_top_operation" @search="getList" @reload="reload" :searchField="search_field" />
        </div>
        <mix-agrid
            v-model:columnDefs="columns"
            :rowData="dataSource"
            ref="ag_grid"
            :field_filter="true"
            height="240"
            :columWithStorageName="`customer_object_list_${activeKey}`"
            :pager="pager"
            @pageChange="pageChange"
        />
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, onActivated } from 'vue'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const route = useRoute()
const mix_top_operation = ref()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive(JSON.parse(JSON.stringify(proxy.config.pagination)))
const search_field = ref([
    {
        label: proxy.$t('objects.object.uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('objects.object.name'),
        value: 'name',
        type: 'input'
    }
])
const columns = ref([
    { field: 'uid', headerName: proxy.$t('objects.object.uid'), width: 180 },
    { field: 'name', headerName: proxy.$t('objects.object.name'), width: 180 },
    { field: 'customer_project_id', headerName: proxy.$t('customer.project.uid'), width: 180 },
    { field: 'customer_project_alias', headerName: proxy.$t('customer.project.alias'), width: 180 },
    { field: 'customer_project_name', headerName: proxy.$t('customer.project.name'), width: 180 },
    { field: 'model', headerName: proxy.$t('objects.object.model'), width: 160 },
    { field: 'created', headerName: proxy.$t('created'), width: 180 }
])
const dataSource = ref([])
const reload = () => {
    pager.current = 1
    getList()
}

const getList = () => {
    let data = {
        page_size: pager.pageSize,
        page_index: pager.current,
        where_and: [['customer_id', '=', route.params.id]]
    }
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        data.where_and.push([
            search.searchKey,
            search.searchOption,
            search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue
        ])
    }
    proxy.api.post('object_list', data).then((res) => {
        dataSource.value = res.result.data
        pager.total = parseInt(res.result.total_records)
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
defineExpose({ reload })
</script>
