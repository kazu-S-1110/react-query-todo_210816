import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { TaskEdit } from './TaskEdit'
import { TaskList } from './TaskList'

export const MainTask = () => {
  const history = useHistory()
  const [text, setText] = useState('')
  console.log('MainTaskがレンダリングされました')

  return (
    <>
      <input
        type="text"
        placeholder="dummy text?"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p className="mb-10 text-xl font-bold">Tasks</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>
      <ChevronDoubleRightIcon
        onClick={() => history.push('/tags')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Tag Page</p>
    </>
  )
}
