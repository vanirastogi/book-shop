// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Author } from "../../authors/authors.schema";
// import { Model } from "mongoose";
// import { faker } from '@faker-js/faker';

// @Injectable()
// export class dummyDataService{
//     constructor(
//     @InjectModel(Author.name) private authorModel: Model<Author>,
//     ){}

//     async createDummyData(){
//         try{
//             //clear out exixting data 
//             await this.authorModel.deleteMany({});

//             // FILL WITH FAKE DATA 
//             for(let i = 0 ; i < 1 ; i++){
//                 const name = faker.person.fullName();
//                 const password = faker.internet.password();
//                 const email = faker.internet.email();
//                 const phoneNo = faker.phone.number();

//                 const author = new Author({
//                     name,
//                     password,
//                     email,
//                     phoneNo,
//                 });

//                 await author.save();

//             }
//         } catch(err){
//              console.error('Error generating dummy data:', err);
//         }
//     }

// }