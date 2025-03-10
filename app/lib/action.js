"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "../auth";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';

export const addUser = async (formData) => {
  try {
    const data = Object.fromEntries(formData.entries());
    const userdata = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),  // Hash password before storing
        phoneNumber: data.phoneNumber,
        role: data.role,
        accountType: data.accountType
      }
      
    const newUser = await prisma.user.create({
      data: {
      ...userdata
      }
    });
    console.log("user added", newUser);
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addBook = async (formData) => {
    try {
      const data = Object.fromEntries(formData.entries());
      const bookdata = {
          title: data.title,
          authorName: data.authorName,
          rentPerDay: data.rentPerDay,
          price: data.price,
          forRent: data.forRent == 'true' ? true : false,
          availableForSell: data.availableForSell == 'true' ? true : false
        }
      console.log("book data", bookdata);
      const newBook = await prisma.book.create({
        data: {
        ...bookdata,
        bookGeneres: { connect: { id: 2 } },
        user: { connect: { id: 3 } }
        }
      });
      console.log("book added", newBook);
    } catch (err) {
      console.log(err.message);
      throw new Error("Failed to create book!");
    }
  
    revalidatePath("/dashboard/books");
    redirect("/dashboard/books");
  };

  export const deleteUser = async (formData) => {
    const data = Object.fromEntries(formData);
  
    try {
      if (!parseInt(data.id)) {
        console.log('user id is needed')
        throw new Error("User ID is required");
      }
  
      await prisma.user.delete({
        where: {
          id: parseInt(data.id)
        }
      });
    } catch (err) {
      console.log(err).message;
      throw new Error("Failed to delete user!");
    }
  
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  };

  export const cancelRequest = async (formData) => {
    const data = Object.fromEntries(formData);
  
    try {
      if (!parseInt(data.id)) {
        console.log('request id is needed')
        throw new Error("Request ID is required");
      }
  
      await prisma.borrowRequest.update({
        where: {
         id: parseInt(data.id)
        },
        data: {
          status: 'cancelled',
        },
      });
    } catch (err) {
      console.log(err).message;
      throw new Error("Failed to delete user!");
    }
  
    revalidatePath("/dashboard/borrow-list");
    redirect("/dashboard/borrow-list");
  };

  export const processRequest = async (formData) => {
    const data = Object.fromEntries(formData);
  
    try {
      if (!parseInt(data.id)) {
        console.log('request id is needed')
        throw new Error("Request ID is required");
      }
  
      await prisma.orderBook.update({
        where: {
         id: parseInt(data.id)
        },
        data: {
          status: 'complete',
        },
      });
    } catch (err) {
      console.log(err).message;
      throw new Error("Failed to update!");
    }
  
    revalidatePath("/dashboard/order-list");
    redirect("/dashboard/order-list");
  };
 
 
  export const signOut = async (formData) => {
    redirect("/login");
  }

  export const login = async (formData) => {
    redirect("/dashboard");
  }
  

// export const authenticate = async (prevState, formData) => {
//   const { username, password } = Object.fromEntries(formData);

//   try {
//     await signIn("credentials", { username, password });
//   } catch (err) {
//     if (err.message.includes("CredentialsSignin")) {
//       return "Wrong Credentials";
//     }
//     throw err;
//   }
// };