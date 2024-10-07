import { Projects } from "../settings/proyect-types";
import { Targets } from "../targets/targets-types";
import { Users } from "../user/user-types";

export interface Goals {
    general_target: string;
    project:        Projects;
    project_id:     number;
    target:         Targets;
    target_id:      number;
   }
   
   export interface MonthyTargets {
    id:                 number;
    month:              string;
    objective:          Targets;
    project:            Projects;
    project_id:         number;
    target_id:          number;
    target_planificado: string;
    target_reportado:   null;
    user_id:            string;
    users:              Users;
   }


   