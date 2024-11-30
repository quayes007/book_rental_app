import { prisma } from "@/lib/prisma"

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })
  return (
    <main>
      <div>
        Hello User - {user?.first_name}
      </div>
    </main>
  );
}
