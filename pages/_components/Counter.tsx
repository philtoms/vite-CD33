import React, { useState } from 'react'
import content from './pageService.content'

export { Counter }

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Counter {count}
      </button>
      <section>{content.fields.title.fields.subheading}</section>
      <section>{content.fields.title.fields.heading}</section>
    </>
  )
}
