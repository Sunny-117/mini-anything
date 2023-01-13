<template>
    <div>
        <input type="text" placeholder="input something" v-model="inputRef">
        <button @click="addTodo">Add TODO</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../../../../packages/index';
const inputRef = ref('inputRef')
const store = useStore()
const addTodo = () => {
    store.dispatch('addTodo', inputRef.value)
    inputRef.value = ''
}
</script>

<style lang="scss" scoped>

</style>