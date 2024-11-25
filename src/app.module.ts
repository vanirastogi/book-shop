import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsController } from './authors/authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { dummyDataService } from './common/services/dummy-data.service';
import { userModule } from './user/user.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

const uri = "mongodb+srv://aditya:vani@book-strore.2dc5q.mongodb.net/?retryWrites=true&w=majority&appName=book-strore";

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    AuthorsModule,
    userModule,
    BooksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
