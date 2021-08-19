import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { useHistory } from 'react-router-dom'

export const MainTag: VFC = () => {
  const history = useHistory()
  console.log('MainTagがレンダリングされました')
  return (
    <>
      <p className="mb-10 text-xl font-bold">Tags</p>
      <ChevronDoubleLeftIcon
        onClick={() => history.push('/')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Task Page</p>
    </>
  )
}
