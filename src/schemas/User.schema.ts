import { Prop, Schema , SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";
import { Posts } from "./Post.schema";
import { Book } from "./book.schema";

@Schema()
export class User{

    @Prop({unique : true})
    username : string

    @Prop({unique : true})
    password : string
    
    @Prop({type : mongoose.Schema.Types.ObjectId, ref : 'UserSettings'})
    settings? : UserSettings;

    @Prop({type : [{type : mongoose.Schema.Types.ObjectId, ref : 'Book'}]}) // array of objects ids 
    likedBooks : Book[];

    @Prop()
    isAuthor : boolean

}
export const UserSchema = SchemaFactory.createForClass(User)
// ctratefor class returns a schema 