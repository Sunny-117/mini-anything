import { effect, computed, reactive } from "vue";

const state = reactive({
  a: 1,
  b: 2,
});
const sum1 = computed(() => {
  console.log("computed");
  return state.a + state.b;
});

// case1

// console.log(sum1.value)
// console.log(sum1.value)
// console.log(sum1.value)
// console.log(sum1.value)

// state.a++
// state.a++
// state.a++

// 当不打印下面两句话的时候不需要重新运行computed，因为没有使用到
// 所以computed中不需要effectFn()
// console.log(sum1.value)
// console.log(sum1.value)




// case2：需要对value进行track和trigger
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
