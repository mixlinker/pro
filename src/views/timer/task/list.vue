<template>
    <div class="mix-content">
        <div class="flex relative">
            <mix-top-operation ref="mix_top_operation" @search="search" @reload="reload" :searchField="base_search_field" />
        </div>
        <mix-agrid
            v-model:columnDefs="baseColumns"
            v-model:rowData="dataSource"
            ref="ag_grid"
            :columWithStorageName="`timer_task_list_${activeKey}`"
            :pager="pager"
            :field_filter="true"
            @pageChange="pageChange"
            @cellContextMenu="onCellContextMenu"
        />
        <mix-right-menu ref="rightMenu" :localButtons="localButtons" block="timer" />
        <modal ref="modalRef"></modal>
        <timerHandleModal ref="timerHandleModalRef"></timerHandleModal>
    </div>
</template>

<script setup>
import { getCurrentInstance, computed, reactive, ref, onMounted } from 'vue'
import { usePermissionStore } from '@/pinia/modules/menu'
import { useRouter } from 'vue-router'
import { useInitParams } from '@/hook/analy_script.js'
import modal from './modal.vue'
import timerHandleModal from './timerHandleModal.vue'

const { proxy } = getCurrentInstance()
const mix_top_operation = ref(null)
const ag_grid = ref(null)
const rightMenu = ref(null)
const pager = reactive({ ...proxy.config.pagination })
const activeKey = computed(() => usePermissionStore().activeKey)
const router = useRouter()
const cycleTypeList = {
    NaturalTime: proxy.$t('timer.rule.NaturalTime'),
    RunTime: proxy.$t('timer.rule.RunTime'),
    Times: proxy.$t('timer.rule.Times'),
    StatisticsTimes: proxy.$t('timer.rule.StatisticsTimes')
}
const base_search_field = [
    {
        label: proxy.$t('timer.task.uid'),
        value: 'uid',
        type: 'input'
    },
    {
        label: proxy.$t('timer.task.name'),
        value: 'name',
        type: 'input'
    },
    {
        label: proxy.$t('timer.task.object_name'),
        value: 'object_name',
        type: 'input'
    }
]
const baseColumns = [
    {
        field: 'uid',
        headerName: proxy.$t('timer.task.uid'),
        width: 180
    },
    {
        field: 'name',
        headerName: proxy.$t('timer.task.name'),
        width: 180
    },
    {
        field: 'cycle_type',
        headerName: proxy.$t('timer.task.cycle_type'),
        width: 140,
        valueFormatter: (params) => {
            return cycleTypeList[params.value]
        }
    },
    {
        field: 'rule_name',
        headerName: proxy.$t('timer.task.rule_name'),
        width: 180
    },
    {
        field: 'object_name',
        headerName: proxy.$t('timer.task.object_name'),
        width: 180,
        cellRenderer: 'ag-text-tag'
    },
    {
        field: 'countdown',
        headerName: proxy.$t('timer.task.countdown'),
        width: 180,
        cellRenderer: 'ag-time-out'
    },
    {
        field: 'times',
        headerName: proxy.$t('timer.task.times'),
        width: 180
    },
    {
        field: 'is_active',
        headerName: proxy.$t('timer.task.is_active'),
        width: 120,
        cellRenderer: 'ag-text-status',
        cellRendererParams: {
            statusMapping: {
                0: { label: proxy.$t('stop'), color: 'red' },
                1: { label: proxy.$t('open'), color: 'green' }
            }
        }
    },
    {
        field: 'first_handle_time',
        headerName: proxy.$t('timer.task.first_handle_time'),
        width: 180
    },
    {
        field: 'created',
        headerName: proxy.$t('created'),
        width: 180
    }
]
const dataSource = ref([])
const localButtons = [
    {
        type: 'item',
        role_checked: true
    }
]
onMounted(() => {
    getList()
})
const getList = () => {
    let data = useInitParams(pager, mix_top_operation)
    proxy.api.post('get_timer_list', data).then((res) => {
        let tmp_data = res.result.data
        pager.total = res.result.total_records
        tmp_data.forEach((item) => {
            item.progress = calcProgress(item)
            if (['Times', 'StatisticsTimes'].includes(item.cycle_type)) {
                item.progress = calcTimesProgress(item)
                item.notice = item.notice + proxy.$t('degree')
                item.period = item.period + proxy.$t('degree')
                item.times = item.notice + '/' + item.period
            } else {
                item.times = '-/-'
            }
        })
        dataSource.value = tmp_data
    })
}
const pageChange = (current, size) => {
    pager.current = current
    pager.pageSize = size
    getList()
}
const search = () => {
    getList()
}
const reload = () => {
    pager.current = 1
    getList()
}
const onCellContextMenu = (params) => {
    rightMenu.value.showRightMenu(params.event, params.data)
}
const detail = (record) => {
    router.push({
        path: '/timer/task/detail/' + record.uid,
        query: {
            active_name: record.name + `(${record.uid})`
        }
    })
}
const modalRef = ref(null)
const createModal = () => {
    modalRef.value.modal.title = proxy.$t('timer.task.add_title')
    modalRef.value.modal.id = ''
    modalRef.value.modal.show = true
}
const handleFirstTimer = (record) => {
    modalRef.value.modal.title = proxy.$t('timer.task.edit_title')
    modalRef.value.modal.id = record.uid
    modalRef.value.modal.show = true
}
const timerHandleModalRef = ref(null)
const handleTimerTask = (record) => {
    timerHandleModalRef.value.modal.record = record
    timerHandleModalRef.value.modal.show = true
}
const handleDelete = (record) => {
    proxy.api.post('delete_timer', { uid: record.uid }).then((res) => {
        if (pager.total % pager.pageSize == 1 && pager.current > 1) {
            pager.current--
        }
        proxy.$message.success(proxy.$t('delete_success'))
        getList()
    })
}
const handleStart = (record) => {
    proxy.api.post('start_timer', { uid: record.uid }).then((res) => {
        proxy.$message.success(proxy.$t('success'))
        getList()
    })
}
const handleStop = (record) => {
    proxy.api.post('stop_timer', { uid: record.uid }).then((res) => {
        proxy.$message.success(proxy.$t('success'))
        getList()
    })
}
const handleAction = (record) => {
    let action = record.is_active == 0 ? 'start_timer' : 'stop_timer'
    proxy.api.post(action, { uid: record.uid }).then((result) => {
        proxy.$message.success(proxy.$t('success'))
        getList()
    })
}
const calcProgress = (record) => {
    let countdown = 0
    let period = 0
    let status = true
    let percent = 0
    if (record.countdown) {
        countdown = calcTime(record.countdown)
    }
    if (record.period) {
        period = calcTime(record.period)
    }
    if (countdown <= 0) {
        status = false
        countdown = 0 - countdown
    }
    if (period <= 0) {
        status = false
    } else {
        percent = (countdown / period) * 100
        countdown = countdown / 3600
        period = period / 3600
    }
    percent = (percent.toFixed(2) * 100) / 100
    countdown = countdown.toFixed(2)
    period = period.toFixed(2)
    return { percent: percent, countdown: countdown, period: period, status: status, unit: proxy.$t('timer.task.hour') }
}
const calcTime = (time) => {
    let time_list = time.split('')
    let sign = true
    let hour = 0
    let min = 0
    let sec = 0
    let temp = ''
    time_list.forEach(function (item, index) {
        switch (item) {
            case '-':
                sign = false
                break
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
    return sign ? hour * 3600 + min * 60 + sec : 0 - (hour * 3600 + min * 60 + sec)
}
const calcTimesProgress = (record) => {
    let countdown = record.countdown
    let percent = (Number(record.countdown) / Number(record.period)) * 100
    let period = record.period
    let status = Number(record.countdown) > 0

    return { percent: percent, countdown: countdown, period: period, status: status, unit: proxy.$t('degree') }
}
defineExpose({
    getList,
    reload,
    createModal,
    handleFirstTimer,
    detail,
    handleDelete,
    handleStart,
    handleStop,
    handleAction,
    handleTimerTask
})
</script>

<style lang="scss" scoped></style>
