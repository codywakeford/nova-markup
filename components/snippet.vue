<template>
  <pre class="code-container">
    <code-prism :code="code" :language="language" />
  </pre>
</template>

<script>
import CodePrism from 'vue-prism-component';

export default {
  name: 'CodeSnippet',
  components: {
    CodePrism,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.code-container {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
