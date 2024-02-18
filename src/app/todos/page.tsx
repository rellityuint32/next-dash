'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { useTodoStore } from '@/utils/statetore'
import { TodoItem } from '@/utils/statetore'
import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { set } from 'react-hook-form'

const TodoComponent = () => {
  const { todos, addTodo, removeTodo, updateTodoStatus, fetchTodos } =
    useTodoStore()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const todosPerPage = 2
  const indexOfLastTodo = currentPage * todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  const [todoName, setTodoName] = useState<string>('')
  const [todoDescription, setTodoDescription] = useState<string>('')
  const handleAddTodo = () => {
    if (todoName.trim() !== '') {
      addTodo(todoName, todoDescription, 'pending')
      setTodoName('')
      setTodoDescription('')
    } else {
      setIsAlertOpen(true)
      setTimeout(() => {
        setIsAlertOpen(false)
      }, 2000)
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full max-w-full m-auto">
      <Card className="flex flex-col justify-center items-center w-[500px] m-3 mt-10">
        <CardHeader className="font-bold text-2xl">Todo Lister</CardHeader>
        <CardContent>
          <ul>
            {todos.length === 0 ? (
              <li className="font-bold text-lg">No todos yet! Add some!</li>
            ) : (
              currentTodos.map((todo: TodoItem, index: number) => (
                <Card
                  key={index}
                  className="flex flex-col w-[400px] justify-center items-center mt-3"
                >
                  <li key={index + (currentPage - 1) * 2}>
                    <CardHeader className="font-bold text-lg self-center">
                      {todo.name}
                    </CardHeader>
                    <CardContent>
                      {todo.description === ''
                        ? 'No description'
                        : todo.description}
                      <div className="flex flex-col col-span-2 w-full">
                        <Label
                          className={
                            todo.status === 'pending'
                              ? 'text-yellow-500'
                              : 'text-green-500'
                          }
                        >
                          Status:{' '}
                          {todo.status === 'pending' ? 'Pending' : 'Completed'}{' '}
                        </Label>
                        <div>
                          <Button
                            className="m-3"
                            onClick={() =>
                              removeTodo(index + (currentPage - 1) * 2)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                            >
                              <path
                                fill="currentColor"
                                d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"
                              ></path>
                            </svg>
                            Remove
                          </Button>

                          {todo.status == 'pending' && (
                            <Button
                              onClick={() =>
                                updateTodoStatus(
                                  index + (currentPage - 1) * 2,
                                  todoDescription,
                                  'completed',
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="currentColor"
                                  d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951a1.392 1.392 0 0 1 1.953.27l2.351 3.104l5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002"
                                ></path>
                              </svg>
                              Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </li>
                </Card>
              ))
            )}
          </ul>
          <div className="inline-flex flex-col justify-center items-center w-[400px]">
            <Input
              className="mt-3"
              type="text"
              placeholder="Title"
              onChange={(e) => setTodoName(e.target.value)}
              value={todoName}
            />
            <Textarea
              className="mt-3 resize-none"
              placeholder="Description"
              onChange={(e) => setTodoDescription(e.target.value)}
              value={todoDescription}
            />
          </div>
          <div className="flex flex-row w-14 gap-8">
            <Button className="mt-3" onClick={handleAddTodo}>
              Add Todo
            </Button>

            {todos && (
              <div className="flex flex-end mt-3 gap-1">
                {Array.from(
                  { length: Math.ceil(todos.length / todosPerPage) },
                  (_, i) => (
                    <Button key={i + 1} onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </Button>
                  ),
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isAlertOpen && (
        <Alert className="w-[450px] absolute bg-white">
          <AlertCircleIcon className="ml-0 m-2" />
          <AlertTitle>Empty Entry</AlertTitle>
          <AlertDescription>
            Add a Todo with a Title And Description
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default TodoComponent
