// src/users/users.controller.ts
import { Controller, Patch, Body, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
      
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new BadRequestException('Only image files (jpg, jpeg, png, webp) are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async updateProfile(
    @Body('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const currentUserId = '6a1c8537c9a6c7388755bf88'; 

    const payload: any = {};
    if (name && name.trim()) payload.name = name.trim();
    if (file) payload.avatarUrl = file.filename;

    if (Object.keys(payload).length === 0) {
      throw new BadRequestException('No changes provided to update.');
    }

    return this.usersService.updateProfileFields(currentUserId, payload);
  }
}