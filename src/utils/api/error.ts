import { Prisma } from "@prisma/client"
import { NextApiResponse } from "next"

export class ClientError extends Error {
  status: number
  constructor(message: string, status?: number) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.status = status

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor)
  }
}
export class KnownServerError extends Error {
  status: number
  constructor(message: string, status?: number) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.status = status

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error: Error, res: NextApiResponse) {
  console.error(error)
  if (error instanceof ClientError) {
    res.status(error.status || 400).json({ error: error.message })
  } else if (error instanceof KnownServerError) {
    res.status(error.status || 500).json({ error: error.message })
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ error: "something went wrong" })
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({ error: "something went wrong" })
  } else {
    res.status(500).json({ error: "something went wrong!" })
  }
}
