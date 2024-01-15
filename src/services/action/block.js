//可访问的接口路由
export default {
    shortcut_list: { block_mapping: "mixauth", action: "get_shortcut_list" },
    shortcut_item: { block_mapping: "mixauth", action: "get_shortcut_item" },
    get_shortcut_item: { block_mapping: "mixauth", action: "get_shortcut_view_by_shortcut" },
    shortcut_update: { block_mapping: "mixauth", action: "update_shortcut" },
    shortcut_create: { block_mapping: "mixauth", action: "create_shortcut" },
    shortcut_delete: { block_mapping: "mixauth", action: "delete_shortcut" },
    bind_shortcut: { block_mapping: "mixauth", action: "bind_shortcut_view" },
    bind_role_shortcut_view: { block_mapping: "mixauth", action: "bind_role_shortcut_view" },
    get_shortcut_list_by_role: { block_mapping: "mixauth", action: "get_shortcut_list_by_role" },
    get_view_setting_list: { block_mapping: "mixauth", action: "get_view_setting_list" }, //获取默认应用脚本列表
    get_shortcut_view_for_role: { block_mapping: "mixauth", action: "get_shortcut_view_for_role" },
    get_shortcut_item_by_role: { block_mapping: "mixauth", action: "get_shortcut_item_by_role" },
    check_empower_exists: { block_mapping: "mixauth", action: "check_empower_exists" },
}
