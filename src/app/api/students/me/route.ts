

import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { dbConnection } from "@/lib/dbConnection";
import { fetchDataFromToken } from "@/helpers/fetchDataFromToken";

dbConnection();

export async function GET(request:NextRequest){

    try {
        const studentId = await fetchDataFromToken(request);
        const student = await Student.findOne({_id: studentId}).select("-password");
        return NextResponse.json({
            message: "student found",
            data: student
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in Fetching Data from Logged In User:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Me Function:",error);
            throw new Error("unexpected error occurred while Fetching Data");
        }
    }

}