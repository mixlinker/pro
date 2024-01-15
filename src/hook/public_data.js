import { ref, reactive } from 'vue';
import api from '@/services/request/Api.js'



export const getUserList = async () => {
    let userList = []
    const { result } = await api.post('user_list')
    userList = result.data || []
    return userList
}
export const getMappingList = async () => {
    let mappingData = []
    const { result } = await api.post('mapping_list')
    mappingData = result.data || []
    return mappingData
}
export const getObjectList = async () => {
    let objectMapping = {}
    let objectList = []
    let params = {
        select: ['id', 'uid', 'name']
    }
    const { result } = await api.post('object_list', params);
    result.data.forEach((ele) => {
        objectMapping[ele.uid] = ele
    })
    objectList = result.data || []
    return { objectList, objectMapping }
}
export const getCustomerList = async () => {
    let customerList = []
    let params = {
        select: ['id', 'uid', 'name']
    }
    const { result } = await api.post('customer_list', params);
    customerList = result.data || []
    return customerList
}
export const getStatisticsList = async () => {
    let statisticsList = []
    let params = {
        select: ['id', 'uid', 'name']
    }
    const { result } = await api.post('get_statistics_task_list', params)
    statisticsList = result.data || []
    return statisticsList
}

export const getCalculateList = async () => {
    let calculateList = []
    let params = {
        select: ['id', 'uid', 'name']
    }
    const { result } = await api.post('get_calculate_task_list', params)
    calculateList = result.data || []
    return calculateList
}