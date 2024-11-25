import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { userModule } from "src/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtStratergy } from "src/strategies/jwt.strategy";

@Module({
    imports : [
        PassportModule,
        JwtModule.register({
            secret : 'lava123',
            signOptions : {expiresIn : '1h'}
        }),
        MongooseModule.forFeature([
            {
                name : User.name,
                schema : UserSchema
            }
    ])
    ],
    providers : [AuthService , LocalStrategy , JwtStratergy],
    controllers : [AuthController]
})
export class AuthModule{}