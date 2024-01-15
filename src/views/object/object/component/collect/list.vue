<template>
    <div class="mix-detail-container p-[12px] bg-white">
        <div class="flex">
            <div class="search-item mr-[12px]">
                <a-radio-group v-model:value="radioType" style="width: 176px" @change="changeType" button-style="solid">
                    <a-radio-button value="edit">{{ $t('objects.collect.add_collect') }}</a-radio-button>
                    <a-radio-button value="record">{{ $t('objects.collect.record') }}</a-radio-button>
                </a-radio-group>
            </div>
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="search_field" />
            <div class="absolute right-0" v-if="radioType === 'record'">
                <a-range-picker style="width: 320px" show-time @change="confirmRange" />
            </div>
        </div>

        <template v-if="radioType === 'edit'">
            <mix-agrid
                v-model:columnDefs="columns"
                :rowData="dataSource"
                ref="ag_grid"
                v-if="radioType === 'edit'"
                height="240"
                :columWithStorageName="`object_object_collect_list_${activeKey}`"
                :pager="pager"
                @pageChange="pageChange"
                @cellContextMenu="onCellContextMenu"
            />
            <mix-right-menu ref="rightMenu" :localButtons="localButtons" block="collect" />
        </template>
        <recordList v-if="radioType === 'record'" ref="collectRecord"></recordList>
        <collectModal ref="collect_modal" @ok="addCollect"></collectModal>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, nextTick, watch, onActivated } from 'vue'
import recordList from './record-list.vue'
import { useRoute } from 'vue-router'
import collectModal from './modal.vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const route = useRoute()
const collect_modal = ref()
const collectRecord = ref()
const radioType = ref('edit')
const mix_top_operation = ref()
const activeKey = sessionStorage.getItem('active_key')
const pager = reactive({ ...proxy.config.pagination })
const localButtons = ref([
    {
        rename: proxy.$t('objects.collect.collect'),
        type: 'update',
        role_checked: true
    }
])
const search_field = ref([
    {
        label: proxy.$t('objects.collect.uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('objects.collect.name'),
        value: 'name',
        type: 'input'
    }
])
const columns = ref([
    {
        field: 'uid',
        headerName: proxy.$t('objects.collect.uid'),
        flex: 1
    },
    {
        field: 'name',
        headerName: proxy.$t('objects.collect.name'),
        flex: 1
    },
    {
        field: 'created',
        headerName: proxy.$t('created'),
        flex: 1
    }
])

const rightMenu = ref()
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}
const changeType = (e) => {
    radioType.value = e.target.value
    radioType.value === 'edit' && getList()
    nextTick(() => {
        radioType.value === 'record' && collectRecord.value.getList()
    })
}
const dataSource = ref([])
const confirmRange = (val, str) => {
    collectRecord.value.rangeDate.start = str[0]
    collectRecord.value.rangeDate.end = str[1]
    collectRecord.value.getList()
}
const search = () => {
    radioType.value === 'edit' && getList()
    radioType.value === 'record' && collectRecord.value.getList()
}
const reload = () => {
    pager.current = 1
    radioType.value === 'edit' && getList()
    radioType.value === 'record' && collectRecord.value.getList()
}
const getList = () => {
    if (!props.object.collect_list?.length) return
    let data = {
        page_size: pager.pageSize,
        page_index: pager.current,
        where_in: JSON.stringify([['uid', props.object.collect_list.join(',')]])
    }
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        data.where_and = [
            [search.searchKey, search.searchOption, search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue]
        ]
    }
    proxy.api.post('collect_list', data).then((result) => {
        dataSource.value = result.result.data
        pager.total = result.result.total_records
    })
}
const updateModal = (record) => {
    collect_modal.value.modal.show = true
    collect_modal.value.form.name = record.name
    collect_modal.value.form.description = record.description
    collect_modal.value.form.collect_id = record.uid
    collect_modal.value.form.object_id = route.params.id
    let script = record.script || []
    collect_modal.value.form.collectValues = []
    script.forEach((v) => {
        collect_modal.value.form.collectValues.push({
            source: v.source,
            key: v.key,
            type: v.type,
            label: v.label_loc,
            unit: v.unit,
            value: ''
        })
    })
}
const addCollect = (params) => {
    params.collectValues.forEach((v) => {
        params.value[v.key] = forceToData(v)
        if (!params.value[v.key] && v.type !== 'Bool' && params.value[v.key] !== 0) {
            delete params.value[v.key]
        }
        if (v.type === 'Bool' && params.value[v.key] === '') {
            delete params.value[v.key]
        }
    })
    let keys = Object.keys(params.value)
    if (keys.length === 0) {
        proxy.$message.error(proxy.$t('objects.collect.null_tip'))
        return
    }
    let data = { ...params }
    delete data.collectValues
    proxy.api.post('collect_add', data).then((res) => {
        if (res.code === 200) {
            proxy.$message.success(res.msg)
            collect_modal.value.modal.show = false
        } else {
            proxy.$message.error(res.info)
        }
    })
}
const forceToData = (data) => {
    let value
    switch (data.type) {
        case 'String':
            value = String(data.value)
            break
        case 'Integer':
            value = parseInt(data.value)
            break
        case 'Float':
            value = parseFloat(data.value)
            break
        case 'Bool':
            if (data.value !== '') {
                value = !!data.value
            } else {
                value = ''
            }
            break
        default:
            value = null
    }
    return value
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

watch(
    () => props.object,
    () => {
        getList()
    }
)
defineExpose({ reload, updateModal, mix_top_operation })
</script>
