<template>
    <rflex class="binav">     
        <component :is="item" v-for="(item, index) in slotItems" :class="getClass(index)" :key="index" />
    </rflex>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const slots = useSlots()
const slotItems = ref([])


onMounted(async () => {
    if (slots.default) {
        slotItems.value = slots.default()
    }
})

function getClass(index) {
    return {
        'left': index === 0,
        'right': index === 1,
    }
}
</script>

<style scoped lang="sass">
.binav
    display: flex
    justify-content: space-between
    padding-block: 25px
    user-select: none

    .left
        justify-content: flex-start
             
    .right
        justify-content: flex-end
</style>
