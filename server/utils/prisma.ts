import { PrismaClient } from '~/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
})
const adapter = new PrismaPg(pool)

let prisma: PrismaClient

export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}

export default defineEventHandler(async () => {
  const app = useNitroApp()
  app.hooks.hook('close', async () => {
    await prisma?.$disconnect()
    await pool.end()
  })
})
