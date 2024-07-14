<template>
    <header class="mheader">
        <slot />
    </header>
</template>


<style scoped lang="sass">
header
    display: flex
    flex-direction: column
    align-items: center
    gap: 15px
    text-align: center

    margin-block: 50px
    max-width: 750px
    margin-inline: auto
</style>