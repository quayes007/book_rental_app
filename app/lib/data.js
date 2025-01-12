import { prisma } from "@/lib/prisma";

export const fetchUsers = async() => {
    try {
        const users = await prisma.user.findMany();
        return users;
    }catch(e) {
        console.error("Error fetching users:", e);
        throw new Error("Failed to fetch users!");
    }
}

export const fetchBooks = async() => {
    try {
        const books = await prisma.book.findMany();
        return books;
    }catch(e) {
        console.error("Error fetching books:", e);
        throw new Error("Failed to fetch users!");
    }
}

export const fetchBorrowedBooks = async() => {
    try {
        const borrowedBooks = await prisma.borrowRequest.findMany({
            include: {
              user: true,
              book: true,
            },
          });
        return borrowedBooks.map(bor => ({
            id: bor.id,
            title: bor.book.title,
            startDate: bor.startDate.toISOString(),
            endDate: bor.endDate.toISOString(),
            rentPerDay: bor.rentPerDay,
            status: bor.status,
            user: {
                name: bor.user.name
            }
        }))
    }catch(e) {
        console.error("Error fetching borrowed books:", e);
        throw new Error("Failed to fetch borrowed books!");
    }
}

export const fetchOrderedBooks = async() =>{
    try {
        const orderedBooks = await prisma.orderBook.findMany({
            include: {
                user: true,
                book: true,
              },
        });
        return orderedBooks.map(bor => ({
            id: bor.id,
            title: bor.book.title,
            price: bor.book.price,
            status: bor.status,
            user: {
                name: bor.user.firstName
            }
        }))
    }catch(e) {
        console.error("Error fetching ordered books:", e);
        throw new Error("Failed to fetch ordered books!");
    }
}