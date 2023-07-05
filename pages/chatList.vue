<script setup lang="ts">
const { loggedInUser } = useAuth()
const isOpen = ref(true)

</script>

<template>
  <ClientOnly>
    <div v-if="loggedInUser">
      <NuxtPage />
    </div>
    <div v-else>
      <UButton label="login" @click="isOpen = true" />
      <UModal v-model="isOpen" :ui="{ container: 'flex min-h-full items-center justify-center text-center' }" class="z-[99]">
        <Login />
      </UModal>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>