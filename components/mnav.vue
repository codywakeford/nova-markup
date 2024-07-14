<template>

    <div class="mnav" ref="mnav" :style="{'--duration': duration, '--slide': slide }" >
        <component :is="item" v-for="(item, index) in filter('div')" :key="index" :class="getClass(index)" @click="toggleNav(index)" />
    

        <div class="aside-box" ref="asideRef" :class="direction" @click="toggleNav(1)">
            <component :is="item" v-for="(item, index) in filter('aside')" :key="index"/>
        </div>
    </div>

</template>

<script setup>
import { addValueAsClass } from './custom-css';
const asideRef = ref(null)
const mnav = ref(null)

const slots = useSlots()
const slotItems = ref([])

let duration2 = ref("0.5s")
let slide = ref('ease') 

const props = defineProps({
    direction: {
        type: String,
        default: "left"
    },
    duration: {
        type: String,
        default: "0.3s"
    }
})

function initCustomCss() {
    addValueAsClass(mnav, '--aside', asideRef)
    duration2 = getComputedStyle(mnav.value).getPropertyValue('--duration')
    slide = getComputedStyle(mnav.value).getPropertyValue('--slide')
}

onMounted(() => {
    initCustomCss()

    if (slots.default) {
        slotItems.value = slots.default()
    }  
})

function filter(tag) {
    return slotItems.value.filter(item => item.type === tag)
}

function getClass(index) {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}

function toggleNav(index) {
    if (index != 1) {
        return
    } 
    if (asideRef.value.classList.contains('active')) {
        asideRef.value.classList.remove('active')
    } else {
        asideRef.value.classList.add('active')
    }
}

</script>


<style lang='sass' scoped>
.mnav
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    

.aside-box
    position: fixed
    height: 100%
    width: 100%
    

    &.left
        top: 0
        left: -100%
        bottom: 0
        transition: left var(--duration) var(--slide)

        &.active
            left: 0  

    &.right
        top: 0
        right: -100%
        bottom: 0
        transition: right var(--duration) var(--slide)

        &.active
            right: 0  

    &.top
        top: -100%
        right: 0
        left: 0
        transition: top var(--duration) var(--slide)

        &.active
            top: 0  

    &.bottom
        bottom: -100%
        right: 0
        left: 0
        transition: bottom var(--duration) var(--slide)

        &.active
            bottom: 0  

</style>
