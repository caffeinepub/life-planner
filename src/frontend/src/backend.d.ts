import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WorkItem {
    id: bigint;
    projectName: string;
    completed: boolean;
    description: string;
    deadline: Time;
}
export type Time = bigint;
export interface Study {
    id: bigint;
    subjectName: string;
    description: string;
    studySchedule: string;
    progress: bigint;
}
export interface Habit {
    id: bigint;
    name: string;
    description: string;
    frequencyTarget: bigint;
    trackingHistory: Array<boolean>;
}
export interface UserProfile {
    name: string;
}
export interface Goal {
    id: bigint;
    title: string;
    completed: boolean;
    description: string;
    targetDate: Time;
    milestones: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGoal(goal: Goal): Promise<void>;
    addHabit(habit: Habit): Promise<void>;
    addStudy(study: Study): Promise<void>;
    addWorkItem(workItem: WorkItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGoals(): Promise<Array<Goal>>;
    getHabits(): Promise<Array<Habit>>;
    getStudies(): Promise<Array<Study>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWorkItems(): Promise<Array<WorkItem>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
