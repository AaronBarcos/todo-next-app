import React from 'react'
import Link from 'next/link'

function index() {
  return (
    <div>
      <h1>To-do list</h1>
      <Link href="/tasks/allTasks">
        View all tasks
      </Link>
      <br />
      <Link href="/tasks/newTask">
        Create a new task
      </Link>
    </div>
  )
}

export default index