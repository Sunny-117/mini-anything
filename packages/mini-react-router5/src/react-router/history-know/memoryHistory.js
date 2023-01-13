import { createMemoryHistory } from "history"
window.createMemoryHistory = createMemoryHistory;
window.h = createMemoryHistory({
    initialEntries: ['/', '/abc'], // 表示初始数组内容
    initialIndex: 0, // 默认指针指向的数组下标
})

// window.unblock = window.h.block((location, action) => {
//     return `你真的要进入${location.pathname}吗？${action}`;
// });