import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import { userService } from "./user.service";
import { UpdateUserDto } from "./UpdateUserDto";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { User } from "src/schemas/User.schema";

@Controller('user')
export class UserController {
    constructor(
        private userService: userService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUsersById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id); // Ensure `mongoose` is imported
        if (!isValid) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe()) 
    async updateUser(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
        try {
            const username = req.user.username; // Extract username from JWT payload
            console.log('Authenticated Username:', username);

            const user = await this.userModel.findOne({ username });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            const updatedUser = await this.userService.updateUser(user._id.toString(), updateUserDto); // Convert ObjectId to string
            return {
                message: 'User updated successfully',
                data: updatedUser,
            };
        } catch (error) {
            throw new HttpException(
                { message: 'Error updating user', error: error.message },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id); // Ensure `mongoose` is imported
        if (!isValid) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        }

        const deletedUser = await this.userService.deleteUser(id); // Await because it returns a promise
        if (!deletedUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User deleted successfully' };
    }

    @Post('like/:bookId')
    @UseGuards(JwtAuthGuard)
    addLikedBook(@Req() req: any, @Param('bookId') bookId: string) {
        const username = req.user.username; // Extract from JWT payload
        console.log('Authenticated Username:', username);
        console.log('Book ID:', bookId);

        return this.userService.addLiked(username, bookId);
    }
}
