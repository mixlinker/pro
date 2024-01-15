<template>
    <a-modal
        :maskClosable="false"
        :title="modal.title"
        width="60%"
        :bodyStyle="{ height: bodyHeight + 'px', padding: '16px 48px' }"
        :visible="modal.show"
        @ok="handleOk"
        @cancel="handleCancel"
        :centered="true"
    >
        <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ style: { width: '100px' } }">
            <a-form-item class="flex-wrap" :label="$t('retainer.export.file_name')">
                <a-input v-model:value="form.file_name" :placeholder="$t('retainer.export.filename_tips')"></a-input>
            </a-form-item>
            <a-form-item :label="$t('time_range')" name="time_range">
                <a-range-picker class=" w-full" :show-time="true" format="YYYY-MM-DD HH:mm:ss" v-model:value="form.time_range"
                    :placeholder="[$t('start_time'), $t('end_time')]" />
            </a-form-item>
            <a-form-item class="flex-wrap" :label="$t('retainer.export.project')" name="project_list">
                <a-select
                    show-search
                    option-filter-name="children"
                    :maxTagCount="5"
                    :maxTagTextLength="10"
                    v-model:value="form.project_list"
                    :placeholder="$t('retainer.export.project_select_tips')"
                    @change="changeProject"
                >
                    <a-select-option v-for="item in projectList" :key="item.uid" :value="item.uid">
                        {{ item.name + '(' + item.uid + ')' }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item class="flex-wrap" :label="$t('retainer.export.code')">
                <a-select
                    show-search
                    v-model:value="form.code_list"
                    mode="multiple"
                    :placeholder="$t('retainer.result.select_project_empty_tip')"
                >
                    <a-select-option v-for="(item, index) in codeList" :key="item.uid" :value="item.uid">
                        {{ item.uid + '-' + item.en + '-' + item.ch }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item class="flex-wrap" :label="$t('object')" has-feedback name="object_list">
                <a-button type="dashed" @click="openObjectModal('Object')" style="margin: 4px 0 14px">
                    <template #icon>
                        <plus-outlined></plus-outlined>
                    </template>
                    {{ $t('select_object') }}
                </a-button>
                <a-row>
                    <a-col>
                        <a-table :columns="columns" :dataSource="checkedObject" :scroll="{ y: 200 }" bordered :pagination="false">
                            <template #bodyCell="{ index, column }">
                                <template v-if="column.dataIndex == 'delete'">
                                    <a @click="deleteObject(index)" style="color: red">{{ $t('delete') }}</a>
                                </template>
                            </template>
                        </a-table>
                    </a-col>
                </a-row>
            </a-form-item>
        </a-form>
    </a-modal>
    <mix-lazy-select ref="object_modal" @ok="updateChecked"></mix-lazy-select>
</template>
<script setup>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
const { proxy } = getCurrentInstance()
const props = defineProps({
    category: {
        type: String,
        default: 'EVENT'
    }
})
const modal = reactive({
    title: proxy.$t('export'),
    show: false
})
const form = ref({
    time_range: []
})
const formRef = ref()
const rules = reactive({
    object_list: [{ required: true, message: proxy.$t('retainer.export.object_select_tips'), trigger: 'change' }],
    project_list: [{ required: true, message: proxy.$t('retainer.export.project_select_tips'), trigger: 'blur' }],
    time_range: [{ required: true, message: proxy.$t('retainer.export.project_select_time'), trigger: 'change' }]
})
const format = ref('YYYY-MM-DD HH:mm:ss')
const columns = ref([
    {
        title: proxy.$t('objects.object.uid'),
        dataIndex: 'uid',
        key: 'uid'
    },
    {
        title: proxy.$t('objects.object.name'),
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: proxy.$t('operation'),
        dataIndex: 'delete',
        key: 'delete',
        width: 80,
        scopedSlots: { customRender: 'delete' }
    }
])
const checkedObject = ref([])
const codeList = ref([])
const projectList = ref([])
const getProjectList = () => {
    proxy.api.post('retainer_list', { select: ['id', 'uid', 'name'] }).then((res) => {
        projectList.value = res.result.data
    })
}
const changeProject = async (val) => {
    codeList.value = []
    form.value.code_list = []
    let { script } = await getProjectItem(val)
    script.forEach((ele) => {
        codeList.value.push({
            uid: ele[0],
            en: ele[1],
            ch: ele[2]
        })
    })
}
const getProjectItem = async (val) => {
    let data = {
        uid: val
    }
    return proxy.api.post('retainer_item', data).then((res) => {
        return res.result
    })
}
const deleteObject = (index) => {
    checkedObject.value.splice(index, 1)
    form.value.object_list.splice(index, 1)
}
const handleCancel = () => {
    modal.show = false
}
const handleOk = () => {
    formRef.value.validateFields().then(vaild => {
        let data = {
            file_name: form.file_name ? form.value.file_name : "",
            open_at: dayjs(form.value.time_range[0]).format(format.value),
            close_at: dayjs(form.value.time_range[1]).format(format.value),
            categorys: [props.category],
            template_name: form.value.project_list,
            object_ids: checkedObject.value.map(item => item.uid),
        }
        proxy.api.post('export_retainer_data', data).then(res => {
            if (res.code === 200) {
                handleCancel()
                proxy.$message.success(proxy.$t('export_tip'))
            } else {
                proxy.$message.error(res.msg)
            }
        })
    }).catch(e => {
        console.log(e)
    })
}
const object_modal = ref()
const bodyHeight = ref(300)
const openObjectModal = async () => {
    if (!form.value.project_list) {
        proxy.$message.error(proxy.$t('retainer.result.select_project_empty_tip'))
        return
    }
    const objectList = await getRetainerObjectList()
    if (objectList.length) {
        object_modal.value.modal.condition = { where_in: ['uid', objectList.join(',')] }
        object_modal.value.modal.show = true
        object_modal.value.modal.block = 'object'
    } else {
        proxy.$message.error(proxy.$t('retainer.result.project_object_empty_tip'))
    }
}
const getRetainerObjectList = () => {
    return proxy.api.post('retainer_item', { uid: form.value.project_list }).then((res) => {
        return res.result.object_list
    })
}
const updateChecked = (data) => {
    checkedObject.value = data
    form.value.object_list = []
    data.forEach((ele) => {
        form.value.object_list.push(ele.uid)
    })
}
onMounted(() => {
    bodyHeight.value = document.body.clientHeight * 0.7
    getProjectList()
})

defineExpose({ modal })
</script>

<style scoped lang="css">
.ant-calendar-picker {
    width: 100% !important;
}
</style>
