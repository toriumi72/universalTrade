<script setup lang="ts">
const { userProfile } = useAuth()
</script>

<template>
  <div>
    mySetting
    <div v-if="!userProfile">
      {{ userProfile.displayName }}
    </div>
  </div>
</template>

<style scoped>

</style>