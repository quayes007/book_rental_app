import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/helper';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {}, // Explicitly not updating anything
    create: {
      email: 'test@test.com',
      firstName: 'Test User',
      lastName: 'Test User last name',
      role: 'admin',
      accountType: 'all',
	    password: await hashPassword('123456Ma#'),
      phoneNumber: '0191111111'
    },
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
