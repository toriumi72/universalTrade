<script setup lang="ts">
definePageMeta({ layout: 'individual' })

const {
  bookList,
  addChatItem,
  updateBookItem,
  getBookListRealtime,
  //test
  testGetUser,
} = useStore()
const {
  loggedInUser,
  userProfile,
} = useAuth()

onMounted(async () => {
  await testGetUser(bookItem.value.sellerId)
  .then((res) => {
    bookItemSeller.value.avatarURL = res.avatarURL
    bookItemSeller.value.displayName = res.displayName
  })
  .catch((err) => {
    console.log(err)
  })
})

const router = useRouter()
const route = useRoute()
const itemId = ref(route.params.item_id)
const bookItem = computed(() => {
  return bookList.value ? bookList.value.find((bookItem: any) => bookItem.id == itemId.value) : null
})
//仮
const bookItemSeller = ref({
  avatarURL: "",
  displayName: "",
})

const addChatData = computed(() => ({
  productId: itemId.value,
  sellerId: bookItem.value.sellerId,
  buyerId: loggedInUser.value?.uid,
}))

const navigateTo = (path: string) => {
  router.push(path)
}

const onGoToChat = async () => {
  if (!bookItem.value) {
    console.error('bookItem is undefined')
    return
  }
  if (bookItem.value.buyerId && bookItem.value.buyerId === loggedInUser.value?.uid) {
    navigateTo(`/chatList/${itemId.value}`)
  }
  else if (bookItem.value.buyerId && bookItem.value.buyerId !== loggedInUser.value?.uid) {
    alert("この商品はすでに売り切れです。")
  }
  else {
    await updateBookItem(bookItem.value.id, { buyerId: loggedInUser.value?.uid, isPurchased: true })
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
      <div class="w-full">
        <div class="h-[30vh] w-full bg-gray-100">
          <img class="w-full h-full object-contain" :src="bookItem.imageURL" :alt="bookItem.name" />
        </div>
      </div>

      <!-- 商品詳細 -->
      <div class="p-4 flex flex-col bg-white rounded-lg">
        <div class="text-md font-semibold mb-2">{{ bookItem.name }}</div>
        <div class="mb-4 flex flex-wrap space-x-2">
          <span
            v-for="(tag, index) in bookItem.tags"
            :key="index"
            class="px-3 py-1 space-x-3 bg-violet-600 text-xs text-white rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mb-4">
          <span class="text-3xl font-semibold"><span class="mr-1 text-xs">¥</span>{{ bookItem.price }}</span>
        </div>
        <div class="mb-6 space-y-4">
          <div class="">出品者: {{ bookItemSeller.displayName }}</div>
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
        <UButton @click="onGoToChat" size="xl" color="black" block>
          取引チャットへ
        </UButton>
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