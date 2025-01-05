import { NextResponse } from "next/server";
import { IncomingForm, File, Fields } from "formidable";
import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { Readable } from "stream";
import type { IncomingHttpHeaders, IncomingMessage } from "http";
import { getServerSession } from "next-auth";
import User from "@/models/User";

connectToDB();
// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parser for Next.js API routes
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert a Next.js Request to a Node.js IncomingMessage
const convertRequest = (req: Request): IncomingMessage => {
  const readable  = Readable.from(req.body as unknown as Iterable<unknown> );
  const nodeReq = readable as unknown as IncomingMessage;
  nodeReq.headers = req.headers as unknown as IncomingHttpHeaders;
  return nodeReq;
};

// Helper function to parse form data using formidable
const parseForm = async (
  req: Request
): Promise<{ fields: Record<string, string>; file: File }> => {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(convertRequest(req), (err, fields: Fields, files) => {
      if (err) {
        return reject(err);
      }
      const uploadedFile = files.studentMarksheet as File | File[] | undefined;
      if (!uploadedFile || Array.isArray(uploadedFile)) {
        return reject(new Error("File upload is required"));
      }
      resolve({
        fields: fields as unknown as  Record<string, string>  ,
        file: uploadedFile,
      });
    });
  });
};

// POST handler
export async function POST(req: Request) {
  try {
    // Session validation
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const session = await getServerSession(req, { req, res: req });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Student must be logged in to submit the form" },
        { status: 400 }
      );
    }

    const email = session.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Student record not found" },
        { status: 404 }
      );
    }
    const userId = user._id;

    // Parse the form data
    const { fields, file } = await parseForm(req);
    const { studentName, studentEmail, studentPhoneNumber, studentDOB, studentGender, course } = fields;

    // Validate fields
    if (!studentName || !studentEmail || !studentPhoneNumber || !studentDOB || !studentGender || !course) {
      return NextResponse.json(
        { error: "All fields are required, including the marksheet" },
        { status: 400 }
      );
    }

    // Upload file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.filepath, {
      folder: "lms",
      width: 250,
      height: 250,
      gravity: "faces",
      crop: "fill",
    });

    // Remove local file
    await fs.unlink(file.filepath);

    // Save the form submission
    const studentForm = await Student.create({
      userId,
      studentName,
      studentEmail,
      studentPhoneNumber,
      studentDOB,
      studentGender,
      course,
      studentMarksheet: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });

    user.filledForm = true;
    await user.save();

    return NextResponse.json(
      { message: "Student form submitted successfully", data: studentForm },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing the request:", error);
    if (error instanceof Error && error.message === "File upload is required") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
