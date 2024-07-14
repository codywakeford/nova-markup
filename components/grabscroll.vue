<template>
    <rflex ref="scrollableDiv" class="grabscroll-box" 
           @mousedown="startScrolling">
        <div
            class="scroll-item"
            v-for="(item, index) in slotItems"
            :key="index"
        >
            <component :is="item" />
        </div>
    </rflex>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSlots } from 'vue'

const slotItems = ref([])
const slots = useSlots()

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

const isScrolling = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const scrollableDiv = ref(null)

const startScrolling = (e) => {
    
    isScrolling.value = true
    startX.value = e.pageX - scrollableDiv.value.offsetLeft
    scrollLeft.value = scrollableDiv.value.scrollLeft
    document.addEventListener('mousemove', scrollDiv)
    document.addEventListener('mouseup', stopScrolling)
}

const scrollDiv = (e) => {
    if (!isScrolling.value) return
    console.log("Mouse move", e.pageX)
    e.preventDefault()
    const x = e.pageX - scrollableDiv.value.offsetLeft
    const walk = (x - startX.value) * 2 // Adjust the scroll speed
    scrollableDiv.value.scrollLeft = scrollLeft.value + walk
}

const stopScrolling = () => {
    
    isScrolling.value = false
    document.removeEventListener('mousemove', scrollDiv)
    document.removeEventListener('mouseup', stopScrolling)
}

onUnmounted(() => {
    document.removeEventListener('mousemove', scrollDiv)
    document.removeEventListener('mouseup', stopScrolling)
})
</script>

<style lang="sass" scoped>
.grabscroll-box
    padding-block: 100px
    overflow: auto
    cursor: grab

.scroll-item
    display: inline-block
    user-select: none

.grabscroll-box:active
    cursor: grabbing

</style>
