import { Schema, model, Document } from 'mongoose';

interface ITransaction extends Document {
    walletId: string;
    amount: number;
    description: string;
}

const transactionSchema = new Schema<ITransaction>(
    {
        walletId: { type: String, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;