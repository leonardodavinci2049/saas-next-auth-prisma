import { PrismaClient } from '../generated/prisma'

// Estenda corretamente o objeto globalThis
declare global {
      // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Evite múltiplas instâncias durante hot-reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

const cnxDataBase = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production'){
    globalThis.prisma = cnxDataBase;
}

export default cnxDataBase;