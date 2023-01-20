import { autorun, observable, observe } from 'mobx'
class Person {
    @observable name = 'sunny'
}
let p1 = new Person()
observe(p1, c => {
    console.log('[ c ] >', c)
})

autorun(() => {
    console.log('[ 111 ] >', 111)
})