import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export type Data = {
  name: string
}

export async function GET() {
  try {
    const result = await prisma.todos.findMany() //SELECT * FROM TODOS

    return NextResponse.json({
      result: result,
      status: 200,
      message: 'success',
    })
  } catch (error) {
    return Response.json({ error })
  }
}
