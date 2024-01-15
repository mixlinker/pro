<template>
    <template v-for="subItem in menuList" :key="subItem.name">
        <a-menu-item
            v-if="(!subItem.children || !subItem.children.length) && subItem.meta.showMenu"
            :key="subItem.name"
            :title="subItem.meta.title"
            @click="clickMenu(subItem)"
        >
            <template #icon v-if="!child">
                <component :is="subItem.meta.icon || 'appstore-outlined'" />
            </template>
            <span :style="{ 'font-weight': child ? 500 : 600 }">{{ subItem.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu v-if="subItem.children?.length && subItem.meta.showMenu" :key="subItem.name">
            <template #icon>
                <component :is="subItem.meta.icon || 'appstore-outlined'" />
            </template>
            <template #title>{{ subItem.meta.title }}</template>
            <SubMenu :menuList="subItem.children" :child="true" />
        </a-sub-menu>
    </template>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SubMenu from './subMenu.vue'

defineProps({
    menuList: {
        type: Array,
        default: () => []
    },
    child: {
        //用来判断当前菜单是一级还是二级菜单
        type: Boolean,
        default: false
    }
})
const router = useRouter()
const clickMenu = (subItem) => {
    router.push(subItem.path)
}
</script>

<style lang="scss">
.ant-menu .ant-menu-submenu-title {
    display: flex !important;
    align-items: center;
}
.ant-menu .ant-menu-item {
    margin-bottom: 0 !important;
}
</style>
