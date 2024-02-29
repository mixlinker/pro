// 用于table man 的http封装
import BaseApi from './BaseApi'
import config from '@/config/config.js'
import action_mapping from "../action_mapping";
import source from '@/utils/source';
import { useSystemStore } from '@/pinia/modules/system'

export default {
    post(block, params = {}, loading, configs) {
        return new Promise((resolve, reject) => {
            if (action_mapping[block].block_mapping_active) {
                params.block_mapping = action_mapping[block].block_mapping;

            }
            params.action = action_mapping[block].action;
            useSystemStore().setLoading(!loading)
            BaseApi.post(config.api_proxy_url, params, {
                'current_shortcut_id': this.getMapShortcutId(),
            }, configs).then(data => {
                useSystemStore().setLoading(false)
                resolve(data)
            }).catch(e => {
                useSystemStore().setLoading(false)
                reject(e)
            })
        })
    },
    postPort(params = {}) {
        return new Promise((resolve, reject) => {
            BaseApi.post(config.middle_platform_url, params, {
                'current_shortcut_id': this.getMapShortcutId(),
            }).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    postUrl($url, params, headers = {}, config = {}) {
        return new Promise((resolve, reject) => {
            BaseApi.post($url, params, headers, config).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    getUserByToken(token) {
        return new Promise((resolve, reject) => {
            let params = {}
            params.block_mapping = action_mapping.get_user_by_token.block_mapping;
            params.action = action_mapping.get_user_by_token.action;
            let header = {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            }

            BaseApi.post(config.middle_platform_url, params, header).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    upload(block, formData) {
        return new Promise((resolve, reject) => {
            formData.append('block_mapping', action_mapping[block].block_mapping)
            formData.append('action', action_mapping[block].action)
            let header = {
                'Content-Type': "application/x-www-form-urlencoded"
            }
            BaseApi.post(config.upload_url, formData, header).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    upload_report(block, formData) {
        return new Promise((resolve, reject) => {
            formData.append('block_mapping', action_mapping[block].block_mapping)
            formData.append('action', action_mapping[block].action)
            let header = {
                'Content-Type': "multipart/form-data"
            }
            BaseApi.post(config.upload_report_url, formData, header).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    get($url, query) {
        return new Promise((resolve, reject) => {
            BaseApi.get($url, query).then(data => {
                resolve(data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    platform(cb, data) {
        BaseApi.post(config.middle_platform_url, data).then((data) => {
            cb(data)
        }).catch((e) => {
            cb(e)
        })
    },
    getMapShortcutId() {
        let sourceJson = localStorage.getItem(source.getSourceJsonKey())
        if (sourceJson) {
            sourceJson = JSON.parse(sourceJson)
        } else {
            sourceJson = {}
        }
        let pathArr = (window.location.hash).split('/');
        let key = source.getAppName() + ':' + pathArr[1];
        return sourceJson[key];
    },
    equipmanageImport(cb, data) {
        BaseApi.post(config.equipmanage_import, data).then((data) => {
            cb(data)
        }).catch((e) => {
            cb(e)
        })
    },
}
