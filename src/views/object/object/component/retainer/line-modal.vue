<template>
    <a-modal
        :maskClosable="false"
        :title="modal.title"
        :visible="modal.show"
        @ok="handleCancel"
        width="60%"
        :bodyStyle="{ height: bodyHeight + 'px', padding: '16px 48px'}"
        :centered="true"
        :ok-text="$t('confirm')"
        :cancel-text="$t('cancel')"
        @cancel="handleCancel"
    >
        <div :id="chartId" class="dataLine"></div>
    </a-modal>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
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
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const modal = reactive({
    title: proxy.$t('retainer.result.retainer_line'),
    show: false,
    info: {}
})
const bodyHeight = ref(500)
const handleCancel = () => {
    modal.show = false
}
const dataLine = ref(null)
const chartId = ref('chart_' + Date.now())
const initDataLineChart = () => {
    let lineDom = document.getElementById(chartId.value)
    dataLine.value = echarts.init(lineDom)
    let optionData = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left: 0,
            top: 20,
            data: [],
            icon: 'roundRect',
            textStyle: {}
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
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
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1]
            }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLabel: {
                formatter: function (value, index) {
                    let dataArr = value.split(' ')
                    return dataArr[0] + '\n' + dataArr[1]
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: []
    }
    dataLine.value.setOption(optionData)
}
const getLineData = () => {
    let data = {
        object_id: modal.info.object_id,
        keys: modal.keyData,
        start_time: modal.info.opened_at,
        end_time: modal.info.close_at != '' ? modal.info.close_at : dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    proxy.api.post('history_line', data).then((res) => {
        if (res.code === 200) {
            let option = dataLine.value.getOption()
            option.yAxis = []
            option.series = []
            let num = 0
            for (let item in res.result) {
                option.yAxis.push({
                    type: 'value',
                    show: false
                })
                option.series.push({
                    type: 'line',
                    name: modal.fvMap[item],
                    data: res.result[item].data,
                    yAxisIndex: num
                })
                option.legend[0].data.push(modal.fvMap[item])
                option.xAxis[0].data = res.result[item].datetime
            }
            num++
            dataLine.value.setOption(option)
        }
    })
}

watch(
    () => modal.show,
    (val) => {
        if (val) {
            nextTick(() => {
                initDataLineChart()
                getLineData()
            })
        }
    }
)

onMounted(() => {
    bodyHeight.value = document.body.clientHeight * 0.7
})
defineExpose({ modal })
</script>

<style lang="scss" scoped>
.dataLine {
    height: 100%;
    width: 100%;
}
</style>
