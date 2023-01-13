

import runSaga from "./runSaga"
import { Channel } from "./Channel";

/**
 * 创建saga中间件的函数
 */
export default function () {

    function sagaMiddleware(store) {
        //全局的环境信息
        const env = {
            store,
            channel: new Channel() //全局唯一的订阅频道
        }
        // 需要用到store中的dispatch和getState，所以定义run方法的位置讲究
        // =====>runSaga 函数 启动任务的核心
        sagaMiddleware.run = runSaga.bind(null, env);
        return function (next) {
            return function (action) {
                const result = next(action); // 直接交给下一个中间件处理，我自己不处理
                //发布订阅
                env.channel.put(action.type, action);
                return result;
            }
        }
    }
    return sagaMiddleware;

}