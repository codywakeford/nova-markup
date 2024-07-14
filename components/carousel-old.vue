<template>
    <cflex class="carousel-box">
        <div class="carousel-controls">

            <div @click="moveCarousel('left')">
                <slot name="left-button">
                    <sbutton type="rounded-colorful-left" >
                        <Icon icon="material-symbols:arrow-back" color="black" />
                    </sbutton>
                </slot>
            </div>

            <div @click="moveCarousel('right')">
                <slot name="right-button">
                    <sbutton type="rounded-colorful" @click="moveCarousel('right')">
                        <Icon icon="material-symbols:arrow-forward" color="black" />
                    </sbutton>
                </slot>
            </div>
        </div>

        <ul class="carousel" ref="carousel">
            <li v-for="(item, index) in slotItems" :key="index" class="carousel-item" :style="{ flex: `0 0 ${100 / props.itemsShown}%`,paddingInline: props.gap }" >
                <div class="content">
                    <component :is="item" />
                </div>
            </li>
        </ul>

    </cflex>
</template>


<script setup>
import { Icon } from "@iconify/vue"

const props = defineProps({
    slideBy: {
        type: String,
        default: "1"
    },
    itemsShown: {
        type: String,
        default: "1"
    },
    gap: {
        type: String,
        default: "10px"
    }
})

const carousel = ref(null)
const slotItems = ref([])
const slots = useSlots()
const scrolling = ref(false)

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

function moveCarousel(direction) {
    if (scrolling.value) {
        return
    }
    
    scrolling.value = true
    
    let slideWidth = carousel.value.querySelector('.carousel-item').clientWidth
    let totalWidth = carousel.value.scrollWidth - carousel.value.clientWidth
    let slideAmount = slideWidth * props.slideBy
    
    if (direction === "left") {
        carousel.value.scrollLeft -= slideAmount
        
        if (carousel.value.scrollLeft <= 0) {
            carousel.value.scrollLeft = totalWidth
        }
    }
    
    if (direction === "right") {
        carousel.value.scrollLeft += slideAmount
        if (carousel.value.scrollLeft >= totalWidth) {
            carousel.value.scrollLeft = 0
        }
    }
    
    setTimeout(() => {
        scrolling.value = false
    }, 600)
}
</script>



<style scoped lang="sass">
.carousel-controls
    display: flex
    align-items: center
    width: min-content
    gap: 25px
    margin-inline: auto
    margin-bottom: 25px

.carousel-box
    position: relative
    
    .carousel
        display: flex
        align-items: center
        overflow-x: scroll
        list-style: none
        scroll-behavior: smooth
        overflow: hidden
        list-style: none
        position: relative
        width: 100%

li
    background: transparent
    padding: 50px

.content
    height: 100%
    width: 100%
    background: transparent

:deep(img)
    object-fit: cover

</style>

