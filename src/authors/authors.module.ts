import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from '../schemas/authors.schema';

@Module({
  imports : [
        MongooseModule.forFeature([{
            name : Author.name, // name of the class,
            schema : AuthorSchema, // schema
        }])
    ],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
