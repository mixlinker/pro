export default {
    "Block_Menu_View_ID": 1,
    "Block_Menu_View_Name": "设备列表",
    "Block_Menu_View_Path": "/object/object/list",
    "Block_Menu_View_Sort": 1,
    "Block_Menu_View_Type": "list",
    "Block_Menu_View_Alias": "All_mapping",
    "Block_Menu_View_Content": {
        "Command": [],
        "Operation": [
            {
                "name": "详情",
                "tabs": [
                    {
                        "name": "基本信息",
                        "checked": true,
                        "tab_key": "baseinfo",
                        "is_default": 1
                    },
                    {
                        "name": "设备监控",
                        "checked": true,
                        "tab_key": "view",
                        "is_default": 1
                    },
                    {
                        "name": "历史数据",
                        "checked": true,
                        "tab_key": "history",
                        "is_default": 1
                    },
                    {
                        "name": "参数列表",
                        "checked": true,
                        "tab_key": "fv",
                        "is_default": 1
                    },
                    {
                        "name": "手动录入",
                        "checked": true,
                        "tab_key": "collect",
                        "is_default": 1
                    },
                    {
                        "name": "适配器列表",
                        "checked": true,
                        "tab_key": "terminal",
                        "is_default": 1
                    },
                    {
                        "name": "子设备列表",
                        "checked": true,
                        "tab_key": "child",
                        "is_default": 1
                    },
                    {
                        "name": "历程列表",
                        "checked": true,
                        "tab_key": "retainer",
                        "is_default": 1
                    }
                ],
                "type": "item",
                "role_checked": true
            }
        ],
        "List_Fields": [
            {
                "name": "对象编号",
                "type": "list",
                "field": "uid",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "对象别名",
                "type": "list",
                "field": "alias",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "对象名称",
                "type": "list",
                "field": "name",
                "checked": true,
                "tag_able": 2
            },
            {
                "name": "创建方式",
                "type": "list",
                "field": "create_by_tpl",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "模板编号",
                "type": "list",
                "field": "tpl_uid",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "模板名称",
                "type": "list",
                "field": "tpl_name",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "模板别名",
                "type": "list",
                "field": "tpl_alias",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "客户名称",
                "type": "list",
                "field": "customer_name",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "关联终端",
                "type": "list",
                "field": "terminal_list",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "关联映射表",
                "type": "list",
                "field": "mapping_name",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "标签",
                "type": "list",
                "field": "tag",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "省份",
                "type": "list",
                "field": "province",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "市/区",
                "type": "list",
                "field": "city",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "描述",
                "type": "list",
                "field": "description",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "创建时间",
                "type": "list",
                "field": "created",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "更新时间",
                "type": "list",
                "field": "last_modified",
                "checked": true,
                "tag_able": 0
            }
        ],
        "Conditions_Fields": [
            {
                "name": "对象名称",
                "type": "input",
                "field": "name"
            },
            {
                "name": "对象编号",
                "type": "input",
                "field": "uid",
                "xxx": ""
            },
            {
                "name": "对象别名",
                "type": "input",
                "field": "alias"
            },
            {
                "field": "create_by_tpl",
                "name": "创建方式",
                "type": "select"
            },
            {
                "field": "customer_id",
                "name": "客户编号",
                "type": "input"
            },
            {
                "field": "customer_name",
                "name": "客户名称",
                "type": "input"
            },
            {
                "field": "terminal_list",
                "name": "关联终端",
                "type": "input",
                "xxx": ""
            },
            {
                "field": "mapping_id",
                "name": "关联映射表",
                "type": "input"
            },
            {
                "field": "tag",
                "name": "标签",
                "type": "input"
            },
            {
                "field": "province",
                "name": "省份",
                "type": "input"
            },
            {
                "field": "city",
                "name": "市/区",
                "type": "input"
            },
            {
                "name": "创建时间",
                "type": "timepicker",
                "field": "created"
            }
        ],
        "Condition_Selected": {},
        "Field_Able_Edit": true
    },
    "Block_Menu_View_Component": "objectList",
    "Block_Menu_View_IsVisible": 1,
    "Is_Default_Block_Menu_View": 1,
    "Block_Menu_View_Info": {
        "Block_Alias": "Objects"
    }
}