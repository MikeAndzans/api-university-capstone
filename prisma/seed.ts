import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'mike@test.com',
        name: 'Mike',
        sessions: {
            create: [
                {
                    ipAddress: '192.168.0.1',
                    userAgent: 'chrome'
                },
                {
                    ipAddress: '192.168.0.2',
                    userAgent: 'postman'
                }
            ]
        }
    },
    {
        email: 'john.doe@test.com',
        name: 'John Doe',
        sessions: {
            create: [
                {
                    ipAddress: '172.133.233.148',
                    userAgent: 'mozila'
                }
            ]
        }
    },
    {
        email: 'jane.doe@test.com',
        name: 'Jane Doe',
        sessions: {
            create: [
                {
                    ipAddress: '112.10.41.67',
                    userAgent: 'opera'
                }
            ]
        }
    },
    {
        email: 'admin@test.com',
        name: 'admin'
    }
]

const roleData: Prisma.RoleCreateInput[] = [
    {
        name: 'ADMIN'
    },
    {
        name: 'REGISTERED_USER'
    },
    {
        name: 'QUEST'
    }
]

async function main() {
    console.log('Start seeding...');
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u
        });
        console.log(`Created user with id: ${user.id}`);
    }

    for (const r of roleData) {
        const role = await prisma.role.create({
            data: r
        });
        console.log(`Created role with id: ${role.id}`);
    }
    console.log('Seeding finished.');
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});