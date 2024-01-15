export default {
    company_list: { block_mapping: "mixauth", action: "get_company_list" },
    company_item: { block_mapping: "mixauth", action: "get_company_item" },
    company_create: { block_mapping: "mixauth", action: "create_company" },
    company_update: { block_mapping: "mixauth", action: "update_company" },
    company_delete: { block_mapping: "mixauth", action: "delete_company" },
    company_examine: { block_mapping: "mixauth", action: "examine_company" },
    reject_company: { block_mapping: "mixauth", action: "reject_company" },
    get_node_list: { block_mapping: "k8shelper", action: "get_node_list" },
    get_v8_mobile_shortcut: { block_mapping: "mixauth", action: "get_v8_mobile_shortcut" },//获取可授权APP应用
    get_v8_shortcut: { block_mapping: "mixauth", action: "get_v8_shortcut" },//获取可授权PC应用
    enable_company_active: { block_mapping: "mixauth", action: "enable_company_active" },//设置组织有效
    disable_company_active: { block_mapping: "mixauth", action: "disable_company_active" },//设置组织无效
    check_namespace_exists: { block_mapping: "k8shelper", action: "check_namespace_exists" },//检查命名空间是否重复
    company_bind_shortcut: { block_mapping: "k8shelper", action: "company_bind_shortcut" },//授权应用
    get_slave_company_shortcut: { block_mapping: "mixauth", action: "get_slave_company_shortcut" },//获取授权应用
    get_slave_company_mobile_shortcut: { block_mapping: "mixauth", action: "get_slave_company_mobile_shortcut" },//获取授权应用
    disable_slave_company_shortcut: { block_mapping: "mixauth", action: "disable_slave_company_shortcut" },//取消授权应用
    shortcut_bind_company: { block_mapping: "k8shelper", action: "shortcut_bind_company" },//授权组织
}
