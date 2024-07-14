<template>
    <div class="burger" @click="toggleActive" :class="{ 'active': active }">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script setup>
const active = ref(false)

function toggleActive() {
    active.value = !active.value
}
</script>

<style lang='sass' scoped>
.burger
    position: relative
    width: 20px
    height: 18px 
    user-select: none
    cursor: pointer

span
    position: absolute
    left: 0
    background: white
    height: 3px
    width: 25px
    border-radius: 2px

    &:nth-child(1)
        top: 0px
        transition: 0.4s rotate
        transform-origin: top right
        rotate: 0deg

    &:nth-child(2)
        transform-origin: right
        transition: 0.2s transform
        top: 8px 

    &:nth-child(3)
        top: 16px 
        transition: 0.4s rotate
        transform-origin: bottom right
        rotate: 0deg

.burger
    &.active
        span
            &:nth-child(1)
                rotate: -45deg

            &:nth-child(2)
                transform: scale(0)

            &:nth-child(3)
                rotate: 45deg

</style>
