import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Posts{

    @Prop({required : true})
    title : string

    @Prop({required : true})
    content : string
}

export const PostsSchema = SchemaFactory.createForClass(Posts)