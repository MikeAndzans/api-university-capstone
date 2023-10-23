import PrismaClient from '../database.js';

const prisma = new PrismaClient();

const Query = {
    sessionsFull: async () => {
        return await prisma.session.findMany();
    },
    sessionsBasic: async () => {
        return await prisma.session.findMany();
    },
    users: async () => {
        return await prisma.user.findMany();
    },
    roles: async () => {
        return await prisma.role.findMany();
    }
};

export default Query;