import { Controller, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Book, BookSchema } from "src/schemas/book.schema";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { Author, AuthorSchema } from "src/schemas/authors.schema";

@Module({
    imports : [
        MongooseModule.forFeature([
        {
            name : Book.name,
            schema : BookSchema
        },
        {
            name : Author.name,
            schema : AuthorSchema
        }
    ])
    ],
    providers : [BooksService],
    controllers : [BooksController],
})
export class BooksModule{}