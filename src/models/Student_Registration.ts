import mongoose,{Schema , Document} from "mongoose";

enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

enum Course{
  IT = "IT",
  CS = "CS",
  DS = "DS"
}


export interface studentInterface extends Document{
    userId : mongoose.Types.ObjectId;
    studentName : string;
    studentGender : Gender;
    studentPhoneNumber : number;
    studentDOB : Date;
    studentRollNo? : string;
    studentEmail : string;
    studentPassword : string;
    course : Course;
    admitted ?: boolean;
    feeReciept ?: {
      studentId : string;
      amount : number;
      description : string;
    }
    studentMarksheet : {
      public_id ?: string;
      secure_url ?: string
    };
}

// Define the Student Schema
const studentSchema = new Schema<studentInterface>({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  studentName: {
    required : true,
    type: String,
    trim: true,
  },

  studentGender: {
    required : true,
    type: String,
    enum: Object.values(Gender),
  },

  studentPhoneNumber: {
    required : true,
    type: Number,
  },

  studentDOB : {
    type : Date,
    required : true
  },

  studentRollNo: {
    type: String,
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

  course: {
    required : true,
    type: String,
    enum: Object.values(Course),
  },

  admitted :{
    type : Boolean,
    default : false
  },

  studentMarksheet :{
    public_id : {type : String,},
    secure_url : {type : String},
  }

}, {
  timestamps: true,
});


const Student = mongoose.models.Student || mongoose.model<studentInterface>("Student", studentSchema);
export default Student;