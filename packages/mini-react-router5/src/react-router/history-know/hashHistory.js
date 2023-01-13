import { createHashHistory } from "history"
window.createHashHistory = createHashHistory;
window.h = createHashHistory({
    hashType:"slash",
    getUserConfirmation: (msg, callback) => {
        callback(window.confirm(msg));
    }
})

window.unblock = window.h.block((location, action) => {
    return `你真的要进入${location.pathname}吗？${action}`;
});

// window.unListen = window.h.listen((location, action) => {
//     console.log(location)
//     window.h.action = action;
// })

