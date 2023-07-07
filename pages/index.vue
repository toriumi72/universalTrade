<script setup lang="ts">
const { loggedInUser, userProfile } = useAuth()

onMounted(() => {
  // navigateTo('/home')
})
</script>

<template>
  <div>
    loggedInUser:{{ loggedInUser }}
  </div>
  <div>
    userProfile:{{ userProfile }}
  </div>

</template>

<style scoped>

</style>