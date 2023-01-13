import React, { useState } from 'react'
import { useBoolean } from '@sunnyhooks/shooks'
console.log(useBoolean)
export default function App() {
  const [n, setN] = useState(() => {
    return 123;
  })
  return (
    <div>{n}</div>
  )
}
