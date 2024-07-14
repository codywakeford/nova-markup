<template>
    <div class="loader"></div>
</template>

<script setup>

</script>

<style lang='sass' scoped>

.loader 

    &.bispinner
        width: 50px
        aspect-ratio: 1
        border-radius: 50%
        border: 8px solid
        border-color: #000 #0000
        animation: l1 1s infinite

        @keyframes l1 
            to
                transform: rotate(.5turn)

                
    &.default 
        width: 48px
        height: 48px
        border: 5px solid #FFF
        border-bottom-color: transparent
        border-radius: 50%
        display: inline-block
        box-sizing: border-box
        animation: rotation 1s linear infinite
    
        @keyframes rotation 
            0% 
                transform: rotate(0deg)

            100% 
                transform: rotate(360deg)



</style>