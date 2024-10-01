//父类能调用子类的方法吗？
//不一定
class Parent{
    a(){
        this.b();
        console.log('a');
    }
}
class Child extends Parent{
    b(){
        console.log('b');
    }
}
//let child = new Child();
//child.a()

let parent = new Parent();
parent.a()