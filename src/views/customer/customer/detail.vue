<template>
    <mix-detail v-model:activeItem="activeItem" :tab-list="tabList">
        <template #right>
            <base-info v-if="activeItem.tab_key === 'baseinfo'"></base-info>
            <object-list v-if="activeItem.tab_key === 'object'"></object-list>
        </template>
    </mix-detail>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import baseInfo from './component/base_info.vue'
import objectList from './component/object_list.vue'
const tabList = ref([])
const activeItem = ref({})
onMounted(() => {
    tabList.value = [
        {
            name: '基本信息',
            checked: true,
            tab_key: 'baseinfo',
            is_default: 1
        }
    ]
})
</script>

<style lang="less" scoped></style>
