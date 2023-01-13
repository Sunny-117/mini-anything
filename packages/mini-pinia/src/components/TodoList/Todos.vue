<template>
  <div>
    <div
      v-for="item of todoListStore.filteredTodos"
      :key="item.id"
    >
      <input 
        type="checkbox" 
        :checked="item.isFinished" 
        @click="todoListStore.toggleTodo(item.id)"
      />
      <span
        :class="{ finished: item.isFinished }"
      >{{ item.text }}
      </span>
      <button @click="todoListStore.removeTodo(item.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
  import { useTodoListStore } from '@/store';

  const todoListStore = useTodoListStore();
</script>

<style lang="scss" scoped>
  .finished {
    text-decoration: line-through;
  }
</style>