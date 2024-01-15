<template>
    <a-modal
        :maskClosable="false"
        :visible="modal.show"
        :title="modal.title"
        centered
        width="50%"
        :bodyStyle="{ height: bodyHeight + 'px', padding: '16px 48px' }"
        @ok="handleOk"
        @cancel="handleCnacel"
        :ok-text="$t('confirm')"
        :cancel-text="$t('cancel')"
    >
        <a-form :model="form" ref="formRef">
            <a-form-item :label="$t('objects.collect.offline_name')" prop="name">
                <a-input v-model:value="form.name" type="text" disabled />
            </a-form-item>
            <a-form-item label="采集内容">
                <a-row :gutter="[10, 10]">
                    <a-col :span="9">{{ $t('objects.collect.item_name') }}</a-col>
                    <a-col :span="5">{{ $t('objects.collect.datatype') }}</a-col>
                    <a-col :span="5">{{ $t('objects.collect.value') }}</a-col>
                    <a-col :span="5">{{ $t('objects.collect.unit') }}</a-col>
                </a-row>
                <a-row v-for="(item, index) in form.collectValues" :key="index" :gutter="[10, 10]">
                    <a-input type="hidden" v-model:value="item.key" />
                    <a-col :span="9">
                        <a-input type="text" v-model:value="item.label" disabled />
                    </a-col>
                    <a-col :span="5">
                        <a-select v-model:value="item.type" disabled>
                            <a-select-option v-for="(item, index) in dataType" :key="index" :value="index">
                                {{ $t(item) }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item :key="index">
                            <span v-if="item.type === 'String'">
                                <a-input v-model:value="item.value" style="width: 100%;" type="text" />
                            </span>
                            <span v-else-if="item.type === 'Integer'">
                                <a-input-number v-model:value="item.value" style="width: 100%;" :precision="0" />
                            </span>
                            <span v-else-if="item.type === 'Float'">
                                <a-input-number v-model:value="item.value" style="width: 100%;" />
                            </span>
                            <span v-else-if="item.type === 'Bool'">
                                <a-select v-model:value="item.value">
                                    <a-select-option :value="1">{{ $t('true') }}</a-select-option>
                                    <a-select-option :value="0">{{ $t('false') }}</a-select-option>
                                </a-select>
                            </span>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-input type="text" v-model:value="item.unit" disabled />
                    </a-col>
                </a-row>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, getCurrentInstance, watch, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const modal = reactive({
    show: false,
    title: proxy.$t('objects.collect.add_collect')
})
const emit = defineEmits(['ok'])
const dataType = ref(proxy.config.collect_init.data_type)
const bodyHeight = ref(500)
const form = reactive({
    collectValues: [],
    name: '',
    value: {}
})
const handleCnacel = () => {
    modal.show = false
}
const handleOk = () => {
    emit('ok', form)
}

watch(
    () => modal.show,
    (val) => {
        bodyHeight.value = document.body.clientHeight * 0.7
        if (val) {
        }
    }
)
defineExpose({ modal, form })
</script>

<style lang="scss" scoped></style>
