<template>
    <mix-dashboard v-if="proUid" :params="{ uid: proUid, object_id: object.uid }"></mix-dashboard>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
    object: {
        type: Object,
        default: {}
    }
})
const proUid = ref('')
onMounted(() => {
    proxy.api.post('get_dashboard_by_object', { object_id: props.object.uid }).then((res) => {
        let index = res.result.findIndex((item) => item.type === 'pro')
        if (index !== -1) {
            proUid.value = res.result[index].uid
        }
    })
})
</script>

<style lang="less" scoped></style>
