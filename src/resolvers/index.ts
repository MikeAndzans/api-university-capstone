import PrismaClient from '../database.js';
import Query from './query.js';
import Mutation from './mutation.js';

const prisma = new PrismaClient();

const Role = {
    id: (parent: any, args: any, context: any, info: any) => parent.id,
    name: (parent: any) => parent.name
};

const SessionBasic = {
    id: (parent: any, args: any, context: any, info: any) => parent.id,
    ipAddress: (parent: any) => parent.ipAddress,
    userAgent: (parent: any) => parent.userAgent
};

const SessionFull = {
    ...SessionBasic,
    user: async (parent: any, args: any) => {
        return await prisma.user.findFirst({
            where: { id: parent.userId }
        });
    }
};

const UserBasic = {
    id: (parent: any, args: any, context: any, info: any) => parent.id,
    email: (parent: any) => parent.email,
    name: (parent: any) => parent.name
};

const UserFull = {
    ...UserBasic,
    sessions: async(parent: any) => {;
        return await prisma.user.findUnique({
            where: { id: parent.id }
        }).sessions();
    }
};

const resolvers = {
    Role,
    SessionFull,
    SessionBasic,
    UserFull,
    UserBasic,
    Query,
    Mutation
};

export default resolvers;