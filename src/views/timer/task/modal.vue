<template>
    <mix-edit-page v-bind="modal" v-model="modal.show" @ok="handleOk">
        <template #content>
            <a-card :title="$t('base_info')">
                <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ style: { width: '130px' } }" autocomplete="off">
                    <!-- 名称 -->
                    <a-form-item :label="$t('timer.task.name')" name="name">
                        <a-input v-model:value="form.name" type="text" disabled />
                    </a-form-item>
                    <a-row :gutter="[10]">
                        <!-- 维保类型 -->
                        <a-col :span="12">
                            <a-form-item :label="$t('timer.task.cycle_type')" name="cycle_type">
                                <a-select
                                    v-model:value="form.cycle_type"
                                    :placeholder="$t('please_select')"
                                    disabled
                                    @change="onCycleTypeChange"
                                >
                                    <a-select-option v-for="(item, index) in cycleTypeList" :key="index" :value="index">
                                        {{ item }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <!-- 关联设备 -->
                        <a-col :span="12">
                            <a-form-item :label="$t('timer.task.object_id')" name="object_id">
                                <a-select
                                    show-search
                                    option-filter-prop="children"
                                    v-model:value="form.object_id"
                                    disabled
                                    :placeholder="$t('please_select')"
                                >
                                    <a-select-option v-for="item in objectList" :key="item.uid" :value="item.uid">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <!-- 统计列表 -->
                    <a-form-item
                        v-if="form.cycle_type === 'RunTime' || form.cycle_type === 'StatisticsTimes'"
                        :label="$t('timer.task.statistics_id')"
                        name="statistics_id"
                    >
                        <a-select
                            show-search
                            option-filter-prop="children"
                            v-model:value="form.statistics_id"
                            disabled
                            :placeholder="$t('please_select')"
                        >
                            <a-select-option v-for="item in statisticsList" :key="item.uid" :value="item.uid">
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <!-- 维保周期 -->
                    <a-form-item
                        :label="$t('timer.task.period')"
                        v-if="form.cycle_type !== 'Times' && form.cycle_type !== 'StatisticsTimes'"
                        name="period"
                    >
                        <div class="flex items-center">
                            <a-form-item-rest>
                                <a-input-number v-model:value="period.time" disabled :min="1" style="width: 20%; margin-right: 10px" />
                            </a-form-item-rest>
                            <a-select v-model:value="period.unit" disabled style="width: 30%">
                                <a-select-option value="Y">{{ proxy.$t('timer.task.year') }}</a-select-option>
                                <a-select-option value="M">{{ proxy.$t('timer.task.month') }}</a-select-option>
                                <a-select-option value="D">{{ proxy.$t('timer.task.day') }}</a-select-option>
                                <a-select-option value="h">{{ proxy.$t('timer.task.hour') }}</a-select-option>
                                <a-select-option value="m">{{ proxy.$t('timer.task.minute') }}</a-select-option>
                                <a-select-option value="s">{{ proxy.$t('timer.task.second') }}</a-select-option>
                            </a-select>
                        </div>
                    </a-form-item>
                    <!-- 提醒时间 -->
                    <a-form-item
                        :label="$t('timer.task.notice')"
                        v-if="form.cycle_type !== 'Times' && form.cycle_type !== 'StatisticsTimes'"
                        name="notice"
                    >
                        <div class="flex items-center">
                            <a-form-item-rest>
                                <a-input-number v-model:value="notice.time" disabled :min="1" style="width: 20%; margin-right: 10px" />
                            </a-form-item-rest>
                            <a-select v-model:value="notice.unit" disabled style="width: 30%">
                                <a-select-option value="Y">{{ proxy.$t('timer.task.year') }}</a-select-option>
                                <a-select-option value="M">{{ proxy.$t('timer.task.month') }}</a-select-option>
                                <a-select-option value="D">{{ proxy.$t('timer.task.day') }}</a-select-option>
                                <a-select-option value="h">{{ proxy.$t('timer.task.hour') }}</a-select-option>
                                <a-select-option value="m">{{ proxy.$t('timer.task.minute') }}</a-select-option>
                                <a-select-option value="s">{{ proxy.$t('timer.task.second') }}</a-select-option>
                            </a-select>
                        </div>
                    </a-form-item>
                    <a-form-item v-if="form.cycle_type === 'Times'" :label="$t('timer.rule.rated_num')">
                        <a-input v-model:value="form.period" disabled :placeholder="$t('timer.rule.times_notice')" />
                    </a-form-item>
                    <a-form-item v-if="form.cycle_type === 'Times'" :label="$t('timer.rule.used_num')">
                        <a-input v-model:value="form.notice" disabled :placeholder="$t('timer.rule.times_notice')" times_notice />
                    </a-form-item>
                    <a-form-item v-if="form.cycle_type === 'StatisticsTimes'" name="period" :label="$t('timer.rule.period')">
                        <a-input-number v-model:value="form.period" disabled :min="1" />
                    </a-form-item>
                    <a-form-item v-if="form.cycle_type === 'StatisticsTimes'" name="notice" :label="$t('timer.rule.notice')">
                        <a-input-number v-model:value="form.notice" disabled :min="1" />
                    </a-form-item>
                    <!-- 首次维保时间 -->
                    <a-form-item :label="$t('timer.task.first_handle_time')" name="first_handle_time">
                        <a-date-picker
                            v-model:value="form.first_handle_time"
                            show-time
                            format="YYYY-MM-DD HH:mm:ss"
                            :placeholder="$t('please_choose_date')"
                        />
                    </a-form-item>
                    <!-- 处理人 -->
                    <a-form-item :label="$t('timer.task.handle_id')" name="handle_id">
                        <a-select
                            mode="multiple"
                            show-search
                            option-filter-prop="children"
                            v-model:value="form.handler_id_list"
                            :placeholder="$t('please_select')"
                        >
                            <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                                {{ item.username }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('description')" name="description">
                        <a-textarea v-model:value="form.description" :rows="4" />
                    </a-form-item>
                </a-form>
            </a-card>
        </template>
    </mix-edit-page>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
import { getObjectList, getStatisticsList, getUserList } from '@/hook/public_data'
import { useDateFormat } from '@vueuse/core'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(weekday)
dayjs.extend(localeData)

/* modal变量 */
const modal = reactive({
    title: '',
    show: false,
    id: '',
    loading: false
})
/* form表单 */
const formRef = ref(null)
const form = ref({})
const rules = {
    description: [
        {
            required: false,
            pattern: /^[\s\S]{0,255}$/,
            message: proxy.$t('character_0_255')
        }
    ]
}
/* 刚进页面 */
const objectList = ref([])
const statisticsList = ref([])
const userList = ref([])
watch(
    () => modal.show,
    async (val) => {
        if (val) {
            const { objectList: objectList2 } = await getObjectList()
            objectList.value = objectList2
            statisticsList.value = await getStatisticsList()
            userList.value = await getUserList()
            modal.id && getDetail()
        } else {
            //离开页面，清空表单
            form.value = {}
            modal.id = ''
        }
    }
)
const getDetail = () => {
    proxy.api.post('get_timer', { uid: modal.id }).then(async (res) => {
        form.value = res.result
        if (form.value.first_handle_time) {
            form.value.first_handle_time = form.value.first_handle_time?dayjs(form.value.first_handle_time, 'YYYY-MM-DD HH:mm:ss'):""
        }
        if (res.result.cycle_type === 'NaturalTime' || res.result.cycle_type === 'RunTime') {
            period.value = splitTime(form.value.period)
            notice.value = splitTime(form.value.notice)
        }
        if (res.result.cycle_type === 'Times') {
            form.value.rated_num = form.value.period
            form.value.used_num = form.value.notice
        }
    })
}
/* 确定提交 */
const handleOk = async () => {
    await formRef.value.validateFields()
    let first_handle_time = form.value.first_handle_time
    proxy.api
        .post('update_timer', {
            ...form.value,
            first_handle_time: first_handle_time ? useDateFormat(first_handle_time, 'YYYY-MM-DD HH:mm:ss').value : ''
        })
        .then((res) => {
            proxy.$message.success(proxy.$t('success'))
            proxy.$parent.getList()
            modal.show = false
        })
}
/* 维保类型 */
const cycleTypeList = {
    NaturalTime: proxy.$t('timer.rule.NaturalTime'),
    RunTime: proxy.$t('timer.rule.RunTime'),
    Times: proxy.$t('timer.rule.Times'),
    StatisticsTimes: proxy.$t('timer.rule.StatisticsTimes')
}
const onCycleTypeChange = (value) => {
    if (value !== 'NaturalTime') {
        rules.statistics_id = [
            {
                required: true,
                message: proxy.$t('timer.rule.choose_statistics'),
                trigger: 'blur'
            }
        ]
    } else {
        rules.statistics_id = []
    }
}
/*  */
const period = ref({ time: '', unit: 'h' })
const notice = ref({ time: '', unit: 'h' })
watch(
    () => period,
    (newValue, oldValue) => {
        console.log(newValue)
        form.value.period = formatTime(newValue.value)
    },
    { deep: true }
)
watch(
    () => notice,
    (newValue, oldValue) => {
        form.value.notice = formatTime(newValue.value)
    },
    { deep: true }
)
const formatTime = (time) => {
    if (!time.time) {
        return ''
    }
    let formatTime = ''
    switch (time.unit) {
        case 'Y':
            let cal_Y_time = time.time * 365 * 24
            formatTime = cal_Y_time + 'h0m0s'
            break
        case 'M':
            let cal_M_time = time.time * 30 * 24
            formatTime = cal_M_time + 'h0m0s'
            break
        case 'D':
            let cal_D_time = time.time * 24
            formatTime = cal_D_time + 'h0m0s'
            break
        case 'h':
            formatTime = time.time + 'h0m0s'
            break
        case 'm':
            formatTime = '0h' + time.time + 'm0s'
            break
        case 's':
            formatTime = '0h0m' + time.time + 's'
            break
        default:
            formatTime = ''
    }
    return formatTime
}
const splitTime = (time) => {
    if (!time) {
        return { time: '', unit: 'h' }
    }
    let time_list = time.split('')
    let hour = 0
    let min = 0
    let sec = 0
    let temp = ''
    time_list.forEach(function (item, index) {
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
            return { time: hour / (365 * 24), unit: 'Y' }
        } else if (hour % (30 * 24) == 0) {
            return { time: hour / (30 * 24), unit: 'M' }
        } else if (hour % 24 == 0) {
            return { time: hour / 24, unit: 'D' }
        } else {
            return { time: hour, unit: 'h' }
        }
    } else if (min > 0) {
        return { time: min, unit: 'm' }
    } else if (sec > 0) {
        return { time: sec, unit: 's' }
    } else {
        return { time: 0, unit: 'h' }
    }
}
/* 暴露变量 */
defineExpose({ modal })
</script>

<style lang="scss" scoped></style>
