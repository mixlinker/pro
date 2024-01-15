
import { ref } from 'vue';
import { useNow, useDateFormat } from '@vueuse/core'
import router from '@/router/index.js'


export const useAnalyScript = (script) => {
    const menuList = ref([])
    menuList.value = script.Block_Menu.map(item => {
        let obj = {}
        obj.Block_Menu_Name = item.Block_Menu_Name;
        obj.Block_Menu_ID = item.Block_Menu_ID
        return obj
    })
    return {
        menuList
    }
}

export const useFormatScript = (script, baseColumns, selectList) => {
    const commandButtons = ref({})
    const localButtons = ref([])
    const condition = ref([])
    const columns = ref([])
    const title_field = ref([])
    const search_field = ref([])
    const authStatus = ref(true)
    let field_auth = {}
    let search_auth = {}
    const initData = () => {
        script.Block_Menu_View_Content.Command.forEach(ele => {
            commandButtons.value[ele.type] = ele
        })
        localButtons.value = script.Block_Menu_View_Content.Operation
        script.Block_Menu_View_Content.Conditions_Fields.forEach(ele => {
            search_auth[ele.field] = true
        })
        /* 搜索项基于脚本中Conditions_Fields，以及字段是否显示来确定展示与否 */
        script.Block_Menu_View_Content.List_Fields.forEach(ele => {
            field_auth[ele.field] = ele.checked
            if (Object.keys(search_auth).includes(ele.field)) {
                search_auth[ele.field] = ele.checked
            }
            //字段重新命名且与默认名称不一致时，列表展示的名称为重命名名称，重命名名称不支持国际化
            if (ele.rename && ele.rename !== ele.name) {
                baseColumns.forEach(item => {
                    if (ele.field === item.field) {
                        item.headerName = ele.rename
                    }
                })
            }
            if (ele.type !== 'list') {
                //对象管理动态字段设置,实时数据才需要使用组件展示，列表和扩展字段直接展示
                let obj = { field: ele.field, headerName: ele.rename || ele.name, width: 180 }
                if (ele.type === 'mosaic') {
                    obj.cellRenderer = 'ag-mosaic-data',
                        obj.cellRendererParams = {
                            type: ele.category,
                            options: ele.params,
                            text: ele.isText
                        }
                }
                baseColumns.push(obj)
            }
        })
        title_field.value = script.Block_Menu_View_Content.List_Fields.filter(ele => ele.tag_able === 2)[0]?.field
        condition.value = script.Block_Menu_View_Content.Condition_Selected
        columns.value = baseColumns.filter((ele) => field_auth[ele.field])
        search_field.value = selectList.filter(ele => search_auth[ele.value])
    }
    initData()
    return {
        commandButtons,
        localButtons,
        condition,
        columns,
        title_field,
        search_field,
        authStatus,
    }
}

export const useFormatFV = (str) => {
    const SFV_List = {
        now_time: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'),
        current_list_id: router.currentRoute?.value?.params?.id
    }
    let reg = new RegExp(/\$\{(GFV|TFV|EFV|SFV)\(([\w\.]+)\)\}/, "g");
    let arr = reg.exec(str)
    if (arr == null) {
        return null
    } else {
        let SFV = arr[2]
        return SFV_List[SFV]
    }
}

export const useInitParams = (pager, mix_top_operation, condition = null, order = null) => {
    let data = {
        where_and: [],
        page_size: pager.pageSize,
        page_index: pager.current
    }
    if (order) {
        data.order_by = order.order_by
        data.order_type = order.order_type
    }
    let search = mix_top_operation.value.top_params
    if (search.searchValue) {
        data.where_and.push([
            search.searchKey,
            search.searchOption,
            search.searchOption === 'like' ? `%${search.searchValue}%` : search.searchValue
        ])
    }
    if (search.searchRangeTime && search.searchRangeTime.length > 0) {
        data.where_and.push(['created', '>=', search.searchRangeTime[0]]);
        data.where_and.push(['created', '<=', search.searchRangeTime[1]]);
    }
    if (condition && condition.value.where_and && condition.value.where_and.length) {
        data.where_and = [...data.where_and, ...condition.value.where_and]
    }
    if (condition && condition.value.where_or && condition.value.where_or.length) {
        data.where_or = [...data.where_or, ...condition.value.where_or]
    }
    let { opt, conditions } = search.condition
    if (conditions && conditions.length && conditions[0][0]) {
        conditions.forEach((con) => {
            let con1 = useAddLikeMark(con)
            opt === "and" ? data.where_and.push(con1) : data.where_or.push(con1)
        })
    }
    data.where_and.forEach(item => {
        if (useFormatFV(item[2]) != null) {
            item[2] = useFormatFV(item[2]).value || useFormatFV(item[2])
        }
    })
    data.where_and = JSON.stringify(data.where_and)
    return data
}

/* 搜索条件类型为like时，条件内容前后加 % */
export const useAddLikeMark = (val) => {
    if (!val[0]) return ''
    if (val[1] === 'like') {
        let keyWord = `%${val[2]}%`
        return [val[0], val[1], keyWord]
    }
    return val
}