<template>
    <iframe class="google-map" :src="mapSource" frameborder="0"/>
</template>

<script setup lang="ts">
const props = defineProps({
    address: {
        type: String,
        default: "dublin",
    },

    zoom: {
        type: String,
        default: 4
    },

})

const encodedAddress = encodeURIComponent(props.address)

const mapSource = computed(() => {
    return `https://maps.google.com/maps?&hl=en&q=${encodedAddress}&t=&z=${props.zoom}&ie=UTF8&iwloc=B&output=embed`
})
</script>

<style lang='sass' scoped>

</style>