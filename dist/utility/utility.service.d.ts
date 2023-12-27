import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UtilityService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getPaginatedResult(page: number, model: Prisma.ModelName): Promise<{
        currentPage: number;
        totalRow: any;
        rowsPerPage: number;
        totalPages: number;
        content: any[];
    }>;
}
