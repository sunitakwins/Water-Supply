export interface LoginRequest {
    username?: string;
    password?: string;
}

export interface LoginResponseModel{
    id: string;
    firstname:string;
    lastname: string;
    email: string;
    phonenumber: string;
    username: string;
    password: string;
    role: string;
    token: string;
    isValid: boolean;
}


