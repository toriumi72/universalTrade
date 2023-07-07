<script setup lang="ts">
const {
  addProfile,
  getProfile
} = useStore()
const {
  loggedInUser,
  userProfile
} = useAuth()

const addProfileData = ref({
  displayName: '',
  university: '',
  faculty: '',
  selfIntroduction: '',
  avatarURL: ''
})

const avatarURLSample = ref('')

const onFileChange = (e:any) => {
  const file = e.target.files[0]
  console.log(file)
  if (!file) {
    return
  }
  addProfileData.value.avatarURL = file
  avatarURLSample.value = URL.createObjectURL(file)
}

const currentStep = ref(0)

const onAddProfile = async () => {
  try {
    if (!loggedInUser.value) {
      throw new Error('ログインしていません')
    }
    await addProfile(loggedInUser.value, addProfileData.value)
    userProfile.value = await getProfile(loggedInUser.value)
  } catch (error) {
    console.log(error)
    console.log("error")
  }
}

const onNextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const onPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const isCurrentStepFilled = computed(() => {
  switch (currentStep.value) {
    case 0:
      return addProfileData.value.displayName.trim() !== ''
    case 1:
      return addProfileData.value.university.trim() !== ''
    case 2:
      return addProfileData.value.faculty.trim() !== ''
    case 3:
      return addProfileData.value.selfIntroduction.trim() !== ''
    case 4:
      return addProfileData.value.avatarURL.trim() !== ''
    default:
      return false
  }
})
</script>

<template>
  {{ addProfileData }}
  {{ avatarURLSample }}
  <div class="mx-auto max-w-md">
    <div class="p-6 bg-white rounded">
      <h1 class="mb-4 text-2xl font-semibold">プロフィール登録</h1>
      <div v-if="currentStep === 0">
        <label class="block">名前</label>
        <input v-model="addProfileData.displayName" placeholder="名前を入力してください" type="text" class="w-full p-2 border rounded">
      </div>
      <div v-else-if="currentStep === 1">
        <label class="block">大学名</label>
        <input v-model="addProfileData.university" placeholder="大学名を入力してください" type="text" class="w-full p-2 border rounded">
      </div>
      <div v-else-if="currentStep === 2">
        <label class="block">学部</label>
        <input v-model="addProfileData.faculty" placeholder="学部を入力してください" type="text" class="w-full p-2 border rounded">
      </div>
      <div v-else-if="currentStep === 3">
        <label class="block">自己紹介</label>
        <textarea v-model="addProfileData.selfIntroduction" placeholder="自己紹介を入力してください" class="w-full h-32 p-2 border rounded"></textarea>
      </div>
      <div v-else-if="currentStep === 4" class="flex items-center justify-center">
        <label for="avatar-upload" class="flex flex-col gap-2 items-center justify-center">
          <UAvatar :src="avatarURLSample" size="3xl" class="relative" />
          <div>
            編集する
          </div>
        </label>
        <input id="avatar-upload" @change="onFileChange" type="file" class="hidden">
      </div>
      <div class="flex justify-between mt-4">
        <UButton 
          @click="onPrevStep" 
          size="md"
          color="gray"
          :disabled="currentStep === 0"
        >
          戻る
        </UButton>
        <UButton
          v-if="currentStep < 4"
          @click="onNextStep"
          size="md"
          color="violet"
          :disabled="!isCurrentStepFilled"
        >
          次に進む
        </UButton>
        <UButton
          v-else
          @click="onAddProfile"
          size="md"
          color="violet"
        >
          登録
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>


