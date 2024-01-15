<template>
    <a-modal
        :maskClosable="false"
        :title="modal.title"
        :visible="modal.show"
        @ok="handleOk"
        @cancel="closeFvModal"
        width="60%"
        :bodyStyle="{ height: bodyHeight + 'px' }"
        :centered="true"
        :ok-text="$t('confirm')"
        :cancel-text="$t('cancel')"
    >
        <div class="history-modal">
            <div class="param-wrap">
                <div class="mix-key-header" style="margin-bottom: 12px" v-if="checkedType === 'export'">
                    <div class="select-wrap">
                        <div class="select-item">
                            <span class="label">文件名称</span>
                            <a-input v-model:value="file_name"></a-input>
                        </div>
                        <div class="select-item">
                            <span class="label">时间间隔</span>
                            <a-input-number style="width: 160px" :min="0" v-model:value="resample"></a-input-number>
                        </div>
                    </div>
                </div>
                <div class="mix-key-header flex-wrap">
                    <div class="key-header-label select-wrap" style="width: 100%" v-if="checkedType === 'export'">
                        <div class="select-item">
                            <span class="label">分割文件</span>
                            <a-select v-model:value="no_split">
                                <a-select-option value="false"> 分割文件 </a-select-option>
                                <a-select-option value="true"> 不分割文件 </a-select-option>
                            </a-select>
                        </div>
                        <div class="select-item">
                            <span class="label">字符集</span>
                            <a-select v-model:value="character">
                                <a-select-option value="gb2312"> gb2312编码 </a-select-option>
                                <a-select-option value="utf-8"> utf-8编码 </a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="mix-key-search flex-wrap">
                        <a-space v-if="checkedType === 'record'">
                            <span>时间间隔：</span>
                            <a-input-number style="width: 160px" :min="0" v-model:value="resample"></a-input-number>
                        </a-space>
                    </div>
                </div>
                <div class="mix-key-body">
                    <div class="handle-box">
                        <span class="check-all">
                            <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">{{
                                $t("check_all")
                            }}</a-checkbox>
                        </span>
                        <a-input-search @search="searchFv" style="width: 240px"></a-input-search>
                    </div>
                    <div class="mix-key-items">
                        <a-checkbox-group v-model:value="checkedKey" @change="checkKey" style="width: 100%">
                            <div class="mix-key-item" v-for="(item, index) in checkOptions" :key="index + item.fv">
                                <a-checkbox v-if="item.label_local" :value="item.fv" @change="cancelCheck">
                                    {{ item.label_local || "" }}
                                </a-checkbox>
                            </div>
                        </a-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="scheme-wrap">
                <div class="mix-key-header flex-wrap">
                    <div class="key-header-label header-min">
                        <span>{{ $t("schemes") }}</span>
                    </div>
                    <div class="mix-key-search flex-wrap">
                        <a-space>
                            <a-input-search @search="searchScheme"></a-input-search>
                        </a-space>
                    </div>
                </div>
                <div class="scheme-body">
                    <div class="scheme-items">
                        <a-radio-group v-model:value="selectScheme" button-style="solid" style="width: 100%" @change="onSchemeChange">
                            <template v-for="(item, index) in schemeList" :key="index">
                                <div class="scheme-item">
                                    <div class="scheme-option">
                                        <a-radio :value="index">
                                            <a-input v-if="editIndex === index" v-model:value="schemeName" />
                                            <span v-else>{{ item.name }}</span>
                                        </a-radio>
                                    </div>
                                    <div class="scheme-operation flex-center">
                                        <div v-if="editIndex === index" class="primary" @click="updateScheme(item)">{{ $t("save") }}</div>
                                        <div v-else class="primary flex-1" @click="editScheme(item, index)">{{ $t("edit") }}</div>
                                        <a-divider type="vertical" />
                                        <a-popconfirm :title="$t('objects.object.delete_scheme')" @confirm="deleteScheme(item)">
                                            <div class="danger flex-1">{{ $t("delete") }}</div>
                                        </a-popconfirm>
                                    </div>
                                </div>
                            </template>
                            <div class="scheme-item add-button">
                                <a-button @click="addScheme">
                                    <template #icon><plus-outlined /></template>
                                </a-button>
                            </div>
                        </a-radio-group>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
const { proxy } = getCurrentInstance()
const emit = defineEmits(["ok"])
const route = useRoute()
const props = defineProps({
    checkedType: {
        type: String,
        default: "record"
    },
    fvMap: {
        type: Array,
        default: []
    }
})
const modal = reactive({
    show: false,
    title: proxy.$t("objects.history.select_param"),
    loading: false
})
const bodyHeight = ref(500)
const schemeList = ref([])
const selectScheme = ref(null)
const schemeName = ref("")
const editIndex = ref()
let globalKeys = []
let keyToValFv = {}
const fv = ref([])
const checkedKey = ref([])
const checkOptions = ref([])
const resample = ref(0)
const file_name = ref("")
const no_split = ref("false")
const character = ref("gb2312")
const searchScheme = (val) => {
    selectScheme.value = null
    if (!val) {
        getSchemeList()
    } else {
        getSchemeList(["name", "like", "%" + val + "%"])
    }
    checkedKey.value = []
    indeterminate.value = false
}
const onSchemeChange = (e) => {
    let setting = schemeList.value[selectScheme.value]["setting"]
    if (!setting) {
        checkedKey.value = []
    } else {
        checkedKey.value = JSON.parse(setting)
    }
    indeterminate.value = !!checkedKey.value.length && checkedKey.value.length < fv.value.length
    checkAll.value = checkedKey.value.length === fv.value.length && checkedKey.value.length > 0
    globalKeys = [...checkedKey.value]
    globalTitles = []
    globalKeys.forEach((ele) => {
        globalTitles.push(keyToValFv[ele].label_local)
    })
}
const getSchemeList = (condition = []) => {
    let data = {
        module: "object",
        variable: "scheme",
        where_and: [["value", "=", route.params.id]]
    }
    if (condition.length > 0) {
        data.where_and.push(condition)
    }
    proxy.api.post("object_get_setting_list", data).then((res) => {
        schemeList.value = res.result.data
    })
}
const addScheme = () => {
    let name = proxy.$t("objects.history.scheme_name") + (schemeList.value.length + 1)
    let data = {
        module: "object",
        variable: "scheme",
        name: name,
        value: route.params.id
    }
    proxy.api.post("object_add_setting", data).then((res) => {
        selectScheme.value = null
        getSchemeList()
    })
}
const deleteScheme = (item) => {
    proxy.api.post("object_delete_setting", { uid: item.uid }).then((res) => {
        getSchemeList()
    })
}
const editScheme = (item, index) => {
    schemeName.value = item.name
    editIndex.value = index
}
const updateScheme = (item) => {
    let data = {
        uid: item.uid,
        module: "object",
        variable: "scheme",
        name: schemeName.value,
        value: route.params.id,
        setting: globalKeys
    }
    proxy.api.post("object_update_setting", data).then((res) => {
        editIndex.value = null
        getSchemeList()
    })
}
const checkKey = (selectedKeys) => {
    indeterminate.value = !!selectedKeys.length && selectedKeys.length < fv.value.length
    checkAll.value = selectedKeys.length === fv.value.length
    let titleArr = props.fvMap.filter((ele) => {
        return globalKeys.includes(ele.fv)
    })
    let fvObj = {}
    titleArr.forEach((v) => {
        fvObj[v.fv] = v.label_local
    })
    globalTitles = []
    globalKeys.forEach((k) => {
        globalTitles.push(fvObj[k])
    })
}
const cancelCheck = (val) => {
    if (val.target.checked) {
        globalKeys = Array.from(new Set([...globalKeys, val.target.value]))
        globalTitles = Array.from(new Set([...globalTitles, keyToValFv[val.target.value].label_local]))
    } else {
        let index = globalKeys.indexOf(val.target.value)
        globalKeys.splice(index, 1)
        globalTitles.splice(index, 1)
    }
}
const indeterminate = ref(false)
let globalTitles = []
const checkAll = ref(false)
const onCheckAllChange = (e) => {
    globalTitles = []
    globalKeys = []
    checkedKey.value = e.target.checked ? fv.value : []
    indeterminate.value = false
    checkAll.value = e.target.checked
    if (e.target.checked) {
        props.fvMap.forEach((ele) => {
            globalTitles.push(ele.label_local)
            globalKeys.push(ele.fv)
        })
    }
    selectScheme.value = false
}

const handleOk = () => {
    let params = {
        titles: globalTitles,
        keys: globalKeys,
        resample: resample.value,
        character: character.value,
        no_split: no_split.value,
        file_name: file_name.value
    }
    if (!globalKeys.length) {
        proxy.$message.error(proxy.$t("please_select_fv"))
        return
    }
    emit("ok", params)
}
const closeFvModal = (e) => {
    modal.show = false
}
const searchFv = (val) => {
    if (!val) {
        checkOptions.value = props.fvMap
        checkedKey.value = [...globalKeys]
        return
    }
    checkOptions.value = props.fvMap.filter((v) => {
        if (v.label_local) {
            return v.label_local.indexOf(val) > -1 || v.fv.indexOf(val) > -1
        }
    })
}

watch(
    () => checkOptions.value,
    (val) => {
        if (val.length && val.length % 3 != 0) {
            let remain = 3 - (val.length % 3)
            for (let i = 0; i < remain; i++) {
                val.push({ fv: Date.now() })
            }
        }
    }
)

watch(
    () => modal.show,
    (val) => {
        if (val) {
            getSchemeList()
            let array = []
            props.fvMap.forEach((ele) => {
                fv.value.push(ele.fv)
                array.push(ele)
                keyToValFv[ele.fv] = ele
            })
            checkOptions.value = array
        }
    }
)

onMounted(() => {
    bodyHeight.value = document.body.clientHeight * 0.7
})

defineExpose({ modal })
</script>

<style lang="scss" scoped>
.key-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    .key-header-label {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0.5px;
        color: #333333;
    }

    .key-search {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0.5px;
        color: #333333;
    }
}

.history-modal {
    width: 100%;
    height: 100%;
    display: flex;
}

.param-wrap {
    width: 70%;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
}

.scheme-body,
.mix-key-body {
    margin-top: 16px;
    padding: 8px;
    max-height: unset;
    overflow-y: auto;
    border-radius: 2px;
    border: solid 1px #dddddd;
    height: calc(100% - 48px);

    .handle-box {
        padding: 4px 4px 8px 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mix-key-items {
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 4px;

        .ant-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            border: none;
        }

        .mix-key-item {
            width: 33.333%;
            padding: 6px 0 6px 12px;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            &:nth-child(3n + 1) {
                border-left: 1px solid #e5e5e5;
            }
            &:first-child,
            &:nth-child(2),
            &:nth-child(3) {
                border-top: 1px solid #e5e5e5;
            }
        }
    }
}
.mix-key-header {
    justify-content: space-between;
    align-items: center;
    .mix-key-header-label {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0.5px;
        color: #333333;
    }
    .mix-key-search {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0.5px;
        color: #333333;
    }
    .select-wrap {
        display: flex;
        justify-content: space-between;
        .select-item {
            flex: 1;
            display: flex;
            align-items: center;
            .label {
                min-width: 72px;
            }
            .ant-select {
                flex: 1;
            }
            &:first-child {
                margin-right: 32px;
            }
        }
    }
}

.scheme-wrap {
    width: 30%;
    display: flex;
    flex-direction: column;

    .header-min {
        min-width: 42px;
    }

    .scheme-body {
        padding: 0;
    }

    .scheme-items {
        padding: 0;
        width: 100%;
    }

    .scheme-item {
        display: flex;
        height: 49px;
        padding: 0 8px;
        border-bottom: 1px solid #eee;
        justify-content: space-between;

        .scheme-option {
            width: calc(100% - 92px);
            display: flex;
            align-items: center;
        }

        .scheme-operation {
            display: flex;
            width: 92px;
            font-size: 14px;
            .flex-1 {
                text-align: center;
            }
        }

        .scheme-button {
            margin: 8px auto;
        }
    }
    .add-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
