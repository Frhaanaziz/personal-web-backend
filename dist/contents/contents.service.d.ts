import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class ContentsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    findOne(contentWhereUniqueInput: Prisma.ContentWhereUniqueInput): Promise<Content | null>;
    findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ContentWhereUniqueInput;
        where?: Prisma.ContentWhereInput;
        orderBy?: Prisma.ContentOrderByWithRelationInput;
    }): Promise<Content[]>;
    create(data: CreateContentDto): Promise<Content>;
    update(params: {
        where: Prisma.ContentWhereUniqueInput;
        data: UpdateContentDto;
    }): Promise<Content>;
    delete(where: Prisma.ContentWhereUniqueInput): Promise<Content>;
}
