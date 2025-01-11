import { prisma } from "@/lib/prisma"
import { STATUS } from '@prisma/client';
import { NextResponse, NextRequest } from "next/server"
import { middleware } from "../../../../../../middleware"; // Adjust path as needed
import jwt from 'jsonwebtoken';

interface EncodeData {
    id: number,
    email: string,
}

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try{
        await middleware(request); // Apply the middleware
        const token = (request as any).token; // Extract user from request
        console.log('req token ', token)
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized', code: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as EncodeData;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found', code: 404 });
        }

        const bookId = parseInt(params.id);
        if (isNaN(bookId)) {
            return NextResponse.json({ message: "Invalid book ID", code: 400 });
        }
        
        const formData = await request.json()
        const orderData = {
            status: STATUS.in_process
        }

        const orderBook = await prisma.orderBook.create({
            data: {
                user: { connect: { id: user.id } },
                book: { connect: { id: bookId } },
                ...orderData
            }
        })

        const address = await prisma.address.create({
            data: {
                street: formData.address.street_no,
                city: formData.address.street_no,
                zipCode: formData.address.post_code,
                district: formData.address.district,
                user: { connect: { id: user.id } },
                orderBook: { connect: {id: orderBook.id}}
            }
        })

        return NextResponse.json({
            message: "Successfully book order is placed",
            code: 200,
            data: orderBook
          });


    }catch(error: any) {
        return NextResponse.json({
            message: "Error " + error.message,
            code: 500,
            data: null
            })
   }
}
