<template>
	<mix-edit-page v-bind="modal" class="mix-script-parent" v-model="modal.show" @ok="handleOk" @cancel="handleCancel">
		<template #content>
			<a-card :title="$t('base_info')">
				<a-form ref="formRef" :model="form" :rules="rules" :label-col="{ style: { width: '120px' } }" autocomplete="off">
					<a-form-item :label="$t('objects.object.image')" name="image">
						<a-space :size="8">
							<div class="image-content flex-wrap flex-all">
								<img alt="" :src="previewImage" />
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
						<a-col :span="8" v-if="modal.id">
							<a-form-item has-feedback :label="$t('objects.object.uid')" name="uid">
								<a-input v-model:value="form.uid" :disabled="!!modal.id" type="text" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('objects.object.name')" name="name">
								<a-input v-model:value="form.name" type="text" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('objects.object.alias')" name="alias">
								<a-input v-model:value="form.alias" type="text" />
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
					</a-row>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.customer_name')">
								<a-select
									show-search
									option-filter-prop="children"
									:placeholder="$t('please_select')"
									v-model:value="form.customer_id"
									:virtual="false"
								>
									<a-select-option v-for="item in customerList" :key="item.uid" :value="item.uid">
										{{ item.uid + '(' + item.name + ')' }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
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
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item ref="mappingId" :label="$t('objects.object.mapping_id')" name="mapping_id">
								<a-select
									show-search
									option-filter-prop="children"
									v-model:value="form.mapping_id"
									:disabled="!!form.create_by_tpl"
									:placeholder="$t('please_select')"
									@change="changeMapping"
									:virtual="false"
								>
									<a-select-option v-for="item in mappingList" :key="item.uid" :value="item.uid">{{ item.name }} </a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item ref="controlId" :label="$t('objects.object.control_id')" name="control_id">
								<a-select
									show-search
									allowClear
									:virtual="false"
									:disabled="!!form.create_by_tpl"
									option-filter-prop="children"
									v-model:value="form.control_id"
									:placeholder="$t('please_select')"
								>
									<a-select-option v-for="item in controlList" :key="item.uid" :value="item.uid">{{ item.name }} </a-select-option>
								</a-select>
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
							<a-form-item :label="$t('objects.dashboard.pro')">
								<a-select
									show-search
									:virtual="false"
									:disabled="!!form.create_by_tpl"
									:maxTagCount="1"
									:placeholder="$t('please_select')"
									v-model:value="dashboard.pro"
								>
									<a-select-option
										v-for="item in dashboardList.filter((ele) => ['pro', 'PRO'].includes(ele.type))"
										:key="item.uid"
										:value="item.uid"
									>
										{{ item.name }}({{ item.type ? $t(`objects.dashboard.${item.type.toLowerCase()}`) : '' }})
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item :label="$t('objects.dashboard.app')">
								<a-select
									show-search
									:virtual="false"
									:disabled="!!form.create_by_tpl"
									:maxTagCount="1"
									:placeholder="$t('please_select')"
									v-model:value="dashboard.app"
								>
									<a-select-option v-for="item in dashboardList.filter((ele) => ele.type === 'app')" :key="item.uid" :value="item.uid">
										{{ item.name }}({{ item.type ? $t(`objects.dashboard.${item.type.toLowerCase()}`) : '' }})
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item :label="$t('objects.dashboard.show')">
								<a-select
									show-search
									:virtual="false"
									:disabled="!!form.create_by_tpl"
									:maxTagCount="1"
									:placeholder="$t('please_select')"
									v-model:value="dashboard.show"
								>
									<a-select-option
										v-for="item in dashboardList.filter((ele) => ['show', 'SHOW'].includes(ele.type))"
										:key="item.uid"
										:value="item.uid"
									>
										{{ item.name }}({{ item.type ? $t(`objects.dashboard.${item.type.toLowerCase()}`) : '' }})
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item :label="$t('objects.object.collect_list')" has-feedback>
						<a-button type="dashed" @click="openCollectModal" style="margin: 0 0 14px">
							<template #icon> <plus-outlined /></template>
							{{ $t('objects.select_collect') }}
						</a-button>
						<a-table :columns="columnsCollect" :dataSource="checkedCollect" :scroll="{ y: 200 }" bordered :pagination="false">
							<template #bodyCell="{ index, column }">
								<template v-if="column.dataIndex == 'delete'">
									<a @click="deleteCollect(index)">{{ $t('delete') }}</a>
								</template>
							</template>
						</a-table>
					</a-form-item>
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
						<a-table :columns="columns" :dataSource="checkedObject" :scroll="{ y: 200 }" bordered :pagination="false">
							<template #bodyCell="{ index, column }">
								<template v-if="column.dataIndex == 'delete'">
									<a @click="deleteObject(index)">{{ $t('delete') }}</a>
								</template>
							</template>
						</a-table>
					</a-form-item>
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
						<a-col :span="8">
							<a-form-item :label="$t('objects.object.gis')" name="gis">
								<a-input v-model:value="form.gis" disabled type="text" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="[10]">
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('customer.province')">
								<a-select
									show-search
									v-model:value="form.province"
									:placeholder="$t('please_select')"
									@change="getCurrentProvCities"
									:virtual="false"
								>
									<a-select-option v-for="item in provinces" :key="item.value" :value="item.value">
										{{ item.label }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item has-feedback :label="$t('customer.city')">
								<a-select
									show-search
									option-filter-prop="children"
									v-model:value="form.city"
									:placeholder="$t('please_select')"
									:virtual="false"
								>
									<a-select-option v-for="item in cities" :key="item.label" :value="item.label">{{ item.label }} </a-select-option>
								</a-select>
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
	<mix-lazy-select ref="terminal_modal" :showsort="true" @ok="terminalUpdateChecked"></mix-lazy-select>
	<mix-lazy-select ref="collect_modal" :showsort="true" @ok="collectUpdateChecked"></mix-lazy-select>
</template>

<script setup>
import { reactive, ref, watch, getCurrentInstance, nextTick, computed } from 'vue'
import util from '@/utils/util.js'
import defaultImage from '@/assets/images/no-image-icon.gif'
import map from '@/utils/map'
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
const upload = (item) => {
	let fd = new FormData()
	fd.append('file', item.file) //传文件
	fd.append('system', 'mixapplication/object')
	fd.append('name', '对象图片')
	fd.append('type', 'video')
	let fileSize = item.file.size
	if (fileSize > 15728640) {
		proxy.$message.error(self.$t('img_size_limit'))
	}
	proxy.api.upload('upload', fd).then((res) => {
		form.value.image = res.result.url
	})
}
const previewImage = computed(() => {
	if (form.value.image) {
		return proxy.config.file_url + '/' + form.value.image
	}
	return defaultImage
})
/* 客户相关 */
const customerList = ref([])
const customerProjectList = ref([])
const getCustomerList = () => {
	proxy.api.post('customer_list', { select: ['id', 'uid', 'name'] }).then((res) => {
		customerList.value = res.result.data
	})
}

/* 映射表相关 */
const mappingList = ref([])
const new_table = ref(false)
const templateId = ref('')
const tableId = ref('')
const getMappingList = () => {
	proxy.api.post('mapping_list', { select: ['id', 'uid', 'name', 'addition'] }).then((res) => {
		mappingList.value = res.result.data
	})
}
/* 控制码相关 */
const controlList = ref([])
const getControlList = () => {
	proxy.api.post('control_list', { select: ['id', 'uid', 'name'] }).then((res) => {
		controlList.value = res.result.data
	})
}

/* 显示板相关 */
const dashboardList = ref([])
const dashboard = reactive({
	pro: '',
	app: '',
	show: ''
})
const getDashboardList = () => {
	proxy.api.post('dashboard_list', { select: ['id', 'uid', 'name', 'type'] }).then((res) => {
		dashboardList.value = res.result.data
	})
}
const getDashboardObject = (result) => {
	if (result.dashboard_list.length) {
		result.dashboard_list.forEach((ele) => {
			dashboard[ele.type.toLowerCase()] = ele.uid
		})
	}
}

/* 离线相关 */
const columnsCollect = ref([
	{
		title: proxy.$t('collect.uid'),
		dataIndex: 'uid',
		key: 'uid'
	},
	{
		title: proxy.$t('collect.name'),
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
const checkedCollect = ref([])
const collect_modal = ref()
const getCheckedCollect = (data) => {
	if (data.collect_list && data.collect_list.length) {
		for (let i = 0; i < data.collect_list.length; i++) {
			checkedCollect.value.push({
				name: data.collect_name[i],
				uid: data.collect_list[i]
			})
		}
	}
}
const deleteCollect = (index) => {
	checkedCollect.value.splice(index, 1)
	form.value.collect_list.splice(index, 1)
}
const openCollectModal = () => {
	collect_modal.value.modal.checked = checkedCollect.value
	collect_modal.value.modal.block = 'collect'
	collect_modal.value.modal.show = true
	collect_modal.value.modal.title = proxy.$t('objects.select_collect')
}
const collectUpdateChecked = (data) => {
	console.log(data,'data')
	checkedCollect.value = data
	form.value.collect_list = []
	data.forEach((ele) => {
		form.value.collect_list.push(ele.uid)
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
	if (data.terminal_list && data.terminal_list.length) {
		for (let i = 0; i < data.terminal_list.length; i++) {
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

/* 省份、市区设置 */
const provinces = ref(map.map)
const cities = ref([])
const getCurrentProvCities = (value, state) => {
	for (let v of provinces.value) {
		if (value === v.value) {
			cities.value = v.children
			form.value.city = state === 'init' ? form.value.city : v.children[0].value
			break
		}
	}
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
	form.value.object_list.splice(index, 1)
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
const additionFrom = reactive({
	table: undefined,
	table_create: undefined,
	table_update: undefined,
	table_view: undefined
})
const addition = ref([])
const additionRef = ref()
const mappingAdition = ref([])
const changeMapping = (value, param) => {
	let selectMapping = {}
	mappingAdition.value = []
	mappingList.value.forEach((item) => {
		if (item.uid === value) {
			selectMapping = item
		}
	})
	new_table.value = param !== 'first' ? true : false
	selectMapping.addition = selectMapping.addition ? selectMapping.addition : []
	addition_type.value = util.setAdditionType(selectMapping.addition)
	if (addition_type.value === 'tableman') {
		//编辑对象时比较映射表的扩展字段是否改变
		//1，数据表不变时，视图全部以映射表扩展字段为模板更新，视图数据ID以当前对象原有的数据ID
		//2，数据表变化则对象的扩展字段直接复制映射表的扩展字段
		addition.value = {
			table: selectMapping.addition.table,
			view: selectMapping.addition.view,
			create: selectMapping.addition.create,
			update: selectMapping.addition.update
		}
		if (modal.id) {
			new_table.value = false
			if (form.value.addition && form.value.addition.table && form.value.addition.table.uid === selectMapping.addition.table.uid) {
				templateId.value = selectMapping.addition.update.uid
				tableId.value = form.value.addition.uid
				addition.value.uid = form.value.addition.uid
			} else {
				new_table.value = true
				templateId.value = selectMapping.addition.create.uid
			}
		} else {
			//添加对象时，直接使用映射表扩展字段
			templateId.value = selectMapping.addition.create.uid
			new_table.value = true
		}
		let current = new_table.value ? 'create' : 'update'
		/* tableman获取表单信息 */
		// nextTick(() => {
		//     this.$refs[current]['getTemplateInfo']()
		// })
	} else {
		addition_type.value = 'self'
		if (Array.isArray(selectMapping.addition) && selectMapping.addition.length) {
			addition.value = util.setCustomAddition(selectMapping.addition, form.value.addition)
		} else {
			addition.value = selectMapping.addition
		}
		addition.value && getActiveKey()
	}
	mappingAdition.value = addition.value && addition_type.value === 'self' ? [...selectMapping.addition] : []
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
	getControlList()
	getMappingList()
	getDashboardList()
	form.value = {
		alias: '',
		uid: ''
	}
	tags.value = []
	checkedTerminal.value = []
	checkedCollect.value = []
	checkedObject.value = []
	dashboard.pro = ''
	dashboard.show = ''
	dashboard.app = ''
	addition.value = []
}
const rules = reactive({
	name: [{ required: true, message: proxy.$t('objects.object.please_enter_name'), trigger: 'blur' }],
	mapping_id: [{ required: true, message: proxy.$t('objects.object.please_select_mapping'), trigger: 'change' }]
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
	delete form.value.object_fv_map
	let saveData = { ...form.value }
	if (saveData.category) {
		delete saveData.category
	}
	saveData.addition = JSON.stringify(addition.value)
	saveData.tag = tags.value
	saveData.dashboard_list = [] //重置dashboard_list字段，
	//当前已设置的不同类型的显示板UID加入到dashboard_list中；
	for (let k in dashboard) {
		if (dashboard[k]) {
			saveData.dashboard_list.push(dashboard[k])
		}
	}
	let action = modal.id ? 'object_update' : 'object_create'
	proxy.api.post(action, saveData).then((res) => {
		handleCancel()
		proxy.$parent.getList()
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

const getItem = () => {
	let data = {
		uid: modal.id
	}
	proxy.api.post('object_item', data).then((res) => {
		form.value = res.result
		if (!form.value.tag) {
			form.value.tag = []
		} else {
			tags.value = form.value.tag
		}
		// addition_type.value = util.setAdditionType(form.value.addition)
		changeMapping(form.value.mapping_id, 'first')
		getCheckedTerminal(res.result)
		getCheckedCollect(res.result)
		getDashboardObject(res.result)
		form.value.collect_list = res.result.collect_list ?? []
		getObjectListByChild(res.result.object_list)
		if (res.result.province) {
			getCurrentProvCities(res.result.province, 'init')
		}
	})
}

watch(
	() => modal.show,
	(val) => {
		if (val) {
			init()
			modal.id && getItem()
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
