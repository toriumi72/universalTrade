<script setup lang="ts">
const { loggedInUser, userProfile } = useAuth()
const isOpenLogin = ref(true)
const isOpenProfileWarn = ref(true)

</script>

<template>
  <ClientOnly>
    {{ userProfile?.displayName }}
    <div v-if="loggedInUser">
      <div v-if="!userProfile">
        <UModal v-model="isOpenProfileWarn" :ui="{ container: 'flex min-h-full items-center justify-center text-center' }" class="z-[99]">
          プロフィールを設定してください。
        </UModal>
        <ProfileRegister />
      </div>
      <div v-else>
        <NuxtPage />
      </div>
    </div>
    <div v-else>
      <UButton label="login" @click="isOpenLogin = true" />
      <UModal v-model="isOpenLogin" :ui="{ container: 'flex min-h-full items-center justify-center text-center' }" class="z-[99]">
        <Login />
      </UModal>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>