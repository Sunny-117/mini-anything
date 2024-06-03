<template>
  <div>
     <!-- <h2>state值：{{name}}</h2>
    <h2>getter值：{{store.counterPar}}</h2>
    <h2>actions值：{{newStore}}</h2> -->
    <!-- <h2>{{ store.name }}</h2>
    <h2>{{ store.age }}</h2>
    <h2>{{ newAge }}</h2>
    <h2>{{ store.show }}</h2> -->
  </div>
</template>

<script setup>
//import {useStore} from '../store/useIndex'
//import {useStore} from '../store/index2'
import {useStore} from '../store/index3'
const store = useStore()
console.log(store);
</script>

