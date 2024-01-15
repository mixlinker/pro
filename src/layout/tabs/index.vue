<template>
    <div class="tab-box">
        <a-tabs v-model:activeKey="activeKey" class="ant-tabs-self" type="editable-card" @tabClick="onTabClick" @edit="onEdit" hideAdd>
            <a-tab-pane v-for="tab in tabList" :key="tab.fullPath">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <span style="display: inline-block">{{ tab.title }}</span>
                        <template #overlay>
                            <a-menu class="dropdown-menu">
                                <a-menu-item :key="1" @click="refresh">
                                    <reload-outlined />
                                    {{ $t('tags.refresh') }}
                                </a-menu-item>
                                <a-menu-item :key="2" @click="closeCurrentTab">
                                    <close-outlined />
                                    {{ $t('tags.close') }}
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item :key="3" @click="closeLeftTab(tab)">
                                    <vertical-right-outlined />
                                    {{ $t('tags.left') }}
                                </a-menu-item>
                                <a-menu-item :key="4" @click="closeRightTab(tab)">
                                    <vertical-left-outlined />
                                    {{ $t('tags.right') }}
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item :key="5" @click="closeOtherTab(tab)">
                                    <column-width-outlined />
                                    {{ $t('tags.other') }}
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
        <a-tabs :activeKey="1" class="routerEnter">
            <a-tab-pane :key="1">
                <div class="main">
                    <router-view v-slot="{ Component, route }">
                        <transition appear name="fade-transform" mode="out-in">
                            <keep-alive>
                                <component :is="Component" :key="route.fullPath" v-if="routerShow" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import { ref, computed, watch, unref, nextTick, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/pinia/modules/system.js'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()
const { proxy } = getCurrentInstance()
const activeKey = ref(route.fullPath)
const tabList = computed(() => systemStore.tabList)
const routerShow = ref(true)

const NAME_WHITE_LIST = ['403', '404', '500']
watch(
    () => router.currentRoute.value,
    async (curRoute) => {
        activeKey.value = curRoute.fullPath
        if (NAME_WHITE_LIST.includes(curRoute.name)) return
        let tabTitle = router.currentRoute.value?.query?.active_name ? router.currentRoute.value.query.active_name : curRoute.meta.title
        systemStore.addTab({
            title: tabTitle,
            fullPath: curRoute.fullPath,
            name: curRoute.name
        })
        curRoute.meta.keepAlive !== false && systemStore.addKeepAliveName(curRoute.name)
        await nextTick()
        const ele = document.querySelector('.tabs-box .ant-tabs-ink-bar')
        ele && ele.parentNode.removeChild(ele)
    },
    {
        immediate: true
    }
)

function onTabClick(fullPath) {
    router.push(fullPath)
}
const onEdit = (targetKey, action) => {
    action === 'remove' && removeTab(targetKey)
}
const removeTab = (fullPath) => {
    const name = unref(tabList).find((item) => item.fullPath == fullPath)?.name || ''
    name && systemStore.removeKeepAliveName(name)

    if (unref(tabList).length === 1) {
        proxy.$message.info('无法关闭最后一个页面~')
        return
    }
    const isCurrentTab = fullPath === route.fullPath
    systemStore.removeTab(fullPath, isCurrentTab)
}

async function refresh() {
    routerShow.value = false
    await nextTick()
    routerShow.value = true
}

const closeCurrentTab = () => {
    removeTab(route.fullPath)
}

const closeLeftTab = (tab) => {
    if (unref(tabList).length === 1) {
        proxy.$message.info('左侧没有其它页面了~')
        return
    }
    const mouseRightIndex = systemStore.findIndex(tab.name)
    const curIndex = systemStore.findIndex(route.name)
    if (tab.name !== route.name && mouseRightIndex > curIndex) {
        router.push(tab.fullPath)
    }
    systemStore.removeLeftTab(tab.fullPath)
    systemStore.removeLeftKeepAliveName(tab.name)
}
const closeRightTab = (tab) => {
    if (unref(tabList).length === 1) {
        proxy.$message.info('右侧没有其它页面了~')
        return
    }
    const mouseRightIndex = systemStore.findIndex(tab.name)
    const curIndex = systemStore.findIndex(route.name)
    if (tab.name !== route.name && mouseRightIndex < curIndex) {
        router.push(tab.fullPath)
    }
    systemStore.removeRightTab(tab.fullPath)
    systemStore.removeRightKeepAliveName(tab.name)
}

const closeOtherTab = (tab) => {
    if (unref(tabList).length === 1) {
        proxy.$message.info('当前没有其它页面了~')
        return
    }
    systemStore.removeMultipleTab(tab ? tab.fullPath : route.fullPath)
    systemStore.setKeepAliveName(tab ? [tab.name] : [route.name])
}
</script>

<style lang="scss" scoped>
.tab-box {
    height: 100%;
    padding: $content_main_padding;
    box-sizing: border-box;
    :deep(.ant-tabs-self) {
        height: auto;
    }
    :deep(.ant-tabs-nav) {
        margin: 0;
        .ant-tabs-tab {
            margin-left: 0;
            border: none;
            background-color: #f0f0f0;
            height: $tabHeight;
            line-height: $tabHeight;
            &.ant-tabs-tab-active {
                background: #f7f7f7;
                color: #1f7bfc;
            }
            &:not(.ant-tabs-tab-active):hover {
                background: #e5e5e5;
            }
        }
    }
    .ant-tabs-content {
        background: #f7f7f7;
        .mix-content {
            background: none;
            height: 100%;
        }
    }
    .routerEnter {
        height: calc(100% - 32px);
        .main {
            height: 100%;
            overflow: auto;
            position: relative;
            background: #f7f7f7;
        }
    }
    .routerEnter :deep(.ant-tabs-nav-wrap) {
        height: 0;
        line-height: 0;
    }
    .routerEnter :deep(.ant-tabs-nav-wrap) {
        height: 0;
        line-height: 0;
    }
}
</style>
