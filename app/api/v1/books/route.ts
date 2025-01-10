import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { middleware } from "../../../../middleware"; // Adjust path as needed
import jwt from 'jsonwebtoken';
import { BookListSerializer } from "./serializer/book";

interface EncodeData {
  id: number,
  email: string,
}

export const POST = async (req: NextRequest) => {
  await middleware(req); // Apply the middleware
  
  const token = (req as any).token; // Extract user from request
  console.log('req token ', token)
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized', code: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as EncodeData;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found', code: 404 });
    }

    const formData = await req.json();
    const bookData = {
      title: formData.title,
      authorName: formData.author,
      subCategoryId: formData.subcategory_id,
      forRent: formData.for_rent,
      availableForSell: formData.available_for_sell,
      rentPerDay: formData.rent_per_day,
      price: formData.price
    };

    const book = await prisma.book.create({
      data: {
        ...bookData,
        bookGeneres: { connect: { id: formData.category_id } },
        user: { connect: { id: user.id } }, // Use user ID from request
      }
    });

    console.log('Book uploaded', bookData);
    return NextResponse.json({
      message: "Successfully created book",
      code: 200,
      data: book
    });
  } catch (err: any) {
    return NextResponse.json({
      message: "Error " + err.message,
      code: 422,
      data: null
    });
  }
};

export const GET = async (req: Request) => {
  try{
    const url = new URL(req.url);
    const forRent = url.searchParams.get('for_rent') === 'true';
    // const availableForSell = url.searchParams.get('available_for_sell') === 'true';

    if(forRent){
      const books = await prisma.book.findMany({
        where: { forRent: true },
        include: {
          user: true,
          bookGeneres: true,
        },
      });
      return NextResponse.json({
        message: "Books for rent",
        code: 200,
        data: BookListSerializer(books)
      });
    }else{
      const books = await prisma.book.findMany({
        where: { availableForSell: true },
        include: {
          user: true,
          bookGeneres: true,
        },
      });
      return NextResponse.json({
        message: "Books for sale",
        code: 200,
        data: BookListSerializer(books)
      });
    }

  }catch(error: any){
    return NextResponse.json({
      message: "Error " + error.message,
      code: 500,
      data: null
    })
  }
}
