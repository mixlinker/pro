<template>
    <div class="mix-detail-container">
        <div class="mix-detail-title">
            <div>{{ $t('base_info') }}</div>
        </div>
        <div class="mix-detail-block">
            <a-descriptions bordered :column="3" v-if="object">
                <a-descriptions-item :label="$t('objects.object.image')" :span="3">
                    <img class="head-img" :src="previewImage()" alt="" />
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.uid')">
                    {{ object.uid || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.name')">
                    {{ object.name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.alias')">
                    {{ object.alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.model')">
                    {{ object.model || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.serial_no')">
                    {{ object.serial_no || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('create_mode')">
                    {{ object.create_by_tpl === 1 ? proxy.$t('template') : proxy.$t('no_template') }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.mapping.uid')">
                    {{ object.mapping_id || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.mapping.alias')">
                    {{ object.mapping_alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.mapping.name')">
                    {{ object.mapping_name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.name')">
                    {{ object.customer_name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('customer.project.name')">
                    {{ object.customer_project_name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.control')">
                    {{ object.control || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.control.uid')">
                    {{ object.control_id || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.control.alias')">
                    {{ object.control_alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.control.name')">
                    {{ object.control_name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.pro') + $t('number')">
                    {{ dashboard.pro.uid || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.pro') + $t('alias')">
                    {{ dashboard.pro.alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.pro') + $t('name')">
                    {{ dashboard.pro.name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.app') + $t('number')">
                    {{ dashboard.app.uid || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.app') + $t('alias')">
                    {{ dashboard.app.alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.app') + $t('name')">
                    {{ dashboard.app.name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.show') + $t('number')">
                    {{ dashboard.show.uid || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.show') + $t('alias')">
                    {{ dashboard.show.alias || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.dashboard.show') + $t('name')">
                    {{ dashboard.show.name || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.address')">
                    {{ object.address || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.custom_gis')">
                    {{ object.custom_gis || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.gis')">
                    {{ object.gis || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.province')">
                    {{ object.province || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.city')" :span="2">
                    {{ object.city || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('created')">
                    {{ object.created || '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('last_modified')" :span="2">
                    {{ object.last_modified || '' }}
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('objects.object.tag')">
                    <template v-if="object.tag">
                        <template v-for="tag in object.tag" :key="tag">
                            <a-tooltip v-if="tag.length > 20" :title="tag">
                                <a-tag :key="tag" :closable="false">
                                    {{ `${tag.slice(0, 20)}...` }}
                                </a-tag>
                            </a-tooltip>
                            <a-tag v-else :closable="false">
                                {{ tag }}
                            </a-tag>
                        </template>
                    </template>
                </a-descriptions-item>
                <a-descriptions-item :span="3" :label="$t('objects.object.description')">
                    {{ object.description || '' }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import defaultImage from '@/assets/images/no-image-icon.gif'
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const { proxy } = getCurrentInstance()
const previewImage = () => {
    if (props.object.image) {
        return proxy.config.file_url + '/' + props.object.image
    }
    return defaultImage
}

const dashboard = reactive({
    pro: {},
    app: {},
    show: {}
})
</script>

<style lang="scss" scoped>
.mix-detail-container {
    display: block;
    overflow-y: auto;
}
.mix-detail-content {
    padding: 12px 0 0 0;
}
</style>
