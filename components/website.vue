<template>
  
    <iframe
      class="website"
      :src="url"
      frameborder="0"
      :allowfullscreen="allowfullscreen ? 'allowfullscreen' : ''"
      :scrolling="scrolling"
    ></iframe>

</template>

<script setup lang="ts">

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  allowfullscreen: {
    type: String,
    default: false
  },
  scrolling: {
    type: String,
    default: 'auto'
  }
})
</script>

<style lang="sass" scoped>
.iframe-embed
  border: 0
  width: 100%
  height: 100%
</style>