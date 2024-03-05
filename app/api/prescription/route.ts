import prisma from "@/lib/prisma";
import { ReportSchema } from "@/lib/schema/prescription";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = ReportSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        let existingPatient = await prisma.patient.findFirst({
            where: {
                AND: [
                    { patient_name: validatedData.data.patientData.patient_name },
                    { age: validatedData.data.patientData.age },
                    { sex: validatedData.data.patientData.sex },
                ]}
        })
        if(!existingPatient){
            existingPatient = await prisma.patient.create({
                data: validatedData.data.patientData,
            });
        }

        await prisma.report.create({
            data: {
              reportName: validatedData.data.reportName,
              patientID: existingPatient.id,
              rightNasalCavity: validatedData.data.reportData.Right_Naasal_Cavity,
              inferiorTurbinateMeatus: validatedData.data.reportData.Inferior_Turbinate_and_Meatus,
              middleTurbinateMeatus: validatedData.data.reportData.Middle_Turbinate_and_Meatus,
              uncinateProcess: validatedData.data.reportData.Uncinate_Process,
              superiorTurbinateMeatus: validatedData.data.reportData.Superior_Turbinate_and_Meatus,
              sphenoethmoidalRecess: validatedData.data.reportData.Sphenoethmoidal_Recess,
              leftNasalCavity: validatedData.data.reportData.Left_Nasal_Cavity,
              bulla: validatedData.data.reportData.Bulla,
              septum: validatedData.data.reportData.Septum,
              nasopharynx: validatedData.data.reportData.Nasopharynx,
              roof: validatedData.data.reportData.Roof,
              posteriorWall: validatedData.data.reportData.Posterior_Wall,
              eustachianTubeOrifice: validatedData.data.reportData.Eustachian_Tube_Orifice,
              interpretation: validatedData.data.reportData.Interpretation,
              impression: validatedData.data.reportData.Impression,
            },
          });

        return NextResponse.json({ success: true, message: "Prescription successfully created!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = ReportSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        const searchid = req.nextUrl.searchParams.get('id');
        if (!searchid) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        await prisma.report.update({
            where: { id: searchid },
            data: validatedData.data
        })

        return NextResponse.json({ success: true, message: "Prescription successfully updated!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const searchid = req.nextUrl.searchParams.get('id');
        if (!searchid) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        await prisma.report.delete({
            where: { id: searchid }
        })

        return NextResponse.json({ success: true, message: "Prescription successfully deleted!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const searchid = req.nextUrl.searchParams.get('id');
        if (searchid) {
            const data = await prisma.report.findUnique({
                where: { id: searchid }
            })
            return NextResponse.json({ success: true, data }, { status: 200 });
        }
        const data = await prisma.report.findMany()
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}