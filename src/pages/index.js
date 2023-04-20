import React from 'react'
import Link from 'next/link'

function index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">To-do list</h1>
      <Link href="/tasks/allTasks">
        View all tasks
      </Link>
    </div>
  )
}

export default index