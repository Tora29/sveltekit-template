import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';

const adapter = new PrismaPg({ connectionString: DATABASE_URL });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (dev) globalForPrisma.prisma = prisma;
