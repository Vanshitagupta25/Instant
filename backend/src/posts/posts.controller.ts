import { Body, Controller, Post, Param, UseGuards, Req, Get, Query, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: Record<string, any>,
    @UploadedFile() file: any,
    @Req() req: any,
  ) {

    const userId = req.user.sub;

    const imageUrl = file
      ? `/${file.filename}`
      : undefined;

    const channelId = body.channelId;
    const cleanChannelId = (channelId === 'null' || channelId === 'undefined' || !channelId) ? undefined : channelId;

    return this.postsService.createPost(
      body.content,
      userId,
      imageUrl,
      cleanChannelId,
    );
  }
  @Get()
  async getFeed(
    @Query('limit') limit: string,
    @Query('cursor') cursor?: string,
    @Query('channelId') channelId?: string,
  ) {
    const parsedLimit = parseInt(limit, 10) || 5

      const cleanChannelId = (channelId === 'null' || channelId === 'undefined' || !channelId) ? undefined : channelId;
    return this.postsService.getPaginatedPosts(parsedLimit, cursor, cleanChannelId);
  }
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    console.log("Fetching single post with ID:", id);
    return this.postsService.getPostById(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    const userRole = req.user.role;

    console.log("Deleting Post ID:", id);
    console.log("User ID requesting delete:", userId);

    return this.postsService.deletePost(id, userId, userRole);
  }

}