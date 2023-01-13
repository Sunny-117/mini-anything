<template>
  <div>
    <a
      href="javascript:;"
      :class="{ active: todoListStore.filter === 'all' }"
      @click="setFilter('all')"
    >All</a>
    <a 
      href="javascript:;"
      :class="{ active: todoListStore.filter === 'finished' }"
      @click="setFilter('finished')"
    >Finished</a>
    <a 
      href="javascript:;"
      :class="{ active: todoListStore.filter === 'unfinished' }"
      @click="setFilter('unfinished')"
    >Unfinished</a>
  </div>
</template>

<script setup>
  import { useTodoListStore } from '@/store';

  const todoListStore = useTodoListStore();

  const setFilter = (filter) => {
    todoListStore.$patch({ filter })
  }
</script>

<style lang="scss" scoped>
  .active {
    text-decoration: none;
    color: #000;
  }

  a {
    margin-right: 15px;
  }
</style>