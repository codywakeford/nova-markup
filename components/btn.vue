<template>
    <button @click="toggleModal" :class="type" class="btn" >
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({

    // Defines Button type //
    type: {
        type: String,
        default: "",
    },

    // Toggles a given ID //
    toggle: {
        type: String,
        default: "",
    }
})

const toggleModal = () => {
    const modal = document.getElementById(props.toggle)
    if (modal) {
        if (modal.style.display === "block") {
            modal.style.display = "none"
        } else {
            modal.style.display = "block"
        }
    }
}
</script>

<style scoped lang="sass">
.btn
    display: flex
    align-items: center
    gap: 10px
    width: min-content
    white-space: nowrap
    padding: 4px 20px
    border-radius: 5px
    background: inherit
    border: none
    box-shadow: none
    cursor: pointer
    user-select: none
    color: inherit
    font-size: 1.25rem
    
    &.default
        display: inline-block
        padding: 0.375rem 0.75rem
        font-size: 1rem
        font-weight: 400
        line-height: 1.5
        color: #212529
        text-align: center
        text-decoration: none
        vertical-align: middle
        cursor: pointer
        background-color: #f8f9fa
        border: 1px solid #ced4da
        border-radius: 0.25rem

    &.normal
        color: white

    &.border
        border: 1px solid white
        
    &.chip
        padding: 4px 40px
        border-radius: 40px

    &:active
        transform: translate(1px, 1px)  
</style>
