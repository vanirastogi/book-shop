import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { SignInDto } from "src/user/signIn.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { Console } from "console";

@Controller('auth')
export class AuthController{

    constructor(private authService : AuthService){}
    @Post('login')
    @UseGuards(AuthGuard('local'))
    logIn(@Body()  signInDto :  SignInDto){
        return this.authService.logIn(signInDto)
    }

    @Post('signin')
    @UsePipes( new ValidationPipe)
    signin(@Body()  signInDto :  SignInDto){
        return this.authService.createUser(signInDto)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request){
        console.log("inside auth controller status")
        console.log(req.body)
        return req.body;
    }
}