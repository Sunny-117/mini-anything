let {EventEmitter} = require('events');
let event = new EventEmitter();
event.on('click',()=>{
    console.log('click1');
});
event.on('click',()=>{
    console.log('click2');
});
event.emit('click');