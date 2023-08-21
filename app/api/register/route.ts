import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import next from "next/types";

const prisma = new PrismaClient();
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, email, password } = body.data;
  console.log(body.data);
  if (!name || !email || !password) {
    return NextResponse.json("Missing name, email or password", {
      status: 400,
    });
  }
  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (exists) {
    return NextResponse.json("User already exists", {
      status: 400,
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(user);
};

export default POST;
