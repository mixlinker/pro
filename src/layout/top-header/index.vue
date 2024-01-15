<template>
    <div class="top-container">
        <div class="left">
            <div class="logo-wrap">
                <img :src="getImage(platform_logo, defaultLogoimg)" />
            </div>
            <div class="title-wrap">
                {{ platform_title }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import defaultLogoimg from '@/assets/images/mixlinker.png'
const platform_logo = ref('')
const platform_title = ref('Mixlinker')

const getImage = (url, defaultImg) => {
    if (!url || url === '-') {
        return defaultImg
    }
    if (url.indexOf('http:') > -1) {
        return url
    } else {
        return url.indexOf('mixservice/storage') === -1 ? defaultLogoimg : location.origin + url
    }
}
</script>
<style lang="scss" scoped>
@import './top-header.scss';
</style>
