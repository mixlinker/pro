<template>
    <a-config-provider :locale="locales[lang]">
        <a-layout class="app">
            <topHeader />
            <a-layout style="height: calc(100% - 48px)">
                <a-layout-sider class="sider" v-model:collapsed="isCollapse" :trigger="null" collapsible :collapsedWidth="48" :width="200">
                    <div class="logo">
                        <div class="block">
                            <img src="../assets/images/header-block-icon.png" />
                        </div>
                        <span class="logo-title" v-if="!isCollapse">{{ block_name }}</span>
                    </div>
                    <a-menu
                        v-model:selectedKeys="state.selectedKeys"
                        :open-keys="state.openKeys"
                        @openChange="openKeysChange"
                        mode="inline"
                    >
                        <SubMenu :menuList="menuList" />
                    </a-menu>
                    <div class="collapsed-btn flex justify-center items-center" @click="toggleSidebar">
                        <i class="arrow-down" :class="{ open: !isCollapse, close: isCollapse }"></i>
                    </div>
                </a-layout-sider>
                <a-layout-content class="content">
                    <Tabs />
                </a-layout-content>
            </a-layout>
        </a-layout>
        <div class="mix-loading" v-if="loading">
            <a-spin></a-spin>
        </div>
    </a-config-provider>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import topHeader from './top-header/index.vue'
import Tabs from './tabs/index.vue'
import SubMenu from './left-menu/subMenu.vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/pinia/modules/menu.js'
import { useSystemStore } from '@/pinia/modules/system'
import { filterMenuData } from '@/router/utils'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import useLang from '@/i18n/useLang'
import 'dayjs/locale/zh-cn'
const router = useRouter()
const { lang } = useLang()
const locales = reactive({
    cn: zhCN,
    en: enUS
})
const state = reactive({
    selectedKeys: [],
    openKeys: []
})
const menuList = computed(() => filterMenuData(usePermissionStore().menuList))
const block_name = computed(() => usePermissionStore().block_name)
const loading = computed(() => useSystemStore().loading)
const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)
const openKeysChange = (key) => {
    state.openKeys = key
}
function toggleSidebar() {
    useSystemStore().setCollapse(!isCollapse.value)
}
watch(
    () => router.currentRoute.value,
    () => {
        let curRoute = router.currentRoute.value
        useSystemStore().addTab({
            title: curRoute.meta.title,
            fullPath: curRoute.fullPath,
            name: curRoute.name
        })
        state.selectedKeys = []
        state.selectedKeys.push(curRoute.name)
        state.openKeys.push(curRoute.name)
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
.app {
    overflow: hidden;
    height: 100%;
    width: 100%;
    .header_content {
        height: $headerHeight;
        width: 100%;
        background-color: #fff;
    }
    .sider {
        height: calc(100vh - $headerHeight);
        background-color: #ffffff;

        .logo {
            height: 44px;
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            display: flex;
            align-items: center;
            padding: 0 20px;

            .block {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .logo-title {
                font-size: 14px;
                font-family: 'Arial-BoldMT', 'MicrosoftYaHei';
                font-weight: 600;
                line-height: 22px;
                color: #262626;
                margin-left: 10px;
                width: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .collapsed-btn {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 999;
            width: 12px;
            height: 46px;
            background: #e5e5e5;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
                background: #d9d9d9;
            }

            .arrow-down {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: url('@/assets/images/arrow-down.png') no-repeat 50%;
                transition: transform 0.5s ease 0s;
            }

            .arrow-down.open {
                transform: rotate(90deg);
            }

            .arrow-down.close {
                transform: rotate(-90deg);
            }
        }

        .ant-menu-inline-collapsed .ant-menu-submenu-title .ant-menu-title-content {
            display: inline-block;
            max-width: 14px;
            overflow: hidden;
        }
    }
    .content {
        height: 100%;
        width: 100%;
        background-color: #f0f0f0;
    }
}
</style>
