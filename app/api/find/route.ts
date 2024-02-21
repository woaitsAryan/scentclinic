import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { filterDate } from "./filterDate";
import { filterGeneric } from "./filterGeneric";

const allowedParameters = ['name', 'premedication']

export async function GET(req: NextRequest) {
    try {
        let filterQuery: { [key: string]: any } = {};
        const page = parseInt(req.nextUrl.searchParams.get('page') || "0")
        const limit = parseInt(req.nextUrl.searchParams.get('limit') || "20")
        const startDate = req.nextUrl.searchParams.get('startDate')
        const endDate = req.nextUrl.searchParams.get('endDate')

        filterQuery = filterDate(filterQuery, startDate, endDate)

        allowedParameters.forEach((parameter: string) => {
            var value = req.nextUrl.searchParams.get(parameter)
            filterQuery = filterGeneric(filterQuery, parameter, value)
        })

        const result = await prisma.prescription.findMany({
            where: filterQuery,
            take: limit,
            skip: page * limit,
        })

        if (result.length === 0) {
            return NextResponse.json({ success: false, message: "No data found", data: [] }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Data found", data: result }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error", data: [] }, { status: 500 });
    }
}