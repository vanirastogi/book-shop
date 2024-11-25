import { Get, HttpException, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { SignInDto } from "src/user/signIn.dto";
import { comparePasswords, encodePassword } from "src/utils/bcrypt";

@Injectable()
export class AuthService{

    constructor(
        private jwtService : JwtService,
        @InjectModel(User.name) private userModel : Model<User>,
    ){}
    
    async validateUser(username : string , password : string){

        const user = await this.userModel.findOne({ username});
        if(!user) throw new UnauthorizedException();

        const matched = comparePasswords(password, user.password);
        if (!matched) throw new UnauthorizedException('Invalid password');

        return user;
    }

    async logIn(signInDto : SignInDto){

        const user = await this.userModel.findOne({ username: signInDto.username });
            const payload = { username: user.username, sub: user._id };
            return this.jwtService.sign(payload) // create a jspn web token
    }

     async createUser(signInDto : SignInDto){

        const ifExist = await this.userModel.findOne({ username: signInDto.username });
        if(ifExist) throw new HttpException("username already exist" , 404)

        const password = await encodePassword(signInDto.password)
        const username = signInDto.username;

        const newUser = new this.userModel({
            username,
            password
        })

        const user = newUser.save()
        const payload = { username: signInDto.username, sub: (await user)._id };
        return this.jwtService.sign(payload)
    }
}