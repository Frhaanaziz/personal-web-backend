import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentsService {
  constructor(private prismaService: PrismaService) {}
  async findOne(
    contentWhereUniqueInput: Prisma.ContentWhereUniqueInput,
  ): Promise<Content | null> {
    return this.prismaService.content.findUnique({
      where: contentWhereUniqueInput,
    });
  }
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContentWhereUniqueInput;
    where?: Prisma.ContentWhereInput;
    orderBy?: Prisma.ContentOrderByWithRelationInput;
  }): Promise<Content[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.content.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async create(data: CreateContentDto): Promise<Content> {
    return this.prismaService.content.create({
      data,
    });
  }
  async update(params: {
    where: Prisma.ContentWhereUniqueInput;
    data: UpdateContentDto;
  }): Promise<Content> {
    const { where, data } = params;
    return this.prismaService.content.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.ContentWhereUniqueInput): Promise<Content> {
    return this.prismaService.content.delete({
      where,
    });
  }
}
