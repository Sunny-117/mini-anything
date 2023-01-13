import ListenerManager from "./ListenerManager";
import BlockManager from "./BlockManager";
/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options;
    const listenerManager = new ListenerManager();
    const blockManager = new BlockManager(getUserConfirmation);

    function go(step) {
        window.history.go(step);
    }
    function goBack() {
        window.history.back();
    }
    function goForward() {
        window.history.forward();
    }

    /**
     * 向地址栈中加入一个新的地址
     * @param {*} path 新的地址，可以是字符串，也可以是对象
     * @param {*} state 附加的状态数据，如果第一个参数是对象，该参数无效
     */
    function push(path, state) {
        changePage(path, state, true);
    }
    // h.push('/news', {a:1, b:2})

    function replace(path, state) {
        changePage(path, state, false);
    }

    /**
     * 抽离的，可用于实现push或replace功能的方法
     * @param {*} path 
     * @param {*} state 
     * @param {*} isPush 
     */
    function changePage(path, state, isPush) {

        let action = "PUSH";
        if (!isPush) {
            action = "REPLACE"
        }
        const pathInfo = handlePathAndState(path, state, basename);
        const location = createLoactionFromPath(pathInfo);
        blockManager.triggerBlock(location, action, () => {
            if (isPush) {
                // 加上历史记录(状态)，防止强制刷新的时候state丢失
                window.history.pushState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path);
            }
            else {
                window.history.replaceState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path);
            }
            listenerManager.triggerListener(location, action);
            //改变action
            history.action = action;
            //改变location
            history.location = location;
            if (forceRefresh) {
                //强制刷新
                window.location.href = pathInfo.path;
            }
        })
    }

    /**
     * 添加对地址变化的监听
     */
    function addDomListener() {
        // 注意：
        // popstate事件，仅能监听前进、后退、用户对地址hash的改变
        // 无法监听到pushState、replaceState
        window.addEventListener("popstate", () => {
            const location = createLocation(basename);
            const action = "POP";
            blockManager.triggerBlock(location, action, () => {
                listenerManager.triggerListener(location, "POP");
                history.location = location;
            })
        })
    }

    addDomListener();

    /**
     * 添加一个监听器，并且返回一个可用于取消监听的函数
     * @param {*} listener 
     */

    function listen(listener) {
        return listenerManager.addListener(listener);
    }

    function block(prompt) {
        return blockManager.block(prompt);
    }

    function createHref(location) {
        let { pathname = "/", search = "", hash = "" } = location;
        if (search.charAt(0) === "?" && search.length === 1) {
            search = "";
        }
        if (hash.charAt(0) === "#" && hash.length === 1) {
            hash = "";
        }
        return basename + pathname + search + hash;
    }

    const history = {
        action: "POP",// createBrowserHistory 创建的action为POP
        createHref,
        block,
        length: window.history.length,
        go,
        goBack,
        goForward,
        push,
        replace,
        listen,
        location: createLocation(basename)
    };
    //返回history对象
    return history;
}
/**
 * 根据path和state，得到一个统一的对象格式
 * @param {*} path 
 * @param {*} state 
 */
function handlePathAndState(path, state, basename) {
    if (typeof path === "string") {
        return {
            path,
            state
        }
    }
    else if (typeof path === "object") {
        let pathResult = basename + path.pathname;
        let { search = "", hash = "" } = path;
        if (search.charAt(0) !== "?" && search.length > 0) {
            search = "?" + search;
        }
        if (hash.charAt(0) !== "#" && hash.length > 0) {
            hash = "#" + hash;
        }
        pathResult += search;
        pathResult += hash;
        return {
            path: pathResult,
            state: path.state
        }
    }
    else {
        throw new TypeError("path must be string or object");
    }
}

/**
 * 创建一个location对象
 * location={
 *  hash
 *  search
 *  pathname
 *  state
 * }
 */
function createLocation(basename = "") {
    // window.location 
    let pathname = window.location.pathname;
    // 处理basename的情况;
    const reg = new RegExp(`^${basename}`);
    pathname = pathname.replace(reg, "");// 忽略 basename
    const location = {
        hash: window.location.hash,
        search: window.location.search,
        pathname
    };
    //处理state
    let state, historyState = window.history.state;
    if (historyState === null) {
        state = undefined;
    }
    else if (typeof historyState !== "object") {
        state = historyState;
    }
    else {
        if ("key" in historyState) {
            location.key = historyState.key;
            state = historyState.state;
        }
        else {
            state = historyState;
        }
    }
    location.state = state;
    console.log(location)
    return location;
}

// 测试

const location = createLocation('/news')
console.log(location)


/**
 * 根据pathInfo得到一个location对象
 * @param {*} pathInfo  {path:"/news/asdf#aaaaaa?a=2&b=3", state:状态}
 * @param {*} basename 
 */
function createLoactionFromPath(pathInfo, basename) {
    let pathname = pathInfo.path.replace(/[#?].*$/, "");//取出pathname
    //处理basename的情况
    let reg = new RegExp(`^${basename}`);
    pathname = pathname.replace(reg, "");
    //search
    var questionIndex = pathInfo.path.indexOf("?");
    var sharpIndex = pathInfo.path.indexOf("#");
    let search;
    if (questionIndex === -1 || questionIndex > sharpIndex) {
        search = ""
    }
    else {
        search = pathInfo.path.substring(questionIndex, sharpIndex);
    }
    //hash
    let hash;
    if (sharpIndex === -1) {
        hash = "";
    }
    else {
        hash = pathInfo.path.substr(sharpIndex);
    }
    return {
        hash,
        pathname,
        search,
        state: pathInfo.state
    }
}
window.createLoactionFromPath = createLoactionFromPath;

/**
 * 产生一个指定长度的随机字符串，随机字符串中可以包含数字和字母
 * @param {*} keyLength 
 */
function createKey(keyLength) {
    return Math.random().toString(36).substr(2, keyLength);
}

// 测试
window.myHistory = createBrowserHistory({
    forceRefresh: true
})

