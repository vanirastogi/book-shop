import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy} from 'passport-local'
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService : AuthService){
        super();
    }
    validate(username : string , password : string){
        console.log("in local strategy ")
        return this.authService.validateUser(username , password);
    }
}