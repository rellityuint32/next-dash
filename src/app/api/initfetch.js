const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')

const app = express()
const port = 3001
const prisma = new PrismaClient()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.get('/api/todos/view', async (req, res) => {
  try {
    const todos = await main()

    res.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

app.post('/api/todos/add', async (req, res) => {
  try {
    const reqdata = req.body[0]
    console.log(reqdata)
    const createdTodo = await prisma.todos.create({
      data: {
        name: reqdata.name,
        description: reqdata.description,
        status: reqdata.status,
      },
    })
    res.json(createdTodo)
  } catch {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Failed to add todos' })
  }
})
// TODO : implement all except post
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, status } = req.body
    const updatedTodo = await prisma.todos.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, status },
    })
    res.json(updatedTodo)
  } catch (error) {
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.todos.delete({
      where: { id: parseInt(id, 10) },
    })
    res.status(204).end()
  } catch (error) {
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

async function main() {
  return await prisma.todos.findMany()
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
