<script setup lang="ts">
const {
  getProfile,
  addBookItem
} = useStore()
const {
  loggedInUser,
  userProfile,
} = useAuth()
const {

} = useStorage()

onMounted(async() => {

})

const tabArr = ref([
  "全て",
  "プログラミング",
  "物理",
  "数学",
  "化学",
  "生物",
  "地学",
  "地理",
  "世界史",
  "歴史",
])

const bookItemAddData = ref({
  name: "",
  condition: "",
  description: "",
  price: 0,
  imageURL: "",
  sellerId: userProfile.value.uid,
  buyerId: "",
  isPurchased: false,
  isDelivered: false,
  negotiable: false,
  shipping: "",
  soled: false,
  tags: [],
  usedClass: "",
})

const imageURLSample = ref('')

const onFileChange = (e:any) => {
  const file = e.target.files[0]
  console.log(file)
  if (!file) {
    return
  }
  bookItemAddData.value.imageURL = file
  imageURLSample.value = URL.createObjectURL(file)
}

const onAddBookItem = async () => {
  try {
    if (!loggedInUser.value) {
      throw new Error('ログインしていません')
    }
    await addBookItem(loggedInUser.value, bookItemAddData.value)
    alert("出品しました")
  } catch (error) {
    console.log(error)
    console.log("error")
  }
}

//画像アップロードデモコード
// const fileInput = ref(null)
// const imageUrl = ref('')

// const onDownloadFile = async () => {
//   downloadFile("test.jpeg")
//   .then((res) => {
//     console.log("res", res)
//   })
// }

</script>

<template>
  <div>
    <div class="">
      <div>
        <input type="text" v-model="bookItemAddData.name" placeholder="name">
      </div>
      <div>
        <label><input type="radio" v-model="bookItemAddData.condition" value="良い" checked>良い</label>
        <label><input type="radio" v-model="bookItemAddData.condition" value="普通">普通</label>
        <label><input type="radio" v-model="bookItemAddData.condition" value="悪い">悪い</label>
      </div>
      <div>
        <input type="text" v-model="bookItemAddData.description" placeholder="description">
      </div>
      <div>
        <input type="text" v-model="bookItemAddData.price" placeholder="price">
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            v-model="bookItemAddData.negotiable"
          />
          値引き相談可
        </label>
      </div> 
      <div>
        <label v-for="tag in tabArr" :key="tag">
          <input
            type="checkbox"
            :value="tag"
            v-model="bookItemAddData.tags"
          />
          {{ tag }}
        </label>
      </div>
      <div>
        <input type="file" @change="onFileChange" />
        <UAvatar :src="imageURLSample" />
      </div>
      <UButton @click="onAddBookItem">
        BookItemを追加
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>