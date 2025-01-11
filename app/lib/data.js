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