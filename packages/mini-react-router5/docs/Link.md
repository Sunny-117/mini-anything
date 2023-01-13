# Link

```jsx
import React from 'react'
import { BrowserRouter, Route, Link, NavLink } from "./react-router-dom"

function Page1() {
    return <div>
        <h1>Page1</h1>
    </div>
}

function Page2() {
    return <h1>Page2</h1>
}

export default function App() {
    return (
        <BrowserRouter>
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <ul>
                <li>
                    <Link to={{
                        pathname: "/page1",
                        search: "?a=1&b=2"
                    }}>跳转到页面1</Link>
                </li>
                <li>
                    <NavLink to="/page2">跳转到页面2</NavLink>
                </li>
            </ul>
        </BrowserRouter>
    )
}

```


# 实现

补充`createHref`和`handlePathAndState`的search.length

```js
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
```

# NavLink

就是`Link`组件，只不过多加了一个`className`