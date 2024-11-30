import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"
import {  GetServerSideProps } from "next"

type Props = {
    user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
        }
    })

    return {
        props: { user },
    }
}

export default function Page(props: Props) {
    return(
        <main>
            Hello, health is OK! Test user - {props.user.first_name}
        </main>
    )
}
