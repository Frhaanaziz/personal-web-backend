import { Prisma } from '@prisma/client';
export declare class CreateKeywordDto {
    id?: string;
    keyword: string;
    group: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    Content?: Prisma.ContentCreateNestedManyWithoutKeywordInput;
}
