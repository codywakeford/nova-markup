<template>
    <div class="splitrow" ref="splitrow" :class="{'desktop': desktopView, 'swap-items': swapItems }">
        <component :is="item" :class="getClass(index)"  v-for="(item, index) in slotItems" :key="index"/>
    </div>
</template>


<script setup>
const splitrow = ref(null)
const slotItems = ref([])
const slots = useSlots()
const breakpoint = ref()
const desktopView = ref(false)
const swapItems = ref(false)


function Css() {
    // Breakpoint css
    const computedStyle = window.getComputedStyle(splitrow.value)
    breakpoint.value = computedStyle.getPropertyValue('--breakpoint').trim()

    // Swap css
    swapItems.value = computedStyle.getPropertyValue('--swap').trim() === "true"
} 

function updateSize() {
    if (window.innerWidth > breakpoint.value) {
        desktopView.value = true
    } else {
        desktopView.value = false
    }
}

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
    Css()
    updateSize()
    window.addEventListener('resize', updateSize, Css)
})

const getClass = (index) => {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}

</script>
<style scoped lang="sass">
.splitrow
    display: flex
    flex-direction: column
    gap: 25px
    align-items: center

    > :first-child
        order: 0

    &.swap-items
        > :first-child 
            order: 2

    &.desktop
        flex-direction: row
        flex-wrap: wrap
        
        > :first-child
            flex: 1 1 1px
            order: 0
            
        > :last-child
            flex: 1 1 1px


</style>
