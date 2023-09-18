<template>
  <div>
    <header>
      <h1>Nuxt3</h1>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useMeta(() => {
  return {
    title: `Todos - ${config.siteName}`,
  };
});
</script>

<style scoped>
h1 {
  font-size: 1rem;
}
</style>
