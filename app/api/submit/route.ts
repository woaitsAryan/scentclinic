import prisma from "@/lib/prisma";
import { PrescriptionSchema } from "@/lib/schema/prescription";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const body = await req.json();
    const validatedData = PrescriptionSchema.safeParse(body);
    if(!validatedData.success){
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await prisma.prescription.create({
        data: validatedData.data
    }).catch((_e) => {return NextResponse.json({ error: "Error creating prescription" }, { status: 500 })});

    return NextResponse.json({ success: true }, { status: 200 });
}