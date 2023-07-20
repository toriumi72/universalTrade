<script setup lang="ts">
const {
  chatList,
  addChatItem,
  getChatListRealtime,
  //test
  testGetUser,
} = useStore()
const {
  loggedInUser,
  userProfile,
} = useAuth()

onMounted(async() => {
  if (loggedInUser.value) {
    getChatListRealtime(chatList)
    //仮
    chatList.value.forEach((chatItem: any) => {
      if(chatItem.sellerId === loggedInUser.value?.uid) {
        testGetUser(chatItem.buyerId)
        .then((res) => {
          chatItem.avatarURL = res.avatarURL
          chatItem.displayName = res.displayName
        })
        .catch((err) => {
          console.log(err)
        })
      }
      else {
        testGetUser(chatItem.sellerId)
        .then((res) => {
          chatItem.avatarURL = res.avatarURL
          chatItem.displayName = res.displayName
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
  }
  else {
    console.log("ログインしてください")
  }
})

const router = useRouter()
</script>

<!-- <script setup lang="ts">
const {
  chatList,
  addChatItem,
  getChatListRealtime,
  testGetUser,
} = useStore()

const {
  loggedInUser,
  userProfile,
} = useAuth()

onMounted(async() => {
  if (loggedInUser.value) {
    getChatListRealtime(chatList)
  } else {
    console.log("ログインしてください")
  }
})

watchEffect(async () => {
  const promises = chatList.value.map(async (chatItem: any) => {
    try {
      let user;
      if(chatItem.sellerId === loggedInUser.value?.uid) {
        user = await testGetUser(chatItem.buyerId);
      } else {
        user = await testGetUser(chatItem.sellerId);
      }
      return { ...chatItem, avatarURL: user.avatarURL, displayName: user.displayName };
    } catch (err) {
      console.log(err);
    }
  });

  chatList.value = await Promise.all(promises);
})

const router = useRouter()
</script> -->


<template>
  <div>
    {{ chatList }}
  </div>
  <div class="">
    <div class="mx-auto">
      <div class="text-2xl font-bold mb-6">チャット一覧</div>
      <div v-for="(chatItem, index) in chatList" :key="index" class="">
        {{ chatItem.id }}
        <!-- <button
          @click="navigateTo(`/chatList/${chatItem.id}`)"
          class="flex items-center gap-3 py-3 px-4 w-full"
        >
          <ItemAvatar photoURL="" class="text-sm" />
          <div class="flex flex-col text-left">
            <div class="">
              {{ chatItem.name }}
            </div>
            <div class="text-xs">
              {{ chatItem.lastMessage }}
            </div>
          </div>
        </button> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
