import Student from "@/models/studentModel";
import { dbConnection } from "@/lib/dbConnection";
import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailerHelper";

dbConnection();

// const cookieOption : object = {
//     secure : false,
//     maxAge : 7 * 24 * 60 * 60 * 1000,
//     httpOnly : true,
// }

export const POST = async(request : NextRequest)=>{
    try{
        const reqBody = await request.json();
        const {
            studentName,
            studentFatherName,
            studentMotherName,
            studentGender,
            studentAge,
            studentContact,
            studentAddress,
            studentNationality,
            studentMarksheet,
            studentEmail,
            studentPassword
        } = reqBody;

        if(!studentName || !studentFatherName || !studentMotherName || !studentGender
            || !studentAge || !studentContact || !studentAddress || !studentNationality || !studentMarksheet
            || !studentEmail || !studentPassword
        ){
            return new NextResponse("All students details are mandatory" , {status : 400});
        }

        //To get the boolean value whether Studnet is present in database with the same email or not
        const studentExists = await Student.findOne({studentEmail});

        if(studentExists){
            return new NextResponse("Student already exists with the same email , Kindly login !" , {status : 409});
        }

        //If student does not exist so we can create a new Student Record

        const student = await Student.create({
            studentName,
            studentFatherName,
            studentMotherName,
            studentGender,
            studentAge,
            studentContact,
            studentAddress,
            studentNationality,
            studentMarksheet,
            studentEmail,
            studentPassword,
        });

        if(!student){
            return new NextResponse("Error in creating New Student Record" , {status : 500});
        }

        await student.save();

        //And we will remove the studentPassword property from the student object
        const studentWithoutPass = {...student.toObject() , studentPassword : undefined};

        //send verification email
        await sendEmail({studentEmail, emailType: "VERIFY", studentId: student._id})

        return NextResponse.json({
            success : true,
            message : "Successfully Registered the Student",
            studentData :studentWithoutPass
        });
    }catch(error ){
        if (error instanceof Error) {
            console.error("Error in Register:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Register Function:",error);
            throw new Error("unexpected error occurred while registering the user");
        }
    }
    
}