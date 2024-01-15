export default {
    workflow_list: {block_mapping: "workflow", action: "get_workflow_list"},
    workflow_item: {block_mapping: "workflow", action: "get_workflow_detail"},
    workflow_create: {block_mapping: "workflow", action: "add_workflow"},
    workflow_update: {block_mapping: "workflow", action: "update_workflow"},
    workflow_delete: {block_mapping: "workflow", action: "del_workflow"},
    workflow_start: {block_mapping: "workflow", action: "start_workflow"},
    workflow_stop: {block_mapping: "workflow", action: "stop_workflow"},
    get_template_by_workflow: {block_mapping: "workflow", action: "add_case_with_view"},
    deal_user_workitem: { block_mapping: "workflow", action: "deal_user_workitem" },


    place_list: {block_mapping: "workflow", action: "get_place_list"},
    place_item: {block_mapping: "workflow", action: "get_place_detail"},
    place_create: {block_mapping: "workflow", action: "add_place"},
    place_update: {block_mapping: "workflow", action: "update_place"},
    place_delete: {block_mapping: "workflow", action: "del_place"},

    transition_list: {block_mapping: "workflow", action: "get_transition_list"},
    transition_item: {block_mapping: "workflow", action: "get_transition_detail"},
    transition_create: {block_mapping: "workflow", action: "add_transition"},
    transition_update: {block_mapping: "workflow", action: "update_transition"},
    transition_delete: {block_mapping: "workflow", action: "del_transition"},

    arc_list: {block_mapping: "workflow", action: "get_arc_list"},
    arc_item: {block_mapping: "workflow", action: "get_arc_plus"},
    arc_create: {block_mapping: "workflow", action: "add_arc_plus"},
    arc_update: {block_mapping: "workflow", action: "update_arc_plus"},
    arc_delete: {block_mapping: "workflow", action: "del_arc_plus"},

    case_list: {block_mapping: "workflow", action: "get_case_list"},
    case_item: {block_mapping: "workflow", action: "get_case_item"},
    case_create: {block_mapping: "workflow", action: "create_case"},
    case_update: {block_mapping: "workflow", action: "update_case"},
    case_delete: {block_mapping: "workflow", action: "delete_case"},

    token_list: {block_mapping: "workflow", action: "get_token_list"},
    token_item: {block_mapping: "workflow", action: "get_token_item"},
    token_create: {block_mapping: "workflow", action: "create_token"},
    token_update: {block_mapping: "workflow", action: "update_token"},
    token_delete: {block_mapping: "workflow", action: "delete_token"},

    workitem_list: {block_mapping: "workflow", action: "get_workitem_list"},
    get_workflowapp_list: {block_mapping: "workflow", action: "get_workflowapp_list"},
    get_workitem_list_with_deal: {block_mapping: "workflow", action: "get_workitem_list_with_deal"},
    get_case_list_with_create: {block_mapping: "workflow", action: "get_case_list_with_create"},
    get_case_list_with_participate: {block_mapping: "workflow", action: "get_case_list_with_participate"},

    get_user_workflow_bind_list: {block_mapping: "mixauth", action: "get_user_workflow_bind_list"},

    close_case: {block_mapping: "workflow", action: "close_case"}
}
