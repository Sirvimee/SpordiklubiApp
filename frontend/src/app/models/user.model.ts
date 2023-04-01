import { UserGoal } from "./user.goal";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    weight: number;
    height: number;
    bmi: number;
    bmiResult: string;
    gender: string;
    requireTrainer: string;
    packageType: string;
    goal: UserGoal;
    haveGymBefore: string;
    packageStart: string;
}