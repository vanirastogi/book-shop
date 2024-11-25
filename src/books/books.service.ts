import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Mongoose } from "mongoose";
import { Book } from "src/schemas/book.schema";
import { CreateBookDto } from "./createBook.dto";
import { Author } from "src/schemas/authors.schema";

@Injectable()
export class BooksService{
    constructor(
        @InjectModel(Book.name) private booksModel : Model<Book>,
        @InjectModel(Author.name) private authorModel : Model<Author>
    ){}
    getBooks(){
        return this.booksModel.find().populate('authorId')
    }
    async createBook(createBookDto : CreateBookDto){
        const author =await this.authorModel.findById(createBookDto.authorId)
        if(!author) throw new HttpException("author not founf", 404)
        const newBook = await  new this.booksModel(createBookDto);
        const updatedAuthoer = await author.updateOne({$push : {
            publishedBooks : newBook.id
        }})
        return newBook.save()
    }
}