<template>
    <div v-for="item of store.getters.filteredTodos" :key="item.id">
        <input type="checkbox" name="" id="" :checked="item.isFinished" @click="toggleTodo(item.id)">
        <span :class="{ finished: item.isFinished }">{{ item.text }}</span>
        <button @click="removeTodo(item.id)">delete</button>
    </div>
</template>

<script setup>
import { useStore } from '../../../../packages/index'
const store = useStore()
const toggleTodo = (id) => store.dispatch('toggleTodo', id)
const removeTodo = (id) => store.dispatch('removeTodo', id)

</script>

<style lang="scss" scoped>
.finished {
    text-decoration: line-through;
}
</style>