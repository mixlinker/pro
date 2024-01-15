<template>
    <div class="mix-detail-container">
        <div class="mix-detail-title">
            <div>{{ $t(`retainer.${category}`) + $t(`retainer.info`) }}</div>
            <div class="flex items-center primary text-[14px] font-normal">
                <div class="cursor-pointer" @click="openModal">
                    <plus-outlined />
                    <span class="ml-[4px]">{{ $t('retainer.result.add_title') }}</span>
                </div>
                <a-popconfirm
                    :title="$t('objects.retainer.close_tip')"
                    :ok-text="$t('confirm')"
                    :cancel-text="$t('cancel')"
                    @confirm="handleClose(infoData)"
                >
                    <a href="#" class="primary ml-[12px]" v-if="infoData.retained == 1">
                        <close-outlined />
                        {{ $t('objects.retainer.manual_close') }}
                    </a>
                </a-popconfirm>
            </div>
        </div>
        <div class="mix-detail-block">
            <a-descriptions bordered :column="3">
                <a-descriptions-item
                    :label="category == 'OTHER' ? $t('retainer.result.uid') : $t(`retainer.${category}`) + $t('retainer.result.id')"
                    >{{ infoData.uid }}</a-descriptions-item
                >

                <a-descriptions-item
                    :label="category == 'OTHER' ? $t('retainer.result.label_cn') : $t(`retainer.${category}`) + $t('retainer.name_cn')"
                    >{{ infoData.label_local }}</a-descriptions-item
                >
                <a-descriptions-item
                    :label="category == 'OTHER' ? $t('retainer.result.label_en') : $t(`retainer.${category}`) + $t('retainer.name_en')"
                    >{{ infoData.label_en }}</a-descriptions-item
                >
                <a-descriptions-item :label="$t('retainer.result.category')">{{ $t(`retainer.${category}`) }}</a-descriptions-item>
                <a-descriptions-item :label="$t('retainer.project.uid')">{{ infoData.template_id }}</a-descriptions-item>
                <a-descriptions-item :label="$t('retainer.project.name')">{{ infoData.template_name }}</a-descriptions-item>
                <a-descriptions-item
                    :label="category == 'OTHER' ? $t('retainer.code') : $t(`retainer.${category}`) + $t('retainer.code_name')"
                    >{{ infoData.code }}</a-descriptions-item
                >
                <a-descriptions-item :label="$t('objects.object.uid')">{{ infoData.object_id }}</a-descriptions-item>
                <a-descriptions-item :label="$t('objects.object.name')">{{ infoData.object_name }}</a-descriptions-item>
                <a-descriptions-item :label="$t('retainer.result.elapsed')">{{ infoData.elapsed }}</a-descriptions-item>
                <a-descriptions-item :label="$t('retainer.result.statis_expr')">{{ infoData.statis_expr }}</a-descriptions-item>
                <a-descriptions-item :label="$t('retainer.result.statis_result')">{{ infoData.statis_result }}</a-descriptions-item>
                <a-descriptions-item :label="$t('description')">{{ infoData.description }}</a-descriptions-item>
            </a-descriptions>
        </div>

        <div class="step-wrap" :style="{ height: listHeight + 'px' }">
            <div class="flex step-row flex-center" v-for="(item, index) in sortData" :key="item.time + Math.random()">
                <div class="step-middle step-left-middle center">{{ index + 1 }}</div>
                <div class="step-row-content" v-if="item.type == 'record'">
                    <div class="step-row-content-title">{{ $t('retainer.result.handle_record') + '：' }}</div>
                    <div class="step-row-content-spacing">
                        <div class="step-row-content-item">
                            <span class="step-start-label">{{ $t('retainer.result.handler') + '：' }}</span>
                            <span class="step-start-value">{{ item.value.staff_name }}</span>
                        </div>
                        <div class="step-row-content-item">
                            <span class="step-start-label">{{ $t('retainer.result.description') + '：' }}</span>
                            <span class="step-start-value">{{ item.value.description }}</span>
                        </div>
                        <div class="step-row-content-item">
                            <span class="step-start-label">{{ $t('retainer.result.service_at') + '：' }}</span>
                            <span class="step-start-value">{{ item.value.service_at }}</span>
                        </div>
                        <div class="step-row-content-item" v-if="item.value.file">
                            <span class="step-start-label">{{ $t('retainer.result.picture') + '：' }}</span>
                            <span class="step-start-value">
                                <img :src="item.value.file" style="width: 70px; height: 55px" />
                            </span>
                        </div>
                        <div class="line-button" v-if="index == 0">
                            <a-button type="primary" @click="openLineModal">{{ $t('retainer.result.diagram') }}</a-button>
                        </div>
                    </div>
                </div>
                <div class="step-row-content" v-else>
                    <div class="step-row-content-title">{{ infoData.label_local }}</div>
                    <div class="step-row-content-spacing">
                        <div class="step-row-content-item">
                            <span class="step-start-label">{{
                                category == 'OTHER'
                                    ? $t('retainer.result.retainer_status') + '：'
                                    : $t(`retainer.${category}`) + $t('retainer.project.is_active') + '：'
                            }}</span>
                            <span class="step-start-color" style="border-radius: 2px; padding: 0 4px">{{
                                item.open == 1 ? $t('retainer.result.open') : $t('retainer.result.close')
                            }}</span>
                        </div>
                        <div class="step-row-content-item">
                            <span class="step-start-label">{{
                                item.open == 1 ? $t('retainer.result.keys') + '：' : $t('retainer.result.end_value') + '：'
                            }}</span>
                            <span
                                class="step-start-value"
                                style="margin-right: 12px"
                                v-for="(data, key) in item.open == 1 ? retainerData.open : retainerData.close"
                                :key="key"
                                >{{ data.label + ' : ' + data.value + ';' }}</span
                            >
                        </div>
                        <div class="step-row-content-item" v-if="item.value">
                            <span class="step-start-label">{{
                                item.open == 1 ? $t('retainer.result.opened_at') + '：' : $t('retainer.result.close_at') + '：'
                            }}</span>
                            <span class="step-start-value" v-if="item.open == 1">{{ item.value.opened_at }}</span>
                            <span class="step-start-value" v-else>{{ item.value.close_at }}</span>
                        </div>
                        <div class="line-button" v-if="index == 0">
                            <a-button type="primary" @click="openLineModal">{{ $t('retainer.result.diagram') }}</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <lineModal ref="line_modal"></lineModal>
        <modal ref="add_modal" @ok="addRecord"></modal>
    </div>
    <!-- <div class="mix-loading" v-if="loading">
        <a-spin></a-spin>
    </div> -->
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import defaultImage from '@/assets/images/no-image-icon.gif'
import lineModal from './line-modal.vue'
import modal from './modal.vue'
import auth from '@/services/request/auth.js'
const { proxy } = getCurrentInstance()

const route = useRoute()
const category = ref(route.query.category)
const line_modal = ref()
const add_modal = ref()
const infoData = ref({})
const sortData = ref([])
const loading = ref(false)
const retainerData = reactive({
    close: [],
    open: []
})
const fvMap = {}
let retainerStatus = 1
let backData = []
let backDataOpen = null
let backDataClose = null
let keyData = []
const initPost = () => {
    getItem().then((res) => {
        getListHeight()
        if (res) {
            getRecordList()
            getObjectItem()
            getProjectItem()
        }
    })
}
const getItem = () => {
    let data = {
        retainer_id: route.params.id
    }
    sortData.value = []
    return new Promise((resolve, reject) => {
        loading.value = true
        proxy.api.post('retainer_result_with_events', data).then((res) => {
            if (res.code === 200) {
                loading.value = true
                infoData.value = res.result || {}
                let status = ['close', 'open']
                if (res.result.retained == 1) {
                    retainerStatus = 1
                    sortData.value.push({ time: res.result.opened_at, value: res.result, type: 'status', open: 1 })
                    backData = { time: res.result.opened_at, value: res.result, type: 'status', open: 1 }
                } else {
                    retainerStatus = 0
                    sortData.value.push({ time: res.result.close_at, value: res.result, type: 'status', open: 0 })
                    sortData.value.push({ time: res.result.opened_at, value: res.result, type: 'status', open: 1 })
                    backDataOpen = { time: res.result.close_at, value: res.result, type: 'status', open: 0 }
                    backDataClose = { time: res.result.opened_at, value: res.result, type: 'status', open: 1 }
                }
                if (res.result && res.result.events && res.result.events.length) {
                    res.result.events.forEach((ele) => {
                        retainerData[status[ele.status]] = []
                        if (ele.value && Object.keys(ele.value).length) {
                            for (let key in ele.value) {
                                retainerData[status[ele.status]].push({
                                    label: key,
                                    value: ele.value[key]
                                })
                                if (keyData.indexOf(key) == -1) {
                                    keyData.push(key)
                                }
                            }
                        }
                    })
                }
                resolve(true)
            } else {
                proxy.$message.error(res.msg)
                resolve(false)
            }
        })
    })
}
const getRecordList = () => {
    let data = {
        where_and: [['source_id', '=', route.params.id]]
    }
    if (retainerStatus == 1) {
        sortData.value = [...backData]
    } else {
        sortData.value = [backDataOpen, backDataClose]
    }
    proxy.api.post('retainer_record_list', data).then((res) => {
        if (res.code === 200) {
            let arr = res.result.data
            arr.map((el) => {
                el.file = el.file ? window.location.origin + '/mixservice/storage/' + el.file : ''
                sortData.value.push({ time: el.service_at, value: el, type: 'record' })
            })
            sortData.value.sort(function (a, b) {
                return b.time < a.time ? 1 : -1
            })
        }
    })
}
const getObjectItem = () => {
    let data = {
        uid: infoData.value.object_id
    }
    proxy.api.post('object_item', data).then((res) => {
        if (res.code === 200) {
            res.result.object_fv_map[infoData.value.object_id].forEach((item) => {
                fvMap[item.fv] = item.label_local
            })
        }
    })
}
const getProjectItem = () => {
    let data = {
        uid: infoData.value.template_id
    }
    proxy.api.post('retainer_item', data).then((res) => {
        if (res.code === 200) {
            infoData.value.template_name = res.result.name
        }
    })
}
const openLineModal = () => {
    line_modal.value.modal.keyData = keyData
    line_modal.value.modal.fvMap = fvMap
    line_modal.value.modal.info = infoData.value
    line_modal.value.modal.show = true
}
const openModal = () => {
    add_modal.value.modal.show = true
}
const addRecord = (data) => {
    let images = []
    let params = {}
    let user = auth.getUser()
    data.files.forEach((v) => {
        images.push(v.url)
    })
    params.file = images.join(',')
    params.source_id = infoData.value.uid
    params.category = infoData.value.category
    params.object_id = infoData.value.object_id
    params.name = ''
    params.staff_id = user.id
    params.staff_name = user.username
    params.service_at = data.time
    params.description = data.desc
    proxy.api.post('retainer_record_create', params).then((res) => {
        if (res.code === 200) {
            proxy.$message.success(proxy.$t('success'))
            add_modal.value.modal.show = false
            getRecordList()
        }
    })
}
const handleClose = (record) => {
    let param = {
        code: record.code,
        object_id: record.object_id,
        template_id: record.template_id,
        uid: record.uid,
        project_id: record.project_id
    }
    proxy.api.post('retainer_close_by_uid', param).then((res) => {
        if (res.code === 200) {
            record.retained = 0
            record.close_at = this.moment().format(this.format)
            getRetainerItem()
            proxy.$message.success(proxy.$('success'))
        } else {
            proxy.$message.error(res.info)
        }
    })
}

/* 动态获取记录列表区域总高度 */
const listHeight = ref(300)
const getListHeight = () => {
    nextTick(() => {
        let height = document.getElementsByClassName('mix-detail-container')[0].clientHeight
        let infoHeight = document.getElementsByClassName('mix-detail-block')[0].clientHeight
        listHeight.value = height - infoHeight - 84 //总高度-基本信息高度54-列表区域上边16下边12
    })
}

onMounted(() => {
    initPost()
})
</script>

<style lang="scss" scoped>
@import '@/style/mix-dateline.scss';
.mix-detail-content {
    padding: 12px 0 0 0;
}
.step-wrap {
    overflow-y: auto;
}
</style>
