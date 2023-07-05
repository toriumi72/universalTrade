<script setup lang="ts">
const { loggedInUser } = useAuth()

onMounted(() => {
  // navigateTo('/home')
})
</script>

<template>
  
  {{ loggedInUser }}

</template>

<style scoped>

</style>