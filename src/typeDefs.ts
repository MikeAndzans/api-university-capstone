const typeDefs = `#graphql
type Role {
    id: ID!
    name: String!
}

type UserBasic {
    id: ID!
    email: String!
    name: String
}

type UserFull {
    id: ID!
    email: String!
    name: String
    sessions: [SessionBasic!]
}

type SessionBasic {
    id: ID!
    ipAddress: String!
    userAgent: String!
}

type SessionFull {
    id: ID!
    ipAddress: String!
    userAgent: String!
    user: UserBasic!
}

type Query {
    sessionsFull: [SessionFull!]
    sessionsBasic: [SessionBasic!]
    users: [UserFull!]
    roles: [Role!]
}

interface MutationResult {
    success: Boolean!
    message: String!
}

input CreateRoleInput {
    name: String!
}

input CreateSessionInput {
    ipAddress: String!
    userAgent: String!
    userId: ID!
}

input UpdateUserInput {
    id: ID!
    name: String
    email: String
}

input UpdateRoleInput {
    id: ID!
    name: String!
}

input DeleteSessionInput {
    id: ID!
}

input DeleteRoleInput {
    id: ID!
}

type CreateRoleMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    role: Role
}

type CreateSessionMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    session: SessionFull
}

type UpdateUserMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    user: UserBasic
}

type UpdateRoleMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    role: Role
}

type DeleteSessionMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    session: SessionBasic
}

type DeleteRoleMutationResult implements MutationResult {
    success: Boolean!
    message: String!
    role: Role
}

type Mutation {
    createRole(input: CreateRoleInput!): CreateRoleMutationResult!
    createSession(input: CreateSessionInput!): CreateSessionMutationResult!
    updateUser(input: UpdateUserInput!): UpdateUserMutationResult!
    updateRole(input: UpdateRoleInput!): UpdateRoleMutationResult!
    deleteSession(input: DeleteSessionInput!): DeleteSessionMutationResult!
    deleteRole(input: DeleteRoleInput!): DeleteRoleMutationResult!
}
`;

export default typeDefs;