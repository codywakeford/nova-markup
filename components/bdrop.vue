<template>
    <div class="bdrop-container" @mouseleave="handleMouseLeave">
        <button @click="toggleDropdown" @mouseenter="handleMouseEnter">
            <slot name="button" class="bdrop">
                <sbutton>Button</sbutton>
            </slot>
        </button>

        <div v-if="isOpen" :class="['dropdown-box', direction]">
            <component :is="item" v-for="(item, index) in slotItems" :key="index"/>
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(false)
const slotItems = ref([])
const slots = useSlots()

const props = defineProps({
    direction: {
        type: String,
        default: "bottom",
        validator: (value) => ["bottom", "top", "left", "right"].includes(value),
    },

    activation: {
        type: String,
        default: 'hover',
        validator: value => ['click', 'hover'].includes(value)
    }
})

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function handleMouseEnter() {
  if (props.activation === 'hover') {
    isOpen.value = true;
  }
}

function handleMouseLeave() {
  if (props.activation === 'hover') {
    isOpen.value = false;
  }
}

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})
</script>

<style scoped lang="sass">
.bdrop-container
    position: relative


.dropdown-box
    position: absolute
    padding: 20px
    
    &.bottom
        bottom: 0
        left: 50%
        transform: translate(-50%, 100%)

    &.top
        top: 0
        left: 50%
        transform: translate(-50%, -100%)

    &.left
        top: 50%
        left: 0
        transform: translate(-100%, -50%)

    &.right
        top: 50%
        right: 0
        transform: translate(100%, -50%)
</style>
