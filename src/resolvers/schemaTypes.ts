export type ObjectId = {
    id: number
}

export type Role = ObjectId & {
    name: string
}

export type SessionBasic = ObjectId & {
    ipAddress: string,
    userAgent: string
}

export type UserBasic = ObjectId & {
    email: string,
    name: string | null
}

export type CreateRoleInput = {
    input: {
        name: string
    }
};

export type CreateSessionInput = {
    input: {
        ipAddress: string,
        userAgent: string,
        userId: string
    }
};

export type UpdateUserInput = {
    input: {
        id: string,
        name: string | undefined,
        email: string | undefined
    }
};

export type UpdateRoleInput = {
    input: {
        id: string,
        name: string
    }
};

export type DeleteSessionInput = {
    input: {
        id: string
    }
};

export type DeleteRoleInput = {
    input: {
        id: string
    }
};

export type MutationResult = {
    success: boolean,
    message: string
}

export type CreateRoleMutationResult = MutationResult & {
    role: Role | null
}

export type CreateSessionMutationResult = MutationResult & {
    session: SessionBasic | null
}

export type UpdateUserMutationResult = MutationResult & {
    user: UserBasic | null
}

export type UpdateRoleMutationResult = MutationResult & {
    role: Role | null
}

export type DeleteSessionMutationResult = MutationResult & {
    session: SessionBasic | null
}

export type DeleteRoleMutationResult = MutationResult & {
    role: Role | null
}
