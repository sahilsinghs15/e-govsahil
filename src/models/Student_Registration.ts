import mongoose,{Schema , Document} from "mongoose";

enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

enum Course{
  IT = "IT",
  CS = "CS",
  DS = "DS"
}


export interface studentInterface extends Document{
    userId : mongoose.Types.ObjectId;
    name : string;
    email : string;
    phone : number;
    dob : Date;
    gender : Gender;
    course : Course;
    rollNo? : string;
    admitted ?: boolean;
    accepted ?: boolean;
  
}

// Define the Student Schema
const studentSchema = new Schema<studentInterface>({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  name: {
    required : true,
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  phone: {
    required : true,
    type: Number,
  },
  dob : {
    type : Date,
    required : true
  },
  gender: {
    required : true,
    type: String,
    enum: Object.values(Gender),
  },

  course: {
    required : true,
    type: String,
    enum: Object.values(Course),
  },

  rollNo: {
    type: String,
  },

  admitted :{
    type : Boolean,
    default : false
  },

  accepted :{
    type : Boolean,
    default : false
  }

}, {
  timestamps: true,
});


const Student = mongoose.models.Student || mongoose.model<studentInterface>("Student", studentSchema);
export default Student;