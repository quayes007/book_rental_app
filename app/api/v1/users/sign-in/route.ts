import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { UserSerializer } from "../serializer/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface EncodeData {
    id: number;
    email: string;
}

const verifyPassword = async (password: string, hashedPassword: string) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

const jwtToken = (data: EncodeData) => {
    const secretKey = process.env.JWT_SECRET || "b7a88a95b3170e1258a41d8b047f7ea0c3600fa896b81240498ff72108cd5fa6"
    return jwt.sign({id: data.id, email: data.email}, secretKey, { expiresIn: '24h' })
}
  
export const POST = async (request: Request) => {
  try {
    const formData = await request.json()
    const user = await prisma.user.findUnique({
        where: { email: formData.email },
    })
    if (!user) {
        return NextResponse.json({
            message: "User not found",
            code: 404,
            data: null
        })
    }

    const validPassword = await verifyPassword(formData.password, user.password)
    if (validPassword) {
        const token = jwtToken({ id: user.id, email: user.email })
        const userData = { token, ...UserSerializer(user) }
        return NextResponse.json({
            message: "Successfully logged in",
            code: 200,
            data: userData
          })
    } else {
        return NextResponse.json({
            message: "Email or password does not match.",
            code: 422,
            data: null
          })
    }
  } catch(error: any) {
    return NextResponse.json({
      message: "Error " + error.message,
      code: 500,
      data: null
    })
  }
};
