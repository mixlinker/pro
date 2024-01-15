<template>
    <mix-edit-page v-bind="modal" v-model="modal.show" @ok="handleOk">
        <template #content>
            <a-card :title="$t('base_info')">
                <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ style: { width: '130px' } }" autocomplete="off">
                    <a-form-item :label="$t('customer.uid')" v-if="modal.id">
                        <a-input v-model:value="form.uid" :disabled="!!modal.id" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.name')" name="name">
                        <a-input v-model:value="form.name" type="text" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.alias')" name="alias">
                        <a-input v-model:value="form.alias" type="text" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.contact')" name="contact">
                        <a-input v-model:value="form.contact" type="text" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.email')" name="email">
                        <a-input v-model:value="form.email" type="email" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.mobile')" name="mobile">
                        <a-input v-model:value="form.mobile" type="number" :placeholder="$t('customer.mobile_tip')" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.phone')" name="phone">
                        <a-input v-model:value="form.phone" :placeholder="$t('customer.phone_tip')" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.region')" name="region">
                        <a-input v-model:value="form.region" :placeholder="$t('customer.region_tip')" />
                    </a-form-item>
                    <a-row :gutter="[10]">
                        <a-col :span="12">
                            <a-form-item has-feedback :label="$t('customer.province')">
                                <a-select show-search option-filter-prop="children" v-model:value="form.province"
                                    :placeholder="$t('please_select')" @change="getCurrentProvCities">
                                    <a-select-option v-for="item in provinces" :key="item.value" :value="item.value">
                                        {{ item.label }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item has-feedback :label="$t('customer.city')">
                                <a-select show-search option-filter-prop="children" v-model:value="form.city"
                                    :placeholder="$t('please_select')">
                                    <a-select-option v-for="item in cities" :key="item.label" :value="item.label">{{ item.label }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item has-feedback :label="$t('customer.address')" name="address">
                        <a-input v-model:value="form.address" type="text" />
                    </a-form-item>
                    <!-- <a-form-item has-feedback :label="$t('customer.secret')" name="secret"
                        :help="$t('customer.secret_tip')">
                        <a-input v-model:value="form.secret" type="text" />
                    </a-form-item>
                    <a-form-item has-feedback :label="$t('customer.reference')" name="reference">
                        <a-input v-model:value="form.reference" type="text" />
                    </a-form-item> -->
                    <a-form-item :label="$t('customer.description')" name="description">
                        <a-textarea v-model:value="form.description" :rows="4" />
                    </a-form-item>
                </a-form>
            </a-card>
        </template>
    </mix-edit-page>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance } from 'vue';
import map from '@/utils/map';
const { proxy } = getCurrentInstance()

const modal = reactive({
    show: false,
    title: "",
    id: ""
})
const formRef = ref()

const form = ref({})
/* 表单验证 */
const rules = reactive({
    name: [{ required: true, message: proxy.$t('customer.validate_msg.name'), trigger: "blur" }]
})
let provinces = map.map
let cities = []

/* 初始化相关 */
const init = () => {
    form.value = {
        id: 0,
        uid: '',
        name: "",
        email: "",
        description: "",
        contact: "", // 联系人
        mobile: "", // 手机
        phone: "", // 电话
        region: "", // 区域
        exp_id: 0, // EXP_id
        province: "",
        city: "",
        address: "",
        secret: "",
        alias: ""
    }
}
const getItem = () => {
    let data = {
        id: modal.id
    }
    proxy.api.post('customer_item', data).then(res => {
        form.value = res.result
    })
}


const handleOk = async() => {
    await formRef.value.validateFields().then(() => {
        sendPost()
    }).catch(e => {
        console.log(e)
    })
}

const sendPost = () => {
    let url = modal.id ? "customer_update" : "customer_create"
    proxy.api.post(url, form.value).then(res => {
        proxy.$message.success(proxy.$t('success'))
        modal.show = false
        proxy.$parent.getList()
    })
}

const getCurrentProvCities = (value) => {
    for (let v of provinces) {
        if (value === v.value) {
            cities = v.children
            form.value.city = v.children[0].value
            break
        }
    }
}

watch(
    () => modal.show,
    (val) => {
        if (val) {
            init()
            modal.id && getItem()
        }
    }
)

defineExpose({ modal })
</script>

<style lang="scss" scoped>
</style>