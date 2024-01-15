<template>
    <a-modal
        :maskClosable="false"
        :title="modal.title"
        :visible="modal.show"
        @ok="handleOk"
        width="50%"
        :bodyStyle="{ height: bodyHeight + 'px', padding: '16px 48px' }"
        :centered="true"
        :ok-text="$t('confirm')"
        :cancel-text="$t('cancel')"
        @cancel="handleCancel"
    >
        <a-form ref="formRef" :model="form" :label-col="{ style: { width: '100px' } }">
            <a-form-item :label="$t('retainer.result.service_at')" prop="service_at">
                <a-date-picker
                    v-model:value="handleTime"
                    :show-time="true"
                    :placeholder="$t('retainer.result.select_time')"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    @ok="changeTime"
                />
            </a-form-item>
            <a-form-item :label="$t('description')">
                <a-textarea v-model:value="form.description" :rows="2"></a-textarea>
            </a-form-item>
            <a-form-item :label="$t('retainer.result.picture')">
                <a-upload list-type="picture" :fileList="fileList" :customRequest="upload" @remove="removeFile">
                    <a-button> <upload-outlined />{{ $t('retainer.result.upload_image') }} </a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch, nextTick, unref } from 'vue'
import dayjs from 'dayjs'
const { proxy } = getCurrentInstance()
const emit = defineEmits(['ok'])
const handleTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const modal = reactive({
    title: proxy.$t('retainer.result.add_title'),
    show: false
})
const form = ref({})
const bodyHeight = ref(500)
const fileList = ref([])
const changeTime = (val) => {
    handleTime.value = val
}
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
            fileList.value.push(res.result)
        } else {
            proxy.$message.error(res.msg)
        }
    })
}
const removeFile = () => {
    let num = fileList.value.length
    for (let i = 0; i < num; i++) {
        if (info.name === f[i].name) {
            fileList.value.splice(i, 1)
            break
        }
    }
}
const handleCancel = () => {
    modal.show = false
}
const handleOk = () => {
    let data = {
        desc: form.value.description,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        files: unref(fileList)
    }

    emit('ok', data)
}
watch(
    () => modal.show,
    (val) => {
        if (val) {
            form.value = {}
            fileList.value = []
            handleTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
    }
)

onMounted(() => {
    bodyHeight.value = document.body.clientHeight * 0.7
})
defineExpose({ modal })
</script>

<style lang="scss" scoped></style>
