export default {
    /* 账户 */
    billing_account_list: {block_mapping: "billing", action: "get_account_list"},
    get_account_select: {block_mapping: "billing", action: "get_account_select"}, //获取全部账户
    billing_account_item: {block_mapping: "billing", action: "get_account_item"},
    billing_account_enable: {block_mapping: "billing", action: "enable_account"},
    billing_account_disable: {block_mapping: "billing", action: "disable_account"},
    billing_account_set_tags: {block_mapping: "billing", action: "set_account_tags"},

    /* 标签 */
    billing_tag_list: {block_mapping: "billing", action: "get_tag_list"},
    billing_tag_account_list: {block_mapping: "billing", action: "get_tag_accounts"},
    billing_tag_item: {block_mapping: "billing", action: "get_tag_item"},
    billing_tag_create: {block_mapping: "billing", action: "create_tag"},
    billing_tag_delete: {block_mapping: "billing", action: "delete_tag"},
    billing_tag_update: {block_mapping: "billing", action: "update_tag"},
    billing_tag_enable: {block_mapping: "billing", action: "enable_tag"},
    billing_tag_disable: {block_mapping: "billing", action: "disable_tag"},

    /* 账单 */
    billing_bill_list: {block_mapping: "billing", action: "get_bill_list"},
    billing_manual_bill: {block_mapping: "billing", action: "manual_bill"},//手动记账
    export_bill_list: {block_mapping: "billing", action: "export_bill_list"}, //导出账单
    bill_export_record_list: {block_mapping: "billing", action: "get_export_list"}, //导出账单
    bill_export_record_delete: {block_mapping: "billing", action: "delete_export"}, //导出账单

    /* 资费项 */
    billing_expenses_list: {block_mapping: "billing", action: "get_rate_list"},
    get_rate_select: {block_mapping: "billing", action: "get_rate_select"},
    billing_expenses_item: {block_mapping: "billing", action: "get_rate_item"},
    billing_expenses_create: {block_mapping: "billing", action: "create_rate"},
    billing_expenses_update: {block_mapping: "billing", action: "update_rate"},
    billing_rate_disable: {block_mapping: "billing", action: "disable_rate"},
    billing_rate_enable: {block_mapping: "billing", action: "enable_rate"},

    /* 计费项目 */
    billing_project_list: {block_mapping: "billing", action: "get_program_list"},
    billing_project_item: {block_mapping: "billing", action: "get_program_item"},
    billing_project_create: {block_mapping: "billing", action: "create_program"},
    billing_project_update: {block_mapping: "billing", action: "update_program"},
    billing_project_delete: {block_mapping: "billing", action: "delete_program"},
    billing_project_disable: {block_mapping: "billing", action: "disable_program"},
    billing_project_enable: {block_mapping: "billing", action: "enable_program"},
    billing_project_set_rate: {block_mapping: "billing", action: "set_program_rate_list"},
}