import PrismaClient from '../database.js';
import {
    CreateRoleInput,
    CreateSessionInput,
    UpdateUserInput,
    UpdateRoleInput,
    DeleteSessionInput,
    DeleteRoleInput,
    CreateRoleMutationResult,
    CreateSessionMutationResult,
    UpdateUserMutationResult,
    UpdateRoleMutationResult,
    DeleteSessionMutationResult,
    DeleteRoleMutationResult
} from './schemaTypes.js'

const prisma = new PrismaClient();

const Mutation = {
    createRole: async (_: any, input: CreateRoleInput): Promise<CreateRoleMutationResult> => {
        if (await prisma.role.findFirst({ where: { name: input.input.name } })) {
            return {
                success: false,
                message: `Role with name: ${input.input.name} already exists!`,
                role: null
            }
        }

        const createdRole = await prisma.role.create({
            data: {
                name: input.input.name
            }
        });

        return {
            success: true,
            message: `Successfully created ${createdRole.name} role with id: ${createdRole.id}`,
            role: createdRole
        }
    },
    createSession: async (_: any, input: CreateSessionInput): Promise<CreateSessionMutationResult> => {
        const userToConnect = await prisma.user.findFirst({
            where: { id: Number(input.input.userId) }
        });

        if (!userToConnect) {
            return {
                success: false,
                message: `User with id: ${input.input.userId} doesn't exist!`,
                session: null
            }
        }

        const createdSession = await prisma.session.create({
            data: {
                ipAddress: input.input.ipAddress,
                userAgent: input.input.userAgent,
                user: {
                    connect: { id: Number(input.input.userId) }
                }
            }
        });

        return {
            success: true,
            message: `Successfully created session with id: ${createdSession.id}`,
            session: createdSession
        }
    },
    updateUser: async (_: any, input: UpdateUserInput): Promise<UpdateUserMutationResult> => {
        //TODO: wrap update into try/catch block, because prisma is throwing and error if user is not found, instead of returning null
        const updatedUser = await prisma.user.update({
            where: { id: Number(input.input.id) },
            data: {
                name: input.input.name || undefined,
                email: input.input.email || undefined
            }
        });

        if (!updatedUser) {
            return {
                success: false,
                message: `User with id: ${input.input.id} doesn't exist!`,
                user: null
            }
        }

        return {
            success: true,
            message: `Successfully updated user with id: ${input.input.id}`,
            user: updatedUser
        };
    },
    //TODO: same issues to all mutation below, because of prisma design I'll be forced to wrap all update/delete operation into try/catch blocks
    updateRole: async (_: any, input: UpdateRoleInput): Promise<UpdateRoleMutationResult> => {
        const updatedRole = await prisma.role.update({
            where: { id: Number(input.input.id) },
            data: {
                name: input.input.name || undefined
            }
        });

        return {
            success: true,
            message: `Successfully updated role with id: ${input.input.id}`,
            role: updatedRole
        };
    },
    deleteSession: async (_: any, input: DeleteSessionInput): Promise<DeleteSessionMutationResult> => {
        const deletedSession = await prisma.session.delete({
            where: { id: Number(input.input.id) }
        })

        return {
            success: true,
            message: `Successfully deleted session with id: ${input.input.id}`,
            session: deletedSession
        };
    },
    deleteRole: async (_: any, input: DeleteRoleInput): Promise<DeleteRoleMutationResult> => {
        const deletedRole = await prisma.role.delete({
            where: { id: Number(input.input.id) }
        });

        return {
            success: true,
            message: `Successfully deleted role with id: ${input.input.id}`,
            role: deletedRole
        };
    }
};

export default Mutation;