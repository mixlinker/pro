<template>
    <mix-detail v-model:activeItem="activeItem" :tabList="tabList">
        <template #right>
            <base-info v-if="activeItem.tab_key === 'baseInfo'" :object="object" :getItem="getItem"></base-info>
            <recordList v-if="activeItem.tab_key === 'recordList'" :object="object"></recordList>
        </template>
    </mix-detail>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import baseInfo from './component/base_info.vue'
import recordList from './component/record-list.vue'
const { proxy } = getCurrentInstance()
const route = useRoute()
const activeItem = ref({})
let tabList = ref([])
onMounted(() => {
    getItem()
    tabList.value = [
        {
            name: '基本信息',
            checked: true,
            tab_key: 'baseInfo',
            is_default: 1
        },
        {
            name: '处理记录',
            checked: true,
            tab_key: 'recordList',
            is_default: 1
        }
    ]
})
const object = ref({})
const getItem = () => {
    let data = {
        uid: route.params.id
    }
    proxy.api.post('get_timer', data).then((res) => {
        object.value = res.result
    })
}
defineExpose({ getItem })
</script>

<style lang="scss" scoped></style>
