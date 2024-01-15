export default {
    "Block_Menu_View_ID": 1,
    "Block_Menu_View_Name": "历程记录",
    "Block_Menu_View_Path": "/retainer/record/list",
    "Block_Menu_View_Sort": 1,
    "Block_Menu_View_Type": "list",
    "Block_Menu_View_Alias": "retainerRecordList",
    "Block_Menu_View_Oder_By": "id",
    "Block_Menu_View_Oder_Type": "desc",
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
                    }
                ],
                "type": "item",
                "checked": true
            }
        ],
        "List_Fields": [
            {
                "name": "历程编码",
                "type": "list",
                "field": "code",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "历程名称(中文)",
                "type": "list",
                "field": "label_cn",
                "checked": true,
                "tag_able": 2
            },
            {
                "name": "历程名称(英文)",
                "type": "list",
                "field": "label_en",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "历程类型",
                "type": "list",
                "field": "category",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "对象编号",
                "type": "list",
                "field": "object_id",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "对象名称",
                "type": "list",
                "field": "object_name",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "型号",
                "type": "list",
                "field": "model",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "客户名称",
                "type": "list",
                "field": "customer_name",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "状态",
                "type": "list",
                "field": "retained",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "开始时间",
                "type": "list",
                "field": "opened_at",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "持续时间",
                "type": "list",
                "field": "elapsed",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "统计结果",
                "type": "list",
                "field": "statis_result",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "结束时间",
                "type": "list",
                "field": "close_at",
                "checked": true,
                "tag_able": 0
            }
        ],
        "Conditions_Fields": [
            {
                "name": "历程编码",
                "type": "input",
                "field": "code"
            },
            {
                "name": "历程名称(中文)",
                "type": "input",
                "field": "label_cn"
            },
            {
                "name": "历程名称(英文)",
                "type": "input",
                "field": "label_en"
            },
            {
                "name": "开始时间",
                "type": "timepicker",
                "field": "opened_at"
            }
        ],
        "Condition_Selected": {

        }
    },
    "Block_Menu_View_Component": "retainerRecordList",
    "Block_Menu_View_IsVisible": 1,
    "Is_Default_Block_Menu_View": 1,
    "Block_Menu_View_Info": {
        "Block_Alias": "Retainers"
    }
}