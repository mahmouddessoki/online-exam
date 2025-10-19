export interface authAPIRes {
    message: string;
    token: string;
    user: User;
}
export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
}
export interface authRes {
    message: string;
    token: string;
    userEmail?: string;
}
