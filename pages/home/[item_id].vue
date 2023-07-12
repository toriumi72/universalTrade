<script setup lang="ts">
definePageMeta({ layout: 'individual' })

const {
  bookList,
  addChatItem,
  updateBookItem,
  getBookListRealtime
} = useStore()
const {
  loggedInUser,
  userProfile,
} = useAuth()

onMounted(async () => {

})

const router = useRouter()
const route = useRoute()
const itemId = ref(route.params.item_id)
const bookItem = computed(() => {
  return bookList.value ? bookList.value.find((bookItem: any) => bookItem.id == itemId.value) : null
})

const addChatData = computed(() => ({
  productId: itemId.value,
  buyerId: loggedInUser.value?.uid,
  sellerId: bookItem.value.sellerId,
}))

const navigateTo = (path: string) => {
  router.push(path)
}

const onGoToChat = async () => {
  if (!bookItem.value) {
    console.error('bookItem is undefined')
    return
  }
  if (bookItem.value.interestedBuyers && bookItem.value.interestedBuyers.includes(loggedInUser.value?.uid)) {
    navigateTo(`/chatList/${itemId.value}`)
  }
  else {
    await updateBookItem(bookItem.value.id, { interestedBuyers: [loggedInUser.value?.uid] })
    await addChatItem(addChatData.value)
    .then(() => {
      navigateTo(`/chatList/${itemId.value}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const onGoBack = () => {
  window.history.back() 
}
</script>


<template>
  <ClientOnly>
    <div v-if="bookItem" class="relative pb-24 w-full">
      <!-- 商品画像 -->
      <div class="sticky inset-0 w-full">
        <div class="h-[30vh] w-full bg-gray-100">
          <img class="w-full h-full object-contain" :src="bookItem.imageURL" :alt="bookItem.name" />
        </div>
        <UButton
          @click="onGoBack"
          :ui="{ rounded: 'rounded-full', padding: 'px-0 py-0' }"
          class="absolute top-4 right-4"
          color="black"
          size="xl"
          variant="outline"
        >
          <UIcon name="i-iconamoon-close-light" />
        </UButton>
      </div>

      <!-- 商品詳細 -->
      <div class="h-auto p-4 flex flex-col bg-white rounded-lg">
        <div class="text-md font-semibold mb-2">{{ bookItem.name }}</div>
        <div class="mb-4 flex flex-wrap space-x-2">
          <span
            v-for="(tag, index) in bookItem.tags"
            :key="index"
            class="px-3 py-1 space-x-3 bg-[#6B4EFF] text-xs text-white rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mb-4">
          <span class="text-3xl font-semibold"><span class="mr-1 text-xs">¥</span>{{ bookItem.price }}</span>
        </div>
        <div class="mb-6 space-y-4">
          <div class="">出品者: {{ bookItem.seller }}</div>
          <div class="">{{ bookItem.description }}</div>
          <div class="">出版年: {{ bookItem.publication_year }}</div>
          <div class="">使用年: {{ bookItem.used_in_class }}</div>
          <div class="">状態: {{ bookItem.condition }}</div>
          <div v-if="bookItem.negotiable === true" class="">交渉: 可</div>
          <div v-else class="">交渉: 不可</div>
        </div>

      </div>
      <!-- 取引、編集へのボタン -->
      <div v-if="bookItem.sellerId !== loggedInUser?.uid" class="fixed bottom-0 left-0 flex justify-center mt-auto p-4 w-full">
        <ButtonAction @click="onGoToChat" class="p-[0.8em] w-full bg-black text-white shadow-md">
          取引チャットへ
        </ButtonAction>
      </div>
      <div v-else class="fixed bottom-0 left-0 flex justify-center mt-auto p-4 w-full"> 
        <ButtonAction @click="" class="p-[0.8em] w-full bg-black text-white shadow-md">
          編集
        </ButtonAction>
      </div>
    </div>
  </ClientOnly>
</template>


<style scoped>
</style>