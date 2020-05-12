import { CreateImageDto } from './dto/create-image.dto';
import { UploadService } from './upload.service';
import { Controller, Post, UseInterceptors, Param, UploadedFile, HttpException, HttpStatus, Get, Res, UploadedFiles, Patch } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join, extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) { }
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 50, {
    storage: diskStorage({
      destination: (req, file, cb) =>  cb(null, join(__dirname, '../../uploads/images/')),
      filename: (req, file, cb) => fileNameFilter(req, file, cb),
    }),
    fileFilter: (req, file, cb) => filter(req, file, cb),
  }))
  async upload(@UploadedFiles() files: CreateImageDto[]) {}

  // @Post('single')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, join(__dirname, '../../uploads/images/'));
  //     },
  //     filename: (req, file, cb) => {
  //       cb(null, file.originalname)
  //     }
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     let ext = extname(file.originalname);
  //     if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
  //       return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
  //     }
  //     cb(null, true);
  //   },
  // }))
  // async upload(@UploadedFile() file: any) { }

  @Get(':filename')
  get(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: join(__dirname, '../../uploads/images/') });
  }
}

function fileNameFilter(req, file, cb) {
  cb(null, file.originalname)
}
function filter(req, file, cb) {
  let ext = extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
  }
  cb(null, true);
}