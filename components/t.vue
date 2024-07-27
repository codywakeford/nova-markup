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
    const size = computedStyle.getPropertyValue('--size').trim();
    const index = parseInt(size, 10);
    if (!isNaN(index) && sizes[index]) {
      t.value.style.fontSize = sizes[index];
    }
  }
}

onMounted(() => {
  updateSize();

  const observer = new MutationObserver(() => {
    updateSize();
  });

  if (t.value) {
    observer.observe(t.value, {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  onBeforeUnmount(() => {
    observer.disconnect();
  })
})
</script>

<style lang="sass" scoped>
.t
  font-size: var(--size, 1rem)
</style>

