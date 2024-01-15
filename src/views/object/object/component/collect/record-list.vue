<template>
    <mix-agrid
        v-model:columnDefs="columns"
        :rowData="dataSource"
        ref="ag_grid"
        height="240"
        :columWithStorageName="`object_object_collect_record_list_${activeKey}`"
        :pager="pager"
        @pageChange="pageChange"
        @cellContextMenu="onCellContextMenu"
    />
    <mix-right-menu ref="rightMenu" :localButtons="localButtons" block="collect" />
    <a-modal
        :maskClosable="false"
        :visible="modal.show"
        :title="modal.title"
        centered
        width="50%"
        :bodyStyle="{ height: '400px', padding: '16px 48px' }"
        @cancel="handleCnacel"
    >
        <template #footer>
            <a-button type="primary" @click="handleCnacel">{{ $t('close') }}</a-button>
        </template>
        <a-form :model="form" ref="formRef">
            <a-form-item :label="$t('objects.collect.name')" name="name">
                <a-input v-model:value="form.name" type="text" disabled />
            </a-form-item>
            <a-form-item label="采集内容">
                <a-table :columns="valueColumns" :data-source="valueList" bordered :pagination="false" :scroll="{ y: 270 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'type'">
                            {{ $t(record.type) || '' }}
                        </template>
                    </template>
                </a-table>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import collectModal from './modal.vue'
const { proxy } = getCurrentInstance()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive({ ...proxy.config.pagination })
const dataType = { ...proxy.config.collect_init.data_type }
const route = useRoute()
const modal = reactive({
    show: false,
    title: proxy.$t('objects.collect.record')
})
const columns = ref([
    {
        field: 'uid',
        headerName: proxy.$t('objects.collect.uid'),
        width: 180
    },
    {
        field: 'name',
        headerName: proxy.$t('objects.collect.name'),
        width: 180
    },
    {
        field: 'collector',
        headerName: proxy.$t('objects.collect.collector'),
        width: 180
    },
    {
        field: 'created',
        headerName: proxy.$t('objects.collect.created'),
        width: 180
    }
])
const localButtons = ref([
    {
        rename: proxy.$t('view'),
        type: 'update',
        role_checked: true
    }
])
const rightMenu = ref()
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}
const dataSource = ref([])
const reload = () => {
    pager.current = 1
    getList()
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const rangeDate = reactive({
    start: '',
    end: ''
})
const getList = () => {
    let data = {
        page_index: pager.current,
        page_size: pager.pageSize
    }
    let condition = [['object_id', '=', route.params.id]]
    let search = proxy.$parent.mix_top_operation.top_params
    if (search.searchValue) {
        condition.push([
            search.searchKey,
            search.searchOption,
            search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue
        ])
    }
    if (rangeDate.start && rangeDate.end) {
        condition.push(['created', '>=', rangeDate.start])
        condition.push(['created', '<=', rangeDate.end])
    }
    data.where_and = JSON.stringify(condition)
    proxy.api.post('collect_value_list', data).then((res) => {
        if (res.code === 200) {
            pager.current = parseInt(res.result.page_index)
            pager.total = parseInt(res.result.total_records)
            dataSource.value = res.result.data
        }
    })
}
const form = ref({
    data: []
})
const valueColumns = [
    {
        title: proxy.$t('objects.collect.item_name'),
        key: 'label_loc',
        dataIndex: 'label_loc'
    },
    {
        title: proxy.$t('objects.collect.datatype'),
        key: 'type',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: proxy.$t('objects.collect.value'),
        key: 'value',
        dataIndex: 'value'
    },
    {
        title: proxy.$t('objects.collect.unit'),
        key: 'unit',
        dataIndex: 'unit'
    }
]
const valueList = ref([])
const updateModal = (record) => {
    modal.show = true
    form.value = { ...record }
    getCollectItem(record)
}
const handleCnacel = () => {
    modal.show = false
}
const getCollectItem = (record) => {
    let data = { uid: record.collect_id }
    valueList.value = []
    proxy.api.post('collect_value_item', data).then((res) => {
        if (res.code === 200 && res.result.script.length > 0) {
            let script = res.result.script
            script.forEach((v, k) => {
                let item = {
                    key: v.key,
                    label_loc: v.label_loc,
                    label_en: v.label_en,
                    source: v.source,
                    type: v.type,
                    unit: v.unit
                }
                if (record.value[v.key] === undefined) {
                    item.value = ''
                } else {
                    item.value = String(record.value[v.key])
                }
                valueList.value.push(item)
            })
        }
    })
}
defineExpose({ rangeDate, getList, updateModal })
</script>

<style lang="scss" scoped></style>
