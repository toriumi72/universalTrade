<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const onNavigateBack = () => {
  if (/^\/home\/.+$/.test(route.path)) {
    navigateTo('/home')
  } else {
    // navigate somewhere else or do nothing
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 flex items-center py-3 px-4 sm:px-6 lg:px-8 w-full h-auto bg-white/0 z-[99]">
    <UButton
      @click="onNavigateBack"
      color="black"
      size="xl"
      variant="ghost"
    >
      <UIcon name="i-material-symbols-arrow-back-ios-new-rounded" />
    </UButton>
  </div>

  <!-- <UContainer>
    <slot/>
  </UContainer> -->
  <slot />
</template>

<style scoped>

</style>