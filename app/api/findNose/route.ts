import { filterDate } from "@/lib/filterDate";
import { filterGeneric } from "@/lib/filterGeneric";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const allowedParameters = ['premedication', 'reportName']

export async function GET(req: NextRequest) {

    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== process.env.PASSWORD_HASH) {
        return NextResponse.json({ success: false, message: "Unauthorized", data: [] }, { status: 401 });
    }
    try {
        let filterQuery: { [key: string]: any } = {};
        const page = parseInt(req.nextUrl.searchParams.get('page') || "0")
        const limit = parseInt(req.nextUrl.searchParams.get('limit') || "20")
        const date = req.nextUrl.searchParams.get('date')
        // const endDate = req.nextUrl.searchParams.get('endDate')
        if(date){
            filterQuery = filterDate(filterQuery, new Date(date))
        }
        console.log(date)
        console.log(filterQuery)

        allowedParameters.forEach((parameter: string) => {
            var value = req.nextUrl.searchParams.get(parameter)
            filterQuery = filterGeneric(filterQuery, parameter, value)
        })
        if(req.nextUrl.searchParams.get('patient_name')){
            filterQuery = {
                ...filterQuery,
                patient: {
                    patient_name: req.nextUrl.searchParams.get('patient_name')
                }
            }
        }

        const result = await prisma.noseReport.findMany({
            where: filterQuery,
            take: limit,
            skip: page * limit,
            include: {
                patient: true
            }
        })

        if (result.length === 0) {
            return NextResponse.json({ success: true, message: "No data found", data: [] }, { status: 200 });
        }
        return NextResponse.json({ success: true, message: "Data found", data: result }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error", data: [] }, { status: 500 });
    }
}