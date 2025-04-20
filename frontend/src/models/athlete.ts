import {ProgramType} from "@/models/programtypes";
import {Gender} from "@/models/gender";

export interface AthleteDTO{
    id?: number | null;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: Gender
    programType: ProgramType;
    userId: number;
}