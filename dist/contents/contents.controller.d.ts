import { ContentsService } from './contents.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
export declare class ContentsController {
    private readonly contentsService;
    constructor(contentsService: ContentsService);
    create(createContentDto: CreateContentDto): Promise<{
        id: string;
        keywordId: string;
        content: string;
        locale: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateContentDto: UpdateContentDto): Promise<{
        id: string;
        keywordId: string;
        content: string;
        locale: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
