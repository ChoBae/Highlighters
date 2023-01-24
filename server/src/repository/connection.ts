import { Highlight, User } from '@prisma/client';
import * as elasticsearch from '@elastic/elasticsearch';
import { Global, Injectable } from '@nestjs/common';
import { elasticFeedDto } from './dto/elastic.dto';
import { PrismaService } from './prisma.service';

@Global()
@Injectable()
export class ElasticsearchService {
  private readonly client: elasticsearch.Client;

  constructor(private readonly prismaService: PrismaService) {
    this.client = new elasticsearch.Client({
      cloud: {
        id: process.env.ELASTICSEARCH_NODE,
      },
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
      },
    });
  }

  async inputFeed(elasticfeed: elasticFeedDto) {
    console.log('일라스틱 피드 생성');
    await this.client.index({
      index: 'search-highlighter',
      document: {
        id: elasticfeed.feed_id,
        contents: [elasticfeed.contents],
        title: elasticfeed.title,
        user_nickname: elasticfeed.user_nickname,
        description: elasticfeed.description,
        group_id: elasticfeed.group_id,
        url: elasticfeed.url,
        image: elasticfeed.image,
        createdAt: elasticfeed.createdAt,
      },
    });
  }

  async deleteFeed(feed_id: string) {
    try {
      await this.client.deleteByQuery({
        index: 'search-highlighter',
        body: {
          query: {
            match: {
              id: feed_id,
            },
          },
        },
      });
      return;
    } catch (e) {
      return;
    }
  }

  async appendFeed(feed_id: string, contents: string) {
    this.client.updateByQuery({
      index: 'search-highlighter',
      body: {
        query: {
          match: {
            id: feed_id,
          },
        },
        script: {
          source: 'ctx._source.contents.add(params.contents)',
          lang: 'painless',
          params: {
            contents: contents,
          },
        },
      },
    });
  }

  async deleteHighlight(feed_id: string, contents: string) {
    try {
      await this.client.updateByQuery({
        index: 'search-highlighter',
        body: {
          query: {
            match: {
              id: feed_id,
            },
          },
        },
        script: {
          source:
            'ctx._source.contents.remove(ctx._source.contents.indexOf(params.contents))',
          lang: 'painless',
          params: {
            contents: contents,
          },
        },
      });
      return;
    } catch (e) {
      return;
    }
  }

  async findFeed(word: string, user: User) {
    const result = await this.client.search({
      index: 'search-highlighter',
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  fields: ['contents', 'title', 'description'],
                  query: word,
                  fuzziness: 1,
                },
              },
              // {
              //   fuzzy: {
              //     contents: {
              //       value: word,
              //       fuzziness: 1,
              //       max_expansions: 10,
              //     },
              //   },
              // },
              // {
              //   fuzzy: {
              //     title: {
              //       value: word,
              //       fuzziness: 1,
              //       max_expansions: 10,
              //     },
              //   },
              // },
              // {
              //   fuzzy: {
              //     description: {
              //       value: word,
              //       fuzziness: 1,
              //       max_expansions: 10,
              //     },
              //   },
              // },
            ],
            must: [
              {
                // multi_match: {
                //   query: word,
                //   fields: ['contents', 'title', 'description'],
                // },

                term: {
                  group_id: user.group_id,
                },
              },
            ],
          },
        },
        // track_scores: true,
        highlight: {
          pre_tags: ['<mark>'],
          post_tags: ['</mark>'],
          fields: {
            contents: {},
            // title: {},
            // description: {},
          },
        },
      },
    });
    // console.log(result);
    const real_result = [];
    if (result.hits.hits.length > 0) {
      for (let i = 0; i < result.hits.hits.length; i++) {
        real_result.push(result.hits.hits[i]._source);
        real_result[i].score = result.hits.hits[i]._score;
      }
    }
    return real_result;
  }
}
