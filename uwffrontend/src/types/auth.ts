// // export interface AuthResponseDTO {
// //     accessToken: string;
// //     refreshToken: string;
// // }
// //
// // export interface LoginRequestDTO {
// //     username: string;
// //     password: string;
// // }
// //
// // export interface RegisterRequestDTO {
// //     username: string;
// //     password: string;
// //     roles: string[];
// // }
//
// export interface AuthResponseDTO {
//     accessToken: string;
//     refreshToken: string;
// }
//
// export interface LoginRequestDTO {
//     username: string;
//     password: string;
// }
//
// export interface RegisterRequestDTO {
//     username: string;
//     password: string;
//     roles: string[];
// }
//
// export interface UserDTO {
//     username: string;
//     password?: string;
//     roles?: string[];
// }


export interface AuthResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequestDTO {
    username: string;
    password: string;
}

export interface RegisterRequestDTO {
    username: string;
    password: string;
    roles: string[];
}

export interface UserDTO {
    username: string;
    password?: string;
    roles?: string[];
}

export interface AthleteDTO {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: string; // ISO формат, наприклад "2023-10-15"
    programType: "TAOLU_TRADITIONAL" | "CONTACT" | "TAOLU_SPORT";
}