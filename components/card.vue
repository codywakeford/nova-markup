<template>
    <div :class="type" class="card" ref="card">
        <slot />
    </div>
</template>

<script setup>
const card = ref(null);
const props = defineProps({
    type: {
        type: String,
        default: ""
    }
})

// Function to set the elevation based on the input number
function setElevation(level) {
    const elevation = '0px '+ level +'px '+ (level*2)+'px rgba(0, 0, 0, 0.1)'
    card.value.style.setProperty('box-shadow', elevation)
}
function initCustomCss() {
    const elevation = getComputedStyle(card.value).getPropertyValue('--elevation')
    setElevation(elevation)
}

onMounted(() => {
    initCustomCss()
})

</script>

<style scoped lang="sass">
.card
    display: flex
    flex-direction: column

    box-shadow: var(--elevation)
    padding: 16px
    border-radius: 8px

    
</style>
