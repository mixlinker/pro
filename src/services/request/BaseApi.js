import axios from 'axios'
import auth from "./auth"
import message from 'ant-design-vue/lib/message';
import publicConfig from '@/config/public.js'

class BaseApi {
    constructor() {
        this.axios = axios.create({
            timeout: 30000,
            withCredentials: true,
            headers: {
                'platform': "mixapplication",
                'Content-Type': "application/json",
            },
            params: {}
        });
        this.axios.interceptors.request.use(async (config) => {
            if (!config.headers.Authorization) {
                let access_token_time = localStorage.getItem('access_token_time')
                if (access_token_time) {
                    let nowTime = new Date().getTime()
                    if ((nowTime - access_token_time) / 1000 > 0) {
                        await axios.post('/apiproxy/api', {
                            action: 'refresh_access_token',
                            app_id: publicConfig.app_id,
                            app_secret: publicConfig.app_secret
                        }).then(res => {
                            localStorage.setItem('access_token_time', new Date().getTime())
                            localStorage.setItem('access_token', res.data.result.access_token)
                        })
                    }
                } else {
                    await axios.post('/apiproxy/api', {
                        action: 'get_access_token',
                        app_id: publicConfig.app_id,
                        app_secret: publicConfig.app_secret
                    }).then(res => {
                        localStorage.setItem('access_token_time', new Date().getTime())
                        localStorage.setItem('access_token', res.data.result.access_token)
                    })
                }
                config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        this.axios.interceptors.response.use((response) => {
            if (response.data) {
                if (response.data.code === 500 || response.data.code === 0) {
                    let errorMsg = response.data['info'] || response.data['msg'];
                    message.error(errorMsg);
                    return Promise.reject(response);
                }
            }
            return Promise.resolve(response)
        }, this.error);
    }

    error(error) {
        if (!error.response) {
            message.error(error.message);
            return Promise.reject(error);
        }
        let errorMsg = error.response.data['info'] || error.response.data['msg'] || '未知错误';
        message.error(errorMsg);
        return Promise.reject(error);
    }

    get($url, data = {}) {
        return new Promise((resolve, reject) => {
            this.axios.get($url, { params: data }).then(response => { //http response
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject("something went wrong")
                }
            }).catch((error) => {
                reject(error)
            });
        })
    }

    post($url, data = {}, header = null, config = {}) {
        let conf = {
            ...config
        }
        if (header) {
            conf.headers = header;
        }
        return new Promise((resolve, reject) => {
            this.axios.post($url, data, conf).then(response => { //http response
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject("something went wrong")
                }
            }).catch((error) => {
                reject(error)
            });
        })
    }

    axios() {
        return this.axios
    }
}

export default new BaseApi()
