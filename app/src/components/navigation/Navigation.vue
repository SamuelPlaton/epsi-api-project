<template>
  <div class="text-center">
    <Layout :title="title"/>
    <slot/>
  </div>
</template>

<script>
import Layout from "./local-components/Layout";
export default {
name: "Navigation",
  components: {Layout},
  props: {title: String}
}
</script>

<style scoped>

</style>