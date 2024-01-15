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
        if (res.result.cycle_type !== 'Times') {
            object.value.period = calcCycle(res.result.period)
            object.value.notice = calcCycle(res.result.notice)
        }
    })
}
const calcCycle = (cycle) => {
    let cycle_list = cycle.split('')
    let hour = 0
    let min = 0
    let sec = 0
    let temp = ''
    cycle_list.forEach(function (item, index) {
        switch (item) {
            case 'h':
                hour = parseInt(temp)
                temp = ''
                break
            case 'm':
                min = parseInt(temp)
                temp = ''
                break
            case 's':
                sec = parseInt(temp)
                temp = ''
                break
            default:
                temp = temp + item
        }
    })
    if (hour > 0) {
        if (hour % (365 * 24) == 0) {
            return hour / (365 * 24) + ' ' + proxy.$t('timer.rule.year')
        } else if (hour % (30 * 24) == 0) {
            return hour / (30 * 24) + ' ' + proxy.$t('timer.rule.month')
        } else if (hour % 24 == 0) {
            return hour / 24 + ' ' + proxy.$t('timer.rule.day')
        } else {
            return hour + ' ' + proxy.$t('timer.rule.hour')
        }
    } else if (min > 0) {
        return min + ' ' + proxy.$t('timer.rule.minute')
    } else if (sec > 0) {
        return sec + ' ' + proxy.$t('timer.rule.second')
    } else {
        return '0' + ' ' + proxy.$t('timer.rule.hour')
    }
}
defineExpose({ getItem })
</script>

<style lang="scss" scoped></style>
