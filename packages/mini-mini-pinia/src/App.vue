<template>
  <div>
    {{ counter.count }}
    <button @click="plus(1)">plus</button>
    <button @click="plusAsync(1)">plus-async</button>
  </div>
  <h2 :style="{ color: MyTitle.color }">{{ MyTitle.title }}</h2>
  <button @click="setTitle('demo', 'red')">set title</button>
</template>

<script setup lang="ts">
import { useCountStore, useTitleStore } from '@/store';

const counter = useCountStore()
const MyTitle = useTitleStore()
const plus = (num: number) => {
  counter.$patch({
    count: counter.count += num
  })
}
const plusAsync = (num: number) => {
  counter.plusAsync(num)
}
const setTitle = (title: string, color: string) => {
  MyTitle.setTitle(title, color)
}
</script>

<style scoped>

</style>