export default {
    // 终端管理
    terminal_list: {
        block_mapping: "terminal",
        action: "get_terminal_list"
    },
    terminal_item: {
        block_mapping: "terminal",
        action: "get_terminal_item"
    },
    terminal_create: {
        block_mapping: "terminal",
        action: "create_terminal"
    },
    terminal_update: {
        block_mapping: "terminal",
        action: "update_terminal"
    },
    terminal_delete: {
        block_mapping: "terminal",
        action: "delete_terminal"
    },
    terminal_sync: {
        block_mapping: "terminal",
        action: "get_terminal_status"
    },
    download_last_lua_file: {
        block_mapping: "terminal",
        action: "download_last_lua_file"
    },
    terminal_restart: {
        block_mapping: "pusher",
        action: "publish_terminal_command"
    },
    upgrade_lua: {
        block_mapping: "pusher",
        action: "publish_terminal_command"
    },
    upgrade_mcu: {
        block_mapping: "pusher",
        action: "publish_terminal_command"
    },
    // 终端配置
    terminal_config_list: {
        block_mapping: "terminal_config",
        action: "get_terminal_config_list"
    },
    terminal_config_item: {
        block_mapping: "terminal_config",
        action: "get_terminal_config_item"
    },
    terminal_config_create: {
        block_mapping: "terminal_config",
        action: "create_terminal_config"
    },
    terminal_config_update: {
        block_mapping: "terminal_config",
        action: "update_terminal_config"
    },
    terminal_config_delete: {
        block_mapping: "terminal_config",
        action: "delete_terminal_config"
    },
    upgrade_config_lua: {
        block_mapping: "terminal_config",
        action: "upgrade_lua"
    },
    upgrade_config_mcu: {
        block_mapping: "terminal_config",
        action: "upgrade_mcu"
    },
    merge_config_bin: {
        block_mapping: "terminal_config",
        action: "merge_bin"
    },
    // 流量卡管理
    flowcard_list: {
        block_mapping: "iccid",
        action: "iccid_list"
    },
    flowcard_item: {
        block_mapping: "iccid",
        action: "iccid_detail"
    },
    flowcard_api_item: {
        block_mapping: "iccid",
        action: "api_iccid_info"
    },
    flowcard_create: {
        block_mapping: "iccid",
        action: "add_iccid"
    },
    delete_iccid: {
        block_mapping: "iccid",
        action: "delete_iccid"
    },
    flowcard_sync_all: {
        block_mapping: "iccid",
        action: "sync_all_data"
    },
    flowcard_sync_single: {
        block_mapping: "iccid",
        action: "sync_single_data"
    },
    flowcard_avilable_meals: {
        block_mapping: "iccid",
        action: "get_avilable_meals"
    },
    flowcard_active_card: {
        block_mapping: "iccid",
        action: "active_card"
    },
    flowcard_switch_flow_use: {
        block_mapping: "iccid",
        action: "switch_flow_use"
    },
    flowcard_switch_message_use: {
        block_mapping: "iccid",
        action: "switch_message_use"
    },
    export_iccid: {
        block_mapping: "iccid",
        action: "export_iccid"
    },
    // 栅格数据
    grid_list: {
        block_mapping: "apim",
        action: "get_grid_list"
    },

    save_terminal_user_config: {
        block_mapping: "terminal",
        action: "save_terminal_user_config"
    },

    get_terminal_user_config: {
        block_mapping: "terminal",
        action: "get_terminal_user_config"
    }
}
