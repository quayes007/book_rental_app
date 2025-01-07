import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { UserSerializer } from "../../serializer/user";
  
export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
        return NextResponse.json({
          message: "Invalid user ID",
          code: 400,
          data: null
        });
      }
  
    const formData = await request.json()
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })
    if (!user) {
        return NextResponse.json({
            message: "User not found",
            code: 404,
            data: null
        })
    }
    const subCategories = await prisma.bookGeneres.findMany({
        where: {
            AND: [
              {
                NOT: {
                  parentId: null,
                },
              },
              {
                name: {
                  in: formData.preferences,
                },
              },
            ],
          },
    })

    await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          preferences: {
            set: subCategories.map((c: any) => c.name),
          },
        },
      });

    return NextResponse.json({
        message: "preference is set successfully",
        code: 200,
        data: UserSerializer(user)
    })

  } catch(error: any) {
    return NextResponse.json({
      message: "Error " + error.message,
      code: 500,
      data: null
    })
  }
};
