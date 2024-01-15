export default {
    indass_project_list: {"block_mapping": "indass", "action": "get_project_list"},
    indass_project_item: {"block_mapping": "indass", "action": "get_project_item"},
    start_indass_project: {"block_mapping": "indass", "action": "start_project"},
    stop_indass_project: {"block_mapping": "indass", "action": "stop_project"},
    create_indass_project: {"block_mapping": "indass", "action": "create_project"},
    create_indass_project_by_tpl: {"block_mapping": "indass", "action": "create_project_by_template"},
    update_indass_project: {"block_mapping": "indass", "action": "update_project"},
    delete_indass_project: {"block_mapping": "indass", "action": "delete_project"},

    get_indass_result_list: {"block_mapping": "indass", "action": "get_result_list"},
    get_indass_class_list: {"block_mapping": "indass", "action": "get_class_list"},

    indass_template_list: {"block_mapping": "indass", "action": "get_project_template_list"},
    indass_template_item: {"block_mapping": "indass", "action": "get_project_template_item"},
    create_indass_template: {"block_mapping": "indass", "action": "create_project_template"},
    update_indass_template: {"block_mapping": "indass", "action": "update_project_template"},
    delete_indass_template: {"block_mapping": "indass", "action": "delete_project_template"},
    project_indass_list_by_template: {"block_mapping": "indass", "action": "get_project_list_by_template_id"},

    project_indass_algorithm_list: {"block_mapping": "indass", "action": "get_compose_algorithm"},
    project_indass_project_list: {"block_mapping": "indass", "action": "get_indass_projects"},
    project_indass_object_list: {"block_mapping": "indass", "action": "get_indass_objects"},
    project_indass_xyz_objects: {"block_mapping": "indass", "action": "get_indass_xyz_objects"},
}
