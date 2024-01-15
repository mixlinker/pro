<script setup></script>

<template>
    <router-view />
</template>

<style scoped lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    * {
        outline: none;
    }
    .enter-loading {
        font-size: 20px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
    }
}
</style>
