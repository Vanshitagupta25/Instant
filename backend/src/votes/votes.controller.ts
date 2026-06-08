import { Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('votes')
@UseGuards(AuthGuard)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post(':postId/upvote')
  async upvote(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.votesService.upvote(postId, userId);
  }

  @Post(':postId/downvote')
  async downvote(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.votesService.downvote(postId, userId);
  }
}