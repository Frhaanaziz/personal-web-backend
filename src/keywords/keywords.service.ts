import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class KeywordsService {
  constructor(
    private prismaService: PrismaService,
    private utilityService: UtilityService,
  ) {}

  // create(createKeywordDto: CreateKeywordDto) {
  //   return 'This action adds a new keyword';
  // }

  // update(id: number, updateKeywordDto: UpdateKeywordDto) {
  //   return `This action updates a #${id} keyword`;
  // }

  async findOne(
    contentWhereUniqueInput: Prisma.KeywordWhereUniqueInput,
  ): Promise<Keyword | null> {
    return this.prismaService.keyword.findUnique({
      where: contentWhereUniqueInput,
    });
  }
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.KeywordWhereUniqueInput;
    where?: Prisma.KeywordWhereInput;
    orderBy?: Prisma.KeywordOrderByWithRelationInput;
    include?: Prisma.KeywordInclude;
    select?: Prisma.KeywordSelect;
  }): Promise<Keyword[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.keyword.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }
  async create(data: CreateKeywordDto): Promise<Keyword> {
    return this.prismaService.keyword.create({
      data,
    });
  }
  async update(params: {
    where: Prisma.KeywordWhereUniqueInput;
    data: UpdateKeywordDto;
  }): Promise<Keyword> {
    const { where, data } = params;
    return this.prismaService.keyword.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.KeywordWhereUniqueInput): Promise<Keyword> {
    return this.prismaService.keyword.delete({
      where,
    });
  }

  async findAll({ page }: { page: number }) {
    return this.utilityService.getPaginatedResult(page, 'Keyword');
  }

  async findIntlMessage({ locale }: { locale: string }) {
    return this.prismaService.keyword.findMany({
      select: {
        keyword: true,
        group: true,
        Content: {
          where: {
            locale,
          },
          select: {
            content: true,
          },
        },
      },
    });
  }
}
