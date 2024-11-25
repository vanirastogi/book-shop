import { Body, Controller, Get, HttpException, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from '../schemas/authors.schema';
import mongoose from 'mongoose';
import { CreateAuthorDto } from './authors.dto';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

@Controller('authors')
export class AuthorsController {
    constructor(private  authorsService: AuthorsService) {}

    // get /authors
    // get /authors/:id
    // get / authors/me
    @Get()
    findAll(){
        return this.authorsService.findAll();
    }

    @Get(":id")
    findById(@Param('id') id :string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('author not found',404);
        return this.authorsService.findById(id);
    }

    @Get('/profile/:id')
    getProfile(@Param('id') id:string){
        return {id}
    }

    @Post()
    @UsePipes(new ValidationPipe)
    createPost(@Body()  createAuthorDto :CreateAuthorDto){
        return this.authorsService.createPost(createAuthorDto);
    }


}
