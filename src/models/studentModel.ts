import mongoose,{Schema , Document} from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

enum Role{
    Student = "Student",
    AdmissionAdmin = "AdmissionAdmin",
    SuperAdmin = "SuperAdmin"
}
export interface studentInterface extends Document{
    studentName : string;
    studentFatherName : string;
    studentMotherName : string;
    studentGender : Gender;
    studentAge : number;
    studentContact : number;
    studentAddress : string;
    studentNationality : string;
    studentMarksheet : string;
    studentEmail : string;
    studentPassword : string;
    isVerified : boolean;
    role ?: Role;
    studentAvatar ?: {
        public_id ?: string;
        secure_url ?: string
    };

    forgetPasswordToken ?: string;
    forgetPasswordExpiry ?: Date | number;
    verifyToken ?: string;
    verifyTokenExpiry ?: Date | number;

    comparePassword(plainPassword : string) : Promise<boolean>
    generatePasswordResetToken : string;
    generateJWTToken() : string;
}

// Define the Student Schema
const studentSchema = new Schema<studentInterface>({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },

  studentFatherName: {
    type: String,
    required: true,
    trim: true,
  },

  studentMotherName: {
    type: String,
    required: true,
    trim: true,
  },

  studentGender: {
    type: String,
    required: true,
    enum: Object.values(Gender),
  },

  studentAge: {
    type: Number,
    required: true,
    min: 1,
  },

  studentContact: {
    type: Number,
    required: true,
    unique: true,
  },

  studentAddress: {
    type: String,
    required: true,
  },

  studentNationality: {
    type: String,
    required: true,
  },

  studentMarksheet: {
    type: String,
    required: true,
  },

  studentEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  studentPassword: {
    type: String,
    required: true,
    minlength: 6,
  },

  isVerified :{
    type : Boolean,
    default : false,
  },

  role: {
    type : String,
    enum : Object.values(Role),
    default : "Student"
  },

  studentAvatar: {
    public_id: { type: String },
    secure_url: { type: String },
  },

  forgetPasswordToken: String,
  forgetPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}, {
  timestamps: true,
});

//We will Hash the password usign bcrypt salting before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("studentPassword")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.studentPassword = await bcryptjs.hash(this.studentPassword, salt);
    next();
});

//It is used to Compare the password
studentSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
  return await bcryptjs.compare(plainPassword, this.studentPassword);
};

//It is used to Generate JWT token
studentSchema.methods.generateJWTToken = async function (): Promise<string> {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "48h",
  });
};

// Generate Password Reset Token
studentSchema.methods.generatePasswordResetToken =  async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
  };

const Student = mongoose.models.Student || mongoose.model<studentInterface>("Student", studentSchema);
export default Student;