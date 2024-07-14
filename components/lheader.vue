<template>
    <header class="lheader" ref="lheader">
        <slot />
    </header>
</template>

<style scoped lang="sass">
header
    display: flex
    flex-direction: column

    gap: 25px
    text-align: left
    margin-block: 50px

.mobile-layout
    align-items: center
    text-align: center
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const lheader = ref(null)
const minWidth = ref(0)
const mobileLayout = ref(false)

function getWidth() {
    if (lheader.value) {
        const minWidthStr = window.getComputedStyle(lheader.value).minWidth

        if (minWidthStr) {
            minWidth.value = parseInt(minWidthStr, 10)
        }
    }
}

function setLayout() {
    if (!lheader.value || !minWidth.value) {
        return
    }

    if (window.innerWidth <= minWidth.value) {
        mobileLayout.value = true
        lheader.value.style.minWidth = "0"
    } else if (window.innerWidth >= minWidth.value) {
        mobileLayout.value = false
        lheader.value.style.minWidth = `${minWidth.value}px` // Use px here
    }
}

onMounted(() => {
    getWidth()
    setLayout()
    window.addEventListener("resize", setLayout)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", setLayout)
})
</script>
