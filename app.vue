<script setup lang="ts">
const { loggedInUser, userProfile } = useAuth()
const { getProfile } = useStore()

// onMounted(async () => {
//   if (loggedInUser.value) {
//     userProfile.value = await getProfile(loggedInUser.value)
//   }
// })

// let preventTouchMove: (event: TouchEvent) => void
// onMounted(async () => {
//   preventTouchMove = (event: TouchEvent) => event.preventDefault()
//   window.addEventListener('touchmove', preventTouchMove, { passive: false })
// })

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>