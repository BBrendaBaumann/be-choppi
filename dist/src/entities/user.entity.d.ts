export declare class User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
