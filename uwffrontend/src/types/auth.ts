// // // // export interface AuthResponseDTO {
// // // //     accessToken: string;
// // // //     refreshToken: string;
// // // // }
// // // //
// // // // export interface LoginRequestDTO {
// // // //     username: string;
// // // //     password: string;
// // // // }
// // // //
// // // // export interface RegisterRequestDTO {
// // // //     username: string;
// // // //     password: string;
// // // //     roles: string[];
// // // // }
// // //
// // // export interface AuthResponseDTO {
// // //     accessToken: string;
// // //     refreshToken: string;
// // // }
// // //
// // // export interface LoginRequestDTO {
// // //     username: string;
// // //     password: string;
// // // }
// // //
// // // export interface RegisterRequestDTO {
// // //     username: string;
// // //     password: string;
// // //     roles: string[];
// // // }
// // //
// // // export interface UserDTO {
// // //     username: string;
// // //     password?: string;
// // //     roles?: string[];
// // // }
// //
// //
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
// //
// // export interface UserDTO {
// //     username: string;
// //     password?: string;
// //     roles?: string[];
// // }
// //
// // export interface AthleteDTO {
// //     id?: number;
// //     firstName: string;
// //     lastName: string;
// //     birthDate: string; // ISO формат, наприклад "2023-10-15"
// //     programType: "TAOLU_TRADITIONAL" | "CONTACT" | "TAOLU_SPORT";
// // }
// //
// //
// // export interface LoginRequestDTO {
// //     username: string;
// //     password: string;
// // }
// //
// // export interface RegisterRequestDTO {
// //     username: string;
// //     password: string;
// //     role: string;
// // }
// //
// // export interface AuthResponseDTO {
// //     accessToken: string;
// //     refreshToken: string;
// // }
// //
// // export interface UserDTO {
// //     id: number;
// //     username: string;
// //     password?: string;
// //     roles?: string[];
// // }
// //
// // export interface AthleteDTO {
// //     id?: number;
// //     firstName: string;
// //     lastName: string;
// //     birthDate: string;
// //     programType: string;
// //     userId?: number;
// // }
// //
// // export interface CompetitionApplicationDTO {
// //     id?: number;
// //     competitionName: string;
// //     athleteFirstName: string;
// //     athleteLastName: string;
// //     birthDate: string;
// //     gender: 'MALE' | 'FEMALE';
// //     ageCategory: 'YOUNGER_JUNIORS_6_8' | 'OLDER_JUNIORS_9_11' | 'YOUNGER_YOUTH_12_14' | 'OLDER_YOUTH_15_17' | 'ADULTS_18_PLUS';
// //     weaponlessProgram?: 'CHANG_QUAN' | 'NAN_QUAN' | 'TAIJI_QUAN';
// //     shortWeaponProgram?: 'DAO_SHU' | 'JIAN_SHU' | 'TAIJI_JIAN_SHU' | 'NAN_DAO' | 'TAIJI_SHAN';
// //     longWeaponProgram?: 'GUN_SHU' | 'QIANG_SHU' | 'NAN_GUN';
// //     duilian?: string;
// //     userId?: number;
// // }
//
// //=========
//
// export interface LoginRequestDTO {
//     username: string;
//     password: string;
// }
//
// export interface RegisterRequestDTO {
//     username: string;
//     password: string;
//     role: string;
// }
//
// export interface AuthResponseDTO {
//     accessToken: string;
//     refreshToken: string;
// }
//
// export interface UserDTO {
//     id: number;
//     username: string;
//     password?: string;
//     roles?: string[];
// }
//
// export interface AthleteDTO {
//     id?: number;
//     firstName: string;
//     lastName: string;
//     birthDate: string;
//     programType: string;
//     userId?: number;
// }
//
// export interface CompetitionApplicationDTO {
//     id?: number;
//     competitionName: string;
//     athleteFirstName: string;
//     athleteLastName: string;
//     birthDate: string;
//     gender: 'MALE' | 'FEMALE';
//     ageCategory: 'YOUNGER_JUNIORS_6_8' | 'OLDER_JUNIORS_9_11' | 'YOUNGER_YOUTH_12_14' | 'OLDER_YOUTH_15_17' | 'ADULTS_18_PLUS';
//     weaponlessProgram?: 'CHANG_QUAN' | 'NAN_QUAN' | 'TAIJI_QUAN';
//     shortWeaponProgram?: 'DAO_SHU' | 'JIAN_SHU' | 'TAIJI_JIAN_SHU' | 'NAN_DAO' | 'TAIJI_SHAN';
//     longWeaponProgram?: 'GUN_SHU' | 'QIANG_SHU' | 'NAN_GUN';
//     duilian?: string;
//     userId?: number;
// }
//
// export interface ContactCompetitionApplicationDTO {
//     id?: number;
//     competitionName: string;
//     athleteFirstName: string;
//     athleteLastName: string;
//     birthDate: string;
//     gender: 'MALE' | 'FEMALE';
//     ageCategory: ContactAgeCategory;
//     contactProgram?: 'SANDA' | 'LIGHT_SANDA' | 'TUI_SHOW' | 'WING_CHUN' | 'SHUAI_JIAO';
//     weightCategory?: WeightCategory;
//     userId?: number;
// }
// export type ContactAgeCategory =
//     | "AGE_6_7"
//     | "AGE_8_9"
//     | "AGE_10_11"
//     | "AGE_12_13"
//     | "AGE_14_15"
//     | "AGE_16_17"
//     | "AGE_18_PLUS";
//
// export type WeightCategory =
//     |"UNDER_50"
//     |"FROM_50_TO_55"
//     |"FROM_55_TO_60"
//     |"FROM_60_TO_65"
//     |"FROM_65_TO_70"
//     |"FROM_70_TO_75"
//     |"FROM_75_TO_80"
//     |"FROM_80_TO_85"
//     |"FROM_85_TO_90"
//     |"OVER_90";

//=========

export interface UserDTO {
    id: number;
    username: string;
    password: string;
    roles: string[];
}

export interface AthleteDTO {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    programType: ProgramType;
}

export interface CompetitionApplicationDTO {
    id?: number;
    competitionName: string;
    athleteFirstName: string;
    athleteLastName: string;
    birthDate: string;
    gender: Gender;
    ageCategory: AgeCategory;
    weaponlessProgram?: WeaponlessProgram;
    shortWeaponProgram?: ShortWeaponProgram;
    longWeaponProgram?: LongWeaponProgram;
    duilian: string;
}

export interface ContactCompetitionApplicationDTO {
    id?: number;
    competitionName: string;
    athleteFirstName: string;
    athleteLastName: string;
    birthDate: string;
    gender: Gender;
    ageCategory: ContactAgeCategory;
    contactProgram?: ContactProgram;
    weightCategory?: WeightCategory;
}

export type ProgramType = "TAOLU_TRADITIONAL" | "CONTACT" | "TAOLU_SPORT";

export type Gender = "MALE" | "FEMALE";

export type AgeCategory =
    | "YOUNGER_JUNIORS_6_8"
    | "OLDER_JUNIORS_9_11"
    | "YOUNGER_YOUTH_12_14"
    | "OLDER_YOUTH_15_17"
    | "ADULTS_18_PLUS";

export type ContactAgeCategory =
    | "AGE_6_7"
    | "AGE_8_9"
    | "AGE_10_11"
    | "AGE_12_13"
    | "AGE_14_15"
    | "AGE_16_17"
    | "AGE_18_PLUS";

export type WeaponlessProgram =
    | "CHANG_QUAN"
    | "NAN_QUAN"
    | "TAIJI_QUAN";

export type ShortWeaponProgram =
    | "DAO_SHU"
    | "JIAN_SHU"
    | "TAIJI_JIAN_SHU"
    | "NAN_DAO"
    | "TAIJI_SHAN";

export type LongWeaponProgram =
    | "GUN_SHU"
    | "QIANG_SHU"
    | "NAN_GUN";

export type ContactProgram =
    | "SANDA"
    | "LIGHT_SANDA"
    | "TUI_SHOW"
    | "WING_CHUN"
    | "SHUAI_JIAO";

export type WeightCategory =
    |"UNDER_50"
    |"FROM_50_TO_55"
    |"FROM_55_TO_60"
    |"FROM_60_TO_65"
    |"FROM_65_TO_70"
    |"FROM_70_TO_75"
    |"FROM_75_TO_80"
    |"FROM_80_TO_85"
    |"FROM_85_TO_90"
    |"OVER_90";

export type NonContactFieldValue =
    | string
    | Gender
    | AgeCategory
    | WeaponlessProgram
    | ShortWeaponProgram
    | LongWeaponProgram
    | undefined;

export type ContactFieldValue =
    | string
    | Gender
    | ContactAgeCategory
    | ContactProgram
    | WeightCategory
    | undefined;