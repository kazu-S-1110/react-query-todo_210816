import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTask } from '../slices/todoSlice'
import { EditTask, Task } from '../types/types'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  //既存のキャッシュを読みに行くために下のコードを記述
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks/`, task), //postでtaskを新規作成
    {
      //成功した時の処理
      onSuccess: (res) => {
        //既存のtask配列を取得する
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          //既存のtask配列を書き換える(setQueryData)
          queryClient.setQueryData<Task[]>('tasks', [
            ...previousTodos,
            res.data, //第一引数がここに入っている
          ])
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(
        `${process.env.REACT_APP_REST_URL}/tasks/${task.id}/`,
        task
      ),
    {
      onSuccess: (res, variables) => {
        //resには成功した際の全体のデータが入っている
        //variablesにはurl(endpoint)に渡したデータが入っている
        console.log(
          `this is res : ${res}, and this is variables : ${variables}`
        )
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
