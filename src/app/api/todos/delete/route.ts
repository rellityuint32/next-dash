import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const request = await req.json()
    console.log('Adding todo:', request)

    // INSERT INTO TODOS (name,description,status) values (?,?,?)
    const createdTodo = await prisma.todos

    return new NextResponse(JSON.stringify(createdTodo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
