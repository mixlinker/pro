<template>
    <a-date-picker
        show-time
        :placeholder="placeholder"
        :getPopupContainer="parentNode"
        @panelChange="panelChange"
        @change="change"
        @ok="confirm"
    >
        <template #renderExtraFooter>
            <div class="flex flex-nowrap">
                <a-select placeholder="年" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[0]">
                    <a-select-option v-for="(year, index) in yearOptions" :key="index" :value="year">
                        {{ year + "年" }}
                    </a-select-option>
                </a-select>
                <a-select placeholder="月" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[1]">
                    <a-select-option v-for="(month, index) in monthOptions" :key="index" :value="month">
                        {{ month + "月" }}
                    </a-select-option>
                </a-select>
                <a-select placeholder="日" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[2]">
                    <a-select-option v-for="(date, index) in dateOptions" :key="index" :value="date">
                        {{ date + "日" }}
                    </a-select-option>
                </a-select>
                <a-select placeholder="时" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[3]">
                    <a-select-option v-for="(hour, index) in hourOptions" :key="index" :value="hour">
                        {{ hour + "时" }}
                    </a-select-option>
                </a-select>
                <a-select placeholder="分" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[4]">
                    <a-select-option v-for="(minute, index) in minuteOptions" :key="index" :value="minute">
                        {{ minute + "分" }}
                    </a-select-option>
                </a-select>
                <a-select placeholder="秒" style="flex: 1; padding: 8px 4px 8px 0" v-model:value="dateArray[5]">
                    <a-select-option v-for="(second, index) in secondOptions" :key="index" :value="second">
                        {{ second + "秒" }}
                    </a-select-option>
                </a-select>
            </div>
        </template>
    </a-date-picker>
</template>
<script setup>
import {ref, reactive, getCurrentInstance, watch, onMounted} from 'vue'
import dayjs from 'dayjs'
const {proxy} = getCurrentInstance()
const emit = defineEmits(['confirm', 'changeTime'])
const props = defineProps({
    rangeType: {
        type: String,
        default: "start"
    },
    checkedTime: {
        type: String,
        default: ""
    },
    startTime: {
        type: String,
        default: ""
    }
})
const currentType = ref('date')
const yearOptions= ref([])
const monthOptions = ref([])
const dateOptions = ref([])
const hourOptions = ref([])
const minuteOptions = ref([])
const secondOptions = ref([])
const dateArray = ref([])
const currentTime = ref('')
const placeholder = ref('开始时间')
let endTimeFlag = false
let endTimeHaveChage = false
const parentNode = (e) => {
    return document.querySelector("#app")
}
const initOption = () => {
    let date = new Date()
    const YY = date.getFullYear()
    dateArray.value[0] = YY
    for (let i = -5; i < 5; i++) {
        yearOptions.value.push(YY + i)
    }
    for (let i = 0; i < 12; i++) {
        monthOptions.value.push(zero(i + 1))
    }
    for (let i = 0; i < 31; i++) {
        dateOptions.value.push(zero(i + 1))
    }
    for (let i = 0; i < 24; i++) {
        hourOptions.value.push(zero(i))
    }
    for (let i = 0; i < 60; i++) {
        minuteOptions.value.push(zero(i))
        secondOptions.value.push(zero(i))
    }
}
const initDate = () => {
    if (props.rangeType === "start") {
        placeholder.value = "开始时间"
        currentTime.value = dayjs(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss")
    } else {
        placeholder.value = "结束时间"
        currentTime.value = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
}
const panelChange = () => {}
const change = (val, date) => {
    if (props.rangeType === "end" && new Date(date).getTime() < new Date(props.startTime).getTime()) {
        proxy.$message.error(proxy.$t('objects.object.range_time_error'))
        return
    }
    if (val) {
        currentTime.value = date
        if (val._isUTC) {
            emit("confirm", date)
        }
    } else {
        currentTime.value = ""
        dateArray.value = []
    }
}
const confirm = (val, date) => {
    let value = val._i
    emit("confirm", value)
}
const handleReset = () => {
    if (props.rangeType === "start") {
        currentTime.value = dayjs(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss")
    } else {
        currentTime.value = ""
        dateArray.value = []
    }
}
const zero = (val) => {
    return val > 9 ? val : "0" + val
}
watch(() => currentTime.value, (newval) => {
    if (newval) {
        let date = new Date(newval)
        dateArray.value[0] = date.getFullYear()
        dateArray.value[1] = zero(date.getMonth() + 1)
        dateArray.value[2] = zero(date.getDate())
        dateArray.value[3] = zero(date.getHours())
        dateArray.value[4] = zero(date.getMinutes())
        dateArray.value[5] = zero(date.getSeconds())
    }
    if (props.rangeType == "end" && !endTimeHaveChage) {
        if (!endTimeFlag) {
            return (endTimeFlag = true)
        } else {
            newval = dayjs(new Date(new Date(new Date(newval)).toLocaleDateString())).format("YYYY-MM-DD HH:mm:ss")
            endTimeHaveChage = true
        }
    }
    emit("changeTime", newval, props.rangeType)
})
watch(() => dateArray.value, (val) => {
    let date = new Date()
    if (val.length) {
        val[0] = val[0] || date.getFullYear()
        val[1] = val[1] || "01"
        val[2] = val[2] || "01"
        val[3] = val[3] || "00"
        val[4] = val[4] || "00"
        val[5] = val[5] || "00"
        let current = `${val[0]}-${val[1]}-${val[2]} ${val[3]}:${val[4]}:${val[5]}`
        if (props.rangeType === "end" && new Date(current).getTime() < new Date(props.startTime).getTime()) {
            proxy.$message.error(proxy.$t('objects.object.range_time_error'))
            return
        } else {
            currentTime.value = current
        }
    }
})
// watch(() => checkedTime.value, (val) => {
//     currentTime.value = val
// })
onMounted(() => {
    initOption()
    initDate()
})
</script>
<style lang="css" scoped>
:deep(.ant-calendar-footer-btn  a) {
    color: #1890ff;
}
</style>
