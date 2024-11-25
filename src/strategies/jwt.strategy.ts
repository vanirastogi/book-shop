import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), // look inside header and look for the bearrer token ,
            ignoreExpiration : false,
            secretOrKey : 'lava123'
        })
    }
    validate(payload : any){
        console.log("inside jwt strategy")
        console.log(payload);
        return payload;
    }
}