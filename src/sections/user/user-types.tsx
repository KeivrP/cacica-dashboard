export interface Users {
    avatar_url: string;
    branch: Branch;
    email: string;
    id: string;
    name: string;
    role: Role ;
}

export interface CreateUsers {
    avatar_url?: string;
    branchId: string;
    email: string;
    name: string;
    roleId: string;
}

export interface Branch {
    id: string;
    location: string;
    name: string;
}

export interface Role {
    id: string;
    name: string;
}
