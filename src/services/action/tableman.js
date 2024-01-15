export default {
    //数据表
    get_user_by_token: { block_mapping: "mixauth", action: "get_user_by_token" },
    table_list: { block_mapping: "tableman", action: "get_table_list" },
    table_item: { block_mapping: "tableman", action: "get_table_item" },
    table_create: { block_mapping: "tableman", action: "create_table" },
    table_update: { block_mapping: "tableman", action: "update_table" },
    table_delete: { block_mapping: "tableman", action: "delete_table" },

    new_table_item: { block_mapping: "new_tableman", action: "get_table_item" },
    new_table_list: { block_mapping: "new_tableman", action: "get_table_list" },


    get_table_field_data: { block_mapping: "tableman", action: "get_table_field_data" },
    api_table_data: { block_mapping: "tableman", action: "api_table_data" },

    field_list: { block_mapping: "tableman", action: "get_field_list" },
    new_field_list: { block_mapping: "new_tableman", action: "get_field_list" },//字段列表
    field_item: { block_mapping: "tableman", action: "get_field_item" },
    new_field_item: { block_mapping: "new_tableman", action: "get_field_item" },//获取字段详情
    field_create: { block_mapping: "tableman", action: "create_field" },
    field_update: { block_mapping: "tableman", action: "update_field" },
    field_delete: { block_mapping: "tableman", action: "delete_field" },

    //条件
    condition_list: { block_mapping: "tableman", action: "get_condition_list" },
    condition_item: { block_mapping: "tableman", action: "get_condition_item" },
    condition_create: { block_mapping: "tableman", action: "create_condition" },
    condition_update: { block_mapping: "tableman", action: "update_condition" },
    condition_delete: { block_mapping: "tableman", action: "delete_condition" },

    new_condition_item: { block_mapping: "new_tableman", action: "get_condition_item" },

    template_tool: { block_mapping: "tableman", action: "get_template_tool" },//视图菜单列表

    template_list: { block_mapping: "tableman", action: "get_template_list" },
    new_template_list: { block_mapping: "new_tableman", action: "get_template_list" },
    
    template_item: { block_mapping: "tableman", action: "get_template_item" },
    template_create: { block_mapping: "tableman", action: "create_template" },
    template_update: { block_mapping: "tableman", action: "update_template" },
    template_delete: { block_mapping: "tableman", action: "delete_template" },

    menu_list: { block_mapping: "tableman", action: "get_menu_list" },
    menu_item: { block_mapping: "tableman", action: "get_menu_item" },
    menu_create: { block_mapping: "tableman", action: "create_menu" },
    menu_update: { block_mapping: "tableman", action: "update_menu" },
    menu_delete: { block_mapping: "tableman", action: "delete_menu" },
    menu_option: { block_mapping: "tableman", action: "get_menu_option" },//树形结构的菜单列表
    menu: { block_mapping: "tableman", action: "menu" }, //动态菜单列表

    template_info: { block_mapping: "tableman", action: "get_template_info" },
    new_template_info: { block_mapping: "new_tableman", action: "get_template_item" },//视图详情
    data_list: { block_mapping: "tableman", action: "get_data_list" },
    new_data_list: { block_mapping: "new_tableman", action: "get_data_list" },//获取表格数据
    data_item: { block_mapping: "tableman", action: "get_data_item" },
    new_data_item: { block_mapping: "new_tableman", action: "get_data_item" },

    data_create: { block_mapping: "tableman", action: "create_data" },
    new_data_create: { block_mapping: "new_tableman", action: "insert_data" },//添加数据表 的数据

    data_update: { block_mapping: "tableman", action: "update_data" },
    new_data_update: { block_mapping: "new_tableman", action: "update_data" },

    data_delete: { block_mapping: "tableman", action: "delete_data" },
    new_data_delete: { block_mapping: "new_tableman", action: "delete_data" },

    data_export: { block_mapping: "tableman", action: "export_data" },
    new_data_export: { block_mapping: "new_tableman", action: "export_data" },

    data_import: { block_mapping: "tableman", action: "import_data" },
    create_data_by_table: { block_mapping: "tableman", action: "create_data_by_table" },
    update_data_by_table: { block_mapping: "tableman", action: "update_data_by_table" },
   
    check_import_file_info: { block_mapping: "tableman", action: "check_import_file_info" },
    new_check_import_file_info: { block_mapping: "new_tableman", action: "read_file_info" },

    import_by_map: { block_mapping: "tableman", action: "import_by_map" },
    new_import_by_map: { block_mapping: "new_tableman", action: "import_data" },

    batch_update_data: { block_mapping: "tableman", action: "batch_update_data" },
    batch_delete_data: { block_mapping: "new_tableman", action: "batch_delete_data" }
}
