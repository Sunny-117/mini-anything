import { createContext } from "react"

const context = createContext();
context.displayName = "Router";//在调试工具中显示的名字

export default context;