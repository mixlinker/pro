<template>
    <div class="mix-detail-container">
        <div class="mix-detail-title">
            <div>{{ $t('base_info') }}</div>
        </div>
        <div class="mix-detail-block">
            <a-descriptions bordered>
                <a-descriptions-item :label="$t('customer.uid')">
                    {{ object.uid }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.name')">
                    {{ object.name }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.contact')">
                    {{ object.contact }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.email')">
                    {{ object.email }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.mobile')">
                    {{ object.mobile }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.phone')">
                    {{ object.phone }}
                </a-descriptions-item>
                <!-- <a-descriptions-item :label="$t('customer.secret')">
                    {{ object.secret }}
                </a-descriptions-item> -->
                <a-descriptions-item :label="$t('customer.region')">
                    {{ object.region }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.province')">
                    {{ object.province }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.city')">
                    {{ object.city }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('customer.address')">
                    {{ object.address }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('customer.description')">
                    {{ object.description }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <modal ref="edit_modal"></modal>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, onActivated } from 'vue'
import defaultImage from '@/assets/images/no-image-icon.gif'
import { useRoute } from 'vue-router';
import modal from './modal.vue'
const { proxy } = getCurrentInstance()
const route = useRoute()
const object = ref({})
const edit_modal = ref()
const getItem = () => {
    let data = {
        uid: route.params.id
    }

    proxy.api.post('customer_item', data).then(res => {
        object.value = res.result
    })
}

onMounted(() => {
    getItem()
})

onActivated(() => {
    getItem()
})
</script>

<style lang="scss" scoped>
.mix-detail-content {
    padding: 12px 0 0 0;
}
</style>