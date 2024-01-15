import { defineStore } from 'pinia'
import { basicRouter } from '@/router/modules/basic.js'
export const usePermissionStore = defineStore({
    id: 'permission',
    state: () => ({
        menuList: [...basicRouter],
        curRouteName: '',
        activeKey: "",
        block_name: "设备监控",
    }),
    getters: {
        breadcrumbListGet: state => {
            const getBreadcrumbList = (key, menuList) => {
                let matchRouteList = []
                try {
                    const getNodePath = node => {
                        matchRouteList.push(node)
                        // 找到该路径, 结束循环
                        if (path.includes(node.key)) throw new Error('Find IT!')
                        if (node.children?.length) node.children.forEach(item => getNodePath(item))
                        // 没有找到该路径, 删除路由对象
                        matchRouteList.pop()
                    }
                    menuList.forEach(item => getNodePath(item))
                } catch (e) {
                    return matchRouteList
                }
            }
            return path => getBreadcrumbList(path, state.menuList)
        }
    },
    actions: {
        setRouteName(name) {
            this.curRouteName = name
        },
        setMenuList(value) {
            this.menuList = value
        },
        setActiveKey(value) {
            this.activeKey = value
        },
        setBlockName(value) {
            this.block_name = value
        },
    }
})