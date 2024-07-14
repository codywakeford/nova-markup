<template>
    <div class="splitrow">
        <component :is="item" :class="getClass(index)"  v-for="(item, index) in slotItems" :key="index"/>
    </div>
</template>
<script setup>
const slotItems = ref([])
const slots = useSlots()

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
})

const getClass = (index) => {
    return {
        'left': index === 0,
        'right': index === 1,
    };
};

</script>

<style scoped lang="sass">

.splitrow 
    display: flex
    flex-wrap: wrap
    gap: 50px

.splitrow 
    > :first-child
        flex: 1 1 1px

    > :last-child
        flex: 1 1 1px    
</style>
