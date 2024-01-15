<template>
    <a-modal
        :maskClosable="false"
        :title="modal.title"
        :visible="modal.show"
        @ok="handleOk"
        width="60%"
        :bodyStyle="{ height: bodyHeight + 'px' }"
        :centered="true"
        :ok-text="$t('confirm')"
        :getContainer="parentNode"
        :cancel-text="$t('cancel')"
        @cancel="closeLineModal"
    >
        <div class="flex mb-[12px]">
            <div class="mr-[16px]">
                <a-date-picker
                    show-time
                    v-model:value="modal.start"
                    @ok="(val) => changeTime(val, 'start')"
                    :valueFormat="format"
                    placeholder="开始时间"
                ></a-date-picker>
            </div>
            <div class="mr-[16px]">
                <a-date-picker
                    show-time
                    v-model:value="modal.end"
                    @ok="(val) => changeTime(val, 'end')"
                    :valueFormat="format"
                    placeholder="结束时间"
                ></a-date-picker>
            </div>
        </div>
        <div :id="chartId" class="dataLine" :style="{ height: bodyHeight - 120 + 'px' }"></div>
        <div class="selectOption">
            <template v-for="(ele, idx) in searchOption" :key="idx">
                <a-select
                    :placeholder="$t('please_select')"
                    :virtual="false"
                    :getPopupContainer="parentNode"
                    v-model:value="searchOption[idx]"
                    :style="{ width: '18%', margin: '0 1%' }"
                    @change="(val, option) => selectChange(val, option, idx)"
                >
                    <a-select-option v-for="(item, index) in fvMap" :key="index" :value="item.fv">{{ item.label_local }} </a-select-option>
                </a-select>
            </template>
        </div>
    </a-modal>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, nextTick, onMounted } from "vue"
import * as echarts from "echarts/core"
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent } from "echarts/components"
import { LineChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import dayjs from "dayjs"
import { useRoute } from "vue-router"
echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    DataZoomComponent
])
const { proxy } = getCurrentInstance()
const route = useRoute()
const props = defineProps({
    keys: {
        type: Array,
        default: []
    },
    titles: {
        type: Array,
        default: []
    },
    fvMap: {
        type: Array,
        default: []
    }
})
const format = ref("YYYY-MM-DD HH:mm:ss")
const modal = reactive({
    show: false,
    title: proxy.$t("objects.history.line"),
    start: ref(dayjs().startOf("day").format(format.value)),
    end: ref(dayjs().endOf("day").format(format.value))
})
const bodyHeight = ref(500)
const searchOption = ref([undefined, undefined, undefined, undefined, undefined])
const parentNode = (e) => {
    return document.querySelector("#app")
}
let dataLine = null
const chartId = ref("LINE_" + Date.now())
const changeTime = (val, param) => {
    /* 开始时间必须在结束时间之前，否则情空当前时间选择器内容 */
    compareTime(val, param).then((res) => {
        if (res) {
            modal.start = param === "start" ? val : modal.start
            modal.end = param === "end" ? val : modal.end
        } else {
            proxy.$message.error(proxy.$t("objects.object.range_time_error"))
            modal.start = param === "start" ? "" : modal.start
            modal.end = param === "end" ? "" : modal.end
        }
    })
}
const compareTime = (val, param) => {
    return new Promise((resolve) => {
        let start = param === "start" ? val : modal.start
        let end = param === "end" ? val : modal.end
        if (new Date(start).getTime() > new Date(end).getTime()) {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}
const initDataLineChart = () => {
    let lineDom = document.getElementById(chartId.value)
    dataLine = echarts.init(lineDom)
    let optionData = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            top: 20,
            data: [],
            icon: "roundRect",
            textStyle: {}
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "20%",
            containLabel: false //防止因多个y轴造成界面压缩
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                height: 20,
                bottom: 15,
                xAxisIndex: [0, 1]
            },
            {
                type: "inside",
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1]
            }
        ],
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
            axisLabel: {
                formatter: function (value, index) {
                    let dataArr = value.split(" ")
                    return dataArr[0] + "\n" + dataArr[1]
                }
            }
        },
        yAxis: new Array(5).fill({
            type: "value",
            show: false
        }),
        series: []
    }
    // if (this.theme == 1) {
    //     optionData.legend.textStyle.color = "rgba(255,255,255,0.65)"
    //     optionData.yAxis.splitLine.lineStyle.color = "rgba(255,255,255,0.1)"
    // }
    if (props.keys.length) {
        optionData.legend.data = []
        optionData.series = []
        searchOption.value.forEach((ele, idx) => {
            if (ele) {
                optionData.series.push({
                    type: "line",
                    name: props.titles[idx],
                    fv: props.keys[idx],
                    yAxisIndex: idx
                })
                optionData.legend.data.push(props.titles[idx])
            }
        })
    }
    dataLine.setOption(optionData, true)
}
const handleOk = () => {
    getLineData()
}
const closeLineModal = () => {
    modal.show = false
}
const selectChange = (val, options, index) => {
    let option = dataLine.getOption()
    let item = props.fvMap[options.key]
    //剔除已选中的fv
    let hasOwn = searchOption.value.filter(ele => ele === item.fv)
    if (option.series[index]) {
        if (item.fv && hasOwn.length === 1) {
            option.series[index].name = item.label_local
            option.series[index].fv = item.fv
            option.series[index].yAxisIndex = index
            option.legend[0].data[index] = item.label_local
        } else {
            option.series.splice(index, 1)
            props.keys.splice(index, 1)
            option.legend[0].data.splice(index, 1)
        }
    } else if (!option.series[index] && hasOwn.length === 1) {
        option.series.push({
            type: "line",
            name: item.label_local,
            fv: item.fv
        })
        option.legend[0].data.push(item.label_local)
    }
    dataLine.setOption(option, true)
    getLineData()
}
const getLineData = () => {
    let keys = searchOption.value.filter((ele) => {
        return !ele === false
    })
    let data = {
        keys: Array.from(new Set(keys)),
        object_id: route.params.id,
        start_time: modal.start,
        end_time: modal.end
    }
    if (!modal.end) {
        data.end_time = dayjs(new Date()).endof("day").format("YYYY-MM-DD HH:mm:ss")
    }
    if (!keys.length) {
        proxy.$message.error(proxy.$t("objects.history.time_null_tip"))
        return
    }
    let option = dataLine.getOption()
    proxy.api.post("history_line", data).then((res) => {
        option.series.forEach((ele, idx) => {
            if (ele.fv && res.result.hasOwnProperty(ele.fv)) {
                ele.data = res.result[ele.fv].data
                option.xAxis[0].data = res.result[ele.fv].datetime
            }
        })
        dataLine.setOption(option)
    })
}
watch(
    () => modal.show,
    (val) => {
        if (val) {
            bodyHeight.value = document.body.clientHeight * 0.7
            searchOption.value = [undefined, undefined, undefined, undefined, undefined]
            props.keys.length && props.keys.forEach((ele, idx) => {
                if(idx < 5){
                    searchOption.value[idx] = ele
                }
            })
            nextTick(() => {
                initDataLineChart()
                getLineData()
            })
        }
    }
)

defineExpose({ modal })
</script>

<style lang="scss" scoped>
.dataLine {
    width: 100%;
    canvas {
        height: 100%;
    }
}
.selectOption {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
