import nodemailer from 'nodemailer';
import Student from '@/models/studentModel';
import bcryptjs from 'bcryptjs';
import { dbConnection } from '@/lib/dbConnection';
import { NextResponse } from 'next/server';

interface SendMailOptions{
  studentEmail: string;
  emailType: "VERIFY" | "RESET";
  studentId: string;
}

dbConnection();

export const sendEmail = async({studentEmail, emailType, studentId}:SendMailOptions) =>{
    try {
        //We will create a hashed token
        const hashedToken = await bcryptjs.hash(studentId.toString(), 10);

        const student = await Student.findById(studentId);
        if(!student){
            return NextResponse.json("Cannot find student !" , {status:400});
        }

        let resetToken = "";

        if (emailType === "VERIFY"){
            await Student.findByIdAndUpdate(studentId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600002})

        }else if (emailType === "RESET"){
            resetToken = await student.generatePasswordResetToken();
            await student.save();
        }

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port : 587,
            secure : false,
            auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD,
            }
          });

        const mailOptions = {
            from: 'sahilnodemailer15@gmail.com',
            to: studentEmail,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            // have to also set conditional rendering for reset-password also
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail":"reset-password"}?token=${emailType === "VERIFY" ? hashedToken : resetToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail":"reset-password"}?token=${emailType === "VERIFY" ? hashedToken : resetToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    }catch (error ) {
        if (error instanceof Error) {
            console.error("Error in sendEmail fun:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in sendEmail fun:",error);
            throw new Error("unexpected error occurred while sending the email");
        }
    }
}