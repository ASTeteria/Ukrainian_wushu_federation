export interface LoginRequestDTO {
    username: string;
    password: string;
}

export interface AuthResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: number;
    username: string;
    roles: string[];
}