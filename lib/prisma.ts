import { PrismaClient } from "@prisma/client";

const dbConnection = global as unknown as {  prisma: PrismaClient }

export const prisma = dbConnection.prisma || new PrismaClient({
    log: ['query'],
})

if (process.env.NODE_ENV !== 'production') dbConnection.prisma = prisma
