<script setup lang="ts">
const { loggedInUser, userProfile } = useAuth()
const { getProfile, getBookListRealtime } = useStore()

// onMounted(async () => {
//   if (loggedInUser.value) {
//     getBookListRealtime()
//   }
// })
getBookListRealtime()
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
html {
  touch-action: manipulation;
}
body * {
  position: relative;
}
</style>