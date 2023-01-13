<template>
  <div id="app">
    {{this.$store.state.count}}
    {{this.$store.getters.newCount}}
    {{this.$store.state.a.b.count}}
    <button @click="change">add</button>
  </div>
</template>

<script>
export default {
  name:'app',
  mounted(){
    console.log(this.$store)
  },
  methods:{
    change(){
      this.$store.dispatch('change');
    }
  }
}
</script>
<style>

</style>
