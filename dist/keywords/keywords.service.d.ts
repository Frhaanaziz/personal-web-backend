import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
export declare class KeywordsService {
    private prismaService;
    private utilityService;
    constructor(prismaService: PrismaService, utilityService: UtilityService);
    findOne(contentWhereUniqueInput: Prisma.KeywordWhereUniqueInput): Promise<Keyword | null>;
    findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.KeywordWhereUniqueInput;
        where?: Prisma.KeywordWhereInput;
        orderBy?: Prisma.KeywordOrderByWithRelationInput;
        include?: Prisma.KeywordInclude;
    }): Promise<Keyword[]>;
    create(data: CreateKeywordDto): Promise<Keyword>;
    update(params: {
        where: Prisma.KeywordWhereUniqueInput;
        data: UpdateKeywordDto;
    }): Promise<Keyword>;
    delete(where: Prisma.KeywordWhereUniqueInput): Promise<Keyword>;
    findAll({ page }: {
        page: number;
    }): Promise<{
        currentPage: number;
        totalRow: any;
        rowsPerPage: number;
        totalPages: number;
        content: any[];
    }>;
}
