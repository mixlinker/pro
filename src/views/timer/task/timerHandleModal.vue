<template>
    <mix-edit-page v-bind="modal" v-model="modal.show" @ok="handleOk">
        <template #content>
            <a-card :title="$t('base_info')">
                <a-form ref="formRef" :model="form" :label-col="{ style: { width: '130px' } }" autocomplete="off">
                    <a-form-item :label="$t('timer.task.handle_time')" name="handle_time" :rules="{ required: true }">
                        <a-date-picker
                            v-model:value="form.handle_time"
                            class="w-full"
                            show-time
                            :placeholder="$t('please_choose_date')"
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </a-form-item>
                    <a-form-item :label="$t('timer.task.fee')" name="fee" :rules="{ required: true }">
                        <a-input-number class="w-full" v-model:value="form.fee" :min="0" :precision="2"></a-input-number>
                    </a-form-item>
                    <a-form-item :label="$t('timer.task.picture')">
                        <a-upload :file-list="fileList" :customRequest="upload" @remove="removeImg" list-type="picture-card">
                            <div>
                                <plus-outlined />
                                {{ $t('upload') }}
                            </div>
                        </a-upload>
                    </a-form-item>
                    <a-form-item :label="$t('description')">
                        <a-textarea v-model:value="form.description" :rows="4"></a-textarea>
                    </a-form-item>
                </a-form>
            </a-card>
        </template>
    </mix-edit-page>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, unref } from 'vue'
const { proxy } = getCurrentInstance()
import { useDateFormat } from '@vueuse/core'

import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(weekday)
dayjs.extend(localeData)

/* modal变量 */
const modal = reactive({
    title: proxy.$t('timer.task.add_handle_record'),
    show: false,
    loading: false,
    id: '',
    record: {}
})
/* form表单 */
const formRef = ref(null)
let form = {}
const initFrom = () => {
    let form = {
        timer_id: '', //维保编号
        object_id: '', //维保任务绑定的对象id
        handle_time: '', //处理时间
        fee: '', //维保费用
        images: '', //现场图片
        description: ''
    }
    return form
}
/* 刚进页面 */
watch(
    () => modal.show,
    async (val) => {
        if (val) {
            fileList.value = []
            if (modal.id) {
                form = reactive({
                    timer_id: modal.record.timer_id,
                    object_id: modal.record.object_id,
                    handle_time:modal.record.handle_time? dayjs(modal.record.handle_time):"",
                    fee: modal.record.fee,
                    images: modal.record.images,
                    description: modal.record.description
                })
                if (form.images) {
                    form.images.split(',').forEach((item) => {
                        fileList.value.push({
                            uid: item,
                            name: item,
                            status: 'done',
                            url: proxy.config.file_url + item
                        })
                    })
                }
            } else {
                form = reactive({
                    ...initFrom()
                })
            }
        }
    }
)
/* 确定提交 */
const handleOk = async () => {
    await formRef.value.validateFields()
    let params = { ...form }
    params.timer_id = modal.record.uid
    params.object_id = modal.record.object_id
    params.images = fileList.value.map((item) => item.uid).join(',')
    params.handle_time = params.handle_time ? unref(useDateFormat(params.handle_time, 'YYYY-MM-DD HH:mm:ss')) : ''
    let action = modal.id ? 'update_timer_record' : 'handle_timer'
    await proxy.api.post(action, params)
    proxy.$message.success(proxy.$t('success'))
    proxy.$parent.getList()
    modal.show = false
}
/* 自定义上传：不需要在组件内传上传地址 */
let fileList = ref([])
const upload = (item) => {
    let fd = new FormData()
    fd.append('file', item.file) //传文件
    let fileSize = item.file.size
    if (fileSize > 15728640) {
        proxy.$message.error(proxy.$t('img_size_limit'))
    }
    proxy.api.upload('upload', fd).then((res) => {
        if (res.code === 200) {
            proxy.$message.success(proxy.$t('upload_success'))
            fileList.value.push({
                uid: res.result.url,
                name: res.result.file_name,
                status: 'done',
                url: proxy.config.file_url + res.result.url
            })
        } else {
            proxy.$message.error(res.msg)
        }
    })
}
const removeImg = (item) => {
    console.log(item)
}

/* 暴露变量 */
defineExpose({ modal })
</script>

<style lang="scss" scoped></style>
