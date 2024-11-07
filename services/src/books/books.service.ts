import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        publishedDate: createBookDto.publishedDate,
      },
    });
  }

  findAll(query?: { title?: string; year?: number }): Promise<Book[]> {
    const where: any = {};
    
    if (query?.title) {
      where.title = {
        contains: query.title,
        mode: 'insensitive', 
      };
    }

    if (query?.year) {
      const startDate = new Date(query.year, 0, 1).getTime();
      const endDate = new Date(query.year, 11, 31, 23, 59, 59).getTime();
      
      where.publishedDate = {
        gte: startDate/1000,
        lte: endDate/1000,
      };
    }

    return this.prisma.book.findMany({
      where,
      orderBy: {
        publishedDate: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({ where: { id } });
  }
}
