<template>
    <a-modal :maskClosable="false" :title="modal.title" :visible="modal.visible" @ok="handleOk" @cancel="handleCancel" width="60%"
        :bodyStyle="{height: height + 'px'}">
        <div class="w-full h-full flex">
            <div class="modal-left">
                <div class="left-item">
                    <div class="label">文件名称:</div>
                    <a-input :placeholder="$t('please_enter')" v-model:value="file_name"></a-input>
                </div>
                <div class="left-item">
                    <div class="label required"><span class=" text-[red] mr-[4px] mt-[4px]">*</span>客户编号:</div>
                    <a-select v-model:value="customer_id" mode="multiple" :placeholder="$t('please_select')" style="width: 100%"
                        :maxTagCount="1">
                        <a-select-option v-for="(val, index) in customerList" :key="index" :value="val.uid">
                            {{ `${val.name}(${val.uid})` }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="left-item">
                    <div class="label"><span class=" text-[red] mr-[4px] mt-[4px]">*</span>字段设置:</div>
                    <a-table bordered :data-source="dataSource" :columns="columns" style="width: 100%" rowKey="field"
                        :rowSelection="rowSelection" :pagination="false" :scroll="{ y: height-170}">
                        <template #bodyCell="{ column, text, record }">
                            <template v-if="column.dataIndex === 'rename'">
                                <a-input v-model:value="record.rename" :disabled="edit_disabled" :placeholder="$t('please_enter')">
                                </a-input>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
            <div class="split-line"></div>
            <div class="modal-right">
                <div class="label">导出方案</div>
                <div class="export-content">
                    <a-radio-group v-model:value="selectScheme" style="width: 100%; height: 100%" button-style="solid"
                        @change="changeScheme">
                        <template v-for="(item, index) in schemeList" :key="index">
                            <div class="scheme-item">
                                <div class="scheme-option">
                                    <a-radio :value="index">
                                        <a-input v-if="editIndex === index" v-model:value="schemeName" />
                                        <span v-else>{{ item.name }}</span>
                                    </a-radio>
                                </div>
                                <div class="scheme-operation">
                                    <div v-if="editIndex === index" class="primary flex-1" @click="updateScheme(item)">
                                        保存
                                    </div>
                                    <div v-else class="primary flex-1" @click="editScheme(item, index)">
                                        编辑
                                    </div>
                                    <div class="split"></div>
                                    <div class="danger flex-1" v-if="editIndex === index" @click="editIndex = null; edit_disabled = true">
                                        取消
                                    </div>
                                    <a-popconfirm :title="$t('customer.delete_scheme')" v-else @confirm="deleteScheme(index)">
                                        <div class="danger flex-1">删除</div>
                                    </a-popconfirm>
                                </div>
                            </div>
                        </template>
                        <div class="scheme-btn">
                            <a-button type="dashed" size="small" @click="addScheme">
                                <plus-outlined />{{ $t('add') }}
                            </a-button>
                        </div>
                    </a-radio-group>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted, watch } from 'vue';
import { deepClone } from '@/utils/common.js'
import auth from '@/services/request/auth.js'
const { proxy } = getCurrentInstance()
const modal = reactive({
    visible: false,
    title: "导出"
})
const height = ref(500)
const file_name = ref("")
const columns = ref([
    { dataIndex: 'field', title: "字段标识", width: 90 },
    { dataIndex: "name", title: "字段名称" },
    { dataIndex: "rename", title: "字段名称设置" },
])
const base_data = [
    { field: "0", name: "客户编号", rename: "", checked: false },
    { field: "1", name: "客户别名", rename: "", checked: false },
    { field: "2", name: "客户名称", rename: "", checked: false },
    { field: "3", name: "客户地址", rename: "", checked: false },
    { field: "4", name: "联系人", rename: "", checked: false },
    { field: "5", name: "邮箱", rename: "", checked: false },
    { field: "6", name: "手机号", rename: "", checked: false },
    { field: "7", name: "电话", rename: "", checked: false },
    { field: "8", name: "责任人", rename: "", checked: false },
    { field: "9", name: "责任人联系方式", rename: "", checked: false },
    { field: "10", name: "对象编号", rename: "", checked: false },
    { field: "11", name: "对象名称", rename: "", checked: false },
    { field: "12", name: "对象地址", rename: "", checked: false },
    { field: "13", name: "型号", rename: "", checked: false },
    { field: "14", name: "出厂编号/序列号", rename: "", checked: false },
    { field: "15", name: "合同编号", rename: "", checked: false },
    { field: "16", name: "映射表名称", rename: "", checked: false },
    { field: "17", name: "APP显示板", rename: "", checked: false },
    { field: "18", name: "终端编号", rename: "", checked: false },
    { field: "19", name: "流量卡号", rename: "", checked: false },
    { field: "20", name: "MCU版本号", rename: "", checked: false },
    { field: "21", name: "LUA版本号", rename: "", checked: false },
    { field: "22", name: "终端状态", rename: "", checked: false },
    { field: "23", name: "最近上报时间", rename: "", checked: false }
]
const dataSource = ref([])
let checkMapping = {}
const selected = ref([])
const edit_disabled = ref(false) //控制字段设置输入框是否可用
const rowSelection = reactive({
    onChange: (selectedRowKeys, selectedRows) => {
        selected.value = selectedRowKeys
        selectedRowKeys.forEach(ele => {
            checkMapping[ele] = true
        })
    },
    selectedRowKeys: selected
})

/* 导出方案相关 ---start--- */
const selectScheme = ref()
const schemeList = ref([]) 
const schemeName = ref() //方案输入框内容
const editIndex = ref() //控制方案输入框
const initScheme = () => {
    selectScheme.value = ""
    schemeList.value = []
    schemeName.value = ""
    editIndex.value = null
    checkMapping = {}
    formatData(base_data)
    edit_disabled.value = false
}
const changeScheme = (val) => {
    let index = val.target.value
    formatData(schemeList.value[index].setting)
    edit_disabled.value = true
}
/* 修改当前方案的字段设置选中情况 */
const formatData = (data) => {
    selected.value = []
    dataSource.value = deepClone(data)
    dataSource.value.forEach((ele, index) => {
        checkMapping[index] = ele.checked
        ele.checked && selected.value.push(String(index))
    })
}
const updateScheme = (item) => {
    item.name = schemeName.value;
    dataSource.value.forEach((ele, idx) => {
        ele.checked = checkMapping[idx]
    })
    item.setting = dataSource.value
    edit_disabled.value = true
    schemeSetConfig()
}
const editScheme = (item, index) => {
    schemeName.value = item.name;
    editIndex.value = index;
    selectScheme.value = index
    edit_disabled.value = false
}
const addScheme = () => {
    schemeList.value.push({
        name: '方案' + (schemeList.value.length + 1),
        setting: deepClone(base_data)
    })
    edit_disabled.value = true
    selectScheme.value = schemeList.value.length - 1
    formatData(base_data)
    schemeSetConfig()
}
const deleteScheme = async (index) => {
    schemeList.value.splice(index, 1)
    await schemeSetConfig()
    if (schemeList.value.length) {
        selectScheme.value = schemeList.value.length - 1
        formatData(schemeList.value[schemeList.value.length - 1].setting)
        edit_disabled.value = true
    } else {
        initScheme()
    }
}
const getSchemeList = () => {
    let data = {
        type: "customer",
        key: "export_scheme"
    }
    proxy.api.post('get_public_config', data).then(res => {
        schemeList.value = JSON.parse(res.result)
    }).catch(err => {
        console.log(err, '获取导出方案失败')
    })
}
/* 导出方案相关 --end--- */

/* 保存当前修改，增删改都会触发 */
const schemeSetConfig = () => {
    let data = {
        type: "customer",
        key: "export_scheme",
        value: JSON.stringify(schemeList.value),
    }
    return new Promise(resolve => {
        proxy.api.post('set_public_config', data).then(res => {
            editIndex.value = null
            resolve()
        })
    })
}

/* 弹窗开启关闭 */
const handleCancel = () => {
    modal.visible = false
}
const handleOk = () => {
    let sheet_header = {}
    if (!customer_id.value.length) {
        proxy.$message.error('请选择需要导出的客户')
        return
    }
    if (!selected.value.length) {
        proxy.$message.error('导出字段不能为空')
        return
    }
    dataSource.value.forEach(ele => {
        if (checkMapping[ele.field]) {
            sheet_header[ele.field] = ele.rename || ele.name
        }
    })
    let data = {
        customer_id: customer_id.value,
        sheet_header: sheet_header,
        user_id: auth.getUser().id,
        file_name: file_name.value
    }

    proxy.api.post('customer_export', data).then(res => {
        if (res.code === 200) {
            proxy.$message.success(proxy.$t('success'))
            handleCancel()
        }
    })
}
const customerList = ref([])
const customer_id = ref([])
const getCustomerList = () => {
    let data = {
        page_index: 1,
        page_size: 999
    }

    proxy.api.post('customer_list', data).then(res => {
        customerList.value = res.result.data
    })
}
watch(() => modal.visible, (val) => {
    if (val) {
        customer_id.value = []
        selected.value = []
        initScheme()
        getSchemeList()
        getCustomerList()
    }
})
onMounted(() => {
    height.value = document.body.clientHeight * 0.7
})
defineExpose({ modal })
</script>
<style lang="scss" scoped>
.modal-left {
    flex: 2;
    padding-right: 16px;
    .left-item {
        display: flex;
        margin-bottom: 16px;
        align-items: flex-start;
        &:last-child {
            margin-bottom: 0;
        }
        .label {
            min-width: 100px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-right: 12px;
        }
    }
}
.split-line {
    height: calc(100% + 32px);
    margin-top: -16px;
    background: #e5e5e5;
    width: 1px;
}
.modal-right {
    flex: 1;
    padding: 0 16px;
    .label {
        height: 32px;
        line-height: 32px;
        margin-bottom: 16px;
    }
    .required {
        position: relative;
        &::before {
            position: absolute;
            content: "*";
            color: red;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .export-content {
        height: calc(100% - 48px);
        border: 1px solid #e5e5e5;
    }
}
.scheme-item {
    display: flex;
    height: 40px;
    padding: 0 12px;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .scheme-option {
        width: calc(100% - 92px);
    }

    .scheme-operation {
        display: flex;
        width: 92px;
        align-items: center;
        div {
            display: flex;
            justify-content: center;
        }
        .split {
            width: 1px;
            height: 20px;
            background: #e5e5e5;
        }
    }

    .scheme-button {
        margin: 8px auto;
    }
}
.scheme-btn {
    margin: 12px;
}
:deep(.ant-table-tbody > tr > td){
    padding: 4px 16px;
}
</style>
