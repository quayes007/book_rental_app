import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { hashPassword } from "@/lib/helper"

export const POST = async (request: Request) => {
  try {
    const formData = await request.json()
    const data = {
      email: formData.email,
      firstName: formData.first_name,
      lastName: formData.last_name,
      password: await hashPassword(formData.password),
      phoneNumber: formData.phone_number,
      accountType: formData.account_type,
      role: 'general_user'
    }

    // const user = await prisma.user.create({
    //   data: {
    //     ...data
    //   }
    // })
    return NextResponse.json({
      message: "User created successfully",
      code: 201,
      data: data
    })
  } catch(error: any) {
    if (error.code === 'P2002' && (error.meta?.target.includes('phoneNumber') || error.meta?.target.includes('email'))) {
      return NextResponse.json({
        message: `Error: ${error.meta?.target?.join(' ')}  is already in use.`,
        code: 422,
        data: null
      })
    }

    return NextResponse.json({
      message: "Error " + error.message,
      code: 422,
      data: null
    })
  }
};
