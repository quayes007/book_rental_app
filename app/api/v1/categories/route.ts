import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { PreferenceListSerializer } from "./serializer/category";

export const GET = async () => {
    try {
        const categories = await prisma.bookGeneres.findMany({
            where: { parentId: null },
            include: {
                subGeneres: true
            }
        })
        console.log('categories', categories);
        return NextResponse.json({
            message: "Successfully fetched preferences",
            code: 200,
            data: PreferenceListSerializer(categories)
          })
    } catch (err:any) {
        return NextResponse.json({
            message: "Error " + err.message,
            code: 500,
            data: null
        })
    }
}

