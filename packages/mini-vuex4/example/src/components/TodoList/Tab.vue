<template>
    <div>
        <a href="#" @click="setFilter('all')" :class="{active: $store.state.filter==='all'}">All</a>
        <a href="#" @click="setFilter('finished')" :class="{ active: $store.state.filter === 'finished' }">finished</a>
        <a href="#" @click="setFilter('unfinished')"
            :class="{ active: $store.state.filter === 'unfinished' }">unfinished</a>
    </div>
</template>

<script setup>
import { useStore } from '../../../../packages/index'
const store = useStore()
const setFilter = (filter) => {
    store.commit('setFilter', filter)
}
</script>

<style lang="scss" scoped>
a {
    margin-right: 15px;
}

.active {
    text-decoration: none;
    color: #000;
}
</style>