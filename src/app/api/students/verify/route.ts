//In this route Admin can verify the studentForm by accepting or reject it

import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

export async function POST(req : Request){
    try{
        await connectToDB();
        const {studentId , action} = await req.json();
        if(!studentId || !action){
            return NextResponse.json({error: "StudentId and action are required"}, {status: 400});
        }

        let student = await Student.findById(studentId);
        if(action.toLowerCase() === "accept"){
            student = await Student.findByIdAndUpdate(studentId, {accepted: true});
        }else{
            student = await Student.findByIdAndDelete(studentId);
        }
        await student.save();
        return NextResponse.json({message: "Student form verified successfully"}, {status: 200});
    }catch(error){
        console.error("Error processing the request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}