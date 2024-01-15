export default {
    "Block_Menu_View_ID": 1,
    "Block_Menu_View_Name": "报表管理",
    "Block_Menu_View_Path": "/report/result/list",
    "Block_Menu_View_Sort": 1,
    "Block_Menu_View_Type": "list",
    "Block_Menu_View_Alias": "reportResultList",
    "Block_Menu_View_Content": {
        "Command": [],
        "Operation": [
            {
                "name": "下载",
                "type": "download",
                "role_checked": true
            },
            {
                "name": "预览",
                "type": "preview",
                "role_checked": true
            }
        ],
        "List_Fields": [
            {
                "name": "结果编号",
                "type": "list",
                "field": "uid",
                "checked": true,
                "tag_able": 1
            },
            {
                "name": "报表名称",
                "type": "list",
                "field": "project_name",
                "checked": true,
                "tag_able": 2
            },
            {
                "name": "报表类型",
                "type": "list",
                "field": "plan_type",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "任务编号",
                "type": "list",
                "field": "plan_uid",
                "checked": true,
                "tag_able": 0
            },
            {
                "name": "结果状态",
                "type": "list",
                "field": "status",
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
                "name": "结果编号",
                "type": "input",
                "field": "uid"
            },
            {
                "name": "报表名称",
                "type": "input",
                "field": "project_name"
            }

        ],
        "Condition_Selected": {}
    },
    "Block_Menu_View_Component": "reportResultList",
    "Block_Menu_View_IsVisible": 1,
    "Is_Default_Block_Menu_View": 1,
    "Block_Menu_View_Info": {
        "Block_Alias": "Reports"
    }
}