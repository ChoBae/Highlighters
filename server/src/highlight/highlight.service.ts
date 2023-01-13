import { User } from '@prisma/client';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { Highlight } from '.prisma/client';
import { CreateHighlightDto, UpdateHighlightDto } from './dto/highlight.dto';
import { FeedService } from 'src/feed/feed.service';
import { CreateFeedDto } from 'src/feed/dto/feed.dto';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class HighlightService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => FeedService))
    private readonly feedService: FeedService,
  ) {}

  async createHighlight(
    createHighlightDto: CreateHighlightDto,
    user: User,
  ): Promise<boolean> {
    const {
      user_email,
      group_id,
      url,
      contents,
      selection,
      title,
      image,
      description,
      color,
      type,
    } = createHighlightDto;

    try {
      const find_feed = await this.prismaService.feed.findFirst({
        where: { url, group_id },
      });

      let make_feed = null;
      if (!find_feed) {
        const newFeedDto = new CreateFeedDto();
        newFeedDto.url = url;
        newFeedDto.feed_title = title;
        newFeedDto.og_title = title;
        newFeedDto.image = image;
        newFeedDto.description = description;

        make_feed = await this.feedService.createFeed(newFeedDto, user);
      }

      let result = null;

      // type 1 일반 글씨 하이라이트
      if (type !== 2) {
        result = await this.prismaService.highlight.create({
          data: {
            feed_id: find_feed ? find_feed.id : make_feed.id,
            group_id: group_id,
            user_email: user_email,
            selection: selection,
            contents: contents,
            type: 1,
            color: color,
          },
        });
      } else {
        // type 2 사진 하이라이트
        // url에서 이미지를 fetch

        // s3에 업로드

        // s3 url을 db에 저장
        result = await this.prismaService.highlight.create({
          data: {
            feed_id: find_feed ? find_feed.id : make_feed.id,
            group_id: group_id,
            user_email: user_email,
            selection: selection,
            contents: contents,
            type: 2,
            color: color,
          },
        });
      }

      if (find_feed) {
        await this.prismaService.feed.update({
          where: { id: find_feed.id },
          data: {
            // highlight: { connect: { id: result.id } },
            updatedAt: result.createdAt,
          },
        });
      }

      return true;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findHighlight(id: number): Promise<Highlight> {
    const result = await this.prismaService.highlight.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException(`Can't find highlight with id ${id}`);
    }

    return result;
  }

  async findAllHighlightById(id: number): Promise<Highlight[]> {
    const highlights = await this.prismaService.highlight.findMany({
      where: { feed_id: id },
    });

    return highlights;
  }

  async findAllHighlightInFeed(
    group_id: number,
    url: string,
  ): Promise<Highlight[]> {
    const find_feed = await this.prismaService.feed.findFirst({
      where: { url, group_id },
      select: {
        highlight: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!find_feed) {
      throw new NotFoundException(`Can't find feed with url ${url}`);
    }

    return find_feed.highlight;
  }

  async updateHighlight(
    id: number,
    updateHighlightDto: UpdateHighlightDto,
  ): Promise<Highlight> {
    const result = await this.prismaService.highlight.update({
      where: { id: id },
      data: updateHighlightDto,
    });

    return result;
  }

  async deleteHighlight(id: number): Promise<Highlight> {
    return this.prismaService.highlight.delete({ where: { id: id } });
  }
}
