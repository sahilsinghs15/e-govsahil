import mongoose, { Schema, Document } from 'mongoose';

interface IWallet extends Document {
    balance: number;
    studentId : mongoose.Types.ObjectId;
}

const WalletSchema: Schema = new Schema({
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Student'
    },
    balance: {
        type: Number,
        required: true,
        default: 500
    },
}, { timestamps: true});


const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;