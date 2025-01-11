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