import { ReqImageDto } from './upload-image.dto';
import { UploadService } from './upload.service';
import { Controller, Post, UseInterceptors, Param, UploadedFile, HttpException, HttpStatus, Get, Res, UploadedFiles, Patch, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join, extname } from 'path';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private uploadSrv: UploadService) { }
  /* upload multiple files */
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 50, {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, join(__dirname, '../../uploads/images/'));
      },
      filename: (req, file, cb) => fileNameFilter(req, file, cb),
    }),
    fileFilter: (req, file, cb) => filter(req, file, cb),
  }))
  async upload(@UploadedFiles() files: ReqImageDto[]) { }

  /* upload single file */
  @Post('single')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, join(__dirname, '../../uploads/images/'));
      },
      filename: (req, file, cb) => fileNameFilter(req, file, cb),
    }),
    fileFilter: (req, file, cb) => filter(req, file, cb),
  }))
  async uploadSingle(@UploadedFile() dto: ReqImageDto) { }

  /* serve file image */
  @Get(':filename')
  get(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: join(__dirname, '../../uploads/images/') });
  }
}

function storage() {
  return diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(__dirname, '../../uploads/images/'));
    },
    filename: (req, file, cb) => fileNameFilter(req, file, cb),
  })
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