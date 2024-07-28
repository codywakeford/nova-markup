<template>
    <p class="t" ref="t">
        <slot />
    </p>
</template>

<script setup lang="ts">
const t = ref<HTMLElement | null>(null);

const sizes = [
  "clamp(.25rem, .4545vw + .1591rem, .5rem)",
  "clamp(.5rem, .4545vw + .4091rem, .75rem)",
  "clamp(.75rem, .4545vw + .6591rem, 1rem)",
  "clamp(1rem, .4545vw + .9091rem, 1.25rem)",
  "clamp(1.25rem, .4545vw + 1.1591rem, 1.5rem)",
  "clamp(1.5rem, .4545vw + 1.4091rem, 1.75rem)",
  "clamp(1.75rem, .4545vw + 1.6591rem, 2rem)",
  "clamp(2rem, .4545vw + 1.9091rem, 2.25rem)",
  "clamp(2.25rem, .4545vw + 2.1591rem, 2.5rem)",
  "clamp(2.5rem, .4545vw + 2.4091rem, 2.75rem)",
  "clamp(2.75rem, .4545vw + 2.6591rem, 3rem)",
];
function updateSize() {
  if (t.value) {
    const computedStyle = window.getComputedStyle(t.value);
    const size = computedStyle.getPropertyValue('--text-size').trim();
    const index = parseInt(size, 10);
    if (!isNaN(index) && sizes[index]) {
      t.value.style.fontSize = sizes[index];
    }
  }
}

let animationFrameId: number;

function watchCustomProperty() {
  updateSize();  // Check and update size

  // Continue watching
  animationFrameId = requestAnimationFrame(watchCustomProperty);
}

onMounted(() => {
  if (t.value) {
    // Start watching the custom property
    watchCustomProperty();
  }
});

onBeforeUnmount(() => {
  // Stop watching the custom property
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style lang="sass" scoped>
@import '../dest/something.css'
</style>

