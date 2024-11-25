import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { UpdateUserDto } from "./UpdateUserDto";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { Posts } from "src/schemas/Post.schema";
import { Author } from "src/schemas/authors.schema";

@Injectable()
export class userService{
    constructor(
        @InjectModel(User.name) private userModel : Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel : Model<UserSettings>,
        @InjectModel(Author.name) private authorModel : Model<Author>
    ){}

    getUsers(){
        return this.userModel.find().populate(['settings' , 'likedBooks'])
    }

    getUserById(id : string){
        return this.userModel.findById(id).populate('settings') // returns a promise use async await in the funcition 
        //populate -> shows the whole object not just the ref id 
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const { settings, ...otherUpdates } = updateUserDto;

        // Find the user by ID and populate the `settings` reference
        const user = await this.userModel.findById(userId).populate('settings');
        if (!user) {
            throw new Error('User not found');
        }

        // Handle `settings` updates
        if (settings) {
            if (user.settings) {
                // Update existing settings
                await this.userSettingsModel.findByIdAndUpdate(
                    (user.settings as any)._id, // Cast to `any` to access `_id`
                    settings,
                    { new: true }
                );
            } else {
                // Create new settings if none exist
                const newSettings = await this.userSettingsModel.create(settings);
                user.settings = newSettings._id as any; // Explicitly cast `_id` to match type
            }
        }

        // Update other user fields
        Object.assign(user, otherUpdates);

        // Save updated user
        await user.save();

        // Return updated user with populated `settings`
        return this.userModel.findById(userId).populate('settings');
    }


    deleteUser(id){
        return this.userModel.findByIdAndDelete(id)
    }

    async addLiked(username : 'string' , bookId : string){
        const user = await   this.userModel.findOne({ username: username })
        const updatedUser = await user.updateOne(
            { username },
            { $addToSet: { likedBooks: bookId } } // Avoid duplicates with $addToSet
        );

        return updatedUser;

    }

}