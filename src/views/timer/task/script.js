export default {
    "Block_Menu_View_ID": 1,
    "Block_Menu_View_Name": "维保列表",
    "Block_Menu_View_Path": "/timer/task/list",
    "Block_Menu_View_Sort": 1,
    "Block_Menu_View_Type": "list",
    "Block_Menu_View_Alias": "timerTaskList",
    "Block_Menu_View_Content": {
        "Command": [],
        "Operation": [
            {
                "name": "详情",
                "type": "item",
                "role_checked": true,
                "tabs": [
                    {
                        "name": "基本信息",
                        "checked": true,
                        "tab_key": "baseInfo",
                        "is_default": 1
                    },
                    {
                        "name": "处理记录",
                        "checked": true,
                        "tab_key": "recordList",
                        "is_default": 1
                    }
                ]
            }
        ],
        "List_Fields": [
            {
                "name": "维保编号",
                "type": "list",
                "field": "uid",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "维保名称",
                "type": "list",
                "field": "name",
                "checked": true,
                "tag_able": 2
            },
            {
                "name": "维保类型",
                "type": "list",
                "field": "cycle_type",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "维保规则",
                "type": "list",
                "field": "rule_name",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "对象名称",
                "type": "list",
                "field": "object_name",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "任务状态",
                "type": "list",
                "field": "countdown",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "使用/额定次数",
                "type": "list",
                "field": "times",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "控制",
                "type": "list",
                "field": "is_active",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "首次维保时间",
                "type": "list",
                "field": "first_handle_time",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "创建时间",
                "type": "list",
                "field": "created",
                "checked": true,
                "tag_able": 0
            }
        ],
        "Conditions_Fields": [
            {
                "name": "维保编号",
                "type": "input",
                "field": "uid"
            },
            {
                "name": "维保名称",
                "type": "input",
                "field": "name"
            },
            {
                "name": "对象名称",
                "type": "input",
                "field": "object_name"
            },
            {
                "name": "对象编号",
                "type": "input",
                "field": "object_id"
            }

        ],
        "Condition_Selected": {}
    },
    "Block_Menu_View_Component": "timerTaskList",
    "Block_Menu_View_IsVisible": 1,
    "Is_Default_Block_Menu_View": 1,
    "Block_Menu_View_Info": {
        "Block_Alias": "Maintenances"
    }
}