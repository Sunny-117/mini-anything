
import React from 'react'

export default function UserAdd(props) {
  const text = React.createRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push('/user/list');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={text} />
      <button type="submit">提交</button>
    </form>
  )
}
