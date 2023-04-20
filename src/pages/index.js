import React from 'react'
import Link from 'next/link'

function index() {
  return (
    <div>
      <h1>To-do list</h1>
      <Link href="/tasks/allTasks">
        View all tasks
      </Link>
    </div>
  )
}

export default index