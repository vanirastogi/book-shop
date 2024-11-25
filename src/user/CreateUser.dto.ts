import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
export class CreateUserSettingsDto{
    @IsOptional()
    @IsBoolean()
    receiveNotifications? : boolean;

    @IsOptional()
    @IsBoolean()
    receiveEmail ? : boolean;

    @IsOptional()
    @IsBoolean()
    receiveSMS ? : Boolean;
}
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsString()
    @IsOptional()
    displayName? : string;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto) 
    settings ? : CreateUserSettingsDto // ans object nested validation
}