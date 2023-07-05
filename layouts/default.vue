<script setup lang="ts">
const route = useRoute()
// const { token } = useAuth()
const localNavArray = ref([
  {
    slack: 'home',
    name: '教科書検索',
    icon: 'i-heroicons-home',
    // selectedIcon: 'mingcute:home-1-fill'
  },
  {
    slack: 'chatList',
    name: 'チャット',
    icon: 'i-heroicons-chat-bubble-left-right',
    // selectedIcon: 'mingcute:message-3-fill'
  },
  {
    slack: 'bookmarkList',
    
    name: 'いいね',
    icon: 'i-heroicons-bookmark',
    // selectedIcon: 'ic:baseline-bookmark'
  },
  {
    slack: 'mySetting',
    name: '設定',
    icon: 'i-heroicons-user',
    // selectedIcon: 'mdi:account-circle'
  }
])
const isOpenMenu = ref(false)
const isOpen = ref(false)

let preventTouchMove: (event: TouchEvent) => void

watch(isOpenMenu, (newVal) => {
  if (newVal) {
    preventTouchMove = (event: TouchEvent) => event.preventDefault();
    window.addEventListener('touchmove', preventTouchMove, { passive: false });
  } else {
    window.removeEventListener('touchmove', preventTouchMove);
  }
})

onUnmounted(() => {
  window.removeEventListener('touchmove', preventTouchMove);
})
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full h-auto z-[99]">
    <div class="flex px-3 pt-2 pb-8 items-center shadow bg-white">
      <div class="grow flex items-center">
        <button @click="isOpenMenu = !isOpenMenu" class="absolute left-1/2 flex items-center justify-center h-12 w-12 -top-4 -translate-x-1/2 rounded-3xl bg-indigo-500 text-white shadow-lg sm:-top-8 sm:h-16 sm:w-16">
          <UIcon name="i-heroicons-shopping-bag" class="text-2xl"  />
        </button>
        <!-- <UButton @click="isOpenMenu = !isOpenMenu" class="absolute left-1/2 flex items-center justify-center -top-4 -translate-x-1/2" icon="i-heroicons-shopping-bag" size="xl" color="primary" rounded="rounded-full" square variant="solid" /> -->
        <button v-for="(localNav, index) of localNavArray" @click="navigateTo('/' + localNav.slack)" class="basis-1/4 py-[calc(0.2vh_+_6px)]" :class="{ 'mr-7': index === 1, 'ml-7': index === 2, }">
          <div class="text-[calc(2vh_+_8px)] leading-none" :class="{ 'text-[#6B4EFF]': route.path === '/' + localNav.slack }">
            <UIcon v-show="route.path === '/' + localNav.slack" :name="localNav.icon" class="text-light" />
            <UIcon v-show="route.path !== '/' + localNav.slack" :name="localNav.icon" class="text-light" />
          </div>
        </button>
      </div>
      <!-- <SwipeMenu v-show="isOpenMenu" @close="isOpenMenu = false" /> -->
    </div>
  </div>
  <UContainer>
    <slot/>
  </UContainer>
</template>
