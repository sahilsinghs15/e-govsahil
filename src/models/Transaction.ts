import mongoose, { Schema, model, Document } from 'mongoose';

interface ITransaction extends Document {
    walletId: mongoose.Types.ObjectId;
    amount: number;
    description: string;
}

const transactionSchema = new Schema<ITransaction>(
    {
        walletId: { 
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Wallet' 
        },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;