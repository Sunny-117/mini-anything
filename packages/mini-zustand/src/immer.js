// import { produce } from 'immer';
// let baseState = {
//   ids: [1],
//   pos: {
//     x: 1,
//     y: 1 
//   }
// }

// let nextState = produce(baseState, (draft) => {
//   draft.ids.push(2);
// })
// console.log(baseState.ids === nextState.ids);//false
// console.log(baseState.pos === nextState.pos);//true


import { produce } from 'immer'
const baseState = {
  list: ['1', '2']
}
const result = produce(baseState, (draft) => {
  draft.list.push('3')
})
console.log(baseState);// { list: [ '1', '2' ] }
console.log(result);// { list: [ '1', '2', '3' ] }
