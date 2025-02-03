export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
    paymentMethod: "CARD" | "MOBILE_WALLET" | "CASH";
    createdAt: Date;
    updatedAt?: Date;
}