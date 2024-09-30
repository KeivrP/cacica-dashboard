import { Role } from "../user/user-types";

export interface CreateProyect {
    name: string;
    start_date: string;
    end_date: string;
    branch_id: string;
    objectives: Objective[];
    }

export interface Objective {
    name?: string;
    id: string;
    goal: string;
    roles: Role[];
}

export interface Projects {
    branch_id:  string;
    end_date:   Date;
    id:         number;
    name:       string;
    start_date: Date;
   }
   