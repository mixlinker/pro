<template>
	<mix-edit-page v-bind="modal" class="mix-script-parent" v-model="modal.show" @ok="handleOk" @cancel="handleCancel">
		<template #content>
			<a-card :title="$t('base_info')">
				<a-form ref="formRef" :model="form" :rules="rules" :label-col="{ style: { width: '120px' } }" autocomplete="off">
					<a-form-item :label="$t('objects.object.image')" name="image">
						<a-space :size="8">
							<div class="image-content flex-wrap flex-all">
								<img alt="" :src="previewImage()" />
							</div>
							<a-upload :file-list="fileList" :customRequest="upload">
								<div class="upload-box flex-column flex-all">
									<plus-outlined />
									{{ $t('terminal.config.upload_tips') }}
								</div>
							</a-upload>
						</a-space>
					</a-form-item>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.template')" name="object_template_id">
								<a-select
									show-search
									:placeholder="$t('please_select')"
									v-model:value="form.object_template_id"
									:virtual="false"
									@change="getObjectTplItem"
								>
									<a-select-option v-for="item in objectTplList" :key="item.uid" :value="item.uid">
										{{ item.uid + '(' + item.name + ')' }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('objects.object.alias')" name="alias">
								<a-input v-model:value="form.alias" type="text" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('objects.object.name')" name="object_name">
								<a-input v-model:value="form.object_name" type="text" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.model')" name="model">
								<a-input v-model:value="form.model" type="text" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.serial_no')" name="serial_no">
								<a-input v-model:value="form.serial_no" type="text" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="控制密码" name="control">
								<a-input v-model:value="form.control" type="text" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.customer_name')">
								<a-select
									show-search
									option-filter-prop="children"
									:placeholder="$t('please_select')"
									v-model:value="form.customer_id"
									@change="changeCustomer"
									:virtual="false"
								>
									<a-select-option v-for="item in customerList" :key="item.uid" :value="item.uid">
										{{ item.uid + '(' + item.name + ')' }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.address')">
								<a-select
									show-search
									v-model:value="form.address"
									:show-arrow="false"
									allowClear
									:filter-option="false"
									:not-found-content="null"
									@search="getSearchLocation"
									@change="checkAddress"
									:virtual="false"
								>
									<a-select-option v-for="address in addressList" :key="address.uid" :value="address.uid">
										{{ address.name }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.custom_gis')">
								<a-input v-model:value="form.custom_gis"></a-input>
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item :label="$t('objects.object.form_terminal_list')" name="terminal_list">
                        <a-button type="dashed" @click="openTerminalModal" style="margin: 0 0 14px">
                            <template #icon> <plus-outlined /></template>
                            {{ $t('objects.select_terminal') }}
                        </a-button>
                        <a-table :columns="columnsTerminal" :dataSource="checkedTerminal" :scroll="{ y: 200 }" bordered :pagination="false">
                            <template #bodyCell="{ index, column }">
                                <template v-if="column.dataIndex == 'delete'">
                                    <a @click="deleteTerminal(index)">{{ $t('delete') }}</a>
                                </template>
                            </template>
                        </a-table>
                    </a-form-item>
					<a-form-item :label="$t('objects.object.child_object_list')" name="object_list">
						<a-button type="dashed" @click="openObjectModal('Object')" style="margin: 0 0 14px">
							<template #icon> <plus-outlined /></template>
							{{ $t('select_object') }}
						</a-button>
						<a-row>
							<a-col>
								<a-table :columns="columns" :dataSource="checkedObject" :scroll="{ y: 200 }" bordered :pagination="false">
									<template #bodyCell="{ index, column }">
										<template v-if="column.dataIndex == 'delete'">
											<a @click="deleteObject(index)">{{ $t('delete') }}</a>
										</template>
									</template>
								</a-table>
							</a-col>
						</a-row>
					</a-form-item>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.tag')" name="tag">
								<div class="flex-wrap flex-center">
									<template v-for="tag in tags" :key="tag">
										<a-tooltip v-if="tag.length > 20" :title="tag">
											<a-tag :key="tag" :closable="true" @close="() => handleClose(tag)">
												{{ `${tag.slice(0, 20)}...` }}
											</a-tag>
										</a-tooltip>
										<a-tag v-else :closable="true" @close="() => handleClose(tag)">
											{{ tag }}
										</a-tag>
									</template>
									<a-input
										v-if="inputVisible"
										ref="tagInput"
										type="text"
										size="small"
										:style="{ width: '78px', marginRight: '8px' }"
										:value="inputValue"
										@change="handleInputChange"
										@blur="handleInputConfirm"
										@keyup.enter="handleInputConfirm"
									/>
									<a-tag style="background: #fff; border-style: dashed" @click="showInput">
										<plus-outlined /> {{ $t('objects.object.add_tag') }}
									</a-tag>
								</div>
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item :label="$t('objects.object.description')" name="description">
						<a-textarea v-model:value="form.description" :rows="4" />
					</a-form-item>
				</a-form>
			</a-card>
			<a-card :title="$t('addition_script')" class="mt-[12px]">
				<a-form ref="additionForm" :model="form" v-if="addition_type === 'self'" :label-col="{ style: { width: '120px' } }">
					<a-form-item :label="$t('objects.object.addition')" v-if="addition && addition.length">
						<a-collapse v-model="activeKey">
							<a-collapse-panel v-for="(item, index) in addition" :header="item.title" :name="index" :key="String(index)">
								<div class="addition-wrap flex-wrap">
									<a-space :size="8" class="flex flex-wrap">
										<div class="item flex items-center" v-for="(sub, subindex) in item.data" :key="subindex">
											<div class="subtext w-[100px] text-right pr-[8px]">{{ sub[0] }}:</div>
											<div class="name">
												<a-input
													v-model:value="sub[1]"
													:disabled="!!mappingAdition[index].data[subindex][1]"
													:placeholder="$t('please_enter')"
													:value="sub[1]"
													class="mix-input"
												></a-input>
											</div>
										</div>
									</a-space>
								</div>
							</a-collapse-panel>
						</a-collapse>
					</a-form-item>
					<div class="none-addition" v-else></div>
				</a-form>
			</a-card>
		</template>
	</mix-edit-page>
	<mix-lazy-select ref="object_modal" @ok="objectUpdateChecked"></mix-lazy-select>
	<mix-lazy-select ref="terminal_modal" @ok="terminalUpdateChecked"></mix-lazy-select>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance, nextTick } from 'vue'
import util from '@/utils/util.js'
import defaultImage from '@/assets/images/no-image-icon.gif'
import { useRoute } from 'vue-router'
const route = useRoute()
const { proxy } = getCurrentInstance()
const modal = reactive({
	show: false,
	title: '',
	id: ''
})
/* 对象logo相关 */
const fileList = ref([])
const upload = () => {}
const previewImage = () => {
	if (form.image) {
		return proxy.config.file_url + '/' + form.image
	}
	return defaultImage
}
/* 模板列表 */
const objectTplList = ref([])
const getTemplateList = () => {
	let data = {
		select: ['uid', 'name'],
		page_index: 0,
		page_size: 0
	}
	proxy.api.post('object_template_list', data).then((res) => {
		objectTplList.value = res.result.data
	})
}
const getObjectTplItem = (val) => {
	let data = {
		uid: val
	}
	proxy.api.post('object_template_item', data).then((res) => {
		if (res.code === 200) {
			let object = res.result
			form.value.object_template_id = object.uid
			form.value.image = object.image || form.value.image
			form.value.object_name = object.name
			form.value.tag = object.tag
			tags.value = object.tag
			additionInit() //重置扩展字段
			if (res.result.mapping_template) {
				getMappingTemplateItem(res.result.mapping_template)
			}
		}
	})
}
/* 客户相关 */
const customerList = ref([])
const getCustomerList = () => {
    proxy.api.post('customer_list', { select: ['id', 'uid', 'name'] }).then((res) => {
        customerList.value = res.result.data
    })
}

/* 终端相关 */
const columnsTerminal = ref([
    {
        title: proxy.$t('objects.terminal.uid'),
        dataIndex: 'uid',
        key: 'uid'
    },
    {
        title: proxy.$t('objects.terminal.name'),
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: proxy.$t('operation'),
        dataIndex: 'delete',
        key: 'delete',
        width: 80
    }
])
const checkedTerminal = ref([])
const terminal_modal = ref()
const getCheckedTerminal = (data) => {
    if(data.terminal_list && data.terminal_list.length){
        for(let i = 0; i < data.terminal_list.length; i++){
            checkedTerminal.value.push({
                name: data.terminal_name[i],
                uid: data.terminal_list[i]
            })
        }
    }
}
const deleteTerminal = (index) => {
    checkedTerminal.value.splice(index, 1)
    form.value.terminal_list.splice(index, 1)
}
const openTerminalModal = () => {
    terminal_modal.value.modal.checked = checkedTerminal.value
    terminal_modal.value.modal.block = 'terminal'
    terminal_modal.value.modal.condition = { where_and: [['type', '<>', 'Fidorin']] }
    terminal_modal.value.modal.show = true
    terminal_modal.value.modal.title = proxy.$t('objects.select_terminal')
}
const terminalUpdateChecked = (data) => {
    checkedTerminal.value = data
    form.value.terminal_list = []
    data.forEach((ele) => {
        form.value.terminal_list.push(ele.uid)
    })
}

/* 通过百度api获取具体地址 */
const addressList = ref([])
const checkAddress = (uid) => {
	let checked = addressList.value.filter((ele) => {
		return ele.uid === uid
	})
	let obj = checked[0]
	let gis = [obj.location.lat, obj.location.lng].join(',')
	form.value.address = obj.name
	form.value.custom_gis = gis
}
const getSearchLocation = (val) => {
	//query详细参数可查看百度API，https://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
	let params = {
		region: '全国', //搜索区域
		city_limit: false, //取值为"true"，仅返回region中指定城市检索结果
		ak: '8haOo8aFgfas3EWFbFG7MHBI8GbLFvYc',
		query: val,
		output: 'json',
		page_size: 20
	}
	proxy.api.get('/bdMapApi/', params).then((res) => {
		addressList.value = res.result
	})
}

/* 设置标签 */
const tags = ref([])
const tagInput = ref()
const inputVisible = ref(false)
const showInput = () => {
	inputVisible.value = true
	nextTick(() => {
		tagInput.value.focus()
	})
}
const inputValue = ref('')
const handleInputChange = (e) => {
	inputValue.value = e.target.value
}
const handleInputConfirm = () => {
	let allTag = tags.value
	if (inputValue.value && allTag.indexOf(inputValue) === -1) {
		allTag = [...allTag, inputValue.value]
	}
	tags.value = allTag
	inputValue.value = ''
	inputVisible.value = false
}
const handleClose = (removedTag) => {
	tags.value = tags.value.filter((ele) => ele !== removedTag)
}

/* 子对象相关 */
const columns = ref([
	{
		title: proxy.$t('objects.object.uid'),
		dataIndex: 'uid',
		key: 'uid'
	},
	{
		title: proxy.$t('objects.object.name'),
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: proxy.$t('operation'),
		dataIndex: 'delete',
		key: 'delete',
		width: 80
	}
])
const object_modal = ref()
const checkedObject = ref([])
const getObjectListByChild = (objects) => {
	if (objects && objects.length > 0) {
		let data = {
			where_in: JSON.stringify([['uid', objects.join(',')]]),
			select: ['name', 'uid']
		}
		proxy.api.post('object_list', data).then((res) => {
			checkedObject.value = res.result.data
		})
	}
}
const deleteObject = (index) => {
	checkedObject.value.splice(index, 1)
}
const openObjectModal = () => {
	object_modal.value.modal.checked = checkedObject.value
	object_modal.value.modal.block = 'object'
	object_modal.value.modal.condition = { where_and: [['uid', '<>', modal.id]] }
	object_modal.value.modal.show = true
	object_modal.value.modal.title = proxy.$t('sta.sta.select_object')
}
const objectUpdateChecked = (data) => {
	checkedObject.value = data
	form.value.object_list = []
	data.forEach((ele) => {
		form.value.object_list.push(ele.uid)
	})
}

/* 扩展信息相关 */
const activeKey = ref([])
const addition_type = ref('self')
const additionFrom = ref({})
const addition = ref([])
const additionRef = ref()
const mappingAdition = ref([])
const templateId = ref()
const additionInit = () => {
	activeKey.value = []
	addition_type.value = 'self'
	additionFrom.value = {
		table: undefined,
		table_create: undefined,
		table_update: undefined,
		table_view: undefined
	}
	addition.value = []
	mappingAdition.value = []
	templateId.value = ''
}
const getMappingTemplateItem = (uid) => {
	let data = {
		uid
	}
	proxy.api.post('get_mapping_template_item', data).then((res) => {
		if (res.result.addition) {
			addition_type.value = util.setAdditionType(res.result.addition)
			form.value.addition = JSON.parse(JSON.stringify(res.result.addition))
			mappingAdition.value = JSON.parse(JSON.stringify(res.result.addition))
			if (addition_type === 'tableman') {
				// this.templateId = res.result.addition.create.uid
				// this.$nextTick(() => {
				//     additionRef.value.getTemplateInfo()
				// })
			} else {
				addition.value = JSON.parse(JSON.stringify(res.result.addition))
				getActiveKey()
			}
		}
	})
}
const getActiveKey = () => {
	activeKey.value = []
	addition.value.forEach((ele, idx) => {
		activeKey.value.push(idx.toString())
	})
}

/* 表单相关*/
const formRef = ref({})
const form = ref({})
const init = () => {
	getCustomerList()
	getTemplateList()
	form.value = {
		alias: '',
		uid: ''
	}
}
const rules = reactive({
	object_template_id: [{ required: true, message: proxy.$t('objects.object.please_select_template'), trigger: 'change' }],
	object_name: [
		{ required: true, message: proxy.$t('please_enter'), trigger: 'blur' },
		{ required: true, pattern: /^[\s\S]{1,64}$/, message: proxy.$t('character_64') }
	]
})
const handleOk = async () => {
	await formRef.value
		.validateFields()
		.then(() => {
			sendPost()
		})
		.catch((e) => {
			console.log(e)
		})
}
const sendPost = () => {
	let saveData = { ...form.value }
    if(saveData.category){
        delete saveData.category
    }
	saveData.addition = saveData.addition ? JSON.stringify(saveData.addition) : '[]'
	proxy.api
		.post('object_create_by_tpl', saveData)
		.then((res) => {
			proxy.$message.success(proxy.$t('success'))
			proxy.$parent.reload()
			handleCancel()
		})
		.catch((e) => {
			proxy.$parent.reload() //当报错且实例创建成功时，刷新对象列表，防止ag-grid报错
		})
}
const handleCancel = () => {
	modal.show = false
}

/* tableman相关 */
const tableObject = ref({})
const tableList = ref([])
const viewObject = ref({})
const viewList = ref([])

watch(
	() => modal.show,
	(val) => {
		if (val) {
			init()
			additionInit()
		}
	}
)

defineExpose({ modal })
</script>

<style lang="scss" scoped>
:deep(.ant-form-horizontal .ant-form-item-label) {
	width: 120px;
}
</style>
