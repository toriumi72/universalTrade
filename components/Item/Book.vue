<script setup lang="ts">
import { BookItem } from '@/type'

type Props = {
  bookItem: BookItem
}

//Bookmarkボタンを押した時の処理
const bookmarked = ref(false)
const onBookmark = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  bookmarked.value = !bookmarked.value
  console.log('bookmarked')
}
const props = defineProps<Props>()

</script>

<template>

<div class="border rounded-md">
  <div class="relative h-36 rounded-t-md overflow-hidden">
    <img :src="props.bookItem.imageURL" class="h-full w-full object-cover object-center overflow-hidden" />
    <div class="absolute left-0 bottom-0 px-3 py-1.5 text-sm rounded-tr-lg bg-black/80">
      <div class="text-white">
        {{ props.bookItem.price }}円
      </div>
    </div>
    <div class="absolute right-0 top-0 z-30">
      <button @click="onBookmark($event)" @touchstart="onBookmark($event)" class="w-full h-full">
        <UIcon name="i-material-symbols-bookmark" class="text-2xl" :class="{ 'text-[#6B4EFF]': bookmarked }" />
      </button>
    </div>
  </div>
  <div>
    <div class="p-2 text-left text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
      {{ props.bookItem.name }}
    </div>
  </div>
</div>


</template>


<style scoped>
</style>
