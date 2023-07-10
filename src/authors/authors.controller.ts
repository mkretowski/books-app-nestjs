import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
import { CreateAuthorDTO } from './dtos/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}
  @Get('/')
  getAll(): any {
    return this.authorsService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const author = await this.authorsService.getById(id);
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }
  @Post('/')
  create(@Body() authorData: CreateAuthorDTO) {
    return this.authorsService.create(authorData);
  }
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateAuthorDTO,
  ) {
    if (!(await this.authorsService.getById(id)))
      throw new NotFoundException('Author not found');

    await this.authorsService.updateById(id, productData);
    return { success: true };
  }
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.authorsService.getById(id)))
      throw new NotFoundException('Author not found');
    await this.authorsService.deleteById(id);
    return { success: true };
  }
}
