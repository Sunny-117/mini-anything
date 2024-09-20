// 定义了一个名为 logger 的函数，它是一个高阶函数，因为它接收了一个函数作为参数并返回了一个新的函数
// 定义一个名为 logger 的常量，该常量是一个高阶函数，它接收一个名为 createState 的参数
const logger = (createState) =>
    // 返回一个新的函数，该函数接收三个参数：set，get，api
    (set, get, api) =>
        // 调用 createState 函数，并将三个参数作为它的参数
        createState(
            // 返回一个函数，该函数接收任意数量的参数，并执行以下操作：
            (...args) => {
                // 在控制台输出旧状态
                console.log(`old state:`, get())
                // 调用 set 函数，并将 args 作为它的参数
                set(...args)
                // 在控制台输出新状态
                console.log(`new state`, get())
            },
            // 将 get 作为参数传递给 createState
            get,
            // 将 api 作为参数传递给 createState
            api
        )
export default logger;