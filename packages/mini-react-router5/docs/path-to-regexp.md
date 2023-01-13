# path-to-regexp

注意版本："path-to-regexp": "^3.0.0",

第三方库：path-to-regexp，用于将一个字符串正则（路径正则，path regexp）

```jsx
<Route path="xxxx/:id/:page">
```


基本使用

```jsx
const res = pathToRegexp('/news/:id/:page')
console.log(res)///^\/news\/([^\/]+?)\/([^\/]+?)(?:\/)?$/i
```

第二个参数是关键字，比如id，page

```jsx

const keys = []
const res = pathToRegexp('/news/:id/:page', keys)
console.log(keys)

```

第三个参数`options`

sensitive：是否大小写敏感

strict：是否严格匹配末尾的斜杠

end: 是否精确匹配

...