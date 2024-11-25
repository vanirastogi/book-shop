import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./createBook.dto";
import { JwtAuthGuard } from "src/guard/jwt.guard";

@Controller('book')
export class BooksController{
    constructor(private booksService : BooksService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe)
    getBooks(){
        return this.booksService.getBooks();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe)
    createBook(@Body() createBookDto : CreateBookDto ){
        return this.booksService.createBook(createBookDto)
    }
}