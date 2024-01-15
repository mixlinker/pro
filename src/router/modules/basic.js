
import axios from 'axios'
import publicConfig from '@/config/public.js'
const proIndex = () => import('@/views/pro/index.vue')
const customerList = () => import('@/views/customer/customer/list.vue')
const customerDetail = () => import('@/views/customer/customer/detail.vue')
const objectList = () => import('@/views/object/object/list.vue')
const objectDetail = () => import('@/views/object/object/detail.vue')
const timerTaskList = () => import('@/views/timer/task/list.vue')
const timerTaskDetail = () => import('@/views/timer/task/detail.vue')
const retainerRecordList = () => import('@/views/retainer/record/list.vue')
const retainerRecordDetail = () => import('@/views/retainer/record/detail.vue')
const reportResultList = () => import('@/views/report/result/list.vue')
export const basicRouter = [
    {
        path: '/pro/index',
        name: 'proIndex',
        component: proIndex,
        beforeEnter: async (to, from) => {
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
            return true
        },
        meta: {
            icon: 'home-outlined',
            title: '首页预览',
            showMenu: true
        }
    },
    {
        path: '/customer/customer/list',
        name: 'customerList',
        component: customerList,
        meta: {
            icon: 'user-outlined',
            title: '客户/项目',
            showMenu: true
        }
    },
    {
        path: '/customer/customer/detail/:id',
        name: 'customerDetail',
        component: customerDetail,
        meta: {
            title: '客户详情',
            showMenu: false
        }
    },
    {
        path: '/object/object/list',
        name: 'objectList',
        component: objectList,
        meta: {
            icon: 'cluster-outlined',
            title: '设备列表',
            showMenu: true
        }
    },
    {
        path: '/object/object/detail/:id',
        name: 'objectDetail',
        component: objectDetail,
        meta: {
            title: '设备详情',
            showMenu: false
        }
    },
    {
        path: '/timer/task/list',
        name: 'timerTaskList',
        component: timerTaskList,
        meta: {
            icon: 'profile-outlined',
            title: '维保任务',
            showMenu: true
        }
    },
    {
        path: '/timer/task/detail/:id',
        name: 'timerTaskDetail',
        component: timerTaskDetail,
        meta: {
            title: '任务详情',
            showMenu: false
        }
    },
    {
        path: '/retainer/record/list',
        name: 'retainerRecordList',
        component: retainerRecordList,
        meta: {
            icon: 'branches-outlined',
            title: '历程记录',
            showMenu: false
        }
    },
    {
        path: '/retainer/record/detail/:id',
        name: 'retainerRecordDetail',
        component: retainerRecordDetail,
        meta: {
            title: '历程记录详情',
            showMenu: false
        }
    },
    {
        path: '/report/result/list',
        name: 'reportResultList',
        component: reportResultList,
        meta: {
            icon: 'file-text-outlined',
            title: '报表结果',
            showMenu: true
        }
    },
]
