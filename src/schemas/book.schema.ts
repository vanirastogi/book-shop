import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Author } from "./authors.schema";
import mongoose from "mongoose";

@Schema()
export class Book{

    @Prop({required : true})
    title : string;

    @Prop({required : true})
    genre : string;

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'Author' , required : true})
    authorId? : Author

}

export const BookSchema = SchemaFactory.createForClass(Book)