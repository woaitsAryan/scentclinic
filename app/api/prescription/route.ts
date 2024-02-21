import prisma from "@/lib/prisma";
import { PrescriptionSchema } from "@/lib/schema/prescription";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = PrescriptionSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        await prisma.prescription.create({
            data: validatedData.data
        })

        return NextResponse.json({ success: true, message: "Prescription successfully created!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest){
    try {
        const body = await req.json();
        const validatedData = PrescriptionSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        const searchid = req.nextUrl.searchParams.get('id');
        if(!searchid){
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        await prisma.prescription.update({
            where: { id: searchid },
            data: validatedData.data
        })

        return NextResponse.json({ success: true, message: "Prescription successfully updated!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest){
    try {
        const searchid = req.nextUrl.searchParams.get('id');
        if(!searchid){
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        await prisma.prescription.delete({
            where: { id: searchid }
        })

        return NextResponse.json({ success: true, message: "Prescription successfully deleted!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    try {
        const searchid = req.nextUrl.searchParams.get('id');
        if(searchid){
            const data = await prisma.prescription.findUnique({
                where: { id: searchid }
            })
            return NextResponse.json({ success: true, data }, { status: 200 });
        }
        const data = await prisma.prescription.findMany()
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}