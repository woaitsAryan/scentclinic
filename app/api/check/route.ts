import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const passwordHash: string | null = body.password
    if (passwordHash == null){
        return NextResponse.json({ success: false, message: "Password is required", data: [] }, { status: 401 });
    }

    if (passwordHash !== process.env.PASSWORD_HASH ){
        return NextResponse.json({ success: false, message: "Password is incorrect", data: [] }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Password is correct", data: [] }, { status: 200 });

}
