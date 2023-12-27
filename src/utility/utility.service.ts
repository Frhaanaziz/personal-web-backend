import { Injectable } from '@nestjs/common';
import { PER_PAGE } from './utility.constant';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UtilityService {
  constructor(private prismaService: PrismaService) {}

  async getPaginatedResult(page: number, model: Prisma.ModelName) {
    const totalRow = await this.prismaService[model].count();

    const savePage = page < 1 ? 1 : page;
    const rowsPerPage = PER_PAGE;
    const totalPages = Math.ceil(totalRow / rowsPerPage);
    let rows = [];

    try {
      rows = await this.prismaService[model].findMany({
        skip: (savePage - 1) * rowsPerPage,
        take: rowsPerPage,
      });
    } catch (error) {
      console.error(`Error fetching rows from model ${model}: `, error);
      // Return an empty array if there's an error
      rows = [];
    }

    return {
      currentPage: page,
      totalRow,
      rowsPerPage,
      totalPages,
      content: rows,
    };
  }
}
