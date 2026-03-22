const { PrismaClient } = require('@prisma/client')
try {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  })
  console.log("Success with datasourceUrl")
} catch (e) {
  console.log("Fail with datasourceUrl:", e.message)
}
try {
  const prisma = new PrismaClient({
    url: process.env.DATABASE_URL
  })
  console.log("Success with url")
} catch (e) {
  console.log("Fail with url:", e.message)
}
try {
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
  })
  console.log("Success with datasources")
} catch (e) {
  console.log("Fail with datasources:", e.message)
}
