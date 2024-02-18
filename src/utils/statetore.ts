import { create } from 'zustand'

type TodoItem = {
  name: string
  description: string
  status: string
}

interface TodoStoreState {
  todos: TodoItem[]
  addTodo: (name: string, description: string, status: string) => void
  removeTodo: (index: number) => void
  updateTodoStatus: (
    index: number,
    description: string,
    newStatus: string,
  ) => void
  fetchTodos: () => void
}

//code is pure garbage but does work
export const useTodoStore = create<TodoStoreState>((set) => ({
  todos: [],
  addTodo: (name, description, status) =>
    set((state: TodoStoreState) => {
      const newTodos = [{ name, description, status }]
      const combinedTodos = [...state.todos, ...newTodos]
      // localStorage.setItem('todos', JSON.stringify(newTodos)) // store to local storage after setting the state
      fetch('http://localhost:3000/api/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodos),
      })
        .then((response) => response.json())
        .then((data) => console.log('Created Todo:', data))
        .catch((error) => console.error('Error creating todo:', error))
      return { todos: combinedTodos }
    }),
  // TODO: implement removeTodo and updateTodoStatus to work with db
  removeTodo: (index) =>
    set((state: TodoStoreState) => {
      const newTodos = state.todos.filter((_, i) => i !== index)
      localStorage.setItem('todos', JSON.stringify(newTodos)) // store to local storage after setting the state
      return { todos: newTodos }
    }),
  updateTodoStatus: (index, newDescription, newStatus) =>
    set((state: TodoStoreState) => {
      const newTodos = state.todos.map((todo, i) =>
        i === index
          ? { ...todo, description: newDescription, status: newStatus }
          : todo,
      )
      localStorage.setItem('todos', JSON.stringify(newTodos)) // store to local storage after setting the state
      return { todos: newTodos }
    }),
  fetchTodos: async () => {
    const res = await fetch('http://192.168.1.101:3000/api/todos/').then(
      (data) => data.json(),
    )
    console.log(res)
    // prettier-ignore
    const todos: TodoItem[] = res.result.map(
      (todo: {
        id: number
        name: string
        description: string // EXTREME TYPE GYMNASTICS
        status: string      // WHAT IN THE HOLY GARBAGE CODE IS THIS
      }) => ({
        name: todo.name,
        description: todo.description,
        status: todo.status,
      }),
    )
    set({ todos })
  },
}))

useTodoStore.getState().fetchTodos()

interface ModalStoreState {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export type { TodoItem }
