import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class KeywordsService {
  constructor(
    private prismaService: PrismaService,
    private utilityService: UtilityService,
  ) {}

  create(createKeywordDto: CreateKeywordDto) {
    return 'This action adds a new keyword';
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return `This action updates a #${id} keyword`;
  }

  findAll({ page }: { page: number }) {
    return this.utilityService.getPaginatedResult(page, 'Keyword');
  }
}
