import prisma from "@/lib/prisma";
import { EarThroatSchema, NoseSchema } from "@/lib/schema/prescription";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== process.env.PASSWORD_HASH) {
        return NextResponse.json({ success: false, message: "Unauthorized", data: [] }, { status: 401 });
    }
    try {
        const body = await req.json();

        if (body.reportType === "Nose") {
            const validatedData = NoseSchema.safeParse(body);
            if (!validatedData.success) {
                return NextResponse.json({ error: "Invalid data" }, { status: 400 });
            }
            let existingPatient = await prisma.patient.findFirst({
                where: {
                    AND: [
                        { patient_name: validatedData.data.patientData.patient_name },
                        { age: validatedData.data.patientData.age },
                        { sex: validatedData.data.patientData.sex },
                        {patient_id: validatedData.data.patientData.patient_id}
                    ]
                }
            })
            if (!existingPatient) {
                existingPatient = await prisma.patient.create({
                    data: validatedData.data.patientData,
                });
            }
            await prisma.noseReport.create({
                data: {
                    reportName: validatedData.data.reportName,
                    patientID: existingPatient.id,
                    Right_Naasal_Cavity: validatedData.data.reportData.Right_Naasal_Cavity,
                    Inferior_Turbinate_and_Meatus: validatedData.data.reportData.Inferior_Turbinate_and_Meatus,
                    Middle_Turbinate_and_Meatus: validatedData.data.reportData.Middle_Turbinate_and_Meatus,
                    Uncinate_Process: validatedData.data.reportData.Uncinate_Process,
                    Superior_Turbinate_and_Meatus: validatedData.data.reportData.Superior_Turbinate_and_Meatus,
                    Sphenoethmoidal_Recess: validatedData.data.reportData.Sphenoethmoidal_Recess,
                    Left_Nasal_Cavity: validatedData.data.reportData.Left_Nasal_Cavity,
                    Bulla: validatedData.data.reportData.Bulla,
                    Septum: validatedData.data.reportData.Septum,
                    Nasopharynx: validatedData.data.reportData.Nasopharynx,
                    Roof: validatedData.data.reportData.Roof,
                    Posterior_Wall: validatedData.data.reportData.Posterior_Wall,
                    Eustachian_Tube_Orifice: validatedData.data.reportData.Eustachian_Tube_Orifice,
                    Interpretation: validatedData.data.reportData.Interpretation,
                    Impression: validatedData.data.reportData.Impression,
                },
            });

        } else {
            const validatedData = EarThroatSchema.safeParse(body);
            if (!validatedData.success) {
                return NextResponse.json({ error: "Invalid data" }, { status: 400 });
            }
            let existingPatient = await prisma.patient.findFirst({
                where: {
                    AND: [
                        { patient_name: validatedData.data.patientData.patient_name },
                        { age: validatedData.data.patientData.age },
                        { sex: validatedData.data.patientData.sex },
                        {patient_id: validatedData.data.patientData.patient_id}
                    ]
                }
            })
            if (!existingPatient) {
                existingPatient = await prisma.patient.create({
                    data: validatedData.data.patientData,
                });
            }
            await prisma.throatEarReport.create({
                data: {
                    reportName: validatedData.data.reportName,
                    patientID: existingPatient.id,
                    Oral_Cavity: validatedData.data.reportData.Oral_Cavity,
                    Hard_Palate: validatedData.data.reportData.Hard_Palate,
                    Soft_Palate: validatedData.data.reportData.Soft_Palate,
                    Uvula: validatedData.data.reportData.Uvula,
                    Posterior_Of_Tongue: validatedData.data.reportData.Posterior_Of_Tongue,
                    Epiglottis: validatedData.data.reportData.Epiglottis,
                    Vallecula: validatedData.data.reportData.Vallecula,
                    Pharyngoepiglottic_Fold: validatedData.data.reportData.Pharyngoepiglottic_Fold,
                    Aryepiglottic_Fold: validatedData.data.reportData.Aryepiglottic_Fold,
                    Arytnoids: validatedData.data.reportData.Arytnoids,
                    Ventricular_Band: validatedData.data.reportData.Ventricular_Band,
                    Vocal_Cord: validatedData.data.reportData.Vocal_Cord,
                    Posterior_Pharyngeal_Wall: validatedData.data.reportData.Posterior_Pharyngeal_Wall,
                    Sub_Glottis: validatedData.data.reportData.Sub_Glottis,
                    Other_Findings: validatedData.data.reportData.Other_Findings,
                    Impression_Throat: validatedData.data.reportData.Impression_Throat,
                    EAR: validatedData.data.reportData.EAR,
                    EAC: validatedData.data.reportData.EAC,
                    Tympanic_Membrane: validatedData.data.reportData.Tympanic_Membrane,
                    Pars_Flaccida: validatedData.data.reportData.Pars_Flaccida,
                    Pars_Tensa: validatedData.data.reportData.Pars_Tensa,
                    Impression_Ear: validatedData.data.reportData.Impression_Ear,
                },
            });
        }

        // const validatedData = ReportSchema.safeParse(body);
        // if (!validatedData.success) {
        //     return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        // }

        // let existingPatient = await prisma.patient.findFirst({
        //     where: {
        //         AND: [
        //             { patient_name: validatedData.data.patientData.patient_name },
        //             { age: validatedData.data.patientData.age },
        //             { sex: validatedData.data.patientData.sex },
        //         ]
        //     }
        // })
        // if (!existingPatient) {
        //     existingPatient = await prisma.patient.create({
        //         data: validatedData.data.patientData,
        //     });
        // }

        // await prisma.report.create({
        //     data: {
        //         reportName: validatedData.data.reportName,
        //         patientID: existingPatient.id,
        //         rightNasalCavity: validatedData.data.reportData.Right_Naasal_Cavity,
        //         inferiorTurbinateMeatus: validatedData.data.reportData.Inferior_Turbinate_and_Meatus,
        //         middleTurbinateMeatus: validatedData.data.reportData.Middle_Turbinate_and_Meatus,
        //         uncinateProcess: validatedData.data.reportData.Uncinate_Process,
        //         superiorTurbinateMeatus: validatedData.data.reportData.Superior_Turbinate_and_Meatus,
        //         sphenoethmoidalRecess: validatedData.data.reportData.Sphenoethmoidal_Recess,
        //         leftNasalCavity: validatedData.data.reportData.Left_Nasal_Cavity,
        //         bulla: validatedData.data.reportData.Bulla,
        //         septum: validatedData.data.reportData.Septum,
        //         nasopharynx: validatedData.data.reportData.Nasopharynx,
        //         roof: validatedData.data.reportData.Roof,
        //         posteriorWall: validatedData.data.reportData.Posterior_Wall,
        //         eustachianTubeOrifice: validatedData.data.reportData.Eustachian_Tube_Orifice,
        //         interpretation: validatedData.data.reportData.Interpretation,
        //         impression: validatedData.data.reportData.Impression,
        //     },
        // });

        return NextResponse.json({ success: true, message: "Report successfully created!" }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// export async function PUT(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const validatedData = ReportSchema.safeParse(body);
//         if (!validatedData.success) {
//             return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//         }
//         const searchid = req.nextUrl.searchParams.get('id');
//         if (!searchid) {
//             return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//         }
//         await prisma.report.update({
//             where: { id: searchid },
//             data: validatedData.data
//         })

//         return NextResponse.json({ success: true, message: "Prescription successfully updated!" }, { status: 200 });
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
//     }
// }

// export async function DELETE(req: NextRequest) {
//     try {
//         const searchid = req.nextUrl.searchParams.get('id');
//         if (!searchid) {
//             return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//         }
//         await prisma.report.delete({
//             where: { id: searchid }
//         })

//         return NextResponse.json({ success: true, message: "Prescription successfully deleted!" }, { status: 200 });
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
//     }
// }

// export async function GET(req: NextRequest) {
//     try {
//         const searchid = req.nextUrl.searchParams.get('id');
//         if (searchid) {
//             const data = await prisma.report.findUnique({
//                 where: { id: searchid }
//             })
//             return NextResponse.json({ success: true, data }, { status: 200 });
//         }
//         const data = await prisma.report.findMany()
//         return NextResponse.json({ success: true, data }, { status: 200 });
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
//     }
// }