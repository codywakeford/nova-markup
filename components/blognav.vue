<template>
    <div class="blognav-container" ref="container">
        <div class="blognav" ref="blognav">
            
            <a class="header" v-for="header in headers" :class="{'active-header' : activeHeaderIds.includes(header.id) }" :href='`#${header.id}`'>{{ header.innerText }}</a>
            
        </div>
    </div>
</template>

<script setup>
const headers = ref([])
const container = ref(null)
const blognav = ref(null)
const activeHeaderIds = ref([])

const props = defineProps({
    pickupOffset: {
        type: String,
        default: "100"
    }
})



onMounted(async () => {

    initHeaders()
    initObservers()

    document.addEventListener('scroll', stickyHandling)
})

function initHeaders() {
    const allHeadingsWithId = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')

    allHeadingsWithId.forEach((header) => {
        header.style.scrollMarginTop = '50px'
        headers.value.push(header)

    })
}

function initObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeHeaderIds.value.push(entry.target.id)
            } else if (!entry.isIntersecting && activeHeaderIds.value.includes(entry.target.id)) {
                activeHeaderIds.value = activeHeaderIds.value.filter(id => id !== entry.target.id)
            }
        })
    }, observerOptions)

    headers.value.forEach(header => {
        observer.observe(header)
    })
}

function stickyHandling() {
    if (!container.value || !blognav.value) return


    const containerRect = container.value.getBoundingClientRect()
    const stickyRect = blognav.value.getBoundingClientRect()

    if (containerRect.top - props.pickupOffset  < 0 && window.scrollY - ( stickyRect.height / 2 ) < (containerRect.height - props.pickupOffset)) {
        blognav.value.style.position = 'fixed'
        blognav.value.style.top = `${props.pickupOffset}px`
        blognav.value.style.bottom = 'auto'
    } else if (window.scrollY  >= (containerRect.height - stickyRect.height)) {
        blognav.value.style.position = 'absolute'
        blognav.value.style.top = 'auto'
        blognav.value.style.bottom = 0
    } else {
        blognav.value.style.position = 'absolute'
        blognav.value.style.top = '0'
        blognav.value.style.bottom = 'auto' 
    }

}

</script>

<style lang='sass' scoped>
.blognav-container
    position: relative

.blognav
    display: flex
    flex-direction: column
    max-width: 250px

    .header
        font-size: 1.25rem

        &.active-header
            font-weight: 300
</style>