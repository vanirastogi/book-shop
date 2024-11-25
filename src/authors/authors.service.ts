import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../schemas/authors.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { OnModuleInit } from '@nestjs/common';
import { CreateAuthorDto } from './authors.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel(Author.name) private authorModal : Model<Author>
    ) {}

    // async onModuleInit() {
    //     console.log("generating fake data ");
    //     await this.createDummyData();
    // }
    findAll(){
        return this.authorModal.find().populate('publishedBooks');
    }
    findById(id : string){
        return this.authorModal.findById(id);
    }
    createPost(createAuthorDto : CreateAuthorDto){
        const newAuthor = new this.authorModal(createAuthorDto);
        return newAuthor.save();
    }
    // async createDummyData(){
    //     try{
    //         //clear out exixting data 
    //         await this.authorModal.deleteMany({});

    //         // FILL WITH FAKE DATA 
    //         for(let i = 0 ; i < 5 ; i++){
    //             const name = faker.person.fullName();
    //             const password = faker.internet.password();
    //             const email = faker.internet.email();
    //             const phoneNo = faker.phone.number();

    //             const author = new this.authorModal({
    //                 name,
    //                 password,
    //                 email,
    //                 phoneNo,
    //             });

    //             await author.save(); 

    //         }
    //     } catch(err){
    //          console.error('Error generating dummy data:', err);
    //     }
    // }
}
