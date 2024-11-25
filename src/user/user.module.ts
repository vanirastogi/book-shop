import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { userService } from "./user.service";
import { UserController } from "./user.controller";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { Author, AuthorSchema } from "src/schemas/authors.schema";

@Module({
    imports : [
        MongooseModule.forFeature([{
            name : User.name, // name of the class,
            schema : UserSchema, // schema
        },
        {
            name : UserSettings.name,
            schema : UserSettingsSchema,
        },
        {
            name : Author.name,
            schema : AuthorSchema
        }
    ])
    ],
    providers : [userService],
    controllers : [UserController]
})
export class userModule{}