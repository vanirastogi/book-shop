import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document} from "mongoose";
import { Book } from "./book.schema";

@Schema()
export class Author extends Document {

    @Prop({required : true})
    name : string

    @Prop({
        required : true,
        unique : true,
        trimm : true,
        validate : {
            validator : (value: string) => /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value),
            message : 'invalid email format',
        }
    })
    email : string

    @Prop({
        required : true,
        trim : true,
        minlength : 4,
        validate : {
            validator : (value : string) => !/(123|000)/.test(value),
            message : 'password id too weak',
        }
    })
    password : string

    @Prop({
        required : true,
        trim : true,
        minlength : 10,
    })
    phoneNo : string

    @Prop({
        type : [{type : mongoose.Schema.Types.ObjectId , ref : 'Book'}]
    })
    publishedBooks : Book[]

}
export const AuthorSchema = SchemaFactory.createForClass(Author)
