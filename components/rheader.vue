<template>
    <header class="rheader" ref="rheader" :class="{ 'mobile-layout': mobileLayout}">
        <slot />
    </header>
</template>

<style scoped lang="sass">
.rheader
    display: flex
    flex-direction: column
    align-items: flex-end
    gap: 15px

    text-align: right

    margin-block: 50px
    max-width: 750px
    margin-inline: auto

.mobile-layout
    align-items: center
    text-align: center
</style>

<script setup>
const rheader = ref(null)
const minWidth = ref(0)
const mobileLayout = ref(false)

function getWidth() {
    if (rheader.value) {
        const minWidthStr = window.getComputedStyle(rheader.value).minWidth;
        if (minWidthStr) {
            minWidth.value = parseInt(minWidthStr, 10);
        }
    }
}
function setLayout() {
    if (window.innerWidth <= minWidth.value) {
        mobileLayout.value = true
        rheader.value.style.minWidth = "0"
    } else {
        mobileLayout.value = false
        rheader.value.style.minWidth = minWidth.value
    }
}

onMounted(() => {
    getWidth()
    setLayout()
    window.addEventListener('resize', setLayout)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", setLayout)
})
</script>
