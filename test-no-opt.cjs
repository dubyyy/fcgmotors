const { PrismaClient } = require('@prisma/client')
try {
  const prisma = new PrismaClient()
  console.log("Success with NO options")
} catch (e) {
  console.log("Fail with NO options:", e.message)
}
