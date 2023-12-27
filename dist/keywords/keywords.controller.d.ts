import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FindAllKeywordsDto } from './dto/find-all-keywords.dto';
export declare class KeywordsController {
    private readonly keywordsService;
    constructor(keywordsService: KeywordsService);
    findAll(findAllKeywordsDto: FindAllKeywordsDto): Promise<{
        id: string;
        keyword: string;
        group: string;
        createdAt: Date;
        updatedAt: Date;
    }[]> | Promise<{
        currentPage: number;
        totalRow: any;
        rowsPerPage: number;
        totalPages: number;
        content: any[];
    }>;
    findById(id: string): Promise<{
        id: string;
        keyword: string;
        group: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createKeywordDto: CreateKeywordDto): Promise<{
        id: string;
        keyword: string;
        group: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateKeywordDto: UpdateKeywordDto): Promise<{
        id: string;
        keyword: string;
        group: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        keyword: string;
        group: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
