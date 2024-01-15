<template>
    <mix-detail :tab-list="tabList" v-model:active-item="activeItem">
        <template #right>
            <base-info v-if="activeItem.tab_key === 'baseinfo'" :object="object"></base-info>
            <monitor v-if="activeItem.tab_key === 'view'" :object="object"></monitor>
            <KeepAlive>
                <historyList v-if="activeItem.tab_key === 'history'" :object="object"></historyList>
            </KeepAlive>
            <KeepAlive>
                <fvList v-if="activeItem.tab_key === 'fv'" :object="object"></fvList>
            </KeepAlive>
            <terminalList v-if="activeItem.tab_key === 'terminal'" :object="object"></terminalList>
            <childrenList v-if="activeItem.tab_key === 'child'" :object="object"></childrenList>
            <collectList v-if="activeItem.tab_key === 'collect'" :object="object"></collectList>
            <retainerList v-if="activeItem.tab_key === 'retainer'" :object="object"></retainerList>
        </template>
    </mix-detail>
</template>

<script setup>
import { ref, getCurrentInstance, defineAsyncComponent, onMounted, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import baseInfo from './component/base-info.vue'
const monitor = defineAsyncComponent(() => import('./component/monitor.vue'))
const historyList = defineAsyncComponent(() => import('./component/history/list.vue'))
const collectList = defineAsyncComponent(() => import('./component/collect/list.vue'))
const fvList = defineAsyncComponent(() => import('./component/fv.vue'))
const retainerList = defineAsyncComponent(() => import('./component/retainer/list.vue'))
const terminalList = defineAsyncComponent(() => import('./component/terminal.vue'))
const childrenList = defineAsyncComponent(() => import('./component/children.vue'))
const { proxy } = getCurrentInstance()
const tabList = ref([])
const route = useRoute()
const activeItem = ref({})
const object = ref()

const getItem = () => {
    let data = {
        uid: route.params.id
    }
    proxy.api.post('object_item', data).then((res) => {
        object.value = res.result
    })
}

onMounted(() => {
    tabList.value = [
        {
            name: '基本信息',
            checked: true,
            tab_key: 'baseinfo',
            is_default: 1
        },
        {
            name: '设备监控',
            checked: true,
            tab_key: 'view',
            is_default: 1
        },
        {
            name: '历史数据',
            checked: true,
            tab_key: 'history',
            is_default: 1
        },
        {
            name: '参数列表',
            checked: true,
            tab_key: 'fv',
            is_default: 1
        },
        {
            name: '手动录入',
            checked: true,
            tab_key: 'collect',
            is_default: 1
        },
        {
            name: '适配器列表',
            checked: true,
            tab_key: 'terminal',
            is_default: 1
        },
        {
            name: '子设备列表',
            checked: true,
            tab_key: 'child',
            is_default: 1
        },
        {
            name: '历程列表',
            checked: true,
            tab_key: 'retainer',
            is_default: 1
        }
    ]
    getItem()
})
onActivated(() => {
    getItem()
})
</script>

<style lang="less" scoped></style>
