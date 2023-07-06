<script setup lang="ts">
const { token, signUp, googleLogin }  = useAuth()
const createEmail = ref(null)
const createPassword = ref(null)
onMounted(async () => {
  console.log(token.value)
})
const onSignUp = async () => {
  try {
    if (createEmail.value && createPassword.value) {
      await signUp(createEmail.value, createPassword.value)
      console.log(token.value)
      alert("登録しました")
      navigateTo('/home')
    }
    else {
      alert("入力してください")
      console.log("入力してください")
    }
  } catch (error) {
    alert("登録に失敗しました")
    alert(error)
    console.log("error")
  }
}
const onGoogleLogin = async () => {
  try {
    await googleLogin()
    console.log(token.value)
    console.log("success")
    alert("ログインしました")
  } catch (error) {
    console.log(error)
    alert("ログインに失敗しました")
  }
}
</script>

<template>
  <div class="py-6 bg-white">
    <div class="mx-auto px-4 max-w-screen-2xl">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800">アカウント登録</h2>
      <div class="mx-auto max-w-lg rounded-lg border">
        <div class="flex flex-col gap-4 p-4">
          <div>
            <label for="createEmail" class="mb-2 inline-block text-sm text-gray-800">Email</label>
            <input v-model="createEmail" name="createEmail" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>
          <div>
            <label for="createPassword" class="mb-2 inline-block text-sm text-gray-800">Password</label>
            <input v-model="createPassword" name="createPassword" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>
          <UButton @click="onSignUp" label="Create" color="indigo" size="xl" block />
          <div class="relative items-center justify-center flex">
            <span class="inset-x-0 h-px bg-gray-300 absolute"></span>
            <span class="relative bg-white px-4 text-sm text-gray-400">create in social</span>
          </div>
          <UButton @click="onGoogleLogin" icon="i-logos-google-icon" label="Continue with Google" color="white" size="xl" block :trailing="false" />
        </div>
        <div class="flex items-center justify-center bg-gray-100 p-4">
          <div class="text-center text-sm text-gray-500">
            Do you have an account? 
            <UButton @click="navigateTo('/login')" label="Login" color="indigo" variant="link" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

<style scoped>

</style>