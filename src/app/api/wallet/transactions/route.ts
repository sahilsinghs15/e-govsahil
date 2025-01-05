import { connectToDB } from "@/db/mongo";
import { authOptions } from "@/lib/auth";
import Student from "@/models/Student_Registration";
import Transaction from "@/models/Transaction";
import Wallet from "@/models/Wallet";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const student = await Student.findById(session.user.id);
        if(!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }
        const studentId = student._id;
        const wallet = await Wallet.findOne({ studentId });
        if (!wallet) {
            return NextResponse.json(
                { error: "Wallet not found for the student" },
                { status: 404 }
            );
        }

        const walletId = wallet._id;
        const transactions = await Transaction.find({ walletId });

        return NextResponse.json(
            { transactions },
            { status: 200 }
        );
        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
        );
    }
}