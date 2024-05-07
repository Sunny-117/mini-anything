import { effect, computed, reactive } from "vue";

const state = reactive({
  a: 1,
  b: 2,
});
const sum1 = computed(() => {
  console.log("computed");
  return state.a + state.b;
});
// console.log(sum1.value)
// console.log(sum1.value)
// console.log(sum1.value)
// console.log(sum1.value)

// state.a++
// state.a++
// state.a++

// console.log(sum1.value)
// console.log(sum1.value)

effect(()=>{
    console.log('render', sum1.value)
})

state.a++;

// const sum2 = computed({
//   get() {
//     console.log("computed");
//     return state.a + state.b;
//   },
// });
