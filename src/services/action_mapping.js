//可访问的接口路由

import block from "./action/block" //应用中心
import user from "./action/user" //用户中心
import object from "./action/object" //对象管理相关
import workflow from "./action/workflow"; //工单流
import tableman from "./action/tableman"; //tableman
import collect from "./action/collect"; //离线数据
import company from "./action/company"; //组织管理
import customer from "./action/customer"; //客户管理
import file from "./action/file" //文件管理
import grading from "./action/grading"; //分级推送
import messenger from "./action/messenger"; //信使
import terminal from "./action/terminal"; //终端管理
import terminalPlus from "./action/terminalPlus"; //终端管理
import retainer from "./action/retainer"; //历程
import statistics from "./action/statistics"; //统计
import calculate from "./action/calculate"; //计算
import timer from "./action/timer"; //维保
import report from "./action/report"; //报表
import agent from "./action/agent"; //代理
import dashbos from "./action/dashbos"; //显示板服务
import indass from './action/indass'; //indass
import datasource from "./action/data-source"; //数据源
import task from "./action/task"; //任务管理
import show from './action/show';
import point_table from './action/point_table';
import filter from "./action/filter"
import ufs from "./action/ufs"
import feedback from "./action/feedback"
import cli from './action/cli'
import dataservice from './action/dataservice'
import objectTpl from './action/objectTpl'  //对象模板
import deviceDriverLib from './action/deviceDriverLib'
import dataQuery from './action/dataQuery'
import electronicFence from "./action/electronicFence";
import dispatching from "./action/dispatching";
import aprusfrontend from "./action/aprusfrontend";
import billing from "./action/billing";
import apiproxy from "./action/apiproxy";
import gaspro from "./action/gaspro";
import mixservice from "./action/mixservice";

//通用action
const common = {
    get_user_by_token: {
        block_mapping: "mixauth",
        action: "get_user_by_token"
    }, //通过token获取用户信息
    upload: {
        block_mapping: "mixservice",
        action: "upload_file"
    }, //上传文件
    get_block_info: {
        block_mapping: "mixauth",
        action: "get_role_menu_pc_list"
    },
    get_tableman_menu: {
        block_mapping: "mixauth",
        action: "get_role_menu_tableman_list"
    }, //tableman 菜单权限
    get_tableman_permission_menu: {
        block_mapping: "tableman",
        action: "get_permission_menu"
    }, //tableman 菜单权限
    get_private_config: {
        block_mapping: "public",
        action: "get_private_config"
    }, //配置
    set_private_config: {
        block_mapping: "public",
        action: "set_private_config"
    }, //配置
    get_public_config: {
        block_mapping: "public",
        action: "get_public_config"
    }, //配置
    set_public_config: {
        block_mapping: "public",
        action: "set_public_config"
    }, //配置
    get_dashboard_item_by_uid: {
        block_mapping: "dashboard",
        action: "get_dashboard_item"
    },
    send_http_action: {
        block_mapping: "cli",
        action: "send_http_action"
    },
    get_global_setting: {
        block_mapping: "mixauth",
        action: "get_global_setting"
    },
}
export default Object.assign(
    common,
    block,
    user,
    object,
    workflow,
    tableman,
    collect,
    company,
    customer,
    file,
    grading,
    messenger,
    terminal,
    terminalPlus,
    retainer,
    statistics,
    calculate,
    timer,
    report,
    agent,
    dashbos,
    indass,
    datasource,
    dashbos,
    task,
    show,
    point_table,
    filter,
    ufs,
    feedback,
    cli,
    dataservice,
    objectTpl,
    deviceDriverLib,
    dataQuery,
    electronicFence,
    dispatching,
    aprusfrontend,
    billing,
    apiproxy,
    gaspro,
    mixservice
)